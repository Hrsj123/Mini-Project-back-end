const express = require('express');
const router = express.Router();    

router.route('/learners')
    .get()                              // Get all users(learners!)
    .post()                             // Sign-up /OR/ sign-in
    .put()                              // Changes in data
    .delete();                          // Remove user(learners!)