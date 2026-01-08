import dgram from "node:dgram";

const socket = dgram.createSocket("udp4");

socket.on("error", (err) => {
  console.error(`Socket error:\n${err.stack}`);
  socket.close();
});

socket.on("message", (msg, rinfo) => {
  // console.log(`client->: ${msg} from ${rinfo.address}:${rinfo.port}`);
  console.log(`client->: ${msg}`);

  // socket.send("msg success", rinfo.port, rinfo.address)
  // process.stdout.write("Enter some input: ");

  process.stdin.on("data", (data) => {
    socket.send(data, rinfo.port, rinfo.address, (err, bytes) => {
      if (err) {
        console.error(`Send error:\n${err.stack}`);
      }
      // console.log("byte send", bytes);
    });

    console.log("Enter some input: ");
  });
});

socket.on("listening", () => {
  const address = socket.address();
  console.log(`Socket listening on ${address.address}:${address.port}`);
});

export const sport = 4000;
export const shost = "127.0.0.1";

socket.bind(sport);
