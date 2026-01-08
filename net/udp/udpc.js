import dgram from "node:dgram";
import { sport, shost } from "../udps.js";


import fs from "node:fs";
// const filepath = String.raw`C:\Users\karan_pnrp70e\Desktop\Captures\screenrecording\Screen Recording 2025-11-04 090852.mp4`;
// const filepath = String.raw`C:\Users\karan_pnrp70e\Desktop\marketing.txt`

// const rstream = fs.createReadStream(filepath, {
//   highWaterMark: 1024,
// });

const socket = dgram.createSocket("udp4");
socket.bind(() => socket.setBroadcast(true));

const showPrompt = () => process.stdout.write("You> ");

socket.on("error", (err) => {
  console.error(`Socket error:\n${err.stack}`);
  socket.close();
});

socket.on("message", (msg, rinfo) => {
  console.log(`\nServer ${rinfo.address}:${rinfo.port} -> ${msg}`);
  // showPrompt();
});

socket.on("listening", () => {
  const address = socket.address();
  console.log(`Socket listening on ${address.address}:${address.port}`);
  // showPrompt();
});

// const cport = 5000;
// const chost = "127.0.0.1";
const bc = "255.255.255.255";
// const bcsn = "10.144.116.255";

process.stdin.on("data", (data) => {
  socket.send(data, sport, bc, (err) => {
    if (err) {
      console.error(`Send error:\n${err}`);
    }
  });

  showPrompt();
});

// rstream.on("data", (chunk) => {
//   socket.send(chunk, sport, shost, (err) => {
//     if (err) {
//       console.error(`Send error:\n${err}`);
//     }
//   });
// });

// rstream.on("end", () => {
//   socket.send("EOF", sport, shost, (err) => {
//     if (err) {
//       console.error(`Send error:\n${err}`);
//     }
//   });
//   socket.close();
// });
