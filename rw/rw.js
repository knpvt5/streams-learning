import fs from "node:fs";

const rstream = fs.createReadStream("C:\Users\karan_pnrp70e\Desktop\http-server\cd\text.txt", { highWaterMark: 4 });
// const wstream = fs.createWriteStream("output.txt", { highWaterMark: 4 });

rstream.on("data", (chunk) => {
  console.log(`Read chunk: ${chunk.toString()}`);
  // wstream.write(chunk);
});

// wstream.end();

// console.log(rstream.readable, wstream.writable)