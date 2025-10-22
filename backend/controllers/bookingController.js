const asyncHandler = require('express-async-handler')
const Course = require('../models/courseModel')
const Booking = require('../models/bookingModel')

// @desc Create a new booking
// @route POST /api/bookings/createBooking
const createBooking = asyncHandler(async (req, res) => {
    const { course, officeHours, timeSlotDuration } = req.body

    // Create booking
    const booking = await Booking.create({
        course,
        officeHours,
        timeSlotDuration
    })

    if (booking) {
        res.status(201)
        console.log("Booking created")
    } else {
        res.status(400)
        throw new Error('Failed to create booking')
    }
})

module.exports = {
    createBooking
}