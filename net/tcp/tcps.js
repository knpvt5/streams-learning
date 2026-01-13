// import { createWriteStream } from "node:fs";
import { open } from "node:fs/promises";
import net from "node:net";

// const filePath = String.raw`C:\Users\karan_pnrp70e\Desktop\Captures\screenrecording\Recording 2025-11-04 091942.mp4`;
const filePath = String.raw`C:\Users\karan_pnrp70e\Videos\Frankenstein (2025) [1080p] [WEBRip] [5.1] [YTS.MX]\Frankenstein.2025.1080p.WEBRip.x264.AAC5.1-[YTS.MX].mp4`;

// const ws = createWriteStream("output.mkv")

const server = net.createServer(async (socket) => {
  const fh = await open("a.txt");
  const rs = fh.createReadStream({ highWaterMark: 5 });
  const { size } = await fh.stat();

  const clientAddress = `${socket.remoteAddress}:${socket.remotePort}`;
  console.log(`New client connected: ${clientAddress}`);

  socket.write("HTTP/1.1 200 nice\n");
  socket.write("Access-Control-Allow-Origin: *\n");
  socket.write("Access-Control-Expose-Headers: *\n");
  // socket.write("Content-Type: text/plain\n");
  // socket.write(`Content-Length: ${size}\n`);
  // socket.write("content-disposition: attachment; filename=a.txt\n");
  socket.write("\n");

  // setTimeout(() => {
  //   socket.write("hello");
  // }, 1000);
  // rs.pipe(socket);

  // socket.end();

  socket.on("data", (data) => {
    console.log(data.toString())
    // socket.end();
  });

  // Close file handle when stream ends
  rs.on("end", async () => {
    await fh.close();
  });

  // Also close if socket closes unexpectedly
  socket.on("close", async () => {
    console.log(`Client disconnected: ${clientAddress}`);
    await fh.close();
  });

  socket.on("error", (err) => {
    if (err.code === "ECONNRESET") {
      console.error(`Connection was reset by the client: ${clientAddress}`);
      return;
    }
    console.error(`Socket error:\n${err.stack}`);
  });

  socket.on("close", () => {
    console.log(`Client disconnected: ${clientAddress}`);
  });
});

server.listen(5000, () => {
  console.log("TCP server listening on port 5000");
});
