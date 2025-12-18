import { Storage } from "megajs";
import fs from "node:fs";
import { getAllFiles } from "../utils/fe.js";
import path from "node:path";
import os from "node:os";
import { pipeline } from "node:stream/promises";

process.loadEnvFile("./.env");

// const dirName = process.argv[2] || "OneDrive";
// const fullPath = path.join(os.homedir(), dirName);
// const filePath = String.raw`C:\Users\karan_pnrp70e\Desktop\Captures\screenrecording\Screen Recording 2025-11-04 090852.mp4`;

const storage = new Storage({
  email: process.env.MEGA_EMAIL,
  password: process.env.MEGA_PASS,
});

const filePathArr = getAllFiles(".");

storage.on("ready", async () => {
  console.log("Storage is ready. Starting sequential upload...");

  for (const filePath of filePathArr) {
    console.log("Processing", filePath);
    const stats = fs.statSync(filePath);
    const totalBytes = stats.size;
    const chunkSize = 1 * 1024 * 1024;
    let uploadedBytes = 0;

    const upload = storage.upload({
      name: path.basename(filePath),
      size: totalBytes,
    });

    const rstream = fs.createReadStream(filePath, {
      highWaterMark: chunkSize,
    });

    try {
      // Wrap the upload process in a Promise to ensure sequential execution
      await new Promise((resolve, reject) => {
        upload.on("progress", (bytes) => {
          uploadedBytes += bytes;
          const percent = Math.ceil((uploadedBytes / totalBytes) * 100);
          console.log(
            `📤 Upload progress: ${percent}% (${(
              uploadedBytes / 1024 / 1024
            ).toFixed(2)} MB) from ${filePath}`
          );
        });

        upload.on("complete", (file) => {
          console.log("Uploaded:", file.name);
          resolve();
        });

        upload.on("error", reject);

        // Use the promise-based pipeline
        pipeline(rstream, upload).catch(reject);
      });
      
      console.log(`Finished processing ${filePath}`);
    } catch (err) {
      console.error(`Failed to upload ${filePath}:`, err);
    }
  }
  console.log("All files processed.");
});