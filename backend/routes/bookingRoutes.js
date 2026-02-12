const express = require('express')
const router = express.Router()
const { createBooking, getAvailableTimeSlots, getBooking } = require('../controllers/bookingController');
const protect = require("../middleware/authMiddleware");

router.post('/createBooking', protect, createBooking);
router.get('/getAvailableTimeSlots/:courseId/:startDate', getAvailableTimeSlots);
router.get('/getBooking/:courseId', getBooking);


module.exports = router