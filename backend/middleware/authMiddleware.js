const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = (req, res, next) => {
    let token;

    if (req.headers?.authorization?.startsWith("Bearer")) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1]

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // Get user from the token
            req.user = decoded.id;

            return next();
        } catch (error) {
            console.log('Not authorized:', error)
            return res.status(401);
        }
    }

    if (!token) {
        console.log('Not authorized, no token')
        return res.status(401)
    }
}

module.exports = protect;