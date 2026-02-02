const asyncHandler = require('express-async-handler')
const Booking = require('../models/bookingModel')
const Appointment = require('../models/appointmentModel')

// @desc Book an appointment
// @router /api/appointments/bookAppointment
const bookAppointment = asyncHandler(async (req, res) => {
    try {
        const { selectedTimeSlot, bookingId, studentId, timeSlotDuration, message } = req.body;
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
            res.sendStatus(201)
            console.log("Appointment booked")
        } else {
            res.sendStatus(400)
            throw new Error("Failed to book appointment")
        }
    } catch (err) {
        console.log(err)
    }
})

// @desc Get all appointments of a user
// @router /api/appointments/getAppointments
const getAppointments = asyncHandler(async (req, res) => {
    try {
        //console.log("here")
        const { userId, isStudent } = req.body;
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
                });

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
                });
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
        const { appointmentId } = req.params;
        const deletedAppt = await Appointment.findByIdAndDelete(appointmentId);

        if (!deletedAppt) {
            return res.status(404);
        }

        res.sendStatus(200);
    } catch (err) {
        console.log("Failed to cancel appointment: ", err);
    }
})

module.exports = {
    bookAppointment,
    getAppointments,
    cancelAppointment
}