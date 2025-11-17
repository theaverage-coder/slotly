const asyncHandler = require('express-async-handler')
const Event = require('../models/eventModel')

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

    const event = await Event.create(req.body);

    if (event) {
        res.status(201)
        console.log("Event created")
    } else {
        res.status(400)
        throw new Error("Failed to create event")
    }
})

// @desc Leave an event a user signed up for
// @router /api/events/leaveEvent/:eventId
const leaveEvent = asyncHandler(async (req, res) => {
    try {
        const { userId } = req.body;
        const updatedEvent = Event.findById(req.params.eventId);
        if (!updatedEvent) return res.status(404).json({ error: 'Event not found' });

        updatedEvent.students = updatedEvent.students.filter(
            (id) => id.toString() !== userId
        );

        await updatedEvent.save();

        return res.status(200).json(updatedEvent);
    } catch (err) {
        return res.status(400).json({ error: "Request failed" })
    }
})


// @desc Sign up for an event as a student
// @router /api/events/joinEvent/:eventId
const joinEvent = asyncHandler(async (req, res) => {
    try {
        const { userId } = req.body;
        const event = Event.findById(req.params.eventId);

        const updatedEvent = await Event.findOneAndUpdate(
            {
                _id: req.params.eventId,
                $expr: { $lt: [{ $size: "$students" }, "$capacity"] },
                students: { $ne: userId } // not already joined
            },
            { $push: { students: userId } },
            { new: true }
        );

        if (!updatedEvent) return res.status(404).json({ error: "Event not found" })


        if (updatedEvent.students.includes(userId)) {
            return res.status(400).json({ error: "Already joined" });
        }

        if (updatedEvent.students.length >= updatedEvent.capacity) {
            return res.status(400).json({ error: "Event is full" });
        }

        updatedEvent.students.push(userId);
        await updatedEvent.save();

        return res.status(200).json(updatedEvent);

        /*
const updatedEvent = await Event.findOneAndUpdate(
  { 
    _id: req.params.id,
    $expr: { $lt: [{ $size: "$students" }, "$capacity"] },
    students: { $ne: userId } // not already joined
  },
  { $push: { students: userId } },
  { new: true }
);
        */
    } catch (err) {
        return res.status(400).json({ error: "Request failed" });
    }
})

module.exports = {
    createEvent,
    joinEvent,
    getEvent,
    leaveEvent
}