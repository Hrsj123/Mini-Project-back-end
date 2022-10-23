// --------------------- DB ------------------------
const data = {
    learners: require('../../model/learners.json'),
    setSubject: function(data) { 
        this.learners = data;
    }
};
// -------------------------------------------------

const path = require('path');
const fs = require('fs').promises;

const getAllLearners = (req, res) => {
    if (Object.keys(data.learners).length === 0) return res.json({ 'message': 'No learners registered yet!' });
    res.json(data.learners);
}

const registerLearner = (req, res) => {
    
}