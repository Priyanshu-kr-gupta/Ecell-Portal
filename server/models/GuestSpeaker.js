const mongoose = require('mongoose');

const guestSpeakerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    intro: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    linkedin: {
        type: String,
    },
   
});

module.exports = mongoose.model('GuestSpeaker', guestSpeakerSchema);
