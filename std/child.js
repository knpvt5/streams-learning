import fs from "node:fs";

const writeStream = fs.createWriteStream("child_output.txt");

// Read from stdin and write to file
process.stdin.on("data", (data) => {
  writeStream.write(data);
});

process.stdin.on("end", () => {
  writeStream.end();
  console.log("Child finished processing input");
});