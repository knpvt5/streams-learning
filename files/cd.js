import { v2 as cloudinary } from "cloudinary";
import { getAllFiles } from "../utils/fe.js";
import path from "node:path";
import os from "node:os";

process.loadEnvFile("./.env");

const dirName = process.argv[2] || "OneDrive";
const fullPath = path.join(os.homedir(), dirName);

function getResourceType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if ([".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg"].includes(ext)) {
    return "image";
  } else if ([".mp4", ".avi", ".mov", ".mkv"].includes(ext)) {
    return "video";
  } else {
    return "raw";
  }
}

(async function () {
  // Configuration
  cloudinary.config({
    cloud_name: process.env.CD_NAME,
    api_key: process.env.CD_API_KEY,
    api_secret: process.env.CD_API_SECRET,
  });

  const filesToUpload = getAllFiles(fullPath);
  console.log(
    `Found ${filesToUpload.length} files to upload from '${dirName}' directory.`
  );

  // Upload an image
  for (const filePath of filesToUpload) {
    try {
      const resourceType = getResourceType(filePath);
      const uploadResult = await cloudinary.uploader.upload(filePath, {
        public_id: path.basename(filePath, path.extname(filePath)),
        resource_type: resourceType,
      });

      console.log(`Uploaded: ${filePath} → ${uploadResult.public_id}`);

      // Generate URLs (adjust for raw files if needed)
      const optimizeUrl = cloudinary.url(uploadResult.public_id, {
        fetch_format: "auto",
        quality: "auto",
        resource_type: resourceType,
      });

      console.log(`Optimized URL: ${optimizeUrl}`);
    } catch (error) {
      console.error(`Failed to upload ${filePath}:`, error.message);
    }
  }
})();
