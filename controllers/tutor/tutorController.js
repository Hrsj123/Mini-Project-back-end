const Subject = require('../../model/Subject')
const Learner = require('../../model/Learner'); 
const Assessment = require('../../model/Assessment'); 
const Marks = require('../../model/Marks'); 

// get
const getAllSubjects = async (req, res) => {      
    const subject = await Subject.find();
    if(!subject) return res.status(204).json({ 'message': 'No subjects found!' });
    res.json(subject);                                
}

// post
const createSubject = async (req, res) => {       
    if (!req.body?.name || !req.body?.totalMarks || !req.body?.inchargeName) {
        return res.status(400).json({ 'message': 'All three Subject name, total marks and incharge name are required!' });
    }

    const duplicate = await Subject.findOne( { name: { $regex: req.body.name, $options: 'i' } } ).exec();
    if (duplicate) return res.status(409).json({ 'message': 'The subject alreagy exists!' });       

    try {
        const result = await Subject.create({
            name: req.body.name,
            totalMarks: req.body.totalMarks,
            description: req.body.description,
            inchargeName: req.body.inchargeName
        });
        res.status(201).json(result);           
    } catch (error) {
        console.error(error);
        res.sendStatus(500);                    
    }
}

// Not function to handle requests directly!    // --> Creates assessment document for learner (Each learner has exactly 1)
const getAssessment = async (req, res) => {
    const subject = await Subject.findOne({ name: req.params.subName }).exec(); 
    if (!subject) return res.status(400).json({ 'message': `Subject named: ${req.params.subName} does not exist!` });

    const learner = await Learner.findOne({ _id: req.params.learnerID }).exec();
    if (!learner) return res.status(400).json({ 'message': `Learner with ID: ${req.params.learnerID} does not exist!` });

    let assessment = await Assessment.findOne({ _id: learner.totalMarks }).exec();  
    // assessment = learner.totalMarks ( = null )  probably!
    if (!assessment) {                                                                  // 99% (!assessment will be true) 
        // Create assessment
        try {
            const newAssessment = await Assessment.create({ 
                isCreated: true,
                assessmentVariables: [{ subject: req.params.subName }]
            });

            console.log('Created new assessment document!');
            assessment = newAssessment;

            // Adding newly created assessment reference in "learner" document!
            learner.totalMarks = assessment._id;
            try {
                const result = await learner.save();
            } catch (error) {
                console.error(error);
                res.status(400).json({ 'message': error });
            }
        } catch (error) {
            console.log(error);
            res.status(400).json({ 'message': error });
        }
    }

    return assessment;
}

const setFuzzyVariables = async (req, res) => {
    // To see that an already existing "assessment document" of "this learner" does "not" have multiple entries of a "this subject"!    
    const exists = await Assessment.findOne({ assessmentVariables: { $elemMatch: { subject: req.params.subName }  } }).exec();
    if (exists) {
        const learner = await Learner.findOne({ totalMarks: exists._id }).exec();
        if (learner._id === req.params.learnerID) return res.status(400).json({ 'message': `The values for subject: ${req.body.subName} already set for the student with ID: ${req.body.learnerID}!` });
    }
    
    let assessment = await getAssessment(req, res);
    assessment = await Assessment.updateOne({ _id: assessment._id, "assessmentVariables.subject": req.params.subName }, {
        $set: {
            "assessmentVariables.$.attendance": req.body.attendance,
            "assessmentVariables.$.interaction": req.body.interaction
        }
    });
    console.log(assessment);
    res.json({ 'message': `Addedd/Created Assessment document to Learner with learner ID: ${req.params.learnerID}` })
}

const setMarks = async (req, res) => {
    // To see that an already existing marks document of the same subject is not repeated!
    const exists = await Marks.findOne({ subject: req.params.subName }).exec();
    if (exists) {
        const assessment = await Assessment.findOne({ marks: exists._id }).exec();
        const learner = await Learner.findOne({ totalMarks: assessment._id }).exec();
        if (learner._id.toString() === req.params.learnerID) return res.status(400).json({ 'message': `The marks for subject: ${req.params.subName} already set for the student with ID: ${req.params.learnerID}!` });
    }
    
    const assessment = await getAssessment(req, res);
    
    let i;
    for (i = 0; i < assessment.assessmentVariables.length; i++) {
        if (assessment.assessmentVariables.subject === req.params.subName) break;
    }

    let foundMarks = await Marks.findOne({ _id: assessment.marks }).exec();
    if(!foundMarks) {
        // Create marks
        try {
            const newMarks = await Marks.create({ 
                isCreated: true,
                subject: req.params.subName
            });
            console.log('Created new marks document!');
            foundMarks = newMarks;

            // Adding newly created marks reference in "assessment" document!
            const result = await Assessment.updateOne({ assessment, "assessmentVariables.subject": req.params.subName }, {
                $set: {
                    "assessmentVariables.$.marks": foundMarks._id
                } 
            });
            // console.log(result);
        } catch (error) {
            console.log(error);
            res.status(400).json({ 'message': error });
        }
    }

    // Update marks
    for (let i = 0; i < req.body.scores.length; i++) {
        let a = req.body.scores[i];
        let b = req.body.testNumber[i];
        console.log(`--------------------- a: ${a}, b: ${b} ----------------------`);

        updateMarks = await Marks.updateOne({ _id: foundMarks._id }, {
            $push: {
                marks: [{
                    score: a,
                    testNumber: b
                }]
            }
        });
    }

    console.log(updateMarks);
    res.json({ 'message': `Addedd/Created Marks document to Assessment with learner ID: ${req.params.learnerID}` })
}

// put
const updateSubject = async (req, res) => {       
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

// delete
const removeSubjects = async (req, res) => {      
    if (!req.body?.id) return res.status(400).json({ 'message': 'An ID parameter is required!' });
    
    const sub = await Subject.findOne({ _id: req.body.id }).exec();
    if (!sub) {
        return res.status(204).json({ 'message': `The subject with id: ${req.body.id} does not exists!` });
    } 

    const result = await sub.deleteOne({ _id: req.body.id});
    res.json(result);                                     // Sends the request to remove the subject (from db)
}

// get
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
    setFuzzyVariables,
    setMarks,
    updateSubject,
    removeSubjects,
    getSubject, 
    getLearnersBySubject
}