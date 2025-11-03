const mongoose = require('mongoose')

const eventSchema = mongoose.Schema({
    course: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
    },
    title: {
        type: String,
        required: true
    },
    startTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    capacity: {
        type: String,
        required: true,
    },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    description: {
        type: String
    }

})

module.exports = mongoose.model('Event', eventSchema);