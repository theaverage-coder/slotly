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
        const profId = await Booking.findOne({ _id: bookingId }, { prof: 1 });

        const appointment = await Appointment.create({
            booking: bookingId,
            student: studentId,
            prof: profId,
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
        const { userId, isStudent } = req.body;
        let appointments = [];
        if (isStudent) {
            appointments = await Appointment.find({ student: userId });

        } else {
            appointments = await Appointment.find({ prof: userId });
        }

        return res.json(appointments);
    } catch (err) {
        console.log(err)
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