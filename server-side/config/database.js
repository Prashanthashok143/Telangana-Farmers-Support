const mongoose = require("mongoose");

const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/telangana_farmers";
exports.dbConnect = () => {
  mongoose
    .connect(mongoURI)
    .then(() => console.log("DB is connected"))
    .catch((err) => console.log(err));
};
