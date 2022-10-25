const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Subject = require('./Subject');
const Marks = require('./Marks');

const assessmentSchema = new Schema({
    subjectName: {
        type: Subject,
        required: true
    },
    attendance: [{                                      // 10%
        type: Boolean,
        date: Date,
        required: true
    }],
    interaction: [{                                     // 10%
        type: Number,
        date: Date,
        required: true
    }],
    marks: [{                                           // 80%
        type: Marks,
        required: true
    }]
})

module.exports = mongoose.model('Assessment', assessmentSchema)