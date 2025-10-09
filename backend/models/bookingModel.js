const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    course: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
    },
    prof: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    location: {

    },
    daysOfWeek: {

    },

})

module.exports = mongoose.model('Booking', bookingSchema);