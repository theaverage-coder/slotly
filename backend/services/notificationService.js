const mongoose = require("mongoose");
const Notification = require('../models/notificationModel');


export const createNotification = async (userId, message) => {
    try {
        const notif = await Notification.create({
            user: userId,
            message: message,
            dateCreated: new Date(),
        })

    } catch (err) {
        console.log("Failed to create notification: ", err);
    }
};