const mongoose = require("mongoose");

const mongoURI = process.env.MONGODB_URI || "mongodb+srv://prashanthashok143:Prashanth%4096030@cluster0.lqicfqy.mongodb.net/telangana_farmers?retryWrites=true&w=majority&appName=Cluster0";
exports.dbConnect = () => {
  mongoose
    .connect(mongoURI)
    .then(() => console.log("DB is connected"))
    .catch((err) => console.log(err));
};
