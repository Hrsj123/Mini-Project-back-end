const Learner = require('../model/Learner');
const Subject = require('../model/Subject');
const Assessment = require('../model/Assessment');
// const Marks = require('../model/Marks');
// 1) and 2) Available to tutors!         

// Get

/**
 * 1) For a single student  -->  a particular subject           (Check)             
 * 2) For a multiple student  -->  a particular subject           (Check)         (Class Average!!!)  --->  Class average vs time(Day): Available with everyone
 *    Easy    {{Subject wise:: single "Student"}} Perfomance in ::: single element of [totalMarks] ::: learner_id
*/
const assessLearner = async (req, res) => {
    const learner = await Learner.findOne({ _id: req.params.learnerID }).exec();
    if (!learner) return res.status(400).json({ 'message': `Learner with id: ${req.params.learnerID} does not exist!` });
    
    const subject = await Subject.findOne({ _id: req.params.subName }).exec();
    if (!subject) return res.status(400).json({ 'message': `Subject with name: ${req.params.subName} does not exist!` });

    if (!learner.subjectsList.includes(req.params.subName)) return res.status(400).json({ 'message': `Student is not enrolled in : ${req.params.subName}!` });  

    // --->
    
    /* Add python generated content to the response! */

    // ---> Available with "respective" student and teachers                  Class average vs time(Day): Available with everyone

    /** Possible plots: Learner's subject's
     * 1) Attendance  -> • Self vs time( weekly(bool)/Day ) ##line graph, pi-chart##,     • Class average vs time(Day)  ##No idea##,        self vs Class average ##pi-chart## 
     * 2) Interaction -> • Self vs interaction(Day), • Class average vs interaction(Day), self vs Class average
     * 2) Marks       -> • Self vs Marks(Weekly), • Class average vs Marks(Weekly), self vs Class average
     */

    /* Possible improvements: out of 5 OR 10 rating w.r.t class average --> in python */
    /* Identify and track Progress */

    res.json(learner);                                                  // Changes
}


/*
* 3) For a single student  -->  multiple subjects              (Check)            
*    Easy    {{General:: single "Student"}} Perfomance in all ::: entire [totalMarks] ::: lerner_id
*/
const assessLearners = async (req, res) => {
    const learner = await Learner.findOne({ _id: req.params.learnerID }).exec();
    if (!learner) return res.status(400).json({ 'message': `Learner with id: ${req.params.id} does not exist!` });

    // --->

    /* Add python generated content to the response! */

    // ---> Available with respective student and teachers           

    /** Possible plots: Learner's   
     * 1) Attendance  -> • Attendence in various subject vs time(day/week)                                                  (multi line chart)
     * 2) Interaction -> • Interaction in various subject vs time(day/week)                                                 (multi line chart)
     * 2) Marks       -> • Marks in various subject vs time(day/week)                                                       (multi line chart)
     */

    /* Possible improvements: out of 5 OR 10 rating general perfomance --> in python */
    /* Help assess general perfomance and also possible interests */

    res.json(learner);                                                  // Changes
}


/* 
* 3) For  multiple student  -->  a particular subject           (Check)                             -----> Something like a teacher assessment
*    Don't know     {{Learner wise:: single "subject"}} Tutor's perfomance ::: find()
*/
const assessTution = async (req, res) => {                              // To show class average performance!!!!        --> for all (included in 1 class avg. part)
    const learner = await Learner.findOne({ _id: req.params.learnerID }).exec();
    if (!learner) return res.status(400).json({ 'message': `Learner with id: ${req.params.id} does not exist!` });
    
    // --->

    /* Add python generated content to the response! */

    /** Possible plots: Learner's   
     * 1) Attendance  -> • Class avg. vs time(day/week)                                                  
     * 2) Interaction -> • Class avg. vs time(day/week)                                                 
     * 2) Marks       -> • Class avg. vs time(day/week)                                                 
     */

    /* Possible improvements: out of 5 OR 10 rating general perfomance --> in python */
    /* Help judge class average which can also be used to judge tutors... */

    res.json(learner);
}


// // Post

// /**
//  * 2 different pages:   
//  *  pg 1: attendence and interaction    
//  *  pg 2: set assessment scores
//  */
// // For tutors!
// const setFuzzyVariables = async (req, res) => {     // pg 1         ---> Server url-->   "/tutor/"
//     if (!req.body?.subject) return res.status(400).json({ 'message': 'Subject name is required!' });
//     if (!req.body?.fuzzyValues) return res.status(400).json({ 'message': 'Attendence and Interaction scores are required!' });
    
//     // req -->  "subject name" and "fuzzyValues"                       fuzzyValues = [id, attendence, interaction]      // id --> learner_id
//     for (let index = 0; index < req.body.fuzzyValues.length; index++) {       
//         const fuzzyValue = req.body.fuzzyValues[index];

//         const learner = await Subject.findOne({ _id: fuzzyValue.id }).exec();    
//         if (learner) {
//             /* create an assessment --> if(learner.totalMarks === null) {create Assessment}
//             *  update the existing assessment --> if(learner.totalMarks !== null) {update Assessment}
//             *  store back in DB!
//             */
//             const assessment = await Assessment.findOne({ _id: learner.totalMarks }).select('-marks').exec();
//             if (assessment) {
//                 // Update Assessment
//                 if (fuzzyValue?.attendance) assessment.attendance.push(fuzzyValue.attendance);
//                 if (fuzzyValue?.interaction) assessment.interaction.push(fuzzyValue.interaction);
                
//                 try {
//                     const result = await assessment.save();                     // Update assessment in DB
//                     res.json(result);                                
//                 } catch (error) {
//                     console.error(error);
//                 }
//             } else {
//                 // Create Assessment
//                 try {
//                     const result = await Assessment.create({
//                         subject: await Subject.findOne({ name: req.body.subject }).exec()._id,
//                         attendance: req.body.totalMarks,
//                         interaction: req.body.description
//                     });
//                     res.status(201).json(result);                                                    // Sends all the subjects in the db
//                 } catch (error) {
//                     console.error(error);
//                     res.sendStatus(500);                    
//                 }
//             }
//         }

//     }
// }

// const setAssessmentMarks = async (req, res) => {                                                // Re-consider 
//     // Input -> "subject"  and  [learner_id, marks]  : (assessmentMarks)
//     if (!req.body?.subject) return res.status(400).json({ 'message': 'Subject name is required!' });
//     if (!req.body?.assessmentMarks) return res.status(400).json({ 'message': 'Assessment marks are required!' })

//     for (let index = 0; index < req.body.assessmentMarks.length; index++) {       
//         const element = req.body.assessmentMarks[index];

//         const learner = await Learner.findOne({ _id: element.id }).exec();    
//         if (learner) {
//             /* create marks --> if(Assessment.totalMarks === null) {create Assessment}
//             *  update the existing assessment --> if(learner.totalMarks !== null) {update Assessment}
//             *  store back in DB!
//             */
//             const assessment = await Assessment.findOne({ _id: learner.totalMarks }).select('subject marks').exec();

//             if (assessment) {
//                 const marks = await Marks.findOne({ _id: assessment.marks }).exec();        // assessment.marks -->  is an mongoose array in assessment schema!

//                 // for (let i = 0; i < assessment.marks.length; i++) {
//                 //     const mark = marks[i];

//                 //     if (mark) {
//                 //         // Update mark
//                 //         if (mark?.score) assessment.attendance.push(marks.score);
//                 //         if (mark?.testNumber) assessment.attendance.push(marks.testNumber);
                        
//                 //         try {
//                 //             const result = await mark.save();                     // Update assessment in DB
//                 //             res.json(result);                                
//                 //         } catch (error) {
//                 //             console.error(error);
//                 //         }

//                 //     } else {
//                 //         // Create mark
//                 //         try {
//                 //             const result = await Marks.create({
//                 //                 score: await Subject.findOne({ name: req.body.subject }).exec()._id,
//                 //                 attendance: req.body.totalMarks,
//                 //                 interaction: req.body.description
//                 //             });
//                 //             res.status(201).json(result);                                                    // Sends all the subjects in the db
//                 //         } catch (error) {
//                 //             console.error(error);
//                 //             res.sendStatus(500);                    
//                 //         }
//                 //     }
//                 // }

//             } else {
//                 // Create assessment model here!
//                 try {
//                     const result = await Assessment.create({
//                         subject: await Subject.findOne({ name: req.body.subject }).exec()._id,
//                         attendance: req.body.totalMarks,
//                         interaction: req.body.description
//                     });
//                     res.status(201).json(result);                                                    // Sends all the subjects in the db
//                 } catch (error) {
//                     console.error(error);
//                     res.sendStatus(500);                    
//                 }

//                 // Now create marks model here!

//             }
//         } else {
//             res.status(400).json({ 'message': `Learner with marks: ${element.id} does not exist!` });
//         }
//     }
// }