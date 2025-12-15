process.stdin.on("data", (data) => {
  console.log(`Received: ${data.toString().trim()}`);
});

process.stdin.on("end", () => {
  console.log("Input ended");
});