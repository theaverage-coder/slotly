const express = require('express')
const router = express.Router()
const { createBooking, getAvailableTimeSlots, getBooking } = require('../controllers/bookingController');

router.post('/createBooking', createBooking);
router.get('/getAvailableTimeSlots', getAvailableTimeSlots);
router.get('/getBooking', getBooking);


module.exports = router