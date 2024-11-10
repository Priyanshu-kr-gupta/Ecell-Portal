const mongoose=require('mongoose');
const userSchema= new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true,
        unique:true 
    },
    Password:{
        type:String,
        required:true
    },
    Reg_No:{
        type:String,
        required:true
    },
    Contact_No:{
        type:String,
        required:true
    },
    Date:{
        type:Date,
        default:Date.now
    },
    Role:{
        type:String,
        default:"user"
    }
});

module.exports=mongoose.model('user',userSchema);