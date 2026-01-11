import fs from "node:fs";

const fd = fs.openSync("cd\\text.txt");
console.log(fd);

const nb = Buffer.alloc(10);

// fs.read(fd, {}, (err, bytesRead, buffer) => {
//   console.log(err);
//   console.log(bytesRead);
//   console.log(buffer);
//   // console.log(buffer.toString());
// });

// fs.read(fd, nb, 2, 3, 1, (err, bytesRead, buffer) => {
//     console.log(err);
//     console.log(bytesRead);
//     console.log(buffer);
//     console.log(buffer.toString());
// });

const ro = fs.readSync(fd, nb, 2, 3, 1);
console.log(ro)

// fs.writeSync(fd, "hello");
// fs.closeSync(fd);
