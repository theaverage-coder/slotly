const mongoose = require('mongoose');

const voteSchema = mongoose.Schema({
    poll: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "Poll",
    },
    student: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    votes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Poll.options"
    }]

})

module.exports = mongoose.model('Vote', voteSchema);