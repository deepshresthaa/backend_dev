const express = require("express");
const { dbConnect } = require("./config/database.config");
const { cloudinaryConnect } = require("./config/cloudinary.config");
const fileupload = require("express-fileupload");
require("dotenv").config();

const fileUploadRoutes = require("./routes/fileUpload.route");

const app = express();

//PORT
const PORT = process.env.PORT || 8000;

//middlewares
app.use(express.json());
app.use(fileupload());
//db and cloudinary connect
dbConnect();
cloudinaryConnect();
//mounting
app.use("/api/v1/upload", fileUploadRoutes);
//listen
app.listen(PORT, console.log(`Server started at port ${PORT}`));
