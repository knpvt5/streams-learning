import fs from "node:fs";

const writeStream = fs.createWriteStream("child_output.txt", {
  highWaterMark: 64 * 1024,
});

// Read from stdin and write to file
process.stdin.on("data", (data) => {
  const isEmpty = writeStream.write(data);
  if (!isEmpty) {
    process.stdin.pause();
    writeStream.once("drain", () => {
      process.stdin.resume();
    });
  }
});

process.stdin.on("end", () => {
  writeStream.end();
  console.log("Child finished processing input");
});
