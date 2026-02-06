const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc Register new user
// @route POST /api/users/register
const registerUser = asyncHandler(async (req, res) => {
    console.log("Received body:", req.body); // Make sure body exists
    try {
        const { firstName, lastName, email, password, role } = req.body

        if (!firstName || !lastName || !email || !password || !role) {
            res.status(400)
            throw new Error('Please add all fields')
        }

        // Check if user exists
        const userExists = await User.findOne({ email })

        if (userExists) {
            res.status(400)
            throw new Error('User already exists')
        }

        // Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // Create user
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role
        })
        console.log("User saved:", user);

        if (user) {
            res.status(201).json({
                _id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                token: generateToken(user._id)
            })
        } else {
            res.status(400)
            throw new Error('Invalid user data')
        }
    } catch (err) {
        console.log(err)
    }
})

// @desc Authenticate a user
// @route POST /api/users/login
const loginUser = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body

        // Check for user email
        const user = await User.findOne({ email }).select("+password");

        // Check password matches
        if (user && (await bcrypt.compare(password, user.password))) {
            res.status(200).json({
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                token: generateToken(user._id)
            })
        } else {
            res.status(400)
            throw new Error('Invalid credentials')
        }
    } catch (err) {
        console.log(err);
    }
})

// @desc Get user data
// @route GET /api/users/me
const getUser = asyncHandler(async (req, res) => {
    try {
        const { _id, firstName, lastName } = await User.findById(req.user.id)

        res.status(200).json({
            id: _id,
            firstName,
            lastName,
        })
    } catch (err) {
        console.log(err)
    }
})

// @desc Get names and emails given an array of ids
// @route  /api/users/getStudents
const getStudents = asyncHandler(async (req, res) => {
    try {
        const { ids } = req.body;

        const students = await User.find(
            { _id: { $in: ids } },
            "firstName lastName email"
        );

        res.json(students);
    } catch (err) {
        console.log("Failed to retrieve students: ", err);
    }
})

// @desc Edit name
// @router /api/users/changeName
const changeName = asyncHandler(async (req, res) => {
    try {
        const { userId } = req.body;
        const allowedFieldChanges = ["firstName", "lastName"];
        const updates = {};

        for (const field of allowedFieldChanges) {
            if (req.body[field] != undefined && req.body[field] != "") {
                updates[field] = req.body[field];
            }
        }

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ error: "No fields to update" });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: updates },
            { new: true }
        );

        if (!updatedUser) return res.sendStatus(404);

        return res.status(200).json(updatedUser);
    } catch (err) {
        console.log(err);
    }
})

// @desc Change password
// @router /api/users/changePassword
const changePassword = asyncHandler(async (req, res) => {
    try {
        console.log("here")
        const { userId, oldPassword, newPassword } = req.body;

        const user = await User.findById(userId, { password: 1 });

        if (!(await bcrypt.compare(oldPassword, user.password))) {
            console.log("Passwords do not match");
            return res.sendStatus(400);
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: { password: hashedPassword } },
            { new: true }
        );

        if (!updatedUser) return res.sendStatus(404);
        console.log("updated pass")
        return res.sendStatus(200);
    } catch (err) {
        console.log(err);
    }
})

// @desc Delete account
// @router /api/users/deleteAccount/:userId
const deleteAccount = async (req, res) => {
    try {
        const { userId } = req.params;
        const deleted = await User.findByIdAndDelete(userId);

        if (!deleted) {
            return res.sendStatus(404);
        }

        return res.sendStatus(200);
    } catch (err) {
        console.log(err);
    }
}

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
}

module.exports = {
    registerUser,
    loginUser,
    getUser,
    getStudents,
    changeName,
    changePassword,
    deleteAccount
}