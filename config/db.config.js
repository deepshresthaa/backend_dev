const mongoose = require("mongoose");
require("dotenv").config();
function connectDB() {
  mongoose
    .connect(process.env.MONGO_URI)
    .then((res) => {
      console.log("DB connected!");
    })
    .catch((e) => console.error("Error connecting to db"));
}
module.exports = connectDB;
