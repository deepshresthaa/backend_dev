const mongoose = require("mongoose");
require("dotenv").config();
exports.connectDb = async () => {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("Db connected.");
    })
    .catch((e) => console.log("Db failed to connect."));
};
