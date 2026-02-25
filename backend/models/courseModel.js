const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    courseCode: {
        required: true,
        type: String,
    },
    courseName: {
        type: String,
        required: true
    },
    semester: {
        required: true,
        type: String,
    },
    prof: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    signUpLink: {
        required: true,
        type: String,
        unique: true,
    },
    logoColor: {
        type: String
    }
})

module.exports = mongoose.model('Course', courseSchema);