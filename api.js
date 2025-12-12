import http from "node:http";
import url from "node:url";

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

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "not found" }));
});

server.listen(3000, () =>
  console.log("API listening on http://localhost:3000")
);
