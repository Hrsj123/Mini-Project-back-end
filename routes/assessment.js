const express = require('express');
const router = express.Router();
const assessmentController = require('../controllers/assessmentController');

/**
 * Update:
 * marks in learners model
 * assessment model
 * marks model
 */

// Assessment links         ---->  route name ideas: appraisal OR assess
// router.get('/:learnerID/:subName/assessment', );            
// router.get('/:learnerID/assessment', );     
// router.get('/:learnerID/evaluation');

module.exports = router