const express = require('express')
const router = express.Router()
const { bookAppointment, getAppointments, cancelAppointment } = require('../controllers/appointmentController');

router.post('/bookAppointment', bookAppointment);
router.post("/getAppointments", getAppointments);
router.delete("/cancelAppointment/:appointmentId", cancelAppointment);
module.exports = router