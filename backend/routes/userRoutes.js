const express = require('express')
const router = express.Router()
const {
    registerUser,
    loginUser,
    getUser,
    changeName,
    changePassword,
    deleteAccount
} = require('../controllers/userController')
const protect = require('../middleware/authMiddleware')

router.post('/register', registerUser)
router.post('/login', loginUser)
//router.get('/me', protect, getUser)
router.patch("/changeName", protect, changeName);
router.patch("/changePassword", protect, changePassword);
router.delete("/deleteAccount", protect, deleteAccount);
module.exports = router