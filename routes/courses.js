const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Joi = require("joi");

mongoose
  .connect("mongodb://localhost/playground", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Mongodb connected");
  })
  .catch((err) => console.log("Error", err));

const schema = Joi.object({
  name: Joi.string().min(3),
  author: Joi.string().min(3),
  tags: Joi.array().items(Joi.string()),
  isPublished: Joi.bool(),
});
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema);

const createCourse = async (body) => {
  const result = schema.validate(body);
  if (result.error) {
    res.status(400).send(result.error);
    return;
  }
  const { name, author, tags, isPublished } = body;
  const course = new Course({
    name: name,
    author: author,
    tags: tags,
    isPublished: isPublished,
  });
  const data = await course.save();
  return data;
};
const getCourse = async () => {
  const courses = await Course.find({})
    // .find({ price: { $gt: 10, $lt: 20 } }) comparisson operators
    // .find({ price: { $in: [10, 15, 20] } })
    // .find({ name: /^Rea/i })
    // .or([{ name: "Pavan" }, { isPublished: true }])
    // .and([{ author: "BN" }])
    .limit(10)
    .sort({ name: -1 });

  // .countDocuments(); // displays number od documents
  return courses;
};
const updateCourse = async (id, body) => {
  const courses = await getCourse();
  const course = courses.find((c) => c.id === id);
  !course && res.status(404).send("Not found");

  const result = schema.validate(body);
  if (result.error) {
    res.status(400).send(result.error);
    return;
  }
  const coursedb = await Course.findById(id);
  coursedb.set({ ...body });
  const data = await coursedb.save();
  return data;
};
const removeCourse = async (id) => {
  const courses = await getCourse();
  const course = courses.find((c) => c.id === id);

  if (!course) {
    res.status(404).send("Not found");
    return;
  }

  const data = await Course.deleteOne({ _id: id });
  return data;
};

router.get("/", async (req, res) => {
  const result = await getCourse();
  res.send(result);
});

router.get("/:id", async (req, res) => {
  const result = await getCourse();
  const course = result.find((c) => c.id === req.params.id);

  course ? res.send(course) : res.status(404).send("Not found");
});

router.post("/", async (req, res) => {
  const newCourse = await createCourse(req.body);
  res.send(newCourse);
});

router.put("/:id", async (req, res) => {
  const updatedCourse = await updateCourse(req.params.id, req.body);
  res.send(updatedCourse);
});

router.delete("/:id", async (req, res) => {
  const deletedData = await removeCourse(req.params.id);
  res.send(deletedData);
});

module.exports = router;
