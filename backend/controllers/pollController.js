const asyncHandler = require('express-async-handler')
const Poll = require('../models/pollModel');
const Vote = require('../models/voteModel')
const { json } = require('express');
const { getCourseById } = require('./courseController');

// @desc Create a poll
// @router /api/polls/createPoll
const createPoll = asyncHandler(async (req, res) => {
    const poll = req.body;
    try {

        // Logic checks
        if (poll.title === "" || poll.options.length < 2) {
            throw new Error("Invalid Input");
        }

        const newPoll = await Poll.create({
            course: poll.course,
            title: poll.title,
            dateCreated: new Date(),
            multipleVotes: poll.multipleVotes,
            options: poll.options.map(option => ({
                text: option,
                numVotes: 0,
            })),
            ...(poll.hasExpirationDate && { expirationDate: poll.expirationDate })
        })

        if (newPoll) {
            res.status(201);
            console.log("Poll created")
        }
    } catch (err) {
        console.log(err)
        res.status(400).json({ error: err })
    }
})

// @desc Get all polls pertaining to a course given the courseId
// @router /api/polls/getAllPolls/:courseId
const getAllPolls = asyncHandler(async (req, res) => {
    try {
        const { courseId } = req.params;

        const polls = await Poll.find({ course: courseId });
        return res.json(polls);

    } catch (err) {
        console.log(err);
        return res.status(400).json("Failed to load polls")
    }
})

// @desc Vote in a poll
// @router /api/polls/voteInPoll
const voteInPoll = asyncHandler(async (req, res) => {
    const { pollId, studentId, voteIndex } = req.body;
    try {
        const poll = await Poll.findOne({ _id: ObjectId(pollId) });

        if (poll.isClosed) {
            throw new Error("Poll is closed")
        }

        const result = await Vote.updateOne(
            { poll: pollId, student: studentId },
            {
                $setOnInsert: { poll: pollId, student: studentId },
                $set: { voteIndex: voteIndex }
            },
            {
                upsert: true,
            }

        )

        if (result.acknowledged) {
            return res.status(200)
        }
    } catch (err) {
        console.log(err);
        return res.status(400).json("Failed to complete vote operation")
    }
})

// @desc Get vote of user in poll
// @router /api/polls/getVote/:pollId

const getVote = asyncHandler(async (req, res) => {
    const { pollId } = req.params;
    const { studentId } = req.body;

    try {
        const vote = await Vote.findOne({ poll: pollId, student: studentId });
        if (vote) {
            return res.status(200).json(vote);
        } else {
            return res.status(404); //If the student has not yet voted in the poll
        }
    } catch (err) {
        console.log(err);
        return res.status(400).json("Failed to retrieve vote")
    }
})

// @desc Close poll ie. students can no longer vote
// @router /api/polls/closePoll/:pollId
const closePoll = asyncHandler(async (req, res) => {
    const { pollId } = req.params;

    try {
        const updatedPoll = await Poll.findByIdAndUpdate(
            pollId,
            { $set: { isClosed: true } },
            { new: true }
        )
        return res.status(200)
    } catch (err) {
        console.log(err);
        return res.status(400).json("Failed to update poll")
    }
})

// @desc Delete a poll
// @router /api/polls/deletePoll/:pollId
const deletePoll = async (req, res) => {
    const { pollId } = req.params;

    try {
        const result = await Poll.deleteOne({ _id: ObjectId(pollId) })
        if (result.acknowledged) {
            return res.status(200)
        }
    } catch (err) {
        console.log(err);
        return res.status(400).json("Failed to complete vote operation")
    }
}

module.exports = {
    createPoll,
    getAllPolls,
    voteInPoll,
    deletePoll,
    closePoll,
    getVote
}