const mongoose = require("mongoose");

const ratingAndReviewSchema = new mongoose.Schema({});

module.exports = mongoose.model("RatingAndReview", ratingAndReviewSchema);
