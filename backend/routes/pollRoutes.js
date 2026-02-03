const express = require('express')
const router = express.Router()
const { createPoll, deletePoll, closePoll, getVote, getAllPolls, voteInPoll, getAllVotes } = require('../controllers/pollController');

router.post('/createPoll', createPoll);
router.delete('/deletePoll/:pollId', deletePoll);
router.patch('/closePoll/:pollId', closePoll);
router.post('/getVote/:pollId', getVote);
router.get('/getAllPolls/:courseId', getAllPolls);
router.post('/voteInPoll', voteInPoll);
router.get('/getAllVotes/:pollId', getAllVotes);
module.exports = router