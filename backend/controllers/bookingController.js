const asyncHandler = require('express-async-handler')
const Course = require('../models/courseModel')
const Booking = require('../models/bookingModel')
const Appointment = require('../models/appointmentModel')
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

// @desc Get all available time slots in the next 2 weeks for a given course
// @router /api/bookings/getAvailableTimeSlots/:courseId/:startDate
const getAvailableTimeSlots = asyncHandler(async (req, res) => {
    try {
        const { courseId, startDate } = req.params;
        const booking = await Booking.find({ course: courseId }, { _id: 1, officeHours: 1, timeSlotDuration: 1 });
        const appointments = await Appointment.find({ booking: booking._id }, { startTime: 1 }).sort({ startTime: 1 });

        if (!booking) {
            console.log("No booking exists")
            return res.status(404)
        }

        const timeSlots = {};
        let cur = new Date(startDate);
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 14); //2 weeks
        const availableDays = booking.officeHours.map(h => [h.day, h]);
        let appointmentsIdx = 0;

        while (cur < endDate) {
            const dayOfWeek = cur.getDay();
            if (availableDays.includes(dayOfWeek)) {
                for (const interval of availableDays.get(dayOfWeek).timeIntervals) {
                    let curSlot = new Date(interval.startTime);

                    while (curSlot < new Date(interval.endTime)) {
                        if (appointmentsIdx < appointments.length && curSlot.getTime() !== appointments[appointmentsIdx].getTime()) {
                            const dateOnly = curSlot.getFullYear() + "-" + String(curSlot.getMonth() + 1).padStart(2, "0") + "-" + String(curSlot.getDate()).padStart(2, "0");
                            const timeOnly = curSlot.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
                            timeSlots[dateOnly].push(timeOnly);
                        } else {
                            appointmentsIdx++;
                        }
                        curSlot = new Date(curSlot.getTime() + booking.timeSlotDuration * 60000);
                    }
                }
            }
        }
        return res.json({
            availableSlots: timeSlots,
            bookingId: booking._id,
            timeSlotDuration: booking.timeSlotDuration
        });

    } catch (err) {
        console.log(err)
    }
})

// @desc Get booking details given a course id
// @router /api/bookings/getBooking/:courseId
const getBooking = asyncHandler(async (req, res) => {
    try {
        const { courseId } = req.params;
        const booking = await Booking.find({ course: courseId }, { _id: 0, course: 0, prof: 0, officeHours: 1, timeSlotDuration: 1 });

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
    getAvailableTimeSlots,
}