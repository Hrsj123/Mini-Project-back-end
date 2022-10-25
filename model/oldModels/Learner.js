const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');         // Fore e-mail verification!                 
const Assessment = require('./Assessment');
const Subject = require('./Subject');

const learnerSchema = new Schema({
    fisrtName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNo: {
        type: Number,
        min: 10,
        max: 10
    },
    email: {
        type: String,
        validate: {
            validator: validator.isEmail,
            message: '{value} is not a valid email',
            isAsync: false
        }
    },
    subjectsList: [
        {
            type: Schema.Types.ObjectId,
            ref: Subject
        }
    ],
    totalMarks: {
        type: Assessment        
    }
})

module.exports = mongoose.model('Learner', learnerSchema)