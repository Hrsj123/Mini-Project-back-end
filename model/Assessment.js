// Can be considered as a relationship table for Learners and Subjects! : Many to many relationships!
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Learner = require('./Learner');
const Marks = require('./Marks');
const Subject = require('./Subject');

// For each student: *Only one assessment document exists per student!*
const assessmentSchema = new Schema({
    isCreated: {
        type: Boolean, 
        required: true
    },
    assessmentVariables: [{
        subject: {
            type: String,
            required: true
        },
        attendance: [{                                 // 10% --> weekly   
            type: Number,                               // 12 Entries
            max: 6
        }],
        interaction: [{                                // 10% --> weekly    
            type: Number,                               // 12 Entries
            max: 6
        }],
        marks: {                                       // 80% --> weekly   
            type: Schema.Types.ObjectId,                // 12 Entries
            ref: Marks
        }
    }]
})

module.exports = mongoose.model('Assessment', assessmentSchema)

/**
 * Interaction mark scheme rough idea:
 * 1 -> un-noticable
 * 2 -> slightly un-noticable
 * 3 -> average
 * 4 -> slightly more-noticable
 * 5 -> more-noticable
 */