const express = require('express');
const router = express.Router();
const tutorController = require('../controllers/tutor/tutorController');

// router.route('^/$')    // A single teacher exists!
router.get('/getSubjects', tutorController.getAllSubjects);
router.post('/signup', tutorController.createSubject);
router.put('/update', tutorController.updateSubject);
router.delete('/removeSubject', tutorController.removeSubjects);

router.get('/:subName', tutorController.getSubject);

router.get('/:subName/enrolledStudents', tutorController.getLearnersBySubject);

module.exports = router;

// Enable CORS for manual fetch requests /OR/ use proxy react app ----> I will go with the latter one or not 😛!😉