const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Learner = require('./Learner');

const subjectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    totalMarks: {
        type: Number,
        required: true
    },
    learnersEnrolled: [
        {
            type: Schema.Types.ObjectId,
            ref: Learner
        }
    ]
})

module.exports = mongoose.model('Subject', subjectSchema)