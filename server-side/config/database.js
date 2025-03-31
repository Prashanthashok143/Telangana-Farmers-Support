const mongoose = require("mongoose");

const mongoURI = process.env.MONGODB_URI || "mongodb+srv://prashanthashok143:<db_password>@cluster0.lqicfqy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
exports.dbConnect = () => {
  mongoose
    .connect(mongoURI)
    .then(() => console.log("DB is connected"))
    .catch((err) => console.log(err));
};
