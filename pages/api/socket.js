import { Server } from "socket.io";

export default function SocketHandler(req, res) {
  if (res.socket.server.io) {
    // console.log("Already set up",res.socket.server.io);
    res.end();
    return;
  }

  const io = new Server(res.socket.server,{
    path:"/api/socket",
    addTrailingSlash:false
  });
  res.socket.server.io = io;

  io.on("connection", (socket) => {
    socket.on("send-message", (obj) => {
      io.emit("receive-message", obj);
    });
  });

  console.log("Setting up socket");
  res.end();
}