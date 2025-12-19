import { Storage } from "megajs";
import fs from "node:fs";
import { getAllFiles } from "../utils/fe.js";
import path from "node:path";
import os from "node:os";
// No need for pipeline anymore—use .pipe() instead
// import { pipeline } from "node:stream/promises";

process.loadEnvFile("./.env");

const storage = new Storage({
  email: process.env.MEGA_EMAIL,
  password: process.env.MEGA_PASS,
  // Optional: Tweak for stability (no maxConnections for upload, but helps overall)
  keepAlive: true, // Reuse connections across uploads
  disableEtag: false,
});

const filePathArr = getAllFiles(".");

storage.on("ready", async () => {
  console.log("Storage is ready. Starting parallel uploads...");

  // Create array of Promises for concurrent uploads
  const uploadPromises = filePathArr.map(async (filePath) => {
    try {
      console.log("Processing", filePath);
      const stats = fs.statSync(filePath);
      const totalBytes = stats.size;

      const upload = storage.upload({
        name: path.basename(filePath),
        size: totalBytes, // Required for streaming—avoids full buffering
      });

      let uploadedBytes = 0;
      upload.on("progress", (bytes) => {
        uploadedBytes = bytes;
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

      upload.on("error", (err) => {
        console.error(`Error uploading ${filePath}:`, err);
      });

      const rstream = fs.createReadStream(filePath, {
        highWaterMark: 1 * 1024 * 1024, // 1MB chunks for efficiency
      });

      // Pipe async—no await here; let it flow in parallel
      rstream.pipe(upload);

      // Await full cloud completion (server ack + retries)
      await upload.complete;
      console.log("Full upload finished for", filePath);

      // Clean up streams
      rstream.destroy();
      upload.destroy();
    } catch (err) {
      console.error(`Failed to process ${filePath}:`, err);
      // Optionally: throw to fail the whole batch, or just log and continue
    }
  });

  // Wait for ALL uploads to complete (parallel execution)
  await Promise.all(uploadPromises);
  console.log("All uploads finished");
});

storage.on("close", () => console.log("Connection closed"));
storage.on("error", console.error);
