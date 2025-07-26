const User = require("../models/User");
const OTP = require("../models/OTP");
const Profile = require("../models/Profile");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
//sendOTP
exports.sendOTP = async (req, res) => {
  //fetch email from req.body
  const email = req.body.email;
  //validation
  if (!email) {
    res.status(403).json({
      success: false,
      message: "email field is empty.",
    });
  }
  //check if user already exist
  const checkUserPresent = await findOne({ email });

  //if user aalready exis, then return a response
  if (checkUserPresent) {
    return res.status(401).json({
      success: false,
      message: "User already registered",
    });
  }

  //generate otp
  let otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });
  console.log("Otp generated: ", otp);

  //make sure otp is unique

  const result = await OTP.findOne({ otp: otp });
  while (result) {
    otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    result = await OTP.findOne({ otp: otp });
  }

  //generate otp object
  const otpPayload = { email, otp };

  //save otpPayload to db
  const response = await OTP.create(otpPayload);
  console.log(response);

  //return response

  res.status(200).json({
    success: true,
    message: "OTP sent successfully.",
  });
};
//signup

exports.signUp = async (req, res) => {
  //fetch data
  try {
    const {
      firstName,
      lastName,
      email,
      contactNumber,
      password,
      confirmPassword,
      otp,
      accountType,
    } = req.body;

    //validation
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res.status(401).json({
        success: false,
        message: "Enter all the fields.",
      });
    }

    //match passwords
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Password and confirm password value doesn't match, please try again.",
      });
    }
    //check if user already exists

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists.",
      });
    }

    //if user doesn't exit,find  most recent otp from db

    const recentOtp = await OTP.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);
    console.log(recentOtp);
    // validate otp
    if (recentOtp.length == 0) {
      return res.status(400).json({
        success: false,
        message: "OTP not found",
      });
    } else if (otp !== recentOtp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP.",
      });
    }
    //if validated otp ,hash password
    const hashedPassword = bcrypt.hash(password);

    //enter user to db
    const profileDetails = await Profile.create({
      gender: null,
      dataOfBirth: null,
      about: null,
      contactNumber: null,
    });
    const userObj = {
      firstName,
      lastName,
      email,
      contactNumber,
      accountType,
      password: hashedPassword,
      additionalDetails: profileDetails._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    };
    //response
    return res.status(200).json({
      success: true,
      data: userObj,
      message: "User created!",
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Error creating the user. please try again",
    });
  }
};

//login
exports.login = async (req, res) => {
  try {
    //fetch data from request body
    const { email, password } = req.body;

    //validation
    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "All fields are required.",
      });
    }
    //check if user is not registered
    const user = await User.findOne({ email }).populate("additionalDetails");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not registered. register first.",
      });
    }

    //if registered, compare password
    if (!bcrypt.compare(password, user.password)) {
      return res.status(400).json({
        success: false,
        message: "Incorrect password!",
      });
    }

    //if correct password, set token
    const tokenPayload = {
      email: email,
      id: user._id,
      accountType: user.accountType,
    };
    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    user.token = token;
    user.password = undefined;

    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    res.cookie("token", token, options).status(200).json({
      success: true,
      message: "User logged In.",
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      error: e.message,
      message: "Cannot login. try again.",
    });
  }
};

//changePassword
exports.changePassword = async (req, res) => {
  //fetch data
  const { oldPassword, newPassword, confirmPassword } = req.body;

  //validation
  if (!oldPassword) {
    return;
  }
  //update password in db
  //send mail  password updated

  // return response
};
