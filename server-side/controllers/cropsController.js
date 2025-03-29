const cropsModel = require("../models/cropsCollection");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

exports.upload = multer({ storage });

exports.addCrop = async (req, res) => {
  // console.log(req.body)
  const today = new Date().toISOString().split('T')[0];
  try {
    const { name,type,region,pricePerQuintal,season,soilType,waterRequirement,fertilizerTips,demand,additionalNotes} = req.body;
    const URL = `http://localhost:5000/uploads/${req.file.filename}`;
    const newCrop = new cropsModel({
      name: name,
      type:type,
      region:region,
      pricePerQuintal:pricePerQuintal,
      season:season,
      soilType:soilType,
      waterRequirement:waterRequirement,
      fertilizerTips:fertilizerTips,
      demand:demand,
      imageURL: URL,
      lastUpdated:today,
      additionalNotes:additionalNotes,
      
    });
    await newCrop.save();
    res.status(201).send({message:"Data posted Successfully"});
  } catch (error) {
    res.send(error);
  }
};

exports.getCrop = async (req, res) => {
  try {
    const getCrop = await cropsModel.find();
    res.send(getCrop);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
