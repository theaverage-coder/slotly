const mongoose = require('mongoose');

const MeetingRequestSchema = new Schema({
    teacher: {type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true}, //Foreign key to Teacher schema
    student: {type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true}, //Foreign key to Student schema, creator of the request
    date: {type: Date, required: true},
    startTime: {type: String, required: true},
    endTime: {type: String, required: true},
    isAccepted: {type: Boolean, default: false},
    message: {type: String} //Reason for request
})

module.exports =  mongoose.model('MeetingRequest', MeetingRequestSchema);

