const asyncHandler = require('express-async-handler')
const Poll = require('../models/pollModel');
const Vote = require('../models/voteModel')
const { json } = require('express');
const { getCourseById } = require('./courseController');
const Course = require('../models/courseModel');

// @desc Create a poll
// @router /api/polls/createPoll
const createPoll = asyncHandler(async (req, res) => {
    const poll = req.body;
    const userId = req.user;

    try {
        // Check to see user making request is the prof of course
        const course = await Course.findOne({
            _id: poll.course,
            prof: userId
        });

        if (!course) {
            console.log("Unauthorized request");
            return res.sendStatus(404);
        }
        // Logic checks
        if (poll.title === "" || poll.options.length < 2) {
            throw new Error("Invalid Input");
        }
        const today = new Date();
        const expirationDate = new Date(today);
        expirationDate.setDate(expirationDate.getDate() + poll.duration);

        const newPoll = await Poll.create({
            course: poll.course,
            title: poll.title,
            dateCreated: new Date(),
            multipleVotes: poll.multipleVotes,
            expirationDate: expirationDate,
            options: poll.options.map(option => ({
                text: option,
            })),
        })

        if (newPoll) {
            console.log("Poll created")
            return res.sendStatus(201);
        }
    } catch (err) {
        console.log(err)
        return res.status(400).json({ error: err })
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

// @desc Close poll ie. students can no longer vote
// @router /api/polls/closePoll/:pollId
const closePoll = asyncHandler(async (req, res) => {
    const { pollId } = req.params;
    const userId = req.user;

    try {
        // Find poll and populate course
        const poll = await Poll.findById(pollId).populate({
            path: 'course',
            select: 'prof'
        })

        // Make sure the prof of course is the one making the request
        if (poll.course.prof !== userId) {
            console.log("Unauthorized request");
            return res.sendStatus(404);
        }

        const updatedPoll = await Poll.findById(
            pollId,
            { $set: { isClosed: true } },
            { new: true }
        )
        return res.sendStatus(200)
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
            return res.sendStatus(200)
        }
    } catch (err) {
        console.log(err);
        return res.status(400).json("Failed to complete vote operation")
    }
}

// @desc Vote in a poll
// @router /api/polls/voteInPoll
const voteInPoll = asyncHandler(async (req, res) => {
    const { pollId, optionsId } = req.body;
    const studentId = req.user;
    try {
        const poll = await Poll.findById(pollId);

        if (poll.isClosed) {
            throw new Error("Poll is closed")
        }

        //If user has multiple votes but poll only allows one vote
        if (!poll.multipleVotes && optionsId.length > 1) {
            return res.status(400).json("Can only vote once");
        }

        // (change existing vote if it exists otherwise create a new one)
        const result = await Vote.updateOne(
            { poll: pollId, student: studentId },
            {
                $setOnInsert: { poll: pollId, student: studentId },
                $set: { votes: optionsId }
            },
            {
                upsert: true,
            }

        )
        if (result.acknowledged) {
            return res.sendStatus(200)
        }

    } catch (err) {
        console.log(err);
        return res.status(400).json("Failed to complete vote operation")
    }
})

// @desc Get all votes pertaining to given pollId
// @router /api/polls/getVotes/:pollId
const getAllVotes = asyncHandler(async (req, res) => {
    const { pollId } = req.params;
    try {
        const votes = await Vote.find({ poll: pollId }, { _id: 0, poll: 0 });

        return res.status(200).json(votes);

    } catch (err) {
        console.log(err);
    }
})


// @desc Get vote of user in poll
// @router /api/polls/getVote/:pollId
const getVote = asyncHandler(async (req, res) => {
    const { pollId } = req.params;
    const { studentId } = req.body;

    try {
        const votes = await Vote.findOne({ poll: pollId, student: studentId }, { votes: 1 });
        if (votes) {
            return res.status(200).json(votes);
        } else {
            return res.sendStatus(404); //If the student has not yet voted in the poll
        }
    } catch (err) {
        console.log(err);
        return res.status(400).json("Failed to retrieve vote")
    }
})

module.exports = {
    createPoll,
    getAllPolls,
    voteInPoll,
    deletePoll,
    closePoll,
    getVote,
    getAllVotes
}