const mongoose = require('mongoose');

const notificationSchema = mongoose.Schema({
    message: {
        required: true,
        type: String
    },
    user: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    read: {
        required: true,
        type: Boolean,
        default: false
    },
    dateCreated: {
        type: Date,
        required: true,
    },
    linkToPage: {
        type: String
    }
})