import fs from "node:fs";
import path from "node:path";

const ignoreList = new Set([".git", ".env", "node_modules"]);

export function getAllFiles(dirPath) {
  let files = [];

  const items = fs.readdirSync(dirPath);

  for (const item of items) {
    if(ignoreList.has(item)) continue;
    const fullPath = path.join(dirPath, item);

    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      files = [...files, ...getAllFiles(fullPath)];
    } else {
      files.push(fullPath);
    }
  }

  return files;
}

