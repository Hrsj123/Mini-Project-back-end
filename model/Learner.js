const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');         // Fore e-mail verification!                 

const Assessment = require('./Assessment');
const Subject = require('./Subject');

const learnerSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNo: {
        type: Number,
        min: 1000000000,
        max: 9999999999
    },
    email: {
        type: String,
        validate: {
            validator: validator.isEmail,
            message: 'This format is not a valid email!',
            isAsync: false
        }
    },
    subjectsList: [
        {
            type: Schema.Types.ObjectId,
            ref: Subject
        }
    ],
    totalMarks: [                                           // This is a subject, dependent field! 
        {
            type: Schema.Types.ObjectId,
            ref: Assessment
        }
    ]
})

module.exports = mongoose.model('Learner', learnerSchema)