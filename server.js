import http from "node:http";
import fs from "node:fs/promises";
// import { aiChat } from "./ai/oa.js";
import { aiChatOr } from "./ai/ors.js";

const server = http.createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "text/txt");
  // if (req.url === "/favicon.ico") {
  //   res.end();
  //   return;
  // }

  // req.on("data", (data) => {
  //   console.log("Data event", data);
  //   fs.writeFile("received.txt", data);
  // });

  const fhr = await fs.open("a.txt");
  const rs = fhr.createReadStream({
    highWaterMark: 4,
  });

  const path = req.url;
  const origin = req.headers.origin;
  console.log(origin);
  console.log(path);

  if (req.url === "/test") {
    req.on("data", async (data) => {
      console.log("test path", data.toString().trim());
      // res.write(data);
      // res.end();
      const result = await aiChatOr(res, data.toString().trim());
      console.log("result", result);
      // res.write(result);

      if (result === "ENDED") {
        fhr.close();
        res.end("sse ended");
      }
    });

    // setInterval(() => {
    //   res.write("This is test response\n");
    // }, 100);
    // res.end("test ended");
    return;
  }

  // res.write("server ok", () => {
  //   console.log("Response sent");
  // });

  // res.end("end data", () => {
  //   console.log("Response finished");
  // });

  rs.on("data", (chunk) => {
    res.write(chunk);

    rs.pause();
  });

  setInterval(() => {
    rs.resume();
  }, 100);

  rs.on("end", () => {
    fhr.close();
    res.end("main ended");
  });
});

server.listen(3000, () => {
  console.log("Listening on http://localhost:3000");
});
// }

// startServer();
