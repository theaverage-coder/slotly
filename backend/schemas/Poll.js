const mongoose = require('mongoose');

const PollSchema = new Schema({
    teacher: {type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true}, //Foreign key to Teacher schema ie. Creator of the poll
    title: {type: String, required: true},
    pollName: {type: String}
})

module.exports = mongoose.model('Poll', PollSchema);
