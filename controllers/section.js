const Section = require("../modules/section");
const Course = require("../modules/course");

exports.createSection = async (req, res) => {
  try {
    const { course_id, title, description } = req.body;

    const course = await Course.findById(course_id);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    const newSection = new Section({
      course_id,
      title,
      description,
    });

    course.sections.push(newSection);
    await course.save();
    await newSection.save();
    res.status(201).json({ message: "Section created successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

exports.getAllSections = async (req, res) => {
  try {
    const section = await Section.find();
    res.status(200).json(section);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getSectionsById = async (req, res) => {
  const { course_id } = req.params;
  try {
    const sections = await Section.find({ course_id });
    res.status(200).json(sections);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.updateSection = async (req, res) => {
  const sectionId = req.params.sectionId;
  const { title, description, courseId } = req.body;

  try {
    const section = await Section.findById(sectionId);

    if (!section) {
      return res.status(404).json({ message: "Section not found" });
    }
    await Section.findByIdAndUpdate(
      sectionId,
      { title, description, courseId },
      {
        new: true,
      }
    );

    return res.status(200).json({ message: "Section updated successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.deleteSection = async (req, res) => {
  try {
    const sectionId = req.params.sectionId;

    const section = await Section.findById(sectionId);

    if (!section) {
      return res.status(404).json({ message: "Section not found" });
    }

    await section.findByIdAndDelete(sectionId);

    res.status(200).json({ message: "section deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
