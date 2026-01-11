import net from "node:net";
import { readline as rl } from "../../utils/rl.js";
import { createReadStream } from "node:fs";

const filepath = String.raw`C:\Users\karan_pnrp70e\Desktop\Captures\screenrecording\Recording 2025-11-04 091942.mp4`;

const rs = createReadStream(filepath, { highWaterMark: 1 * 1024 });

const socket = net.createConnection(6000, "10.144.116.121");

socket.on("data", (data) => {
  console.log(`Server -> ${data}`);
  // socket.end();
});

socket.on("error", (err) => {
  if (err.code === "ECONNREFUSED") {
    console.error("Connection refused by the server. Is the server running?");
    return;
  }
  if (err.code === "ETIMEDOUT") {
    console.error("Connection timed out. The server may be unreachable.");
    return;
  }
  if (err.code === "ECONNRESET") {
    console.error("Connection was reset by the server.");
    return;
  }
  console.error(`Server error:\n${err.stack}`);
});

// process.stdin.on("data", (data) => {
//     socket.write(data);
// });

// rl("You> ", (input) => {
//   socket.write(input);
// });

rs.pipe(socket);

// rs.on("data", (chunk) => {
//   socket.write(chunk);
// });


rs.on("end", () => {
  console.log("File read completed.");
  // socket.write("EOF");
  // socket.end();
});