import { open } from "node:fs/promises";
import http from "node:http";
import url from "node:url";

const clients = [];

const port = "3000";
const ip = "0.0.0.0";

const fp = String.raw`C:\Users\karan_pnrp70e\Desktop\Captures\screenrecording\Recording 2025-11-04 091942.mp4`;
// const fp = String.raw`C:\Users\karan_pnrp70e\Videos\Frankenstein (2025) [1080p] [WEBRip] [5.1] [YTS.MX]\Frankenstein.2025.1080p.WEBRip.x264.AAC5.1-[YTS.MX].mp4`;
// const fp = String.raw`C:\Users\karan_pnrp70e\Videos\Better Call Saul Season 2 (1080p x265 10bit Joy)\Better Call Saul S02E01 Switch (1080p x265 10bit Joy).mkv`;

const server = http.createServer(async (req, res) => {
  res.statusCode = 200;
  res.setHeader("Access-Control-Allow-Origin", "*");
  // res.setHeader("Content-Type", "video/x-matroska");

  if (req.url === "/video") {
    const fh = await open(fp);
    const rs = fh.createReadStream();
    const { size } = await fh.stat();
  res.setHeader("Content-Type", "video/mp4");
    res.setHeader("Content-Length", size);
    rs.pipe(res);

    // res.end("sending video");
    return
  }

  res.write("Hello from HTTP server!\n");
  res.end();

  req.on("data", (chunk) => {
    console.log(chunk.toString());
  });
});

// server.on("connection", (socket) => {
//   clients.push(socket);
//   // socket.on("data", (chunk) => {
//   //   console.log(chunk.toString());
//   // });
//   console.log(clients);
// });

server.listen(port, ip, () =>
  console.log(`API listening on http://${ip}:${port}`)
);
