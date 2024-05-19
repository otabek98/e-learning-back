const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
  title: { type: String },
  sub_title: { type: String },
  video_url: { type: String },
  videoName: { type: String },
  section_id: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson" },
  course_id: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
});

const lessonModal = mongoose.model("Lesson", lessonSchema);

module.exports = lessonModal;
