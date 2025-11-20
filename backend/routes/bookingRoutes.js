const express = require('express')
const router = express.Router()
const { createBooking, getAvailableTimeSlots, getBooking } = require('../controllers/bookingController');

router.post('/createBooking', createBooking);
router.get('/getAvailableTimeSlots/:courseId/:startDate', getAvailableTimeSlots);
router.get('/getBooking/:courseId', getBooking);


module.exports = router