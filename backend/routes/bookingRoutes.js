const express = require('express')
const router = express.Router()
const { createBooking, getBooking } = require('../controllers/bookingController');

router.post('/createBooking', createBooking);
router.get('/getBooking/:courseId', getBooking);


module.exports = router