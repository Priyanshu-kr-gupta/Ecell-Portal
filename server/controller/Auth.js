const nodemailer = require('nodemailer')
const bcrypt= require('bcryptjs');
const User= require('../models/User')
const tempUser = require("../models/Tempuser")
const jwt=require('jsonwebtoken');
const JWT_SECRET="ecellPortal";



const sendOtp = async(req,res)=>{
  const email=req.body.email;
  let otp = Math.floor(1000 + Math.random() * 9000);
  const transporter = nodemailer.createTransport(
  {
      service:'gmail',
      auth:
      {
          user:'',
          pass:''
      }
  }
  )   
  var mailOptions ={
    from:'',
    to: `${email}`,
    subject:'otp checking',
    text:`${otp}`

  }

  otp=toString(otp);
  transporter.sendMail(mailOptions, async function(error, info){

    if (error) {
    return res.status(500).json({ msg: 'Failed to send OTP', status: false });
    } else {
      const salt=await bcrypt.genSalt(10)
      const encOtp=await bcrypt.hash(otp,salt)
   
        let tmp= new tempUser({
        email,
        otp:encOtp
    }) 
    await tmp.save().then(()=>{
        res.json({msg:"otp sended succesfully",status:true})
        setTimeout(async () => {
          await tempUser.deleteOne({ email });
        }, 30000);
    })
    }

  });

}





const verifyOtp = async(req,res)=>{
  const email=req.body.email;
  const otp=req.body.otp;
  try{
  let user=await tempUser.findOne({email})
  if(!user){
      return res.status(400).json({msg:"OTP expired or not found. Please request a new OTP." })
  }
  const otpCompare=await bcrypt.compare(user.otp,otp)
if(!otpCompare)
      res.json({status:true,msg:"Successfully Login"})
  else
  return res.status(401).json({ msg: "Invalid OTP. Please try again." });
  
} catch (error) {
  res.status(500).send({msg:"Internal server error occured"})
}
}




const registerUser = async(req,res)=>{
  let signup=false
  
  let user=await User.findOne({email:req.body.email})
  if(user){
      return res.status(409).json({msg:"Email already exists"})
  }
  const salt=await bcrypt.genSalt(10);
  const secPass=await bcrypt.hash(req.body.password,salt)
  
  user=await new User({
      Name:req.body.name,
      Email:req.body.email,
      Password:secPass,
      Reg_No:req.body.registrationNumber,
      Contact_No:req.body.contactNumber

  }) 
  const Authdata=req.body.registrationNumber

  user.save().then(()=>{
      const authToken =jwt.sign(Authdata,JWT_SECRET);
      signup=true
      res.json({authToken,signup,msg:"Registered Successfully",userId:user._id})
  })
}   



const login = async(req,res)=>{
     let status=false
   
    const {email,password,role}=req.body
    try {
        let user=await User.findOne({Email:email})
        if(!user){
            return res.status(401).json({status,msg:"Incorrect email or password. Please try again."})
        }
        const passwordCompare=await bcrypt.compare(password,user.Password)
        if(!passwordCompare)
        {
            return res.status(401).json({status,msg:"Incorrect email or password. Please try again."})
        }
        if(role!==user.Role)
        {
            return res.status(401).json({status,msg:"Incorrect email or password. Please try again."})
        }
        status=true
        const data=user.Reg_No        
        const authToken =jwt.sign(data,JWT_SECRET);
        res.json({authToken,status,msg:"Successfully Login",userId:user._id})
        
        
    } catch (error) {
        res.status(500).send({msg:"Internal server error occured"})
    }
}


module.exports ={sendOtp,verifyOtp,registerUser,login}