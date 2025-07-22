const mongoose = require("mongoose");

const tagsSchema = new mongoose.Schema({});

module.exports = mongoose.model("Tags", tagsSchema);
