const mongoose = require("mongoose");
const Joi = require("joi");

mongoose
  .connect("mongodb://localhost/playground", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Mongodb connected");
  })
  .catch((err) => console.log("Error", err));

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 5 },
  author: String,
  tags: String,
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

courseSchema.post("save", (data) => {
  console.log(data);
  var io = require("../index").io;
  // console.log(io);
  io.emit("update", data);
});

const Course = mongoose.model("Course", courseSchema);
// mongoose.connection.on("connected", (err) => {
//   console.log(err);
//   Course.watch().on("change", (data) => console.log(data));
// });

const schema = Joi.object({
  name: Joi.string().required(),
  author: Joi.string().min(3),
  tags: Joi.string(),
  isPublished: Joi.bool(),
});

export { Course, schema };
