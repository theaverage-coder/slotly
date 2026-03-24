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
    prof: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
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
        required: true,
        type: String
    },
    message: {
        type: String
    },

})

appointmentSchema.index(
    { booking: 1, startTime: 1 },
    { unique: true }
)

module.exports = mongoose.model('Appointment', appointmentSchema);