const express = require("express");
const router = express.Router();
const {
  createPostController,
  retrievePostsController,
} = require("../controllers/post.controller");

router.post("/create", createPostController);
router.get("/retrieve", retrievePostsController);
module.exports = router;
