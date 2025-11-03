const asyncHandler = require('express-async-handler')
const Event = require('../models/eventModel')

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

// @desc Sign up for an event as a student
// @router /api/events/joinEvent
const joinEvent = asyncHandler(async (req, res) => {
    try {

    } catch (err) {

    }
})

module.exports = {
    createEvent,
    joinEvent,
}