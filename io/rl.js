import { chat } from "../ai/chat.js";

// process.stdout.write("Enter some input: ");

// process.stdin.on("data", async (data) => {
//   const input = data.toString().trim();

//   if (input === "q") {
//     process.stdout.write("Exiting...\n");
//     process.exit(0);
//   }
//   await chat(input);

//   process.stdout.write("\n\nEnter some input: ");
// });

import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const rl = readline.createInterface({ input, output });

const answer = await rl.question("What do you think of Node.js? ");

console.log(`Thank you for your valuable feedback: ${answer}`);

rl.on("line", (input) => {
  console.log(`Received: ${input}`);
  if (input.trim().toLowerCase() === "q") {
    rl.close();
  }
});

rl.on("history", (history) => {
  console.log(`History Received: ${Array.isArray(history)}, ${history}`);
});

rl.on("SIGCONT", () => {
  // `prompt` will automatically resume the stream
  console.log("resuming rl")
  rl.prompt();
});

rl.on("SIGINT", () => {
  rl.question("Are you sure you want to exit? ", (answer) => {
    if (answer.match(/^y(es)?$/i)) rl.pause();
  });
});

// rl.close();
