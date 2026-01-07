import dgram from "node:dgram";
import { port, host } from "./udps.js";

const socket = dgram.createSocket("udp4");

socket.on("error", (err) => {
  console.error(`Socket error:\n${err.stack}`);
  socket.close();
});

socket.on("message", (msg, rinfo) => {
//   console.log(`server->: ${msg} from ${rinfo.address}:${rinfo.port}`);
  console.log(`server->: ${msg}`);
});

socket.on("listening", () => {
  const address = socket.address();
  console.log(`Socket listening on ${address.address}:${address.port}`);
});

socket.send("Hello UDP Server", 65088, "10.144.116.121", (err, bytes) => {
  console.log("error msg", err);
  console.log("byte send", bytes);
});

// const PORT = 4000;
const HOST = "127.0.0.1";

process.stdout.write("Enter some input: ");

process.stdin.on("data", (data) => {
  socket.send(data, port, "10.144.116.121", (err, bytes) => {
    if (err) {
      console.error(`Send error:\n${err.stack}`);
    }
    // console.log("byte send", bytes);
  });

  process.stdout.write("Enter some input: ");
});
