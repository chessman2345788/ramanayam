import { v2 as cloudinary } from "cloudinary";
import logger from "../logger";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "",
  api_key: process.env.CLOUDINARY_API_KEY || "",
  api_secret: process.env.CLOUDINARY_API_SECRET || "",
});

export const uploadImage = async (
  filePath: string,
  folder = "ramanayam",
): Promise<string | null> => {
  try {
    const result = await cloudinary.uploader.upload(filePath, { folder });
    return result.secure_url;
  } catch (error) {
    logger.error("Cloudinary upload failed", error);
    return null;
  }
};
