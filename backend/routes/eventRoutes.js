const express = require('express')
const router = express.Router()
const { createEvent, joinEvent, getEvent, leaveEvent } = require('../controllers/eventController');

router.post('/createEvent', createEvent);
router.patch("/events/joinEvent", joinEvent);
router.get("/events/getEvent", getEvent);
router.patch("/events/leaveEvent", leaveEvent);

module.exports = router