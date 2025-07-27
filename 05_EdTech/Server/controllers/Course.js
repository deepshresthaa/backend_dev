const User = require("../models/User");
const Tag = require("../models/Tags");
const Course = require("../models/Course");
const Section = require("../models/Section");
const ratingAndReview = require("../models/RatingAndReview");

const { imageUploadToCloudinary } = require("../Utils/imageUploader");

exports.createCourse = async (req, res) => {
  try {
    const { courseName, courseDescription, whatYouWillLearn, price, tag } =
      req.body;

    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !tag
    ) {
      return res.status(401).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const thumbnail = req.files.thumbnailImage;
    if (!thumbnail) {
      return res.status(404).json({
        success: false,
        message: "File is empty",
      });
    }

    const userId = req.user.id;
    const instructorDetails = await User.findById(userId);

    if (!instructorDetails) {
      return res.status(400).json({
        success: false,
        message: "Instructor detail not found",
      });
    }

    const tagDetails = await Tag.findById({ tag });
    if (!tagDetails) {
      return res.status(400).json({
        success: false,
        message: "Tag Details not found",
      });
    }

    const imageUrl = await imageUploadToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );

    const section = await Section.create({
      sectionName: null,
      subSection: null,
    });

    const rating = await ratingAndReview.create({
      user: null,
      rating: null,
      review: null,
    });

    const courseObj = {
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatYouWillLearn,
      courseContent: section._id,
      ratingAndReview: rating._id,
      price,
      thumbnail: imageUrl.secure_url,
      tag: tagDetails._id,
      studentsEnrolled,
    };

    const course = await Course.create(courseObj);

    const updateInstructorCourses = await User.findByIdAndUpdate(
      { _id: instructorDetails._id },
      {
        $push: { $courses: course._id },
      },
      { new: true }
    );

    const updateTagCourses = await Tag.findByIdAndUpdate(
      { _id: tagDetails._id },
      {
        $push: { $courses: course._id },
      }
    );

    return res.status(201).json({
      success: true,
      courseDetails: course,
      message: "Course Created Successfully.",
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Cannot create course. Try again.",
    });
  }
};

exports.showAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({});
    res.status(200).json({
      success: true,
      courses: courses,
      message: "All courses fetched.",
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Couldn't show all courses. Try again.",
    });
  }
};
