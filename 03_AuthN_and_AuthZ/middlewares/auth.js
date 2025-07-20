const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.auth = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    const token =
      req.body.token ||
      req.cookies.token ||
      (authHeader && authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : null);

    console.log("body:", req.body.token);
    console.log("cookies:", req.cookies.token);

    console.log("header:", req.header("Authorization"));

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Token is empty.",
      });
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Internal server error auth.",
    });
  }
};

exports.isAdmin = async (req, res, next) => {
  try {
    if (req.user.role !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "This route is protected for admin only.",
      });
    }
    next();
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Internal server error admin.",
    });
  }
};

exports.isStudent = async (req, res, next) => {
  try {
    if (req.user.role !== "Student") {
      return res.status(401).json({
        success: false,
        message: "This route is protected for student only.",
      });
    }
    next();
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};
