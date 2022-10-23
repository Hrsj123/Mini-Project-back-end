// --------------------- DB ------------------------
const data = {
    subjects: require('../../model/subjects.json'),
    setSubject: function(data) { 
        this.subjects = data;
    }
};
// -------------------------------------------------
// A single teacter exists!

const path = require('path');
const fsPromises = require('fs').promises;

const getAllSubjects = (req, res) => {      // get
    if (Object.keys(data.subjects).length === 0) return res.json({ 'message': 'No subjects created yet!' });
    res.json(data.subjects);                                // Sends all the subjects in the db
}

const createSubject = async (req, res) => {       // post
    const newSubject = {
        id: data.subjects[data.subjects.length - 1] + 1 || 1,
        subName: req.body.subName,
        totalMarks: req.body.totMarks
    }

    const duplicateSubject = data.subjects.find(sub => sub.subName === req.body.subName);
    if (duplicateSubject) return res.status(400).json({ 'message': `The subject named ${req.body.subName} already exists!` });
    // Update DB (json)!                     
    try {
        data.setSubject([...data.subjects, newSubject]);
        await fsPromises.writeFile(
            path.join(__dirname, '..', '..', 'model', 'subjects.json'),
            JSON.stringify(data.subjects)
        );
    } catch (error) {
        console.log(error);
    }

    res.status(201).json(data.subjects);                                                    // Sends all the subjects in the db
}

const updateSubject = async (req, res) => {       // put
    const subject = data.subjects.find(sub => sub.id === parseInt(req.body.id));
    if (!subject) {
        return res.Status(400).json({ 'message': `The subject with id: ${req.body.id} does not exist!` });
    }
    const otherSubjects = data.subjects.find(sub => sub.id !== parseInt(req.body.id));
    if (req.body.subName) subject.subName = req.body.sub;
    if (req.body.totalMarks) subject.totalMarks = req.body.totalMarks;
    const unsortedArray = [...otherSubjects, subject];
    // Update DB (json)!
    try {
        data.setSubject(unsortedArray.sort((a, b) => a.id > b.id ? 1: a.id < b.id ? -1 : 0)); // Arrange the order of subjects!
        await fsPromises.writeFile(
            path.join(__dirname, '..', '..', 'model', 'subjects.sjon'),
            JSON.stringify(data.subjects)
        );
    } catch (error) {
        console.log(error);
    }

    res.json(data.subjects);                                // Sends all the subjects in the db
}

const removeSubjects = (req, res) => {      // delete
    const subject = data.subjects.find(sub => sub.id === parseInt(req.body.id));
    if (!subject) {
        return res.status(400).json({ 'message': `The subject with id: ${req.body.id} does not exists!` });
    } 

    const otherSubjects = data.subjects.find(sub => sub.id !== parseInt(req.body.id));
    data.setSubject([...otherSubjects]);

    res.json(subject);                                     // Sends the removed subject (from db)
}

const getSubject = (req, res) => {
    const subject = data.subjects.find(sub => sub.id === req.params.id);
    if (!req.params.id) {
        return res.status(400).json({ 'message': `The requested subject with id: ${req.params.is} does not exist!` });
    }
    res.json(subject);
}


module.exports = {
    getAllSubjects,
    createSubject,
    updateSubject,
    removeSubjects,
    getSubject
}