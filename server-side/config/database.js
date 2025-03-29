const mongoose = require("mongoose");
exports.dbConnect = () => {
  mongoose
    .connect("mongodb://localhost:27017/telangana_farmers")
    .then(() => console.log("DB is connected"))
    .catch((err) => console.log(err));
};
