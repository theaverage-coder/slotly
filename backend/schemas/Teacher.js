const User = require('./User');
const mongoose = require('mongoose');

const TeacherSchema = new Schema({
    officeLocation: {type: String, required: true},

})