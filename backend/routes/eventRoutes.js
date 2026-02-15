const express = require('express')
const router = express.Router()
const { createEvent, joinEvent, getEvent, leaveEvent, getAllJoinedEvents, getAllEvents, deleteEvent, getStudents, getCreatedEvents } = require('../controllers/eventController');
const protect = require("../middleware/authMiddleware");

router.post('/createEvent', protect, createEvent);
router.patch("/joinEvent/:eventId", protect, joinEvent);
router.get("/getEvent", protect, getEvent);
router.patch("/leaveEvent/:eventId", protect, leaveEvent);
router.get("/getAllEvents/:courseId", getAllEvents);
router.delete("/deleteEvent/:eventId", protect, deleteEvent);
router.get('/getAllJoinedEvents', protect, getAllJoinedEvents);
router.get("/getStudents/:eventId", protect, getStudents);
router.get("/getCreatedEvents/", getCreatedEvents);

module.exports = router