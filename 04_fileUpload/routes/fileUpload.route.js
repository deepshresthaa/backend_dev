const express = require("express");
const {
  localFileUpload,
  uploadSizeReducedImage,
  uploadVideo,
  uploadImage,
} = require("../controllers/file.controller");
const router = express.Router();

router.post("/localFileUpload", localFileUpload);
router.post("/uploadImage", uploadImage);
router.post("/uploadVideo", uploadVideo);
router.post("/uploadSizeReducedImage", uploadSizeReducedImage);

module.exports = router;
