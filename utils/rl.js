export const readline = (ques, cb) => {
  process.stdout.write(ques);
  process.stdin.on("data", (input) => {
    cb(input);
    process.stdout.write(ques);
  });
};
