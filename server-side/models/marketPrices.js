const mongoose=require("mongoose");

// Schema;
const marketPriceSchema=new mongoose.Schema({
    cropName:String,
    marketName:String,
    pricePerQuintal:Number,
    date:Date,
});

//Model
const marketPriceModel = mongoose.model("MarketPrice", marketPriceSchema, "marketprices");
module.exports=marketPriceModel;
