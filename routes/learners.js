const express = require('express');
const router = express.Router();    
const learnerController = require('../controllers/learner/learnerController');
// const assessmentController = require('../controllers/assessmentController');

//router.route('/')
router.get('/getLearners', learnerController.getAllLearners);                               // Get all users(learners!)        
router.post('/signup',learnerController.registerLearner);                             // Sign-up                         
router.put('/update', learnerController.updateLearner);                                // Changes in data                 
router.delete('/removeLearner', learnerController.deleteLearner);                            // Remove user(learners!)          



// To get the number of subjects in which each student is enrolled:
router.get('^/subjectsEnrolled$', learnerController.getEnrolledSubjects);            // Better if logged in! --> Yet to be implemented!

// To update the Subjects inrolled in Students DB!
router.post('^/addSubjects$', learnerController.setSubjectsList);                            // Better if logged in!


// // To get self evaluation and class average:
// router.get('/:learnerID/evaluation');

module.exports = router