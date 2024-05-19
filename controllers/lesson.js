const Section = require("../modules/section");
const Lesson = require("../modules/lesson");
const Course = require("../modules/course");

exports.createLesson = async (req, res) => {
  try {
    const { title, sub_title, section_id, course_id, video_url } = req.body;
    const course = await Course.findById(course_id);
    const section = await Section.findById(section_id);
    if (!course || !section) {
      return res.status(404).json({ error: "Course or Section not found" });
    }
    const newLesson = new Lesson({
      title,
      sub_title,
      section_id,
      course_id,
      video_url,
    });
    section.lessons.push(newLesson);
    await section.save();
    await newLesson.save();
    res.status(201).json({ message: "Lesson created successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.getLessonById = async (req, res) => {
  try {
    const lessonId = req.params.lessonId;
    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }
    res.status(200).json(lesson);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getAllLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find();
    res.status(200).json(lessons);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
