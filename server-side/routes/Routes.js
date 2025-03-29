const express=require("express");
const router=express.Router();
const cropsController=require("../controllers/cropsController");
const {upload}=require("../controllers/cropsController");
const {uploadScheme}=require("../controllers/schemeController")
const marketController=require("../controllers/marketController");
const schemaController=require("../controllers/schemeController")


// cropCollection
router.post("/addCrop",upload.single("imageURL"),cropsController.addCrop);
router.get("/getCrop",cropsController.getCrop);

//marketPrices
router.post("/addMarketPrice",marketController.addPrice);
router.get("/marketPrices",marketController.getPrices);
router.get("/marketPrices/:id",marketController.getDataById)
router.put("/updatePrice/:id",marketController.updatePrices)
router.delete("/deletePrice/:id",marketController.deletePrice)

//schemes
router.post("/addSchemes",uploadScheme.single("file"),schemaController.addScheme);
router.get("/getSchemes",schemaController.getSchemes)
module.exports=router;

module.exports=router; 