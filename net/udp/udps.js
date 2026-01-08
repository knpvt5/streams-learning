import dgram from "node:dgram";
import fs from "node:fs";

// const ws = fs.createWriteStream("output.mkv");

const socket = dgram.createSocket({ type: "udp4", reuseAddr: true });

// let lastClient;

const showPrompt = () => process.stdout.write("You> ");

socket.on("error", (err) => {
  console.error(`Socket error:\n${err.stack}`);
  socket.close();
});

socket.on("message", (msg, rinfo) => {
  // lastClient = rinfo;
  console.log(`\nPeer ${rinfo.address}:${rinfo.port} -> ${msg}`);
  // if (msg === "EOF") {
  //   socket.send("File received", rinfo.port, rinfo.address);
  // }
  // ws.write(msg);
  // showPrompt();
});

socket.on("listening", () => {
  const address = socket.address();
  console.log(`Socket listening on ${address.address}:${address.port}`);
  // showPrompt();
});

/* process.stdin.on("data", (data) => {
  if (!lastClient) {
    console.log("\nWaiting for a peer before sending.");
    showPrompt();
    return;
  }

  socket.send(data, lastClient.port, lastClient.address, (err) => {
    if (err) {
      console.error(`Send error:\n${err.stack}`);
    }
  });

  showPrompt();
}); */

export const sport = 4000;
// export const shost = "127.0.0.1";
export const shost = "10.144.116.121";

socket.bind(sport);
