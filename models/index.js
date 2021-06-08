const mongoose = require("mongoose");
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

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});
const schema = Joi.object({
  name: Joi.string().min(3),
  author: Joi.string().min(3),
  tags: Joi.array().items(Joi.string()),
  isPublished: Joi.bool(),
});

const Course = mongoose.model("Course", courseSchema);

module.exports.getCourse = async () => {
  const courses = await Course.find();
  return courses;
};
const getCourse = async () => {
  const courses = await Course.find();
  return courses;
};
module.exports.createCourse = async (body) => {
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

module.exports.updateCourse = async (id, body) => {
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
module.exports.removeCourse = async (id) => {
  const courses = await getCourse();
  const course = courses.find((c) => c.id === id);

  if (!course) {
    res.status(404).send("Not found");
    return;
  }

  const data = await Course.deleteOne({ _id: id });
  return data;
};
