import http from "node:http";
import url from "node:url";

const port = "3000";
const ip = "0.0.0.0";

const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);

  if (req.method === "GET" && pathname === "/ping") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ ok: true }));
    return;
  }

  if (req.method === "GET" && pathname === "/echo") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ query }));
    return;
  }

  if (req.method === "GET" && pathname === "/golu") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ query: "golu is motherfucker bitch" }));
    return;
  }

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ status: "server running successfully" }));
});

server.listen(port, ip, () =>
  console.log(`API listening on http://${ip}:${port}`)
);
