import fs from "node:fs";

const filePath = String.raw`C:\Users\karan_pnrp70e\Desktop\Captures\screenrecording\Screen Recording 2025-11-04 090852.mp4`;

const rstream = fs.createReadStream(filePath, { highWaterMark: 64 * 1024 });
const wstream = fs.createWriteStream("output_copy.mkv", {
  highWaterMark: 64 * 1024,
});

rstream.pipe(wstream);


setTimeout(() => {
  rstream.destroy("error in read: manual destroy for testing");
}, 1000);

rstream.on("error", (err) => {
  console.error("Error in read stream:", err);
});
