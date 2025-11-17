const mongoose = require('mongoose');

const pollSchema = mongoose.Schema({
    course: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
    },
    title: {
        required: true,
        type: String
    },
    endPollDate: {
        required: true,
        type: Date
    },
    pollOptions: [
    ]
})

module.exports = mongoose.model('Poll', pollSchema);