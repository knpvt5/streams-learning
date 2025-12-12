// Remove the .on('data') code completely and use this:

async function processStream() {
  for await (const chunk of stream) {
    // Node automatically pauses the stream here!

    fs.appendFileSync("a.txt", chunk);

    // The stream WAITS for this await to finish before reading the next chunk
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Resumed after - Reading next chunk now...");
  }
  console.log("File read complete");
}

processStream();
