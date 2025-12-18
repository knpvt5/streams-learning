import fs from "node:fs";

const ff = "w.txt"

if (fs.existsSync(ff)) {
  const stats = fs.statSync(ff);

  console.log(stats.isDirectory())
} else {
  console.log("File does not exist");
}
