const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    course: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
    },
    prof: {
        //required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    // Each day of the week has its own start time, end time and location
    officeHours: [
        { day: { type: Number, required: true }, timeIntervals: [{ start: { type: Date, required: true }, end: { type: Date, required: true } }], location: { type: String } }
    ],
    // time slots can be either 5, 10, 15, 20, 30 or 60 minutes long
    timeSlotDuration: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('Booking', bookingSchema);