const express = require("express");
const router = express.Router();
const {
  createCommentController,
  retrieveCommentController,
} = require("../controllers/comment.controller");

router.post("/create", createCommentController);
router.get("/retrieve", retrieveCommentController);
module.exports = router;
