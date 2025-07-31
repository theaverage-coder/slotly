const mongoose = require('mongoose');

const CourseSchema = new Schema({
    courseName: {type: String, required: true},
    courseCode: {type: String, required: true, unique: true},
    teacher: {type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true}, //Foreign key to Teacher schema
    
})

module.exports = mongoose.model('Course', CourseSchema);