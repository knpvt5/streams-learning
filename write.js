import fs from "node:fs";

const wstream = fs.createWriteStream("output.txt", { highWaterMark: 4 });
// stream.end();

console.log(wstream.writableLength);

let i = 0;

function callLoop() {
  while (i < 10) {
    const canWrite = wstream.write(i.toString());
    i++;

    // if (i === 10) {
    //   wstream.end();
    // }

    if (!canWrite) {
      break;
    }
    console.log(
      `Wrote Chunk ${i}, canWrite: ${canWrite}, writableLength: ${wstream.writableLength}`
    );
  }
}

callLoop();

wstream.on("drain", () => {
  console.log("all drain");
  callLoop();
});

wstream.on("finish", () => {
  console.log("File written successfully!");
});

wstream.on("")

wstream.end();

