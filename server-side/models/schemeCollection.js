const mongoose=require("mongoose");

const schemeSchema=new mongoose.Schema({
    name:String,
    department:String,
    description:String,
    eligibility:String,
    financialSupport:String,
    frequency:String,
    applicationProcess:String,
    officialWebsite:String,
    file:String,
    date:Date,   
})

const schemeModel = mongoose.model("schemes", schemeSchema,);
module.exports=schemeModel;