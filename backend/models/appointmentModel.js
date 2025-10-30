const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema({
    booking: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
    },
    prof: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    student: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    startTime: {

    },
    endTime: {

    },
    location: {

    }

})

module.exports = mongoose.model('Appointment', appointmentSchema);