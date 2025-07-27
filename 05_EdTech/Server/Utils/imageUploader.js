const cloudinary = require("cloudinary").v2;

exports.imageUploadToCloudinary = async (file, folder, height, quality) => {
  try {
    const options = { folder };
    if (height) {
      options.height = height;
    }
    if (quality) {
      options.quality = quality;
    }
    options.resource_type = "auto";

    await cloudinary.uploader.upload(file.tempFilePath, options);
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Couldn't save file to cloudinary. try again.",
    });
  }
};
