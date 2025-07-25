const mongoose = require("mongoose");

const subSectionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  timeDuration: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  videlUrl: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Subsection", subSectionSchema);
