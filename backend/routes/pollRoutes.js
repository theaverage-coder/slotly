const express = require('express')
const router = express.Router()
const { createPoll, deletePoll, closePoll, getVote, getAllPolls, voteInPoll, getAllVotes } = require('../controllers/pollController');
const protect = require("../middleware/authMiddleware");

router.post('/createPoll', protect, createPoll);
router.delete('/deletePoll/:pollId', protect, deletePoll);
router.patch('/closePoll/:pollId', protect, closePoll);
router.post('/getVote/:pollId', protect, getVote);
router.get('/getAllPolls/:courseId', getAllPolls);
router.post('/voteInPoll', protect, voteInPoll);
router.get('/getAllVotes/:pollId', getAllVotes);
module.exports = router