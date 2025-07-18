const likesDb = require("../models/like.model");
const postsDb = require("../models/post.model");
exports.likeController = async (req, res) => {
  try {
    const { post, user } = req.body;
    const like = await likesDb.create({ post, user });

    const updatedLike = await postsDb.findByIdAndUpdate(
      post,
      { $push: { likes: user } },
      { new: true }
    );

    if (!like) {
      res.status(400).json({
        success: false,
        message: "Database error",
      });
    }
    res.status(201).json({
      success: true,
      data: like,
      message: "Post liked",
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      error: e.message,
      message: "Internal server error",
    });
  }
};

exports.unlikeController = async (req, res) => {
  try {
    const { post, user } = req.body;

    await likesDb.findByIdAndDelete(user);

    const unlike = await postsDb.findByIdAndUpdate(
      post,
      { $pull: { likes: user } },
      { new: true }
    );

    res.status(201).json({
      success: true,
      data: unlike,
      message: "post unliked",
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      error: e.message,
      message: "Internal server error",
    });
  }
};
