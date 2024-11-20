const mongoose = require('mongoose')
const noticeShema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    link: {
        type: String,
        default: ''
    }
},{ timestamps: true});

const Notice = mongoose.model('Notice', noticeShema);
module.exports = Notice