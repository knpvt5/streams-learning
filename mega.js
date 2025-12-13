import { Storage } from "megajs";
import fs from "node:fs";

process.loadEnvFile("./.env");

// "C:\Users\karan_pnrp70e\Desktop\Captures\screenrecording\Screen Recording 2025-11-04 090852.mp4"
// C:\Users\karan_pnrp70e\Desktop\http-server\text.txt;

const filePath = String.raw`C:\Users\karan_pnrp70e\Desktop\Captures\screenrecording\Screen Recording 2025-11-04 090852.mp4`;
const stats = fs.statSync(filePath);
let totalBytes = stats.size;
const chunkSize = 100 * 1024 * 1024;
const totalChunks = Math.ceil(totalBytes / chunkSize);
let readcount = 0;

const storage = new Storage({
  email: process.env.MEGA_EMAIL,
  password: process.env.MEGA_PASS,
});

storage.on("ready", async () => {
  const upload = storage.upload({
    name: filePath.split("\\").at(-1),
    size: stats.size,
    // maxChunkSize: chunkSize,
    // initialChunkSize: chunkSize,
  });

  //   console.log(upload);

  // fs.createReadStream("text.txt").pipe(upload);
  const rstream = fs.createReadStream(filePath, {
    highWaterMark: chunkSize,
  });

  rstream.on("data", (chunk) => {
    const canWrite = upload.write(chunk);

    readcount++;
    console.log(Math.ceil((readcount / totalChunks) * 100) + "% completed");
    console.log(canWrite);

    if (!canWrite) {
      rstream.pause();
      upload.once("drain", () => {
        rstream.resume();
      });
    }
  });

  //   upload.on("data", (data) => {
  //     console.log(`Uploaded ${data.length} bytes`);
  //   });

  rstream.on("end", () => {
    upload.end();
    console.log("Read stream ended");
  });

  upload.on("chunk", (bytes) => {
    console.log(`Chunk uploaded: ${bytes} bytes`);
  });

  upload.on("complete", (file) => {
    console.log("Uploaded:", file.name);
  });

  upload.on("error", (err) => {
    console.error("Upload error:", err);
  });
});
