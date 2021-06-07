const express = require("express");
const app = express();
const courses = require("./routes/courses");
const home = require("./routes/home");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/courses", courses);
app.use("/", home);

app.listen(5000, () => console.log("listening on 5000"));
