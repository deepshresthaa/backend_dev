const postsDb = require("../models/post.model");

exports.createPostController = async (req, res) => {
  try {
    const { text, body } = req.body;
    const post = await postsDb.create({ text, body });

    if (!post) {
      res.status(400).json({
        success: false,
        message: "Database error",
      });
    }
    res.status(201).json({
      success: true,
      data: post,
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

exports.retrievePostsController = async (req, res) => {
  try {
    const posts = await postsDb.find({});
    if (!posts) {
      res.status(404).json({
        success: false,
        message: "No posts to show.",
      });
    }
    res.status(201).json({
      success: true,
      data: posts,
      message: "Posts fetched",
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      error: e.message,
      message: "Internal server error",
    });
  }
};
