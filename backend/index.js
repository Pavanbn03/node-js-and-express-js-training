import app from "./app";

const server = app.listen(5000, () => console.log("listening on 5000"));

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("ID: ", socket.id);
  socket.emit("connection", null);
  socket.on("disconnected", () => console.log("disconnected"));
});

module.exports.io = io;
