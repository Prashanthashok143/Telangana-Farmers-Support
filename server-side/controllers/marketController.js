const marketPriceModel=require("../models/marketPrices");
const moment=require("moment")

exports.addPrice=async(req,res)=>{
   try{
    const marketPrices=new marketPriceModel(req.body);
    await marketPrices.save();
    res.status(201).send("Price successfully added")
   }
   catch(err){
     res.status(500).send(err.message);
   }
}

exports.getPrices=async(req,res)=>{
  
  try{
    const search=req.query.search || "";
    const district=req.query.district || "";
    const frequency=req.query.frequency;
    const range=req.query.range;
    const data=range.split(",")
    const query={
      cropName:{$regex:search,$options:"i"},
      ...(frequency!=="custom" ? {
        date:{ $gt : moment().subtract(Number(frequency),"d").toDate()}
      }:{
        date:{
          $gte:data[1],
          $lte:data[3],
        }
      }

       )
    }
    if(district !=="All"){
      query.marketName={ $regex:district, $options: 'i' };
    }

    
  const Data = await marketPriceModel.find(query).sort({date:-1});
    res.status(200).send(Data)
  }catch(err){
    res.status(500).send(err)
  }
}

exports.getDataById=async(req,res)=>{
  const id=req.params.id;
  const data=await marketPriceModel.findById({_id:id});
  res.send(data)

}
exports.updatePrices = async (req, res) => {
  try {
    const priceId = req.params.id; // Extract price ID from request params
    const updatedPrice = await marketPriceModel.findByIdAndUpdate(
      priceId, 
      {
        cropName: req.body.cropName,
        marketName: req.body.marketName,
        pricePerQuintal: req.body.pricePerQuintal,
        date: req.body.date,
      },
      { new: true } // Return updated document
    );

    if (!updatedPrice) {
      return res.status(404).json({ message: "Price data not found" });
    }

    res.status(200).json({ message: "Price updated successfully", updatedPrice });
  } catch (err) {
    console.error("Error updating price:", err);
    res.status(500).json({ message: "Server error", error: err });
  }
};

exports.deletePrice = async (req, res) => {
  try {
      const del_id = req.params.id;
      const deletedPrice = await marketPriceModel.findByIdAndDelete(del_id);
      
      if (!deletedPrice) {
          return res.status(404).json({ message: "Price entry not found" });
      }

      res.status(200).json({ message: "Deleted successfully", deletedPrice });
  } catch (error) {
      res.status(500).json({ message: "Error deleting price", error });
  }
};
