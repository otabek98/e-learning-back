const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: { type: String },
    sub_title: { type: String },
    description: { type: String },
    price: { type: String },
    level: { type: String },
    img_url: { type: String },
    imageName: { type: String },
    number_section: { type: String },
    image: { type: Object },
    sections: [{ type: mongoose.Schema.Types.ObjectId, ref: "Section" }],
  },
  {
    timestamps: true,
  }
);

const courseModal = mongoose.model("Course", courseSchema);

module.exports = courseModal;
