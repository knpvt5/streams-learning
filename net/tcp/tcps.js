import net from "node:net";

const server = net.createServer()


server.listen(5000, () => {
  console.log("TCP server listening on port 5000");
});


server.on("connection", (socket) => {
  const clientAddress = `${socket.remoteAddress}:${socket.remotePort}`;
  console.log(`New client connected: ${clientAddress}`);

    socket.on("data", (data) => {
        console.log(`Client ${clientAddress} -> ${data}`);
        socket.write(`HTTP \n\nServer received: ${data}`);
        socket.end("ended");
    });

    socket.on("close", () => {
        console.log(`Client disconnected: ${clientAddress}`);
    });

});