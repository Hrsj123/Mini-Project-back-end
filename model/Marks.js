// Supports Assessment!
// Here, we can add more complexity in 'score' in subject, sub-concept based marks destribution, to draw out mre complex analysis and feedback
const mongoose = require('mongoose');
const Schema = mongoose.Schema;         

const marksSchema = new Schema({
    testResult: [{                                          // Of 80
        score: {
            type: Number, 
            max: 80
            // ,
            // required: true
        },
        date: {
            type: Date,
            default: Date.now
        }
    }]
})

module.exports = mongoose.model('Marks', marksSchema)