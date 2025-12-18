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

    const upload = storage.upload({
      name: path.basename(filePath),
      size: totalBytes,
    });

    let uploadedBytes = 0;

    upload.on("progress", (bytes) => {
      uploadedBytes = bytes; // ✅ absolute value
      const percent = Math.floor((uploadedBytes / totalBytes) * 100);

      console.log(
        `📤 ${percent}% (${(uploadedBytes / 1024 / 1024).toFixed(
          2
        )} MB) → ${filePath}`
      );
    });

    upload.on("complete", (file) => {
      console.log("Uploaded:", file.name);
    });

    upload.on("error", console.error);

    const rstream = fs.createReadStream(filePath, {
      highWaterMark: 1 * 1024 * 1024,
    });

    // ⬇️ THIS is the missing piece
    await pipeline(rstream, upload);

    console.log("Pipeline finished for", filePath);
  }

  console.log("All uploads finished");
});

storage.on("close", console.log);
storage.on("error", console.error);
