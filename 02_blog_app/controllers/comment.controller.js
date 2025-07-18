const commentsDb = require("../models/comment.model");
const postsDb = require("../models/post.model");

exports.createCommentController = async (req, res) => {
  try {
    const { post, user, body } = req.body;
    const comment = await commentsDb.create({ post, user, body });
    const updatePost = await postsDb.findByIdAndUpdate(
      post,
      { $push: { comments: user } },
      { new: true }
    );

    if (!comment) {
      res.status(400).json({
        success: false,
        message: "Database error",
      });
    }
    res.status(201).json({
      success: true,
      data: comment,
      message: "Post created",
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      error: e.message,
      message: "Internal server error",
    });
  }
};

exports.retrieveCommentController = async (req, res) => {
  try {
    const { post, user } = req.body;

    const comment = await commentsDb.find({
      post,
      user,
    });
    if (!comment) {
      res.status(404).json({
        success: false,
        message: "No such entries.",
      });
    }
    res.status(201).json({
      success: true,
      data: comment,
      message: "comment retrieved",
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      error: e.message,
      message: "Internal server error",
    });
  }
};
