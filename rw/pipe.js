import fs from "node:fs";
import { pipeline } from "node:stream";

const filePath = String.raw`C:\Users\karan_pnrp70e\Desktop\Captures\screenrecording\Screen Recording 2025-11-04 090852.mp4`;

const fileStat = fs.statSync(filePath);

const rstream = fs.createReadStream(filePath, { highWaterMark: 64 * 1024 });
const wstream = fs.createWriteStream("output_copy.mkv", {
  highWaterMark: 64 * 1024,
});

// rstream.pipe(wstream);
pipeline(rstream, wstream, (err) => {
  if (err) {
    console.error("Pipeline failed:", err);
  }
});

wstream.on("drain", () => {
  const progressPercent = (wstream.bytesWritten / fileStat.size) * 100;
  console.log(`Progress: ${progressPercent.toFixed(2)}%`);
  //   wstream.end()
  //   wstream.destroy("error: manual destroy for testing");
});

/* wstream.on("close", () => {
  console.log("Write stream closed/destroyed");
});

wstream.on("finish", () => {
  console.log("File written successfully finished!");
});

wstream.on("error", (err) => {
  console.error("Error in write stream:", err);
});

rstream.on("error", (err) => {
  console.error("Error in read stream:", err);
});

// rstream.on("data", (chunk) => {
//   console.log(
//     `Read chunk of size: ${chunk.length}, readStream readableLength: ${rstream.readableLength}`
//   );
//   rstream.destroy("error in read: manual destroy for testing");
// });

setTimeout(() => {
  rstream.destroy("error in read: manual destroy for testing");
}, 1000);

rstream.on("close", () => {
  console.log("Read stream closed/destroyed");
});

rstream.on("end", () => {
  console.log("Read stream ended");
});

// rstream.on("f") */
