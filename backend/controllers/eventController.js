const asyncHandler = require('express-async-handler')
const Event = require('../models/eventModel');
const { json } = require('express');

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
        const { userId, courses } = req.body;
        const events = await Event.aggregate([
            { $match: { course: { $in: courses } } },
            { $match: { students: userId } },
            { $sort: { startTime: 1 } },
        ]);

        return res.status(200).json(events);
    } catch (err) {
        console.log(err);
    }
})

// @desc Get an event given the id
// @router /api/events/getEvent/:eventId
const getEvent = asyncHandler(async (req, res) => {
    try {
        const { eventId } = req.params;
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404);
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
    try {

        // Logic checks
        if (eventObj.endTime < eventObj.startTime || eventObj.endTime < new Date() || eventObj.location === "" || eventObj.title === "" || eventObj.capacity === "") {
            throw new Error("Invalid input")
        }

        const createdEvent = await Event.create(eventObj);

        if (createdEvent) {
            res.status(201)
            console.log("Event created")
        }
    } catch (err) {
        console.log(err)
        res.status(400).json({ error: err })
    }
})

// @desc Leave an event a user signed up for
// @router /api/events/leaveEvent/:eventId
const leaveEvent = asyncHandler(async (req, res) => {
    try {
        const { eventId } = req.params;
        const { userId } = req.body;
        //const updatedEvent = Event.findById(eventId);

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
        const { userId } = req.body;
        const updatedEvent = await Event.findOneAndUpdate(
            {
                _id: eventId,
                $expr: { $lt: [{ $size: "$students" }, "$capacity"] },
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
        const { eventId } = req.params;
        const deleted = await Event.findByIdAndDelete(eventId);

        if (!deleted) {
            return res.sendStatus(404);
        }

        return res.sendStatus(200);
    } catch (err) {
        console.log("Failed to delete event: ", err);
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
    getAllJoinedEvents
}