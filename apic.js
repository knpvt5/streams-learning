import http from "node:http";

const options = {
  hostname: "127.0.0.1",
  port: 80,
  path: "/",
  method: "POST",
  headers: {
    "Content-Type": "text/plain",
  },
};

const cr = http.request(options)


process.stdin.on("data", (data) => {    
    cr.write(data);
});

// cr.write("Hello from client");

cr.on("response", (res) => {
    // console.log({res.toString()});
    res.on("data", (chunk) => {
        console.log("Chunk:", chunk.toString());
    });
})

cr.on("error", (err) => {
    console.error("Error:", err);
});

// cr.end();