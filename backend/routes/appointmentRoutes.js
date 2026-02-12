const express = require('express')
const router = express.Router()
const { bookAppointment, getAppointments, cancelAppointment } = require('../controllers/appointmentController');
const protect = require("../middleware/authMiddleware");

router.post('/bookAppointment', protect, bookAppointment);
router.post("/getAppointments", protect, getAppointments);
router.delete("/cancelAppointment/:appointmentId", protect, cancelAppointment);
module.exports = router