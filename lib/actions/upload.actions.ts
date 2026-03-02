// actions/upload.action.ts
"use server";

import { z } from "zod";
import cloudinary from "@/lib/cloudinary";

const UploadSchema = z.object({
  file: z.string().min(1, "Arquivo obrigatório"), // base64 ou URL temporária
  folder: z.string().optional(),
  publicId: z.string().optional(),
});

type UploadInput = z.infer<typeof UploadSchema>;

export async function uploadToCloudinary(input: UploadInput) {
  const parsed = UploadSchema.safeParse(input);

  if (!parsed.success) {
    return { success: false, error: parsed.error.flatten() };
  }

  try {
    const result = await cloudinary.uploader.upload(parsed.data.file, {
      folder: parsed.data.folder ?? "meu-projeto",
      public_id: parsed.data.publicId,
      overwrite: true,
      resource_type: "auto",
      transformation: [
        { quality: "auto:best" },
        { fetch_format: "auto" },
      ],
    });

    return {
      success: true,
      data: {
        url: result.secure_url,
        publicId: result.public_id,
        width: result.width,
        height: result.height,
        format: result.format,
        bytes: result.bytes,
      },
    };
  } catch (error) {
    console.error("[CLOUDINARY_UPLOAD_ERROR]", error);
    return { success: false, error: "Falha no upload. Tente novamente." };
  }
}