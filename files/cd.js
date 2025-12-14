import { v2 as cloudinary } from "cloudinary";
import { getAllFiles } from "../utils/fe.js";

process.loadEnvFile("./.env");

(async function () {
  // Configuration
  cloudinary.config({
    cloud_name: process.env.CD_NAME,
    api_key: process.env.CD_API_KEY,
    api_secret: process.env.CD_API_SECRET,
  });

  const filesToUpload = getAllFiles("ai");

  console.log(
    `Found ${filesToUpload.length} files to upload from 'ai' directory.`
  );

  // Upload an image
  for (const filePath of filesToUpload) {
    try {
      const uploadResult = await cloudinary.uploader.upload(filePath, {
        public_id: path.basename(filePath, path.extname(filePath)), // Use filename as public_id
        resource_type: "raw", // For non-image files; remove if uploading images
      });

      console.log(`Uploaded: ${filePath} → ${uploadResult.public_id}`);

      // Generate URLs (adjust for raw files if needed)
      const optimizeUrl = cloudinary.url(uploadResult.public_id, {
        fetch_format: "auto",
        quality: "auto",
        resource_type: "raw", // Add if raw
      });

      console.log(`Optimized URL: ${optimizeUrl}`);
    } catch (error) {
      console.error(`Failed to upload ${filePath}:`, error.message);
    }
  }
})();
