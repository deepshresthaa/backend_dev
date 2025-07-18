const mongoose = require("mongoose");
const postsSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "like" }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],
});
module.exports = mongoose.model("post", postsSchema);
