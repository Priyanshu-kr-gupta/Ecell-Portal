const mongoose = require('mongoose');

const startupSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    teamMembers: {
        type: Number,
        required: true
    },
    idea: {
        type: String,
        required: true
    },
    stage: {
        type: String,
        required: true
    },
    phase: {
        type: String,
        required: true
    },
    requirements: {
        type: String,
        required: true
    },
    consent: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Startup', startupSchema);
