import fs from "node:fs/promises";

const readPath =  String.raw`C:\Users\karan_pnrp70e\Desktop\Captures\screenrecording\Screen Recording 2025-11-04 090852.mp4`
const writePath = "w.mkv"

const fhr = await fs.open(readPath, "r+");
const fhw = await fs.open(writePath, "w+");

// console.log(fh)
const rs  = fhr.createReadStream({
    highWaterMark: 64 * 1024
});

const ws = fhw.createWriteStream({
    highWaterMark: 64 * 1024
});

// rs.on("data", (chunk) => {
//     // console.log("chunk", chunk.toString())
//     const canWrite  = ws.write(chunk)
// })

rs.pipe(ws)

rs.on("end", async () => {
    await fhr.close();
    await fhw.close();
})