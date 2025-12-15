import fs from "node:fs";

const writeStream = fs.createWriteStream("child_output.mkv", {
  highWaterMark: 64 * 1024,
});

let bytesWritten = 0;

// Read from stdin and write to file
process.stdin.on("data", (data) => {
  const isEmpty = writeStream.write(data);

  bytesWritten += data.length;

  // Send progress to parent via stdout
  // process.stdout.write(JSON.stringify({ bytesWritten }) + "\n");
  process.stdout.write(writeStream.bytesWritten.toString());

  if (!isEmpty) {
    process.stdin.pause();
    writeStream.once("drain", () => {
      process.stdin.resume();
    });
  }
});

process.stdin.on("end", () => {
  writeStream.end();
  // process.stdout.write(JSON.stringify({ done: true, bytesWritten }) + "\n");
});
