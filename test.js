import fs from "node:fs";

console.log(fs.statSync("utils"))


const allowedList = new Set([
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

    if (!allowedList.has(path.extname(item))) continue;
