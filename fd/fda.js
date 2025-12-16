import fs from "node:fs";
import { buffer } from "node:stream/consumers";

const fd = fs.openSync("w.txt", "w");

//******* buffer overflow and underflow */

const nb = Buffer.allocUnsafe(4);
// const u8 = new Uint8Array(4);
// const ab = new ArrayBuffer(4);
// const view = new DataView(ab);

let totalBytesWritten = 0;
let writeCount = 0;

console.time();

for (let i = 0; i <= 5; i++) {
  const str = `${i}, `;
  const written = nb.write(str, totalBytesWritten);
  //   console.log("bytes written", written)
  totalBytesWritten += written;
  if (totalBytesWritten >= nb.length) {
    // console.log("buffer full empting");
    fs.writeSync(fd, nb);
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
