const { users } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const { useReducer } = require("react");
require("dotenv").config();

exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await users.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User is not registered.",
      });
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const payload = {
      email: email,
      id: user._id,
      role: user.role,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    user = user.toObject();
    user.token = token;
    user.password = undefined;

    const options = {
      expires: new Date(Date.now() + 60 * 60 * 24 * 1000),
      httpOnly: true,
    };
    res.cookie("token", token, options).status(200).json({
      success: true,
      data: user,
      token: token,
      message: "User login successful.",
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      error: e.message,
      message: "User failed to login, internal server error.",
    });
  }
};
