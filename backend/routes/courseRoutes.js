const express = require('express')
const router = express.Router()
const { addCourse, joinCourse, getCourses, getCourseById, getAllStudents, deleteCourse, editCourse, leaveCourse } = require('../controllers/courseController');
const protect = require("../middleware/authMiddleware");

router.post('/addCourse', protect, addCourse);
router.post('/joinCourse', protect, joinCourse);
router.post('/getCourses', protect, getCourses);
router.get('/getCourseById/:courseId', getCourseById);
router.get('/getAllStudents/:courseId', protect, getAllStudents);
router.delete("/deleteCourse/:courseId", protect, deleteCourse);
router.patch("/editCourse/:courseId", protect, editCourse);
router.patch("/leaveCourse/:courseId", protect, leaveCourse);
module.exports = router