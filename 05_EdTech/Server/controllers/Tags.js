const Tag = require("../models/Tags");

exports.createTags = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const response = await Tag.create({ name: name, description: description });
    return res.status(201).json({
      success: true,
      response: response,
      message: "Tags created in db successfully.",
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Cannot create tag. try again.",
    });
  }
};

//handler of showing all tags entries

exports.showAllTags = async (req, res) => {
  try {
    const tags = await Tag.find({}, { name: true, description: true });
    return res.status(200).json({
      success: true,
      tags: tags,
      message: "All tags fetched.",
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      error: e.message,
      message: "Failed to show all tags. try again.",
    });
  }
};
