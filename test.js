for(let i = 1; i<=50; i++){
  process.stdout.write("█");
  // process.stdout.write("█" + "\r");
  // process.stdout.write("\r" + "█" );
  // process.stdout.write("\n" + "█" );
  // process.stdout.write("█" + "\n");
  await new Promise(res=>setTimeout(res,50));
}