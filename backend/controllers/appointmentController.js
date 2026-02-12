const asyncHandler = require('express-async-handler')
const Booking = require('../models/bookingModel')
const Appointment = require('../models/appointmentModel')

// @desc Book an appointment
// @router /api/appointments/bookAppointment
const bookAppointment = asyncHandler(async (req, res) => {
    try {
        const { selectedTimeSlot, bookingId, timeSlotDuration, message } = req.body;
        const studentId = req.user;
        const startDateUTC = new Date(selectedTimeSlot);
        const endDateUTC = new Date(new Date(selectedTimeSlot).getTime() + timeSlotDuration * 60000);
        const prof = await Booking.findOne({ _id: bookingId }, { course: 1 }).populate('course', 'prof');

        const appointment = await Appointment.create({
            booking: bookingId,
            student: studentId,
            prof: prof.course.prof,
            startTime: startDateUTC,
            endTime: endDateUTC,
            message: message,
        })

        if (appointment) {
            console.log("Appointment booked")
            return res.sendStatus(201)
        } else {
            console.log("Failed to book appointment")
            return res.sendStatus(400)
        }
    } catch (err) {
        console.log(err)
    }
})

// @desc Get all appointments of a user sorted by start time
// @router /api/appointments/getAppointments
const getAppointments = asyncHandler(async (req, res) => {
    try {
        const userId = req.user;
        const { isStudent } = req.body;
        let appointments = [];

        //Retrieve professor/student first and last names AND the course code
        if (isStudent) {
            appointments = await Appointment.find({ student: userId })
                .populate('prof', 'firstName lastName -_id')
                .populate({
                    path: 'booking',
                    select: 'course -_id',
                    populate: {
                        path: 'course',
                        select: 'courseCode -_id'
                    }
                }).sort({ startTime: 1 });

        } else {
            appointments = await Appointment.find({ prof: userId })
                .populate('student', 'firstName lastName')
                .populate({
                    path: 'booking',
                    select: 'course',
                    populate: {
                        path: 'course',
                        select: 'courseCode courseName'
                    },
                }).sort({ startTime: 1 });
        }

        return res.status(200).json(appointments);
    } catch (err) {
        console.log(err)
        return res.sendStatus(404);
    }
})

// @desc Cancel an appointment
// @router /api/appointments/cancelAppointment/:appointmentId
const cancelAppointment = asyncHandler(async (req, res) => {
    try {
        const userId = req.user;
        const { appointmentId } = req.params;
        //Ensure that whoever sent the request is one of the attendees
        const deletedAppt = await Appointment.findOneAndDelete({
            _id: appointmentId,
            $or: [
                { student: userId },
                { prof: userId }
            ]
        });

        if (!deletedAppt) {
            return res.sendStatus(404);
        }

        return res.sendStatus(200);
    } catch (err) {
        console.log("Failed to cancel appointment: ", err);
    }
})

module.exports = {
    bookAppointment,
    getAppointments,
    cancelAppointment
}