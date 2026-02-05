const express = require('express')
const router = express.Router()
const { addCourse, joinCourse, getCourses, getCourseById, getAllStudents, deleteCourse, editCourse } = require('../controllers/courseController');

router.post('/addCourse', addCourse);
router.post('/joinCourse', joinCourse);
router.post('/getCourses', getCourses);
router.get('/getCourseById/:courseId', getCourseById);
router.get('/getAllStudents/:courseId', getAllStudents);
router.delete("/deleteCourse/:courseId", deleteCourse);
router.patch("/editCourse/:courseId", editCourse);
module.exports = router