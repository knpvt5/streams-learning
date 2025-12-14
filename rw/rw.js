import fs from "node:fs";

const rstream = fs.createReadStream("text.txt", { highWaterMark: 4 });
const wstream = fs.createWriteStream("output.txt", { highWaterMark: 4 });

wstream.end();

console.log(rstream.readable, wstream.writable)