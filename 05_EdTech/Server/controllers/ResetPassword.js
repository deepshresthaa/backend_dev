const User = require("../models/User");
const mailSender = require("../Utils/mailSender");
const bcrypt = require("bcrypt");

exports.resetPasswordToken = async (req, res) => {
  try {
    //get email from req body
    const { email } = req.body;

    //check email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User is not registered.",
      });
    }

    //generate link
    const token = crypto.randomUUID();

    const updateDetails = await User.findOneAndUpdate(
      { email: email },
      { token: token, resetPasswordExpires: Date.now() + 5 * 60 * 1000 },
      { new: true }
    );

    //send mail

    const url = `http://localhost:3000/update-password/${token}`;

    await mailSender(
      email,
      "Reset Your Password ",
      `Click here to reset your password: ${url}`
    );
    return res.json({
      success: true,
      message:
        "Email sent successfully, please check your email and reset your password.",
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "couldn't reset  your password. try again.",
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { password, confirmPassword, token } = req.body;
    //validate
    if (password !== confirmPassword) {
      return res.json({
        success: false,
        message: "Password not matching",
      });
    }
    //get userdetails form db using token
    const userDetails = await User.findOne({ token: token });
    //if no entry=invalid token
    if (!userDetails) {
      return res.json({
        success: false,
        message: "Token in invalid",
      });
    }
    //token time check
    if (userDetails.resetPasswordExpires < Date.now()) {
      return res.json({
        success: false,
        message: "Reset time past. regenerate token again.",
      });
    }
    //hashpassword
    const hashedPassword = bcrypt.hash(password);
    //update password
    await User.findOneAndUpdate(
      { token: token },
      {
        password: hashedPassword,
      },
      { new: true }
    );
    //return response
    return res.status(200).json({
      success: true,
      message: " password reset successfully.",
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Couldn't reset password. try again.",
    });
  }
};
