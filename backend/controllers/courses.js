const { Course, schema } = require("../models");

module.exports.getCourse = async (req, res) => {
  try {
    if (req.params.id) {
      const course = await Course.findById(req.params.id);

      course ? res.send(course) : res.status(404).send("Not found");
    } else {
      const courses = await Course.find();
      courses ? res.send(courses) : res.status(404).send("Not found");
    }
  } catch (exp) {
    res.send(exp.message);
  }
};

module.exports.createCourse = async (req, res) => {
  const result = schema.validate(req.body);
  if (result.error) {
    res.status(400).send(result.error);
    return;
  }

  const { name, author, tags, isPublished } = req.body;
  const course = new Course({
    name: name,
    author: author,
    tags: tags,
    isPublished: isPublished,
  });
  try {
    const data = await course.save();
    res.send(data);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports.updateCourse = async (req, res) => {
  const course = Course.findById(req.params.id);
  !course && res.status(404).send("Not found");

  const result = schema.validate(req.body);
  if (result.error) {
    res.status(400).send(result.error);
    return;
  }

  //   const coursedb = await Course.findById(req.params.id);
  //   coursedb.set({ ...req.body });
  try {
    // const data = await coursedb.save();
    const result = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.send(result);
  } catch (exp) {
    res.status(401).send(exp.message);
  }
};

module.exports.removeCourse = async (req, res) => {
  try {
    const data = await Course.findByIdAndDelete(req.params.id);
    if (!data) {
      res.status(404).send("Not found");
      return;
    }
    res.send(data);
  } catch (exp) {
    res.send(exp.message);
  }
};
