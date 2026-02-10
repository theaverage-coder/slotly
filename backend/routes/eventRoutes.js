const express = require('express')
const router = express.Router()
const { createEvent, joinEvent, getEvent, leaveEvent, getAllJoinedEvents, getAllEvents, deleteEvent, getStudents } = require('../controllers/eventController');

router.post('/createEvent', createEvent);
router.patch("/joinEvent/:eventId", joinEvent);
router.get("/getEvent", getEvent);
router.patch("/leaveEvent/:eventId", leaveEvent);
router.get("/getAllEvents/:courseId", getAllEvents);
router.delete("/deleteEvent/:eventId", deleteEvent);
router.post('/getAllJoinedEvents', getAllJoinedEvents);
router.get("/getStudents/:eventId", getStudents)
module.exports = router