const schemeModel=require("../models/schemeCollection");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploadScheme/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

exports.uploadScheme = multer({ storage });

exports.addScheme=async(req,res)=>{
  const{name,department,description,eligibility,financialSupport,applicationProcess,frequency,officialWebsite,date} =req.body;
  const URL=`http://localhost:5000/uploadScheme/${req.file.filename}`;
  const newScheme=new schemeModel({
  name:name,
  department:department,
  description:description,
  eligibility:eligibility,
  financialSupport:financialSupport,
  applicationProcess:applicationProcess,
  frequency:frequency,
  officialWebsite:officialWebsite,
  date:date,
  file:URL
});
await newScheme.save()
res.send(newScheme);
console.log(newScheme)

}

exports.getSchemes = async (req, res) => {
  try {
    const schemeData = await schemeModel.find();
    res.send(schemeData);  // Sending the fetched data
  } catch (error) {
    console.error('Error fetching schemes:', error);
    res.status(500).send({ error: 'Internal Server Error' });  // Error handling
  }
};


