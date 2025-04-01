const mongoose=require("mongoose");

// cropsSchema

const cropsSchema=new mongoose.Schema({
    name:String,
    type:String,
    region:String,
    pricePerQuintal:Number,
    season:String,
    soilType:String,
    waterRequirement:String,
    fertilizerTips:String,
    demand:Number,
    imageURL:String,
    lastUpdated:String,
    additionalNotes:String,

})

const cropsModel = mongoose.model("CropsCollection", cropsSchema, "cropscollections");

module.exports=cropsModel;