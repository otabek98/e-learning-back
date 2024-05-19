const Course = require("../modules/course");
const Lesson = require("../modules/lesson");
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate({
      path: "sections",
      populate: {
        path: "lessons",
        modal: "Lesson",
      },
    });

    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getCourseById = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId).populate({
      path: "sections",
      populate: {
        path: "lessons",
        modal: "Lesson",
      },
    });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.createCourse = async (req, res) => {
  try {
    const details = req.body;
    const newCourse = new Course({
      ...details,
    });
    await newCourse.save();
    res.status(201).json({ message: "Course created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateCourse = async (req, res) => {
  const courseId = req.params.courseId;
  const { title, description, price, level } = req.body;
  try {
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    await Course.findByIdAndUpdate(
      courseId,
      { title, description, price, level, image: req.file.filename },
      {
        new: true,
      }
    );

    return res.status(200).json({ message: "Course updated successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;

    const course = await Course.findById(courseId).populate({
      path: "sections",
      populate: {
        path: "lessons",
        modal: "Lesson",
      },
    });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    await Course.findByIdAndDelete(courseId);

    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
