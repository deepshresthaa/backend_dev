const express=require("express");
const { uploadImageController } = require("../controllers/file.controller");
const router=express.Router();

router.post("/uploadImage",uploadImageController);

module.exports=router;