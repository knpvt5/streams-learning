import http from "node:http";
import fs from "node:fs/promises";

const contentBuffer = await fs.readFile("./text.txt");

const a = new ArrayBuffer(8);
const uint8Array = new Uint8Array(contentBuffer);

startServer(uint8Array);

function startServer(responseData) {
  const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "text/txt; charset=utf-8");
    res.setHeader("Access-Control-Allow-Origin", "*");
    if (req.url === "/favicon.ico") {
      res.end();
      return;
    }

    req.on("data", (data) => {
      console.log("Data event", data);
      fs.writeFile("received.txt", data);
    });

    // res.end(Buffer.from(responseData.buffer));
    // res.end(uint8Array);
    res.write(uint8Array, () => {
      console.log("Response sent");
    });
    res.end(() => {
      console.log("Response finished");
    });
  });

  server.listen(3000, () => {
    console.log("Listening on http://localhost:3000");
  });
}
