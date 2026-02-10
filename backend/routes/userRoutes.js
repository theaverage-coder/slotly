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
const { protect } = require('../middleware/authMiddleware')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getUser)
router.patch("/changeName", changeName);
router.patch("/changePassword", changePassword);
router.delete("/deleteAccount/:userId", deleteAccount);
module.exports = router