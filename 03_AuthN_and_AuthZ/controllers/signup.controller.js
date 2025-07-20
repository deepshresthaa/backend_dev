const { users } = require("../models/user.model");
const bcrypt = require("bcrypt");
exports.signupController = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const isAlreadyAUser = await users.findOne({ email });
    if (isAlreadyAUser) {
      res.status(400).json({
        success: false,
        message: "User already exists.",
      });
    }
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (e) {
      res.status(400).json({
        success: false,
        message: "Error in hashing password.",
      });
    }
    const createUser = await users.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
    res.status(201).json({
      success: true,
      message: "User created.",
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "User cannot be created.",
      error: e.message,
    });
  }
};
