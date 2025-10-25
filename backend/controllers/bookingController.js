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

// @desc Get booking details given a course id
// @router /api/bookings/getBooking/:courseId
const getBooking = asyncHandler(async (req, res) => {
    try {
        const { courseId } = req.params;
        const booking = await Booking.find({ course: courseId });

        if (!booking) {
            console.log("No booking exists")
            return res.status(404)
        }
        return res.json(booking);
    } catch (err) {
        console.log(err)
    }
})

module.exports = {
    createBooking,
    getBooking
}