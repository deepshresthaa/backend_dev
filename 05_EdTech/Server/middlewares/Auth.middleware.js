const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

//auth

exports.auth = async (req, res, next) => {
  try {
    //extract token
    const token =
      req.body.token ||
      req.cookies.token ||
      req.header("Authorization").replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "token is missing",
      });
    }

    //verify token
    const user = await User.findOne({ token: token });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid token!",
      });
    }

    // decode the token
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    res.user = payload;
    next();
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: "something went wrong while validating token.",
    });
  }
};

//isStudent

exports.isStudent = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Student") {
      return res.status(400).json({
        success: false,

        message: "this  is protected route for students only",
      });
    }

    next();
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified, please try again",
    });
  }
};

//isAdmin
exports.isAdmin = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Admin") {
      return res.status(400).json({
        success: false,
        message: "this is protected route for admin only",
      });
    }
    next();
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified, please try again",
    });
  }
};

//isInstructor

exports.isInstructor = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Instructor") {
      return res.status(400).json({
        success: false,
        message: "this is protected route for instructors only",
      });
    }
    next();
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified, please try again",
    });
  }
};
