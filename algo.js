const files = ["file1.txt", "file2.txt", "file3.txt", ];

// Step 1: Build array of async Promises (not started yet)
const uploadPromises = files.map(async (file) => {
  console.log(`Starting ${file}`); // Runs when Promise starts
  // Simulate async upload (e.g., 2s delay)
  await new Promise((resolve) => setTimeout(resolve, 2000));
  console.log(`Finished ${file}`);
  return `Uploaded ${file}`;
});

// Step 2: Start ALL and wait
const results = await Promise.all(uploadPromises);
console.log("All done:", results);
