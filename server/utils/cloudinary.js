const cloudinary = require("cloudinary").v2;
const fs = require("fs").promises; // Use the promise-based fs module

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload a single file to Cloudinary
const uploadOnCloudinary = async (localFilePath) => {
  if (!localFilePath) return { error: "No file path provided" };

  try {
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // Delete the local file after successful upload
    await fs.unlink(localFilePath);
    //  console.log("Successfully uploaded to Cloudinary:", response);
    return response.secure_url; // Only return the URL, not the entire response
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);

    // Delete the local file if there's an error
    await fs.unlink(localFilePath);

    return { error: "Error uploading to Cloudinary", details: error };
  }
};

// Upload multiple images to Cloudinary
const uploadMultipleImages = async (filePaths) => {
  const urls = [];

  // Use a loop to handle each image upload
  for (const filePath of filePaths) {
    try {
      const result = await uploadOnCloudinary(filePath);
      // console.log(result);
      // If upload was successful, push the URL; otherwise, skip
      if (result!==undefined && !result.error) {
        urls.push(result); // Add the Cloudinary URL to the array
      } else {
        console.log("Error uploading image:", result.error);
      }
    } catch (error) {
      console.log("Error uploading multiple images to Cloudinary:", error);
    }
  }

  return urls;
};

// Delete an image from Cloudinary
const deleteOnCloudinary = async (publicId) => {
  if (!publicId) return { error: "No public ID provided" };

  try {
    const response = await cloudinary.uploader.destroy(publicId);
    return response;
  } catch (error) {
    console.error("Error while deleting from Cloudinary:", error);
    return { error: "Error while deleting from Cloudinary", details: error };
  }
};

module.exports = {
  uploadOnCloudinary,
  uploadMultipleImages,
  deleteOnCloudinary,
};

