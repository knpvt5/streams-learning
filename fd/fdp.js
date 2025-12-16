import fs from "node:fs/promises";

const fh = await fs.open("w.txt", "r+");

const data = await fh.read(Buffer.alloc(3))

// const { buffer, bytesWritten } = await fh.write(Buffer.from("karan"));
// console.log(buffer);
// console.log(bytesWritten);

console.log(data)

await fh.close();

console.log("first");
