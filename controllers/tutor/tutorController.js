const Subject = require('../../model/Subject')
const Learner = require('../../model/Learner'); 

const getAllSubjects = async (req, res) => {      // get
    const subject = await Subject.find();
    if(!subject) return res.status(204).json({ 'message': 'No subjects found!' });
    res.json(subject);                                
}

const createSubject = async (req, res) => {       // post
    if (!req.body?.name || !req.body?.totalMarks || !req.body?.inchargeName) {
        return res.status(400).json({ 'message': 'All three Subject name, total marks and incharge name are required!' });
    }

    const duplicate = await Subject.findOne( { name: { $regex: req.body.name, $options: 'i' } } ).exec();
    if (duplicate) return res.status(409).json({ 'message': 'The subject alreagy exists!' });       // Not sure about status code!

    try {
        const result = await Subject.create({
            name: req.body.name,
            totalMarks: req.body.totalMarks,
            description: req.body.description,
            inchargeName: req.body.inchargeName
        });
        res.status(201).json(result);                                                    // Sends all the subjects in the db
    } catch (error) {
        console.error(error);
        res.sendStatus(500);                    // 
    }
}


const updateSubject = async (req, res) => {       // put
    if (!req.body?.id) return res.status(400).json({ 'message': 'An id parameter is required!' });

    const sub = await Subject.findOne({ _id: req.body.id }).exec();
    if (!sub) {
        return res.Status(400).json({ 'message': `The subject with id: ${req.body.id} does not exist!` });
    }

    if (req.body?.name) sub.name = req.body.name;
    if (req.body?.totalMarks) sub.totalMarks = req.body.totalMarks;
    if (req.body?.description) sub.description = req.body.description;
    if (req.body?.inchargeName) sub.inchargeName = req.body.description;

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
    res.json(result);                                     // Sends the request to remove the subject (from db)
}

const getSubject = async (req, res) => {
    const subject = await Subject.findOne({ name: req.params.subName }).exec();    
    if (!subject) {
        return res.status(400).json({ 'message': `The requested subject with name: ${req.params.subName} does not exist!` });
    }
    
    console.log(subject);
    res.json(subject);
}

// Will be tested only if the SubjectsList array of the student is filled!
const getLearnersBySubject = async (req, res) => {          
    console.log(`getLearnersBySubject: req.params: ${req.params.subName}`)
    const reqSub = await Subject.findOne({ name: req.params.subName });
    if (!reqSub) return res.status(400).json({ 'message': `${req.params.subName} does not exist!` });

    const students = await Learner.find({ subjectsList: { $all: [reqSub._id] } });                                      
    if (!students) return res.status(204).json({ 'message': `"${req.params.subName}" does not have any enrolled students!` });
    res.json(students);
}

module.exports = {
    getAllSubjects,
    createSubject,
    updateSubject,
    removeSubjects,
    getSubject, 
    getLearnersBySubject
}