// node --experimental-sea-config sea-config.json

// node -e "require('fs').copyFileSync(process.execPath, 'stream.exe')"
// const filePaht  = String.raw`C:\Users\karan_pnrp70e\Desktop\http-server\text.txt`

import path from "node:path";
import os from "node:os";
import { execSync } from "node:child_process";


import fs from "node:fs";


console.log(os.homedir())

const dirName = process.argv[2] || 'OneDrive';

console.log("Path given", dirName)

const fullPath = path.join(os.homedir(), dirName);

const files = fs.readdirSync(fullPath);
console.log(files);






