const express=require("express");
const app=express();
const router=require("./routes/Routes")
const {dbConnect}=require("./config/database");
const cors=require("cors");

// Database calling
dbConnect();

// Middleware 
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//  folder publicly accessible
//This tells Express to serve files from the uploads and uploadScheme/  directory when accessing /uploads/ /uploadScheme/filename.
app.use('/uploads', express.static('uploads'));
app.use("/uploadScheme", express.static("uploadScheme"));
app.use(cors())
// app.use(cors({ origin: "https://telangana-farmers-support-qxyq3bfm7.vercel.app/", credentials: true }));



//Routes

app.use(router);

// Start server 
PORT=process.env.PORT || 5000;
app.listen(PORT,()=>console.log(`Server running on http://localhost:${PORT}`))
