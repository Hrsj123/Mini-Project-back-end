const express = require('express');
const router = express.Router();    
const learnerController = require('../controllers/learner/learnerController');

router.route('/')
    .get(learnerController.getAllLearners)                               // Get all users(learners!)        
    .post(learnerController.registerLearner)                             // Sign-up                         
    .put(learnerController.updateLearner)                                // Changes in data                 
    .delete(learnerController.deleteLearner);                            // Remove user(learners!)          

// To update the Subjects inrolled in Students DB!
router.post('^/addSubjects$', learnerController.setSubjectsList)                    // Better if logged in!

// To get the number of subjects in which each student is enrolled:
router.get('^/subjectsEnrolled$', learnerController.getEnrolledSubjects)            // Better if logged in! --> Yet to be implemented!

module.exports = router;