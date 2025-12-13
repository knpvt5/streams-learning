import fs from "node:fs";
import { emitter } from "./event.js";

// "C:\Users\karan_pnrp70e\Videos\Stree 2 Sarkate Ka Aatank (2024) [720p] [WEBRip] [YTS.MX]\Stree.2.Sarkate.Ka.Aatank.2024.720p.WEBRip.x264.AAC-[YTS.MX].mp4"
// "C:\Users\karan_pnrp70e\Videos\Stranger.Things.S05E03.1080p.WEB.h264-ETHEL[EZTVx.to].mkv"

const filePath = String.raw`C:\Users\karan_pnrp70e\Videos\Stree 2 Sarkate Ka Aatank (2024) [720p] [WEBRip] [YTS.MX]\Stree.2.Sarkate.Ka.Aatank.2024.720p.WEBRip.x264.AAC-[YTS.MX].mp4`;

const stats = fs.statSync(filePath);
const totalBytes = stats.size;

const chunkSize = 100 * 1024 * 1024;
const totalChunks = Math.ceil(totalBytes / chunkSize);

let totalCount = 0;
let readcount = 0;

// let arr = []

console.time("end");
const stream = fs.createReadStream(filePath, {
  highWaterMark: chunkSize,
});

const wstream = fs.createWriteStream("output.mkv");

stream.on("data", async (chunk) => {
  // await new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve();
  //     console.log("Resumed before");
  //   }, 1000);
  // });

  // fs.appendFileSync("output.mkv", chunk);
  wstream.write(chunk, (err) => {
    console.log("error in wstream", err);
  });
  readcount++;

  console.log(Math.ceil((readcount / totalChunks) * 100) + "% completed");

  // stream.pause();
  // setTimeout(() => {
  //   stream.resume();
  // }, 1000);

  // await new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve();
  //     console.log("Resumed after");
  //   }, 1000);
  // });

  // console.log("resume")
});

stream.on("end", () => {
  console.log("File read complete", readcount);
  console.timeEnd("end");
  // console.log(stream.isPaused());
  // console.log(stream.readableAborted);
  // console.log(stream.readableFlowing);
  // console.log(stream.readableDidRead);
  // console.log(stream.readableHighWaterMark);
  // console.log(stream.bytesRead);
  // console.log(stream.path);
});

console.log("end");
// emitter.emit("a", "Karan");
