import fs from "node:fs";

const fd = fs.openSync("ws.txt", "w");

const w = fs.createWriteStream("ws.txt", { highWaterMark: 16 * 1024 });

console.time();
for (let i = 0; i <= 100000; i++) {
  w.write(`${i}, `);
// fs.writeSync(fd, `${i}, `);
  //  console.log(canWrite)
}

// w.on("close", () => {
// //   console.log("finished");
//   console.timeEnd();

//   w.end();
// });

console.timeEnd();
w.end();