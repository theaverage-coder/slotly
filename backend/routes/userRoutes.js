const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getUser, getStudents } = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getUser)
router.post("/getStudents", getStudents);

module.exports = router