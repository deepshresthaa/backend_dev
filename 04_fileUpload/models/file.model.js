const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String,
  },
  email: {
    type: String,
  },
  tags: {
    type: String,
  },
});

module.exports = mongoose.model("fileCollection", fileSchema);
