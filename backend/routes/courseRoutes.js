const express = require('express')
const router = express.Router()
const { addCourse, joinCourse, getCourses } = require('../controllers/courseController');

router.post('/addCourse', addCourse);
router.post('/joinCourse', joinCourse);
router.post('/getCourses', getCourses)

module.exports = router