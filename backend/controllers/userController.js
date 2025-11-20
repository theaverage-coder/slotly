const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc Register new user
// @route POST /api/users/register
const registerUser = asyncHandler(async (req, res) => {
    console.log("Received body:", req.body); // Make sure body exists
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
})

// @desc Authenticate a user
// @route POST /api/users/login
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    // Check for user email
    const user = await User.findOne({ email })

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

})

// @desc Get user data
// @route GET /api/users/me
const getUser = asyncHandler(async (req, res) => {
    const { _id, firstName, lastName } = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        firstName,
        lastName,
    })
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

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
}

module.exports = {
    registerUser,
    loginUser,
    getUser,
    getStudents
}