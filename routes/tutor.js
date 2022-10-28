const express = require('express');
const router = express.Router();
const tutorController = require('../controllers/tutor/tutorController');    
// const assessmentController = require('../controllers/assessmentController');  // To send py visualizations!

// A single teacher exists!             
//  req.params.editor: ---> Used to give tutor privilege... ---> set in ".env"
router.get('/getSubjects', tutorController.getAllSubjects);
router.post('/signup', tutorController.createSubject);
router.put('/update', tutorController.updateSubject);                               // To be implemented in front-end
router.delete('/removeSubject', tutorController.removeSubjects);                    // To be implemented in front-end

router.get('/:subName', tutorController.getSubject);
router.get('/:subName/enrolledStudents', tutorController.getLearnersBySubject);


// Variables input         ---> 
router.post('/:learnerID/:subName/setFuzzy', tutorController.setFuzzyVariables);            // --> set in tutorController!
router.post('/:learnerID/:subName/setMarks', tutorController.setMarks);                     // --> set in tutorController!

// // Assessment links (data visualization)         ---->  route name ideas: appraisal OR assess
// router.get('/:learnerID/:subName/assessment', );            
// router.get('/:learnerID/assessment', );  

module.exports = router;