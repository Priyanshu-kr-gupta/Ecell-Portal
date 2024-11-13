const mongoose = require('mongoose');

// Define the Event Schema
const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    intro: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    banner: {
        type: String, //cloudinary img url
        required: true
    },
    expectedDate:{
        type:Date,
        required:true
    },
    gallery: {
        type: [String], // cloudinary images url  Array of strings for images
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt timestamps
});

// Create the Event Model
const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
