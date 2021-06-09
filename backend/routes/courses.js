const express = require("express");
const router = express.Router();
const CourseController = require("../controllers/courses");

router.get("/", CourseController.getCourse);

router.get("/:id", CourseController.getCourse);

router.post("/", CourseController.createCourse);

router.put("/:id", CourseController.updateCourse);

router.delete("/:id", CourseController.removeCourse);

module.exports = router;
