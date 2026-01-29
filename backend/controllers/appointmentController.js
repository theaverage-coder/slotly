const asyncHandler = require('express-async-handler')
const Booking = require('../models/bookingModel')
const Appointment = require('../models/appointmentModel')

// @desc Book an appointment
// @router /api/appointments/bookAppointment
const bookAppointment = asyncHandler(async (req, res) => {
    try {
        const { selectedTimeSlot, selectedDate, bookingId, studentId, timeSlotDuration } = req.body;
        const startDateUTC = new Date(`${selectedDate}T${selectedTimeSlot}:00Z`);
        const endDateUTC = new Date(startDateUTC.getTime() + timeSlotDuration * 60000);

        const appointment = await Appointment.create({
            booking: bookingId,
            student: studentId,
            startTime: startDateUTC,
            endTime: endDateUTC
        })

        if (appointment) {
            res.status(201)
            console.log("Appointment booked")
        } else {
            res.status(400)
            throw new Error("Failed to book appointment")
        }
    } catch (err) {
        console.log(err)
    }
})

module.exports = {
    bookAppointment,
}