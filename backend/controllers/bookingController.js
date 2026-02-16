const asyncHandler = require('express-async-handler')
const Course = require('../models/courseModel')
const Booking = require('../models/bookingModel')
const Appointment = require('../models/appointmentModel')

// @desc Create a new booking
// @route POST /api/bookings/createBooking
const createBooking = asyncHandler(async (req, res) => {
    try {
        const { courseId, officeHours, timeSlotDuration } = req.body
        const userId = req.user;
        const course = await Course.findOne({ _id: courseId, prof: userId });

        if (!course) {
            console.log("Prof must create booking");
            return res.sendStatus(400);
        }

        // Create booking
        const booking = await Booking.create({
            course: courseId,
            officeHours,
            timeSlotDuration
        })

        if (booking) {
            console.log("Booking created")
            return res.sendStatus(201)
        } else {
            console.log("Failed to create booking")
            return res.sendStatus(400)
        }
    } catch (err) {
        console.log("Failed to create booking: ", err);
        return res.sendStatus(409);
    }
})

// @desc Get all available time slots in the next 2 weeks for a given course
// @router /api/bookings/getAvailableTimeSlots/:courseId/:startDate
const getAvailableTimeSlots = asyncHandler(async (req, res) => {
    try {
        const { courseId, startDate } = req.params;
        const booking = await Booking.findOne({ course: courseId }, { _id: 1, officeHours: 1, timeSlotDuration: 1 });
        if (!booking) {
            console.log("No booking exists")
            return res.sendStatus(404)
        }
        //console.log(booking)
        //Get all appointments sorted by increasing date/time
        const appointments = await Appointment.find({ booking: booking._id }, { startTime: 1 }).sort({ startTime: 1 });


        const timeSlots = {}; //Dictionary with key = date and value = list of timeslots
        let cur = new Date(startDate);
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 14); //2 weeks from startDate
        const availableDays = booking.officeHours;
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
        const dayNames = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"]
        let appointmentsIdx = 0;
        //Iterate through all 14 days
        while (cur < endDate) {
            const dayOfWeek = cur.getDay();
            const key = dayNames[dayOfWeek] + "-" + monthNames[cur.getMonth()] + "-" + String(cur.getDate()).padStart(2, "0")
            if (availableDays.some(item => item.day === dayOfWeek)) { //Check if the day of the week is included in the booking

                for (const interval of availableDays.find(item => item.day === dayOfWeek).timeIntervals) {

                    // Combine date of cur with times of the interval to get accurate time slot dates
                    let curSlot = combineDates(cur, new Date(interval.start));
                    const endSlot = combineDates(cur, new Date(interval.end));

                    //let curSlot = new Date(interval.start);
                    while (curSlot < endSlot) { //Get all timeslots within the interval
                        //Check if current timeslot is not already booked
                        if (appointmentsIdx >= appointments.length || (appointmentsIdx < appointments.length && curSlot.getTime() !== new Date(appointments[appointmentsIdx].startTime).getTime())) {

                            //Add to dictionary
                            if (!timeSlots[key]) {
                                timeSlots[key] = [];
                            }
                            timeSlots[key].push(curSlot);
                        } else {
                            appointmentsIdx++;
                        }
                        //Get the next timeSlot
                        curSlot = new Date(curSlot.getTime() + booking.timeSlotDuration * 60000);
                    }
                }
            } else {    //If it's not an available day, add to dictionary with an empty array
                timeSlots[key] = [];
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

// Helper function that combines date1's date and date2's time and returns the new date object
const combineDates = (date1, date2) => {
    const combinedDate = new Date(date1);

    combinedDate.setHours(
        date2.getHours(),
        date2.getMinutes(),
        date2.getSeconds(),
        date2.getMilliseconds()
    )

    return combinedDate;
}


// @desc Get booking details given a course id
// @router /api/bookings/getBooking/:courseId
const getBooking = asyncHandler(async (req, res) => {
    try {
        const { courseId } = req.params;
        const booking = await Booking.findOne({ course: courseId }, { officeHours: 1, timeSlotDuration: 1 });

        if (!booking) {
            console.log("No booking exists")
            return res.sendStatus(404);
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