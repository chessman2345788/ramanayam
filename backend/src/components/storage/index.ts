import { v2 as cloudinary } from "cloudinary";
import logger from "../logger";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "",
  api_key: process.env.CLOUDINARY_API_KEY || "",
  api_secret: process.env.CLOUDINARY_API_SECRET || "",
});

export const uploadImageToCloudinary = async (
  fileOrBase64OrUrl: string,
  folder = "ramanayam/products",
): Promise<{ secureUrl: string; publicId: string } | null> => {
  try {
    const keySecret = process.env.CLOUDINARY_API_SECRET;
    if (!keySecret) {
      if (fileOrBase64OrUrl.startsWith("http://") || fileOrBase64OrUrl.startsWith("https://")) {
        return { secureUrl: fileOrBase64OrUrl, publicId: "" };
      }
      return null;
    }

    const result = await cloudinary.uploader.upload(fileOrBase64OrUrl, {
      folder,
      resource_type: "auto",
      transformation: [{ quality: "auto", fetch_format: "auto" }],
    });

    return {
      secureUrl: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    logger.error("Cloudinary upload failed", error);
    if (fileOrBase64OrUrl.startsWith("http://") || fileOrBase64OrUrl.startsWith("https://")) {
      return { secureUrl: fileOrBase64OrUrl, publicId: "" };
    }
    return null;
  }
};

export const deleteImageFromCloudinary = async (publicId: string): Promise<boolean> => {
  try {
    if (!publicId || !process.env.CLOUDINARY_API_SECRET) return false;
    await cloudinary.uploader.destroy(publicId);
    return true;
  } catch (error) {
    logger.error("Cloudinary asset deletion failed", error);
    return false;
  }
};

export const uploadImage = async (filePath: string, folder = "ramanayam"): Promise<string | null> => {
  const result = await uploadImageToCloudinary(filePath, folder);
  return result ? result.secureUrl : null;
};
