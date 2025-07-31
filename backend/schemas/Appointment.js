const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    date: {type: Date, required: true},
    location: {type: String, required: true},
    startTime: {type: String, required: true},
    endTime: {type: String, required: true},
    teacher: {type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true}, //Foreign key to Teacher schema
    student: {type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true}, //Foreign key to Student schema
})

module.exports = mongoose.model('Appointment', AppointmentSchema);