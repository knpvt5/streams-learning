import { spawn } from "node:child_process";

const child = spawn("node", ["std/child.js"]);

child.stdout.on("data", (data) => {
  console.log(`Child stdout: ${data}`);
});

child.stderr.on("data", (data) => {
  console.error(`Child stderr: ${data}`);
});

// process.stdin.pipe(child.stdin);

process.stdin.on("data", (data) => {
  const input = data.toString().trim();
  if (input == "end") {
    process.stdin.end();
    child.stdin.end();
    return;
  }
  child.stdin.write(data);
});

// Handle child exit
child.on("close", (code) => {
  console.log(`Child process exited with code ${code}`);
});
