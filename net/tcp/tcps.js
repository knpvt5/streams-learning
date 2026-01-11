import { createWriteStream } from "node:fs";
import net from "node:net";

const ws = createWriteStream("output.mkv")

const server = net.createServer((socket) => {
  const clientAddress = `${socket.remoteAddress}:${socket.remotePort}`;
  console.log(`New client connected: ${clientAddress}`);

  socket.on("data", (data) => {
    // console.log(`Client ${clientAddress} -> ${data}`);
    if(data.toString() === "EOF") {
      console.log("Received EOF from client. Closing connection.");
      socket.end();
      return;
    }
    socket.pipe(ws);
    // ws.write(data);
    // socket.write(`HTTP \n\nServer received: ${data}`);
    // socket.end("ended");
  });

  socket.write("Welcome to the TCP server!\n");

  socket.on("error", (err) => {
    if(err.code === "ECONNRESET") {
      console.error(`Connection was reset by the client: ${clientAddress}`);
      return;
    }
    console.error(`Socket error:\n${err.stack}`);
  });

  socket.on("close", () => {
    console.log(`Client disconnected: ${clientAddress}`);
  });
});


server.listen(6000, () => {
  console.log("TCP server listening on port 6000");
});
