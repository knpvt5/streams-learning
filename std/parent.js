import { spawn } from "node:child_process";
import fs from "node:fs";

const child = spawn("node", ["std/child.js"]);

const filePath = String.raw`C:\Users\karan_pnrp70e\Desktop\Captures\screenrecording\Screen Recording 2025-11-04 090852.mp4`;
const stats = fs.statSync(filePath);
const totalBytes = stats.size;

const rstream = fs.createReadStream(filePath, {
  highWaterMark: 64 * 1024,
});
// const wstream = child.stdin;

function displayProgress(current, total) {
  const percent = Math.round((current / total) * 100);
  const barLength = 30;
  const filled = Math.round((percent / 100) * barLength);
  const empty = barLength - filled;
  const bar = "█".repeat(filled) + "░".repeat(empty);

  // \r moves cursor to start of line, overwrites previous output
  process.stdout.write(
    `\rProgress: [${bar}] ${percent}% (${current}/${total} bytes)`
  );
}

child.stdout.on("data", (data) => {
  // const lines = data.toString().trim().split("\n");
  // for (const line of lines) {
  //   console.log(lines)
  //   try {
  //     const msg = JSON.parse(line);
  //     if (msg.done) {
  //       process.stdout.write("\n"); // Move to new line when done
  //       console.log("File writing complete!");
  //     } else if (msg.bytesWritten !== undefined) {
  //       displayProgress(msg.bytesWritten, totalBytes);
  //     }
  //   } catch (e) {
  //     // Not JSON, print normally
  //     console.log(`Child stdout: ${line}${e.message}`);
  //   }
  // }
  
  const progress = Math.ceil((parseInt(data) / totalBytes) * 100);
  process.stdout.write("\r" + progress + "%");

  // if(parseInt(data) === totalBytes){
  //   console.log("\nFile writing complete!");
  // }
});

child.stderr.on("data", (data) => {
  console.error(`Child stderr: ${data}`);
});

// rstream.pipe(child.stdin);

rstream.on("data", (data) => {
  child.stdin.write(data);
});

rstream.on("end", () => {
  child.stdin.end();
});

// process.stdin.on("data", (data) => {
//   const input = data.toString().trim();
//   if (input == "end") {
//     process.stdin.end();
//     child.stdin.end();
//     return;
//   }
//   child.stdin.write(data);
// });

// Handle child exit
child.on("close", (code) => {
  console.log(`Child process exited with code ${code}`);
});
