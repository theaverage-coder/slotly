const asyncHandler = require('express-async-handler')
const Event = require('../models/eventModel');
const { json } = require('express');
const User = require('../models/userModel');
const mongoose = require("mongoose");
const Course = require('../models/courseModel');

// @desc Get all events pertaining to a course given the courseId
// @router /api/events/getAllEvents/:courseId
const getAllEvents = asyncHandler(async (req, res) => {
    try {
        const { courseId } = req.params;

        const events = await Event.find({ course: courseId });

        return res.json(events);
    } catch (err) {
        console.log(err);
        return res.status(400).json("Failed to load events")
    }
})

// @desc Get all events that a student has signed up for
// @router /api/events/getAllJoinedEvents
const getAllJoinedEvents = asyncHandler(async (req, res) => {
    try {
        const userId = req.user;
        const courses = await User.findById(userId, "courses");
        const userObjectId = new mongoose.Types.ObjectId(userId);
        const courseObjectIds = courses.courses.map(
            (id) => new mongoose.Types.ObjectId(id)
        );

        const events = await Event.aggregate([
            { $match: { course: { $in: courseObjectIds } } },
            { $match: { students: userObjectId } },
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


        const { completed, incomplete } = events[0];
        const completedEvents = completed;
        const incompleteEvents = incomplete;

        return res.status(200).json({
            completed: completedEvents,
            incomplete: incompleteEvents
        });
    } catch (err) {
        console.log(err);
    }
})

// @desc Get all events a teacher has created
// @router /api/events/getCreatedEvents
const getCreatedEvents = async (req, res) => {
    try {
        const userId = req.user;
        const events = await Event.aggregate([
            {
                $lookup: {
                    from: "courses",
                    localField: "course",
                    foreignField: "_id",
                    as: "course"
                }
            },
            { $unwind: "$course" },
            { $match: { "course.prof": mongoose.Types.ObjectId.createFromHexString(userId) } },
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

        const { completed, incomplete } = events[0];
        const completedEvents = completed;
        const incompleteEvents = incomplete;

        return res.status(200).json({
            completed: completedEvents,
            incomplete: incompleteEvents
        });
    } catch (err) {
        console.log(err);
    }
}

// @desc Get an event given the id
// @router /api/events/getEvent/:eventId
const getEvent = asyncHandler(async (req, res) => {
    try {
        const { eventId } = req.params;
        const event = await Event.findById(eventId);

        if (!event) {
            return res.sendStatus(404);
        }
        return res.json(event);
    } catch (err) {
        console.log(err)
    }
})

// @desc Create an event
// @router /api/events/createEvent
const createEvent = asyncHandler(async (req, res) => {
    const eventObj = req.body;
    const userId = req.user;

    try {
        // Check to see user making request is the prof of course
        const course = await Course.findOne({
            _id: eventObj.course,
            prof: userId
        });

        if (!course) {
            console.log("Unauthorized request");
            return res.sendStatus(400);
        }

        // Logic checks
        if (eventObj.endTime < eventObj.startTime || eventObj.endTime < new Date() || eventObj.location === "" || eventObj.title === "" || eventObj.capacity === "") {
            throw new Error("Invalid input")
        }

        const createdEvent = await Event.create(eventObj);

        if (createdEvent) {
            console.log("Event created")
            return res.sendStatus(201);
        }
    } catch (err) {
        console.log(err)
        return res.status(400).json({ error: err })
    }
})

// @desc Leave an event a user signed up for
// @router /api/events/leaveEvent/:eventId
const leaveEvent = asyncHandler(async (req, res) => {
    try {
        const { eventId } = req.params;
        const userId = req.user;

        const updatedEvent = await Event.findOneAndUpdate(
            {
                _id: eventId,
                students: { $in: userId }
            },
            { $pull: { students: userId } },
            { new: true }
        );

        if (!updatedEvent) return res.status(404).json({ error: 'Event not found' });

        return res.status(200).json(updatedEvent);
    } catch (err) {
        return res.status(400).json({ error: "Request failed" })
    }
})


// @desc Sign up for an event as a student
// @router /api/events/joinEvent/:eventId
const joinEvent = asyncHandler(async (req, res) => {
    try {
        const { eventId } = req.params;
        const userId = req.user;
        const updatedEvent = await Event.findOneAndUpdate(
            {
                _id: eventId,
                $expr: {
                    $or: [
                        { $eq: ["$capacity", -1] },
                        { $lt: [{ $size: "$students" }, "$capacity"] }
                    ]
                },
                students: { $nin: userId } // not already joined
            },
            { $addToSet: { students: userId } },
            { new: true }
        );

        if (!updatedEvent) return res.status(404).json({ error: "Event not found" })

        return res.status(200).json(updatedEvent);

    } catch (err) {
        return res.status(400).json({ error: "Request failed", err });
    }
})

// @desc Delete event
// @router /api/events/deleteEvent/:eventId
const deleteEvent = async (req, res) => {
    try {
        const userId = req.user;
        const { eventId } = req.params;

        // Find event and populate course
        const event = await Event.findById(eventId).populate({
            path: 'course',
            select: 'prof'
        });

        console.log(userId);
        console.log(event.course.prof);
        // Make sure the prof of course is the one making the request
        if (event.course.prof.toString() !== userId) {
            console.log("Unauthorized request");
            return res.sendStatus(404);
        }
        const deleted = await Event.findByIdAndDelete(eventId);

        if (!deleted) {
            return res.sendStatus(404);
        }

        console.log("Deleted event")
        return res.sendStatus(200);
    } catch (err) {
        console.log("Failed to delete event: ", err);
    }
}

// @desc Get info of all students that are signed up for an event
// @router /api/events/getStudents/:eventId
const getStudents = async (req, res) => {
    try {
        const userId = req.user;
        const { eventId } = req.params;

        // Find event and populate course
        const event = await Event.findById(eventId).populate({
            path: 'course',
            select: 'prof'
        });

        // Make sure the prof of course is the one making the request
        if (event.course.prof.toString() !== userId) {
            console.log("Unauthorized request");
            return res.sendStatus(404);
        }

        const students = await Event.findById(eventId, "students").populate("students", "firstName lastName email ");
        return res.status(200).json(students);
    } catch (err) {
        console.log("Failed to retrieve students: ", err);
        return res.sendStatus(400)
    }
}
// @desc Remove student from an event
// @router /api/events/removeStudent/:eventId/:studentId
const removeStudent = async (req, res) => {

}



module.exports = {
    createEvent,
    joinEvent,
    getEvent,
    leaveEvent,
    getAllEvents,
    deleteEvent,
    getAllJoinedEvents,
    getStudents,
    getCreatedEvents
}