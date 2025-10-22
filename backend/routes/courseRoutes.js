const express = require('express')
const router = express.Router()
const { addCourse, joinCourse, getCourses, getCourseById } = require('../controllers/courseController');

router.post('/addCourse', addCourse);
router.post('/joinCourse', joinCourse);
router.post('/getCourses', getCourses);
router.get('/getCourseById/:courseId', getCourseById);

module.exports = router