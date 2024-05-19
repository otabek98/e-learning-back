const express = require("express");
const { createLesson, getLessonById } = require("../controllers/lesson");
const router = express.Router();
const multer = require("multer");

const storage = multer.memoryStorage({});

const upload = multer({
  storage: storage,
});

router.post("/", upload.single("video"), createLesson);
router.get("/:lessonId", getLessonById);

module.exports = router;
