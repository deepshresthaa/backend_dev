exports.uploadImageController = async (req, res) => {
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
