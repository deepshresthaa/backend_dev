const mongoose = require("mongoose");
require("dotenv").config();

exports.dbConnect = async () => {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log("DB connected."))
    .catch((e) => console.log("Failed to connect DB."));
};
