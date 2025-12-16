import http from "node:http";
import fs from "node:fs/promises";


const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "text/txt; charset=base64");
  // if (req.url === "/favicon.ico") {
  //   res.end();
  //   return;
  // }

  // req.on("data", (data) => {
  //   console.log("Data event", data);
  //   fs.writeFile("received.txt", data);
  // });

  const path = req.url;
  const origin = req.headers.origin;
  console.log(origin);
  console.log(path);

  if (req.url === "/test") {
    req.on("data", (data) => {
      console.log("test path", data);
    });

    setInterval(() => {
      res.write("This is test response\n");
    }, 100);
    // res.end("test ended");
    return
  }

  res.write("server ok", () => {
    console.log("Response sent");
  });

  res.end("end data", () => {
    console.log("Response finished");
  });
});

server.listen(3000, () => {
  console.log("Listening on http://localhost:3000");
});
// }

// startServer();
