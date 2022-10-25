// Can be considered as a relationship table for Learners and Subjects! : Many to many relationships!
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Subject = require('./Subject');
const Learner = require('./Learner');
const Marks = require('./Marks');

const assessmentSchema = new Schema({
    learner: {
        type: Schema.Types.ObjectId,
        ref: Learner,
        required: true
    },
    subject: {
        type: Schema.Types.ObjectId,
        ref: Subject,
        required: true
    },
    attendance: [                                       
        {                                      // 10%
            type: Boolean,
            date: Date,                         // Avg total : of 10
        }
    ],
    interaction: [
        {                                     // 10%
            type: Number,
            date: Date,                         // Avg total : of 10
        }
    ],
    marks: [
        {                                       // 80%
            type: Schema.Types.ObjectId,
            ref: Marks
        }
    ]
})

module.exports = mongoose.model('Assessment', assessmentSchema)