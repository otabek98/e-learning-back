const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
  course_id: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  title: { type: String },
  description: { type: String },
  lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }],
});

const sectionModal = mongoose.model("Section", sectionSchema);

module.exports = sectionModal;
