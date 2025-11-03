const express = require('express')
const router = express.Router()
const { createEvent, joinEvent } = require('../controllers/eventController');

router.post('/createEvent', createEvent);
router.patch("/events/joinEvent", joinEvent);

module.exports = router