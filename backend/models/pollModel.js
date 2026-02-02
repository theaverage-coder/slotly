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
    dateCreated: {
        type: Date,
        required: true
    },
    expirationDate: {
        type: Date
    },
    isClosed: {
        default: false,
        type: Boolean
    },
    multipleVotes: {
        type: Boolean,
        required: true
    },
    options: [
        {
            text: { type: String, required: true },
        }
    ]
})

module.exports = mongoose.model('Poll', pollSchema);