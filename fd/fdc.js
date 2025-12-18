import fs from "node:fs";
import { buffer } from "node:stream/consumers";

const fd = fs.openSync("w.txt", "w");

//******* buffer overflow and underflow */

// const nb = Buffer.allocUnsafe(4);
const ab = new ArrayBuffer(4);
const view = new DataView(ab);
// const u8 = new Uint8Array(4);

let totalBytesWritten = 0;
let writeCount = 0;

console.time();

for (let i = 0; i <= 5; i++) {
  const str = `${i}, `;
  const result = view.setUint8(totalBytesWritten, str.charCodeAt(0));
  //   console.log("bytes written", written)
  totalBytesWritten += written;
  if (totalBytesWritten >= nb.length) {
    // console.log("buffer full emptying");
    fs.writeSync(fd, ab);
    // console.log("wirte count", writeCount++)
    // nb.fill(0);
    totalBytesWritten = 0;
  }
}

// if (totalBytesWritten > 0) {
//   fs.writeSync(fd, nb.subarray(0, totalBytesWritten));
// }

// fs.writeSync(fd, nb);
fs.closeSync(fd);

console.log(nb);

console.timeEnd();
