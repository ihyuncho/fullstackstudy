const mongoose = require('mongoose');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

const surveySchema = new Schema({
    title: String,
    body: String,
    subject: String,
    recipients: [RecipientSchema], //[ ] = array of 
    yes: { type: Number, default: 0 },
    no: { type: Number, default: 0 },
    //_## means convention of relationship
    _user: { type: Schema.Types.ObjectId, ref: 'User' }, // reference for particular user
    dateSent: Date,
    lastResponded: Date
});

mongoose.model('surveys', surveySchema);