const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({});

module.exports = mongoose.model("OTP", otpSchema);
