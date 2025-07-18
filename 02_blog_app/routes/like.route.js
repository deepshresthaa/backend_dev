const express = require("express");
const router = express.Router();
const {
  likeController,
  unlikeController,
} = require("../controllers/like.controller");

router.post("/like", likeController);
router.get("/unlike", unlikeController);
module.exports = router;
