const express = require("express");
const app = express();
const courses = require("./routes/courses");
const home = require("./routes/home");
const helmet = require("helmet");
const compression = require("compression");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(compression());
//Set headers for all incoming requests
app.all("/*", (request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "*");
  response.header("Access-Control-Expose-Headers", "*");
  response.header(
    "Access-Control-Allow-Methods",
    "GET, PUT, POST, DELETE, OPTIONS, HEAD, PATCH"
  );
  response.header("Access-Control-Allow-Credentials", true);
  response.header("Access-Control-Max-Age", "1209600");
  next();
});

app.use("/api/courses", courses);
app.use("/", home);

app.listen(5000, () => console.log("listening on 5000"));
