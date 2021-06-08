const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/", async (req, res) => {
  const result = await db.getCourse();
  res.send(result);
});

router.get("/:id", async (req, res) => {
  const result = await db.getCourse();
  const course = result.find((c) => c.id === req.params.id);

  course ? res.send(course) : res.status(404).send("Not found");
});

router.post("/", async (req, res) => {
  const newCourse = await db.createCourse(req.body);
  res.send(newCourse);
});

router.put("/:id", async (req, res) => {
  const updatedCourse = await db.updateCourse(req.params.id, req.body);
  res.send(updatedCourse);
});

router.delete("/:id", async (req, res) => {
  const deletedData = await db.removeCourse(req.params.id);
  res.send(deletedData);
});

module.exports = router;
