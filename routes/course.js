const express = require("express");
const {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/course");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
});

router.post("/updateCourse/:courseId", upload.single("image"), updateCourse);
router.post("/", upload.single("image"), createCourse);
router.delete("/:courseId", deleteCourse);
router.get("/getAllCourses", getAllCourses);
router.get("/:courseId", getCourseById);

module.exports = router;
