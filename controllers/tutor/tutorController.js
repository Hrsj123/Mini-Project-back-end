const Subject = require('../../model/Subject')

// -------------------------------------------------
// A single teacter exists!

/* To write to file system or create logs
const path = require('path');
const fsPromises = require('fs').promises;
*/

const getAllSubjects = async (req, res) => {      // get
    // if (Object.keys(data.subjects).length === 0) return res.json({ 'message': 'No subjects created yet!' });
    const subject = await Subject.find();
    if(!subject) return res.status(204).json({ 'message': 'No subjects found!' });
    res.json(subject);                                // Sends all the subjects in the db
}

const createSubject = async (req, res) => {       // post
    if (!req.body?.name || !req.body?.totalMarks) {
        return res.status(400).json({ 'messag': 'Both Subject name and total marks are required!' });
    }

    try {
        const result = await Subject.create({
            name: req.body.name,
            totalMarks: req.body.totalMarks
        });

        res.status(201).json(result);                                                    // Sends all the subjects in the db
    } catch (error) {
        console.error(error);
    }
}

const updateSubject = async (req, res) => {       // put
    if (!req.body?.id) return res.status(400).json({ 'message': 'An id parameter is required!' });

    const sub = await Subject.findOne({ _id: req.body.id }).exec();
    if (!sub) {
        return res.Status(400).json({ 'message': `The subject with id: ${req.body.id} does not exist!` });
    }

    if (req.body?.name) sub.name = req.body.name;
    if (req.body.totalMarks) sub.totalMarks = req.body.totalMarks;

    try {
        const result = await sub.save();
        res.json(result);                                // Sends all the subjects in the db
    } catch (error) {
        console.error(error);
    }
}

const removeSubjects = async (req, res) => {      // delete
    if (!req.body?.id) return res.status(400).json({ 'message': 'An ID parameter is required!' });
    
    const sub = await Subject.findOne({ _id: req.body.id }).exec();
    if (!sub) {
        return res.status(204).json({ 'message': `The subject with id: ${req.body.id} does not exists!` });
    } 

    const result = await sub.deleteOne({ _id: req.body.id});
    res.json(result);                                     // Sends the removed subject (from db)
}

const getSubject = (req, res) => {
    if (!req.params?.id) return res.status(400).json({ 'message': 'Subject ID required!' });
    const subject = Subject.findOne({ _id: req.params.id }).exec();    
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