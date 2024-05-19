const express = require("express");
const {
  createSection,
  getAllSections,
  updateSection,
  getSectionsById,
} = require("../controllers/section");
const router = express.Router();

router.post("/", createSection);
router.get("/", getAllSections);
router.put("/:sectionId", updateSection);
router.get("/:course_id", getSectionsById);

module.exports = router;
