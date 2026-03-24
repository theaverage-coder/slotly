const asyncHandler = require('express-async-handler')
const Booking = require('../models/bookingModel')
const Appointment = require('../models/appointmentModel')
const { ObjectId } = require("mongodb");


// @desc Book an appointment
// @router /api/appointments/bookAppointment
const bookAppointment = asyncHandler(async (req, res) => {
    try {
        const { selectedTimeSlot, bookingId, timeSlotDuration, message } = req.body;
        const selectedDate = new Date(selectedTimeSlot);

        const studentId = req.user;
        const startDateUTC = new Date(selectedDate);
        const endDateUTC = new Date(new Date(selectedDate).getTime() + timeSlotDuration * 60000);
        const booking = await Booking.findOne({ _id: bookingId }, { officeHours: 1, course: 1 }).populate('course', 'prof');
        //console.log("booking: ", booking);

        const toMinutes = (date) => {
            return date.getHours() * 60 + date.getMinutes();
        }

        const startMinutes = toMinutes(startDateUTC);
        const endMinutes = toMinutes(endDateUTC);

        const isInInterval = (interval) => {
            const s = toMinutes(interval.start);
            const e = toMinutes(interval.end);

            if (startMinutes >= s && endMinutes <= e) {
                return true;
            }
            return false;
        }
        const location = booking.officeHours.find((oh) => oh.day === selectedDate.getDay()).timeIntervals.find(isInInterval).location;

        const appointment = await Appointment.create({
            booking: bookingId,
            student: studentId,
            prof: booking.course.prof,
            startTime: startDateUTC,
            endTime: endDateUTC,
            message: message,
            location: location
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
// @desc If user is a prof => fill in student info
// @desc If user is a student => fill in prof info
// @router /api/appointments/getAppointments
const getAppointments = asyncHandler(async (req, res) => {
    try {
        const userId = new ObjectId(req.user);
        const { isStudent } = req.body;

        const matchField = isStudent ? "student" : "prof";
        const appointmentWith = isStudent ? "prof" : "student";

        //Retrieve professor/student first and last names AND the course code
        const appointments = await Appointment.aggregate([
            {
                $match: {
                    [matchField]: userId,
                }
            },
            {
                $lookup: {
                    from: "users",
                    let: { appointmentWith: `$${appointmentWith}` },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ["$_id", "$$appointmentWith"] }
                            }
                        },
                        {
                            $project: {
                                firstName: 1,
                                lastName: 1
                            }
                        }
                    ],
                    as: "appointmentWith"
                }
            },
            {
                $unwind: "$appointmentWith"
            },
            {
                $lookup: {
                    from: "bookings",
                    let: { bookingId: "$booking" },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ["$_id", "$$bookingId"] }
                            }
                        },
                        {
                            $project: {
                                course: 1
                            }
                        }
                    ],
                    as: "booking"
                }
            },
            {
                $unwind: "$booking"
            },
            {
                $lookup: {
                    from: "courses",
                    let: { courseId: "$booking.course" },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ["$_id", "$$courseId"] }
                            }
                        },
                        {
                            $project: {
                                courseName: 1,
                                courseCode: 1,
                                logoColor: 1
                            }
                        }
                    ],
                    as: "course"
                }
            },
            {
                $unwind: "$course"
            },
            {
                $facet: {
                    completed: [
                        {
                            $match: {
                                endTime: { $lt: new Date() }
                            }
                        },
                        {
                            $sort: {
                                startTime: 1
                            }
                        }],
                    incomplete: [
                        {
                            $match: {
                                endTime: { $gte: new Date() }
                            }
                        },
                        {
                            $sort: {
                                startTime: 1
                            }
                        }
                    ]
                }
            }
        ]);

        const { completed, incomplete } = appointments[0];
        const completedAppointments = completed;
        const incompleteAppointments = incomplete;


        return res.status(200).json({
            completed: completedAppointments,
            incomplete: incompleteAppointments
        });
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