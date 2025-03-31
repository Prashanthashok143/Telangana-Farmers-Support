const UserModel= require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET =  "mySecretKey";

exports.Signin=async(req,res)=>{
try{
    const {email,password}=req.body;
    const emailValidate=await UserModel.findOne({email});
    console.log(emailValidate)
    if(!emailValidate){
        return res.status(404).json({message:"Email not exsits"});
      }
      const pwdMatch= await bcrypt.compare(password,emailValidate.password);
      if(!pwdMatch){
        return res.status(404).json({message:"Password not matched"});
      }
      const token = jwt.sign({ id: emailValidate._id }, JWT_SECRET);
      console.log(token)

      res.json({ token, userId: emailValidate._id, name: emailValidate.name, email: emailValidate.email });
}catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
}