const bcrypt = require("bcryptjs");
const UserModel= require("../models/userModel");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const emailValidate=await UserModel.findOne({email});
    if(emailValidate){
      console.log("Email already there")
      return res.status(404).json({message:"Email already exsitied"});
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userModel = new UserModel({
      name: name,
      email: email,
      password: hashedPassword,
    });
    await userModel.save();
    res.status(201).json({ message: "User Registered Successfully" });
  } catch (err) {
    res.status(500).json({ message: "error registering user", err });
  }
};
