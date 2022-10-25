const Learner = require('../../model/Learner');

// const path = require('path');
// const fs = require('fs').promises;

const getAllLearners = async (req, res) => {        // Should it be segrated based on subject!
    const learner = await Learner.find();
    if(!learner) return res.status(204).json({ 'message': 'No learner found' });
    res.json(learner);
}

const registerLearner = async (req, res) => {
    if (!req.body?.firstName || !req.body?.lastName) return res.status(400).json({ 'message': 'Both first and last name are required!' });
}

const updateLearner = async (req, res) => {

}

const deleteLearner = async (req, res) => {

}

const getLearnersBySubject = async (req, res) => {      
    // Add an if filter: maybe!
    const learner = await Learner.find({ subjectsList: { $all: [req.params.subName] } })
        .exec((err, data) => {
            if (err) res.status(500).json({ 'message': `${err}` });
            if (!learner) res.status(204).json({ 'message': 'The requested subject does not exist!' });
            res.json(data);
        });
}

module.exports = [
    getAllLearners,
    registerLearner,
    updateLearner,
    deleteLearner,
    getLearnersBySubject
]