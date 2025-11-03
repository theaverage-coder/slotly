const express = require('express')
const router = express.Router()
const { createBooking, getAvailableTimeSlots } = require('../controllers/bookingController');

router.post('/createBooking', createBooking);
router.get('/getAvailableTimeSlots/:courseId', getAvailableTimeSlots);


module.exports = router