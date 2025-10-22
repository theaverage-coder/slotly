const asyncHandler = require('express-async-handler')
const Course = require('../models/courseModel')
const User = require('../models/userModel')

// @desc Add a new course
// @route /api/courses/addCourse
const addCourse = asyncHandler(async (req, res) => {
    const { courseCode, courseName, semester, prof } = req.body;

    if (!courseCode || !courseName || !semester) {
        res.status(400);
        throw new Error('Missing fields');
    }

    // Create unique sign up code
    let signUpLink;
    while (true) {
        signUpLink = generateSignUpLink();
        const exists = await Course.findOne({ signUpLink })

        if (!exists) {
            break;
        }
    }

    // Create course
    const course = await Course.create({
        courseCode,
        courseName,
        semester,
        prof,
        signUpLink,
    })

    if (course) {
        res.status(201).json({
            signUpLink: course.signUpLink,
        })
    } else {
        res.status(400);
        throw new Error('Invalid data');
    }

})
// @desc Register to course
// @router /api/courses/joinCourse
const joinCourse = asyncHandler(async (req, res) => {
    const { studentId, signUpLink } = req.body;

    // Check if a course with that sign up link exists
    const course = await Course.findOne({ signUpLink });

    if (course) {
        console.log("Course found")
        // Register student to course
        const update = await User.updateOne(
            { _id: studentId },
            { $addToSet: { courses: course._id } }
        );

        // If successfully enrolled
        if (update.modifiedCount == 1) {
            return res.status(201).json({
                success: true,
                added: true,
            });
        } else { // Already enrolled in course
            return res.status(201).json({
                success: true,
                added: false,
            });
        }
    } else { // No course found
        console.log("No course found");

        return res.status(400).json({
            success: false,
        });
    }

})

// @desc Get all courses a student is enrolled in OR a teacher is teaching
// @router /api/courses/getCourses
const getCourses = asyncHandler(async (req, res) => {
    try {
        const { userId } = req.body;

        // Find user & populate the classes field with full course docs
        const user = await User.findById(userId).populate("courses");

        if (!user) {
            console.log("User not found")
            return res.status(404).json({ success: false, message: "Student not found" });
        }
        return res.json({
            success: true,
            courses: user.courses
        });
    } catch (err) {
        console.log(err)
        return res.status(500).json({ success: false, error: err.message });
    }
})

// @desc Get details pertaining to a single course with given id
// @ router /api/courses/getCourse/:courseId
const getCourseById = asyncHandler(async (req, res) => {
    try {
        const { courseId } = req.params;
        console.log("Course Id: ", courseId);
        const course = await Course.findById(courseId);

        if (!course) {
            console.log("Course not found")
            return res.status(404)
        }
        return res.json(course);
    } catch (err) {
        console.log(err)
    }
})

// @desc Delete a course
// @router /api/courses/deleteCourse

function generateSignUpLink() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < 10; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

module.exports = {
    addCourse,
    joinCourse,
    getCourses,
    getCourseById
}