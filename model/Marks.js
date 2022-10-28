// Supports Assessment!
// Here, we can add more complexity in 'score' in subject, sub-concept based marks destribution, to draw out mre complex analysis and feedback
const mongoose = require('mongoose');
const Schema = mongoose.Schema;         

const Learner = require('./Learner');

// For "different tests" for a praticular "subject" for a "single learner"       --> 
const markSchema = new Schema({                    // Id of this "array" of marks schema --> _id
    isCreated: {
        type: Boolean,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    marks: [{
        score: {            //  12
            type: Number, 
            max: 15,
            default: 0,
            required: true
        },
        testNumber: {               // To replace time! 
            type: Number,
            max: 12,
            required: true
        }
    }]
});


module.exports = mongoose.model('Marks', markSchema)