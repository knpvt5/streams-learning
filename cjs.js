const res = await fetch("http://10.96.147.138:3000", {
  method: "POST",
  body: "Hello from client",
});

console.log({res})

console.log(res.headers);

console.log(res.body)

// console.log(await res.text());

for await (const chunk of res.body) {
  // document.write(new TextDecoder().decode(chunk) + "<br>");
  console.log("Chunk:", new TextDecoder().decode(chunk));
}

// res.headers.forEach((value, key) => {
//   console.log(`${key}: ${value}`);
// });
