const express = require('express')
const router = express.Router()
const { createPoll } = require('../controllers/pollController');

router.post('/createPoll', createPoll);

module.exports = router