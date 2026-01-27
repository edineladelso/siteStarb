// ==================== actions/upload.ts ====================
"use server";

import { deleteFromCloudinary } from "@/lib/cloudinary";

export async function deleteFile(publicId: string) {
  try {
    const result = await deleteFromCloudinary(publicId);
    return { success: result };
  } catch (error) {
    console.error("Erro ao deletar arquivo:", error);
    return { success: false };
  }
}