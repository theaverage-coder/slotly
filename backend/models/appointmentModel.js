const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema({
    booking: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
    },
    student: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    startTime: {
        required: true,
        type: Date
    },
    endTime: {
        required: true,
        type: Date
    },
    location: {
        type: String
    },
    message: {
        type: String
    }

})

module.exports = mongoose.model('Appointment', appointmentSchema);