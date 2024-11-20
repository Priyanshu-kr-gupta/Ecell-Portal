const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true, 
  },
  type: {
    type: String,
    enum: ['Short Answer','Paragraph','Multiple Choice','Dropdown','Checkboxes'], 
    required: true, 
  },
  options: {
    type: [String], 
    default: [],
  },
  required: {
    type: Boolean,
    default: false,
  },
});

const formSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, 
  },
  description: {
    type: String,
    default: '', 
  },
  questions: {
    type: [questionSchema],
    required: true,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  endDate: {
    type: Date,
    default: null,
  },
  
}, { timestamps: true }); 

module.exports = mongoose.model('EcellForm', formSchema);
