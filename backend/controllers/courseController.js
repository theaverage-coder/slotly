const asyncHandler = require('express-async-handler')
const Course = require('../models/courseModel')
const User = require('../models/userModel')
const Appointment = require('../models/appointmentModel');
const Booking = require('../models/bookingModel');
const Event = require('../models/eventModel');
const Poll = require('../models/pollModel');
const Vote = require('../models/voteModel');

// @desc Add a new course
// @route /api/courses/addCourse
const addCourse = asyncHandler(async (req, res) => {
    try {
        const { courseCode, courseName, semester } = req.body;
        const prof = req.user;

        if (!courseCode || !courseName || !semester) {
            console.log("Missing fields")
            return res.sendStatus(400);
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

        const logoColor = getDefaultColor();

        // Create course
        const course = await Course.create({
            courseCode,
            courseName,
            semester,
            prof,
            signUpLink,
            logoColor,
        })

        if (course) {
            const update = await User.updateOne(
                { _id: prof },
                { $addToSet: { courses: course._id } }
            );
            return res.status(201).json({
                signUpLink: course.signUpLink,
            })
        } else {
            console.log("Invalid data")
            return res.sendStatus(400);
        }
    } catch (err) {
        console.log(err)
    }
})

// @desc Leave a course
// @router /api/courses/leaveCourse/:courseId
const leaveCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const user = req.user;

        //Find booking of course
        const booking = await Booking.findOne({ course: courseId }, { course: 1 });
        console.log("booking ", booking);

        const update = await User.updateOne(
            { _id: user },
            { $pull: { courses: courseId } }
        );

        if (update.modifiedCount == 1) {
            const deleted = await Appointment.deleteMany({ student: user, booking: booking._id })
            console.log("Deleted appointments: ", deleted.deletedCount);
            return res.sendStatus(201);
        }
        return res.sendStatus(404);
    } catch (err) {
        console.log(err);
    }
}

// @desc Register to course
// @router /api/courses/joinCourse
const joinCourse = asyncHandler(async (req, res) => {
    try {
        const { signUpLink } = req.body;
        const studentId = req.user;

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
    } catch (err) {
        console.log(err)
    }

})

// @desc Get all courses a student is enrolled in OR a teacher is teaching
// @router /api/courses/getCourses
const getCourses = asyncHandler(async (req, res) => {
    try {
        const userId = req.user;

        // Find user & populate the classes field with full course docs
        const user = await User.findById(userId).populate("courses");
        if (!user) {
            console.log("User not found")
            return res.status(404).json({ success: false, message: "Student not found" });
        }
        return res.status(200).json({
            success: true,
            courses: user.courses
        });
    } catch (err) {
        console.log(err)
        return res.status(500).json({ success: false, error: err.message });
    }
})

// @desc Get details pertaining to a single course with given id
// @router /api/courses/getCourseById/:courseId
const getCourseById = asyncHandler(async (req, res) => {
    try {
        const { courseId } = req.params;
        const course = await Course.findById(courseId).populate('prof', 'firstName lastName email -_id');

        if (!course) {
            console.log("Course not found")
            return res.sendStatus(404)
        }
        return res.status(200).json(course);
    } catch (err) {
        console.log(err)
    }
})

// @desc Get all students names and emails of a course
// @router /api/courses/getAllStudents/:courseId
const getAllStudents = asyncHandler(async (req, res) => {
    try {
        const { courseId } = req.params;
        const userId = req.user;
        const course = await Course.find({ _id: courseId, prof: userId });

        if (!course) {
            console.log("Authentication error")
            return res.sendStatus(400);
        }
        const students = await User.find({ courses: courseId, role: "s" }, 'firstName lastName email');

        return res.status(200).json(students);

    } catch (err) {
        console.log(err)
    }
})

// @desc Delete a course
// @router /api/courses/deleteCourse/:courseId
const deleteCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const userId = req.user;

        //Delete course
        const deletedCourse = await Course.findOneAndDelete({
            _id: courseId,
            prof: userId
        });

        // Failed to delete course
        if (!deletedCourse) {
            return res.sendStatus(404);
        }

        // Delete booking
        const deletedBooking = await Booking.findOneAndDelete({
            course: deletedCourse._id
        })

        if (deletedBooking) {
            // Delete appointments
            const deletedAppts = await Appointment.deleteMany({ prof: userId, booking: deletedBooking._id })
            console.log("Deleted appointments: ", deletedAppts.deletedCount);
        }
        // Delete events
        const deletedEvents = await Event.deleteMany({ course: deletedCourse._id });
        console.log("Deleted events: ", deletedEvents.deletedCount);

        // Delete polls
        const deletedPolls = await Poll.deleteMany({ course: deletedCourse._id });
        console.log("Deleted polls: ", deletedPolls.deletedCount);

        /* 
        // Delete votes
        if (deletedPolls) {
            const deletedVotes = await Vote.deleteMany({ poll: deletedPolls._id });
            console.log("Deleted polvotesls: ", deletedVotes.deletedCount);
        }
            */
        return res.sendStatus(200);
    } catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
}

// @desc Edit an existing's course (name, code or semester)
// @router /api/courses/editCourse/:courseId
const editCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const userId = req.user;
        const allowedFieldChanges = ["courseCode", "courseName", "semester"];
        const updates = {};

        for (const field of allowedFieldChanges) {
            if (req.body[field] != undefined && req.body[field] != "") {
                updates[field] = req.body[field];
            }
        }

        if (Object.keys(updates).length === 0) {
            return res.status(400).json({ error: "No fields to update" });
        }

        const updatedCourse = await Course.findOneAndUpdate(
            {
                _id: courseId,
                prof: userId
            },
            { $set: updates },
            { new: true }
        );

        if (!updatedCourse) return res.sendStatus(404);

        return res.status(200).json(updatedCourse);
    } catch (err) {
        console.log(err);
    }
}

function generateSignUpLink() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < 10; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function getDefaultColor() {
    const defaultColors = ["rgb(255, 255, 255)", "rgb(125, 78, 87)", "rgb(90, 59, 114)", "rgb(6, 92, 108)", "rgb(104, 0, 94)"]
    // Generate random index between 0-3
    const idx = Math.floor(Math.random() * 5)
    return defaultColors[idx];
}

module.exports = {
    addCourse,
    joinCourse,
    getCourses,
    getCourseById,
    getAllStudents,
    deleteCourse,
    editCourse,
    leaveCourse
}