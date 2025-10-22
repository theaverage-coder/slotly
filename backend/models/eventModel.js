const mongoose = require('mongoose')

const eventSchema = mongoose.Schema({
    course: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
    },
    time: {
        type: String,
    },
    location: {
        type: String,
        required: true,
        unique: true,
    },
    capacity: {
        type: String,
        required: true,
    },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]

})

module.exports = mongoose.model('Event', eventSchema);