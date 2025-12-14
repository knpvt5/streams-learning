import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { execSync } from "node:child_process";

// const dirName = process.argv[2] || "OneDrive";
// const absolutePath = path.join(os.homedir(), dirName);

// const files = fs.readdirSync(fullPath);
// console.log(files);

const ignoreFolderList = new Set([".git", ".env", "node_modules"]);

const allowedFilesList = new Set([
  ".png",
  ".jpg",
  ".env",
  ".mp4",
  ".txt",
  ".jpeg",
  ".gif",
  ".webp",
  ".svg",
  ".pdf",
  ".docx",
  ".xlsx",
  ".pptx",
  ".mp3",
  ".mkv",
  ".webp",
]);

export function getAllFiles(dirPath) {
  let files = [];

  const items = fs.readdirSync(dirPath);
  for (const item of items) {
    if (ignoreFolderList.has(item)) continue;
    const fullPath = path.join(dirPath, item);

    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      files = [...files, ...getAllFiles(fullPath)];
    } else {
      if (!allowedFilesList.has(path.extname(fullPath))) continue;
      files.push(fullPath);
    }
  }

  return files;
}

// console.log("Working directory:", process.cwd());
// console.log(getAllFiles(fullPath));
