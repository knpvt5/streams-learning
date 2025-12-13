console.log(process.execPath)

node --experimental-sea-config sea-config.json

node -e "require('fs').copyFileSync(process.execPath, 'stream.exe')"