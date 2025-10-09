const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema({
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