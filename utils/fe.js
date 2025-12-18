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
  ".jpeg",
  ".mp4",
  ".txt",
  ".svg",
  ".pdf",
  ".docx",
  ".xlsx",
  ".pptx",
  ".mp3",
  ".mkv",
  ".webp",
  ".heic",
  ".dng",
  ".cr2",
  ".cr3",
  ".nef",
  ".arw",
  ".raf",
  ".rw2",
  ".orf",
  ".mov",
  ".avi",
  ".webm",
  ".flv",
  ".wmv",
  ".m4v",
  ".3gp",
  ".ts",
  ".mts",
  ".vob",
  ".wav",
  ".aac",
  ".flac",
  ".ogg",
  ".m4a",
  ".wma",
  ".opus",
  ".alac",
  ".aiff",
  ".ape",
  ".amr",
]);

export function getAllFiles(dirPath) {
  try {
    let files = [];

    const stats = fs.statSync(dirPath);

    if (!stats.isDirectory()) {
      if (allowedFilesList.has(path.extname(dirPath))) {
        return [dirPath];
      } else {
        return [];
      }
    }

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
  } catch (error) {
    throw error;
  }
}

// console.log("Working directory:", process.cwd());
// console.log(getAllFiles(fullPath));
