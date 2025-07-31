const mongoose = require('mongoose');

const UserSchema = new Schema({
    email: {type: String, unique: true}, 
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, required: true, enum: ['student', 'teacher']},   
}, {
    discriminatorKey: 'role', // For inheritance
    timestamps: true,
});

module.exports = mongoose.model('User', UserSchema);
