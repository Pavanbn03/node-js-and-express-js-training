const mongoose = require("mongoose");

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
  name: { type: String, required: true, minlength: 5 },
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema);

module.exports.getCourse = async () => {
  const courses = await Course.find();
  return courses;
};

module.exports.createCourse = async (body) => {
  const { name, author, tags, isPublished } = body;
  const course = new Course({
    name: name,
    author: author,
    tags: tags,
    isPublished: isPublished,
  });
  try {
    const data = await course.save();
    return data;
  } catch (err) {
    return err;
  }
};

module.exports.updateCourse = async (id, body) => {
  const coursedb = await Course.findById(id);
  coursedb.set({ ...body });
  const data = await coursedb.save();
  return data;
};
module.exports.removeCourse = async (id) => {
  const data = await Course.findByIdAndDelete(id);
  return data;
};