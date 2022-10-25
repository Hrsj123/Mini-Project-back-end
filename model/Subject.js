const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subjectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    totalMarks: {
        type: Number,                               // ----> For assessing, convert the final marks of 100! -> Divide into 3 parts!
        required: true
    },             
    date: {
        type: Date,
        default: Date.now
    }                     
})

module.exports = mongoose.model('Subject', subjectSchema)