const mongoose=require("mongoose");


const UserSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
})

const userModel=mongoose.model("usermodels",UserSchema);
module.exports=userModel;
