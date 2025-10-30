const express = require('express')
const router = express.Router()
const { createBooking, getAvailableTimeSlots } = require('../controllers/bookingController');

router.post('/createBooking', createBooking);
router.get('/getAvailableTimeSlots/:courseId', getBooking);


module.exports = router