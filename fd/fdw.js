import fs from "node:fs";

const fd = fs.openSync("w.txt", "w");

// const ab = new ArrayBuffer(4);
// const view = new DataView(ab);
const uint8 = new Uint8Array(4);

// let isFull = true;
// function checkBufferData() {
//   for (let i = 0; i < ab.byteLength; i++) {
//     isFull = true;
//     if (view.getUint8(i) === 0) {
//       isFull = false;
//       break;
//     }
//   }
// }

console.time();

function addDataToBuffer(data) {
  //   for (let i = 0; i <= ab.byteLength; i++) {
  //     view.setUint8(i, data);
  //   }
  for (let i = 0; i <= uint8.length; i++) {
    uint8[i] = data++;
  }
}

for (let j = 0; j <= 10; j++) {
  const isFull = uint8.every((byte) => byte !== 0);
  if (isFull) {
    console.log("buffer full");
    break;
  }
  addDataToBuffer(j);
}

// function writeBufferToFile() {
//   console.log(uint8);
//   const textData = uint8.join("");
//   fs.writeSync(fd, textData);
// }
// writeBufferToFile();

fs.writeSync(fd, uint8);


console.timeEnd();
