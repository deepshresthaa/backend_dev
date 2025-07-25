const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
      console.log("DB connected.");
    })
    .catch((e) => {
      console.log("Error connected to DB.");
      console.error(e);
      process.exit(1);
    });
};
