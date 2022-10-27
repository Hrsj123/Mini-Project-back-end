// 3 things remaining!  Student login, Removing subjects, Update Learners marks!
const Learner = require('../../model/Learner');
const Subject = require('../../model/Subject');

// Get
const getAllLearners = async (req, res) => {        
    const student = await Learner.find();
    if(!student) return res.status(204).json({ 'message': 'No learner found' });
    res.json(student);
}

// Get
const getEnrolledSubjects = async (req, res) => {
    // Input --> learner_id
    if (!req.body?.id) return res.status(400).json({ 'message': 'Learner id is required!' });
    
    const learner = await Learner.findOne({ _id: req.body.id }).exec();
    if (!learner) return res.status(400).json({ 'message': `The learner with ID: ${req.body.id} does not exist!` });

    res.json(learner.subjectsList);     // array, or json; which is sent?
}

// Post
const registerLearner = async (req, res) => {
    // Input: json(firstName, lastName, phoneNo, email)
    if (!req.body?.firstName || !req.body?.lastName) return res.status(400).json({ 'message': 'Both first and last name are required!' });
        
    let duplicateEmailNo = await Learner.findOne({ email: req.body.email }).exec();
    if (duplicateEmailNo) return res.status(400).json({ 'message': 'The entered email already belongs to one of the registered learner!' });

    try {
        const result = await Learner.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNo: req.body.phoneNo,
            email: req.body.email
        });
        res.status(201).json(`Successfully created: ${result}`);
    } catch (error) {
        res.status(400).json({ 'message': error });                
    }
}

// Post
const setSubjectsList = async (req, res) => {                   // ••• On student login ----> So we dont require to pass learner_ID
    // Input --> json (learner_id, arr(subjects)) 
    const subIdList = [];
    const doesNotExist = [];
    const student = await Learner.findOne({ _id: req.body.id }).exec();
    if (!student) return res.status(400).json({ 'message': `The student with ${req.body.id} does not exist!` });

    for (let index = 0; index < req.body.subjectsList.length; index++) {        // Only while and standard for loops works in async await function!
        const element = req.body.subjectsList[index];
        const subject = await Subject.findOne({ name: element }).exec();    
        
        if (subject) {
            const learner = await Learner.findById(req.body.id);
            if (learner.subjectsList.includes(subject._id)) continue;
            subIdList.push(subject._id.toString());      
        } else {
            doesNotExist.push(element);
        }
    }

    if (doesNotExist.length !== 0) return res.status(400).json({ 'message': `The following subjects: ${doesNotExist} does not exists!` });
    let result = await Learner.findOneAndUpdate({ _id: req.body.id }, { $push: { subjectsList: { $each: subIdList } } }, { new: true } );
    res.json(result);
}

// put
const updateLearner = async (req, res) => {
    if (!req.body?.id) return res.status(400).json({ 'message': 'The ID of the student is required!' });
    
    const student = await Learner.findOne({ _id: req.body.id }).exec();
    if(!student) return res.status(400).json({ 'message': 'The student does not exist!' });
    
    // To update general learners information and subjectsList!
    if (req.body?.firstName) student.firstName = req.body.firstName;
    if (req.body?.lastName) student.lastName = req.body.lastName;
    if (req.body?.phoneNo) student.phoneNo = req.body.phoneNo;
    if (req.body?.email) student.email = req.body.phoneNo;
    // Add subjects here!             --> ••• No option of removing any subject from "Learner.subjectsList" yet! •••
    if (req.body?.subjectsList) {
        const subIdList = [];
        const doesNotExist = [];
        for (let index = 0; index < req.body.subjectsList.length; index++) {        
            const element = req.body.subjectsList[index];
            const subject = await Subject.findOne({ name: element }).exec();                       
            if (subject) {
                const learner = await Learner.findById(req.body.id);
                if (learner.subjectsList.includes(subject._id)) continue;
                subIdList.push(subject._id.toString());      
            } else {
                doesNotExist.push(element);
            }
        }

        if (doesNotExist.length !== 0) return res.status(400).json({ 'message': `The following subjects: ${doesNotExist} does not exists!` });
        let result = await Learner.findOneAndUpdate({ _id: req.body.id }, { $push: { subjectsList: { $each: subIdList } } }, { new: true } );
        console.log(result);    // Separate update of subjectsList! 
    }

    // Update marks here!                                                   --> ••• I guess here!
    

    try {
        const result = await student.save();            // saving other learner's updated infos.
        res.json(result);                       
    } catch (error) {
        res.status(400).json({ 'message': error });
    }
}

// delete
const deleteLearner = async (req, res) => {
    // Input --> json(learner_id)
    if (!req.body?.id) return res.status(400).json({ 'message': 'The ID of the student is required!' });
    
    const student = await Learner.findOne({ _id: req.body.id }).exec();
    if (!student) {
        return res.status(204).json({ 'message': `The student with id: ${req.body.id} does not exists!` });
    } 
    
    const result = await Learner.deleteOne({ _id: req.body.id });
    res.json(result);
}

module.exports = {
    getAllLearners,
    getEnrolledSubjects,
    registerLearner,
    setSubjectsList,
    updateLearner,
    deleteLearner
}