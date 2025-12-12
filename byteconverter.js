const char = 0x61;

//converting to different base
console.log(char.toString(16));
console.log(String.fromCharCode(char)); //utf-16 code unit to char

const char2 = "a";

const utf8Bytes = Buffer.from(char2, "utf-8");

//convert to char to code
const code = char2.charCodeAt(0); //utf-16 code unit

// const u8 = new Uint8Array(utf8Bytes);

const ab = new ArrayBuffer(utf8Bytes.length);
const view = new DataView(ab);

for (let i = 0; i < utf8Bytes.length; i++) {
  view.setUint8(i, utf8Bytes[i]);
}


console.log(utf8Bytes);
console.log(String.fromCodePoint(...utf8Bytes));
console.log(code);
console.log("uint", ab)


// Node.js
Buffer.from('a').toString('base64')
// Output: "YQ=="

// Decode it back
Buffer.from('YQ==', 'base64').toString('utf-8')