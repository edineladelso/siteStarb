// actions/delete-image.action.ts
"use server";

import cloudinary from "@/lib/cloudinary";

export async function deleteFromCloudinary(publicId: string) {
  try {
    await cloudinary.uploader.destroy(publicId);
    return { success: true };
  } catch (error) {
    console.error("[CLOUDINARY_DELETE_ERROR]", error);
    return { success: false };
  }
}
