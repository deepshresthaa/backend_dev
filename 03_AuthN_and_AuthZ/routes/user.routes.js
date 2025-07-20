const express = require("express");
const { signupController } = require("../controllers/signup.controller");
const { loginController } = require("../controllers/login.controller");
const { auth, isAdmin, isStudent } = require("../middlewares/auth");
const router = express.Router();

router.post("/signup", signupController);
router.post("/login", loginController);

//protected routes;

router.get("/admin", auth, isAdmin, (req, res) => {
  res.send("Authorized admin.");
});
router.get("/student", auth, isStudent, (req, res) => {
  res.send("Authorized student.");
});
module.exports = router;
