const express = require('express')
const router = express.Router()
const { markAsRead, deleteNotification } = require('../controllers/notificationController');
const protect = require("../middleware/authMiddleware");

router.patch('/markAsRead/:notificationId', protect, markAsRead);
router.delete('/deleteNotification/:notificationId', protect, deleteNotification);

module.exports = router