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

        const appointment = await Appointment.create({
            booking: bookingId,
            student: studentId,
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

module.exports = {
    bookAppointment,
}