const express = require('express')
const router = express.Router()
const { createEvent, joinEvent, getEvent, leaveEvent, getAllEvents, deleteEvent } = require('../controllers/eventController');

router.post('/createEvent', createEvent);
router.patch("/joinEvent/:eventId", joinEvent);
router.get("/getEvent", getEvent);
router.patch("/leaveEvent/:eventId", leaveEvent);
router.get("/getAllEvents/:courseId", getAllEvents);
router.delete("/deleteEvent/:eventId", deleteEvent);
module.exports = router