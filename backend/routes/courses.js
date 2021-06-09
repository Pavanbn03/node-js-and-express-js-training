const express = require("express");
const router = express.Router();
const db = require("../models");
const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().required(),
  author: Joi.string().min(3),
  tags: Joi.array().items(Joi.string()),
  isPublished: Joi.bool(),
});

router.get("/", async (req, res) => {
  const result = await db.getCourse();
  result ? res.send(result) : res.status(404).send("Not found");
});

router.get("/:id", async (req, res) => {
  const result = await db.getCourse();
  const course = result.find((c) => c.id === req.params.id);

  course ? res.send(course) : res.status(404).send("Not found");
});

router.post("/", async (req, res) => {
  const result = schema.validate(req.body);
  if (result.error) {
    res.status(400).send(result.error);
    return;
  }
  const newCourse = await db.createCourse(req.body);
  res.send(newCourse);
});

router.put("/:id", async (req, res) => {
  const courses = await db.getCourse();
  const course = courses.find((c) => c.id === req.params.id);
  !course && res.status(404).send("Not found");

  const result = schema.validate(req.body);
  if (result.error) {
    res.status(400).send(result.error);
    return;
  }
  const updatedCourse = await db.updateCourse(req.params.id, req.body);
  res.send(updatedCourse);
});

router.delete("/:id", async (req, res) => {
  const courses = await db.getCourse();
  const course = courses.find((c) => c.id === req.params.id);
  if (!course) {
    res.status(404).send("Not found");
    return;
  }
  const deletedData = await db.removeCourse(req.params.id);
  res.send(deletedData);
});

module.exports = router;
