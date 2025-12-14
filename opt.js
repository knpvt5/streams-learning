import { Storage } from "megajs";
import fs from "node:fs";

process.loadEnvFile("./.env");

async function uploadFile(storage, filePath, stats) {
  return new Promise((resolve, reject) => {
    const totalBytes = stats.size;
    const chunkSize = 1 * 1024 * 1024;

    const upload = storage.upload({
      name: filePath,
      size: stats.size,
    });

    const rstream = fs.createReadStream(filePath, {
      highWaterMark: chunkSize,
    });

    rstream.on("data", (chunk) => {
      const canWrite = upload.write(chunk);

      console.log(
        `📖 ${Math.ceil((rstream.bytesRead / totalBytes) * 100)}% - ${filePath}`
      );

      if (!canWrite) {
        rstream.pause();
        upload.once("drain", () => {
          rstream.resume();
        });
      }
    });

    rstream.on("end", () => {
      upload.end();
    });

    upload.on("complete", (file) => {
      console.log(`✅ Uploaded: ${file.name}`);
      resolve();
    });

    upload.on("error", reject);
    rstream.on("error", reject);
  });
}

async function main() {
  const storage = new Storage({
    email: process.env.MEGA_EMAIL,
    password: process.env.MEGA_PASS,
  });

  await new Promise((resolve) => {
    storage.on("ready", resolve);
  });

  const files = fs.readdirSync(".").filter((file) => {
    const stats = fs.statSync(file);
    return stats.isFile();  // ✅ Only files, no directories
  });

  console.log(`📊 Found ${files.length} files to upload\n`);

  for (const file of files) {
    const stats = fs.statSync(file);
    console.log(`\n📤 Processing: ${file}`);

    try {
      await uploadFile(storage, file, stats);
    } catch (err) {
      console.error(`❌ Error uploading ${file}:`, err.message);
    }
  }

  storage.close();
}

main().catch(console.error);