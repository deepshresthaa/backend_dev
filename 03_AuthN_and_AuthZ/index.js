const express = require("express");
require("dotenv").config();
const { connectDb } = require("./config/database");
const userRoute = require("./routes/user.routes");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use(cookieParser());
connectDb();

//mounting

app.use("/api/v1", userRoute);

app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});
