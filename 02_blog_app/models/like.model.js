const mongoose = require("mongoose");
const likesSchema = new mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "post",
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("like", likesSchema);
