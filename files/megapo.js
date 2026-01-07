import { Storage } from "megajs";
import fs from "node:fs";
import { getAllFiles } from "../utils/fe.js";
import path from "node:path";
import os from "node:os";
import { pipeline } from "node:stream/promises";
import pLimit from "p-limit";

const limit = pLimit(5);

process.loadEnvFile("./.env");

const dirName = process.argv[2] || "Onedrive";
const fullPath = path.join(os.homedir(), dirName);
// const filePath = String.raw`C:\Users\karan_pnrp70e\Desktop\Captures\screenrecording\Screen Recording 2025-11-04 090852.mp4`;

const storage = new Storage({
  email: process.env.MEGA_EMAIL,
  password: process.env.MEGA_PASS,
});

const filePathArr = getAllFiles(".");

async function uploadFile(storage, filePath) {
  const stats = fs.statSync(filePath);
  const totalBytes = stats.size;

  const upload = storage.upload({
    name: path.basename(filePath),
    size: totalBytes,
  });

  upload.on("progress", (bytes) => {
    if (typeof bytes !== "number") return;
    const percent = Math.floor((bytes / totalBytes) * 100);
    console.log(`📤 ${percent}% → ${filePath}`);
  });

  const rstream = fs.createReadStream(filePath, {
    highWaterMark: 1 * 1024 * 1024,
  });

  // 🔒 ONE promise that represents the FULL upload lifecycle
  await Promise.all([
    pipeline(rstream, upload),
    new Promise((resolve, reject) => {
      upload.once("complete", resolve);
      upload.once("error", reject);
    }),
  ]);

  console.log("Uploaded:", path.basename(filePath));
}

console.time();
storage.on("ready", async () => {
  console.log("Storage ready, starting parallel uploads");

  const tasks = filePathArr.map(
    limit((filePath) => uploadFile(storage, filePath))
  );

  // 🔥 REAL parallel MEGA uploads
  await Promise.all(tasks);

  console.log("All uploads completed");
  console.timeEnd();
});
