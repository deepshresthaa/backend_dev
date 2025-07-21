const cloudinary = require("cloudinary");
const fileCollection = require("../models/file.model");
exports.localFileUpload = async (req, res) => {
  const file = req.files.file;

  const path =
    __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;

  file.mv(path, () => {
    console.log("error uploading the image.");
  });

  res.status(200).json({
    success: true,
    message: "file uploaded to the server.",
  });
};

async function uploadFileToCloudinary(file, folder, ext, quality = 100) {
  const options = {
    folder,
    resource_type: ["mp4", "mov"].includes(ext) ? "video" : "image",
    quality: quality,
  };

  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.uploadImage = async (req, res) => {
  try {
    //fetch data
    const { name, tags, email } = req.body;
    const file = req.files.imageFile;

    //validate image extension
    const suppertedExtensions = ["jpg", "jpeg", "png"];
    const fileExtension = file.name.split(".")[1];
    const isValidExt = suppertedExtensions.includes(fileExtension);

    //if valid extension, save image to cloudinary

    if (!isValidExt) {
      res.status(400).json({
        success: false,
        message: "Invalid image extension.",
      });
    }

    const response = await uploadFileToCloudinary(
      file,
      "Cloudinary",
      fileExtension
    );

    //save url to the database
    const image = await fileCollection.create({
      name,
      email,
      tags,
      fileUrl: response.url,
    });

    //successful response

    res.status(201).json({
      success: true,
      data: image,
      message: "Image uploaded successfully",
    });
  } catch (e) {
    console.log("error while uploading the image.");

    res.status(500).json({
      success: false,
      error: e.message,
      message: "internal server error.",
    });
  }
};
exports.uploadVideo = async (req, res) => {
  try {
    const { name, email, tags } = req.body;
    const file = req.files.videoFile;

    const supportedExt = ["mp4", "mov"];
    const fileExt = file.name.split(".")[1];
    console.log(fileExt);

    const isValidExt = supportedExt.includes(fileExt);

    if (!isValidExt) {
      res.status(400).json({
        success: false,
        message: "Invalid video extension.",
      });
    }
    console.log("before response.");
    const response = await uploadFileToCloudinary(file, "Cloudinary", fileExt);
    console.log("after response.");

    console.log("before video.");

    const video = await fileCollection.create({
      name,
      email,
      tags,
      fileUrl: response.url,
    });

    console.log("after response.");

    res.status(201).json({
      success: true,
      data: video,
      message: "Video uploaded successfully.",
    });
  } catch (e) {
    console.log("couldn't upload video to cloudinary.", e);
    res.status(500).json({
      success: false,
      error: e.message,
      message: "Internal server error.",
    });
  }
};
exports.uploadSizeReducedImage = async (req, res) => {
  try {
    //fetch data
    const { name, tags, email } = req.body;
    const file = req.files.imageFile;

    //validate image extension
    const suppertedExtensions = ["jpg", "jpeg", "png"];
    const fileExtension = file.name.split(".")[1];
    const isValidExt = suppertedExtensions.includes(fileExtension);

    //if valid extension, save image to cloudinary

    if (!isValidExt) {
      res.status(400).json({
        success: false,
        message: "Invalid image extension.",
      });
    }
    const quality = 50;
    const response = await uploadFileToCloudinary(
      file,
      "Cloudinary",
      fileExtension,
      quality
    );

    //save url to the database
    const image = await fileCollection.create({
      name,
      email,
      tags,
      fileUrl: response.url,
    });

    //successful response

    res.status(201).json({
      success: true,
      data: image,
      message: "Image uploaded successfully",
    });
  } catch (e) {
    console.log("error while uploading the image.");

    res.status(500).json({
      success: false,
      error: e.message,
      message: "internal server error.",
    });
  }
};
