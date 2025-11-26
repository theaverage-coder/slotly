const asyncHandler = require('express-async-handler')
const Poll = require('../models/pollModel');
const { json } = require('express');

// @desc Create a poll
// @router /api/polls/createPoll
const createPoll = asyncHandler(async (req, res) => {

})

module.exports = {
    createPoll,
}