const mongoose = require("mongoose");
const Notification = require('../models/notificationModel');

// @desc Mark a notification as read
// @router /api/notifications/markAsRead/:notificationId
const markAsRead = async (req, res) => {
    const { notifId } = req.params;
    const userId = req.user;

    try {// Find notification with id and user & update
        const updatedNotif = await Notification.findOneAndUpdate(
            {
                _id: notifId,
                user: userId
            },
            { $set: { read: true } },
        );
        if (!updatedNotif) return res.status(404).json({ error: "Notification not found" })

        return res.sendStatus(200);
    } catch (err) {
        return res.status(400).json({ error: "Request failed", err });
    }
}

// @desc Delete notification
// @router /api/notifications/deleteNotification/:notificationId
const deleteNotification = async (req, res) => {
    const { notifId } = req.params;
    const userId = req.user;

    try {
        const deleted = await Notification.findOneAndDelete(
            {
                _id: notifId,
                user: userId
            }
        )

        if (!deleted) {
            return res.sendStatus(404);
        }
        return res.sendStatus(200);

    } catch (err) {
        console.log("Failed to delete notification: ", err);
        return res.sendStatus(400);
    }
}

module.exports = {
    markAsRead,
    deleteNotification
}