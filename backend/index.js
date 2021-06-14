import express from "express";
const app = express();

const courses = require("./routes/courses");
const home = require("./routes/home");
const cors = require("cors");
// const http = require("http").createServer(app);

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
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

const server = app.listen(5000, () => console.log("listening on 5000"));

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
// require("./models/courses")(io);
io.on("connection", (socket) => {
  console.log("ID: ", socket.id);
  socket.emit("connection", null);
  socket.on("disconnected", () => console.log("disconnected"));
});

module.exports.io = io;
