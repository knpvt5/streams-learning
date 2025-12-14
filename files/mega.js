import { Storage } from "megajs";
import fs from "node:fs";
import { getAllFiles } from "../utils/fe.js";

process.loadEnvFile("./.env");

const storage = new Storage({
  email: process.env.MEGA_EMAIL,
  password: process.env.MEGA_PASS,
});

// "C:\Users\karan_pnrp70e\Desktop\Captures\screenrecording\Screen Recording 2025-11-04 090852.mp4"
// C:\Users\karan_pnrp70e\Desktop\http-server\text.txt;

const filePathArr = getAllFiles(".");
// const filePath = String.raw`C:\Users\karan_pnrp70e\Desktop\Captures\screenrecording\Screen Recording 2025-11-04 090852.mp4`;

for (const filePath of filePathArr) {
  console.log("Processing", filePath);
  const stats = fs.statSync(filePath);

  if (stats.isDirectory()) {
    console.log("Skipping directory", filePath);
    continue;
  }

  // if (fs.lstatSync(filePath).isDirectory()) {
  //   console.log("Skipping directory", filePath);
  //   continue;
  // }

  let totalBytes = stats.size;
  const chunkSize = 1 * 1024 * 1024;
  const totalChunks = Math.ceil(totalBytes / chunkSize);
  let readcount = 0;
  let uploadedBytes = 0;

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
      console.log(
        Math.ceil((rstream.bytesRead / totalBytes) * 100) +
          "% completed Read" +
          " " +
          filePath
      );
      console.log(canWrite);

      if (!canWrite) {
        rstream.pause();
        upload.once("drain", () => {
          rstream.resume();
        });
      }
    });

    rstream.on("end", () => {
      upload.end();
      console.log("Read stream ended");
    });

    upload.on("progress", (bytes) => {
      uploadedBytes += bytes;
      const percent = Math.ceil((uploadedBytes / totalBytes) * 100);

      console.log(
        `📤 Upload progress: ${percent}% (${(
          uploadedBytes /
          1024 /
          1024
        ).toFixed(2)} MB) from ${filePath}`
      );
    });

    upload.on("complete", (file) => {
      console.log("Uploaded:", file.name);
    });

    upload.on("error", (err) => {
      console.error("Upload error:", err);
    });
  });
}
