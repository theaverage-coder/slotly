const mongoose = require('mongoose');

const BookingSchema = new Schema({
    teacher: {type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true}, //Foreign key to Teacher Schema
    startDate: {type: Date, required: true},
    endDate: {type: Date, required: true},
    location: {type, String, required: true},
    exceptions: [Date],
    //availabilities

})

module.exports = mongoose.model('Booking', BookingSchema);