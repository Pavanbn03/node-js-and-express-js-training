const express = require("express");
const router = express.Router();
const Joi = require("joi");
let courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

const schema = Joi.object({
  name: Joi.string().min(3).required(),
});

router.get("/", (req, res) => {
  res.send(courses);
});

router.get("/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));

  course ? res.send(course) : res.status(404).send("Not found");
});

router.post("/", (req, res) => {
  const result = schema.validate(req.body);
  if (result.error) {
    res.status(400).send(result.error);
    return;
  }
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);

  res.send(courses);
});

router.put("/:id", (req, res) => {
  console.log("inside");
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  !course && res.status(404).send("Not found");

  const result = schema.validate(req.body);
  if (result.error) {
    res.status(400).send(result.error);
    return;
  }

  course.name = req.body.name;
  res.send(courses);
});

router.delete("/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));

  if (!course) {
    res.status(404).send("Not found");
    return;
  }

  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(courses);
});

module.exports = router;
