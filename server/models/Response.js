const mongoose = require('mongoose')

const answerSchema = new mongoose.Schema(
    {
        questionId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'EcellForm.questions',
            require:true
        },
        type: {
            type: String,
            enum: ['Short Answer','Paragraph','Multiple Choice','Dropdown','Checkboxes'],
            required: true
          },
        answer: {
            type: String,
        }
    }
)

const responseSchema= new mongoose.Schema({
    formId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EcellForm',
        required: true,
      },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
      },
      answers: [answerSchema], 
      submittedAt: {
        type: Date,
        default: Date.now,
      },
},{ timestamps: true })

module.exports = mongoose.model('Response', responseSchema);

