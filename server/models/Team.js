const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  designation: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: 'user.jpg' 
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  linkedin: {
    type: String,
    required:true
  }
});

const TeamMember = mongoose.model('TeamMember', teamSchema);

module.exports = TeamMember;
