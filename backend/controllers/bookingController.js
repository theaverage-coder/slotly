const asyncHandler = require('express-async-handler')
const Course = require('../models/courseModel')
const Booking = require('../models/bookingModel')
const Appointment = require('../models/appointmentModel')

// @desc Create a new booking
// @route POST /api/bookings/createBooking
const createBooking = asyncHandler(async (req, res) => {
    try {
        const { course, officeHours, timeSlotDuration } = req.body

        // Create booking
        const booking = await Booking.create({
            course,
            officeHours,
            timeSlotDuration
        })

        if (booking) {
            res.sendStatus(201)
            console.log("Booking created")
        } else {
            res.status(400)
            throw new Error('Failed to create booking')
        }
    } catch (err) {
        console.log(err);
    }
})

// @desc Get all available time slots in the next 2 weeks for a given course
// @router /api/bookings/getAvailableTimeSlots/:courseId/:startDate
const getAvailableTimeSlots = asyncHandler(async (req, res) => {
    try {
        const { courseId, startDate } = req.params;
        const booking = await Booking.findOne({ course: courseId }, { _id: 1, officeHours: 1, timeSlotDuration: 1 });
        //Get all appointments sorted by increasing date/time
        const appointments = await Appointment.find({ booking: booking._id }, { startTime: 1 }).sort({ startTime: 1 });

        if (!booking) {
            console.log("No booking exists")
            return res.status(404)
        }
        const timeSlots = {}; //Dictionary with key = date and value = list of timeslots
        let cur = new Date(startDate);
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 14); //2 weeks from startDate
        const availableDays = booking.officeHours;
        let appointmentsIdx = 0;
        //Iterate through all 14 days
        while (cur < endDate) {
            const dayOfWeek = cur.getDay();
            if (availableDays.some(item => item.day === dayOfWeek)) { //Check if the day of the week is included in the booking
                for (const interval of availableDays.find(item => item.day === dayOfWeek).timeIntervals) {
                    let curSlot = new Date(interval.start);

                    while (curSlot < new Date(interval.end)) { //Get all timeslots within the interval
                        //Check if current timeslot is not already booked
                        if (appointments.length === 0 || (appointmentsIdx < appointments.length && curSlot.getTime() !== appointments[appointmentsIdx].getTime())) {
                            const dateOnly = cur.getFullYear() + "-" + String(cur.getMonth() + 1).padStart(2, "0") + "-" + String(cur.getDate()).padStart(2, "0");
                            const timeOnly = curSlot.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
                            //Add to dictionary
                            if (!timeSlots[dateOnly]) {
                                timeSlots[dateOnly] = [];
                            }
                            timeSlots[dateOnly].push(timeOnly);
                        } else {
                            appointmentsIdx++;
                        }
                        //Get the next timeSlot
                        curSlot = new Date(curSlot.getTime() + booking.timeSlotDuration * 60000);
                    }
                }
            }
            cur.setDate(cur.getDate() + 1);
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
        const booking = await Booking.find({ course: courseId }, { officeHours: 1, timeSlotDuration: 1 });

        if (!booking) {
            console.log("No booking exists")
            return res.status(404)
        }
        return res.status(200).json(booking);
    } catch (err) {
        console.log(err)
    }
})

module.exports = {
    createBooking,
    getAvailableTimeSlots,
    getBooking
}