export interface CloudinaryUploadResult {
  url: string;
  publicId: string;
  width?: number;
  height?: number;
  format?: string;
  resourceType?: string;
}

// ==================== lib/cloudinary.ts ====================

interface UploadOptions {
  folder?: string;
  maxFileSize?: number;
  acceptedFormats?: string[];
  resourceType?: "image" | "video" | "raw" | "auto";
}

export class CloudinaryUploadError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CloudinaryUploadError";
  }
}

/**
 * Valida se o arquivo está dentro dos limites permitidos
 */
export function validateFile(
  file: File,
  maxSize: number,
  acceptedFormats: string[]
): { valid: boolean; error?: string } {
  // Validar tamanho
  if (file.size > maxSize) {
    const maxSizeMB = maxSize / (1024 * 1024);
    return {
      valid: false,
      error: `Arquivo muito grande. Tamanho máximo: ${maxSizeMB}MB`,
    };
  }

  // Validar formato
  const fileExtension = `.${file.name.split(".").pop()?.toLowerCase()}`;
  const isValidFormat = acceptedFormats.some(
    (format) =>
      format === fileExtension ||
      format === file.type ||
      file.type.startsWith(format.replace("/*", ""))
  );

  if (!isValidFormat) {
    return {
      valid: false,
      error: `Formato não suportado. Formatos aceitos: ${acceptedFormats
        .filter((f) => f.startsWith("."))
        .join(", ")}`,
    };
  }

  return { valid: true };
}

/**
 * Faz upload de arquivo para o Cloudinary
 */
export async function uploadToCloudinary(
  file: File,
  options: UploadOptions = {}
): Promise<CloudinaryUploadResult> {
  const {
    folder = "starb",
    resourceType = "auto",
  } = options;

  // Validações de ambiente
  if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
    throw new CloudinaryUploadError("NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME não configurado");
  }

  if (!process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET) {
    throw new CloudinaryUploadError("NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET não configurado");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
  formData.append("folder", folder);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new CloudinaryUploadError(
        error.error?.message || "Erro ao fazer upload para Cloudinary"
      );
    }

    const data = await response.json();

    return {
      url: data.secure_url,
      publicId: data.public_id,
      width: data.width,
      height: data.height,
      format: data.format,
      resourceType: data.resource_type,
    };
  } catch (error) {
    if (error instanceof CloudinaryUploadError) {
      throw error;
    }
    throw new CloudinaryUploadError(
      `Erro de rede ao fazer upload: ${error instanceof Error ? error.message : "Erro desconhecido"}`
    );
  }
}

/**
 * Faz upload de múltiplos arquivos
 */
export async function uploadMultipleToCloudinary(
  files: File[],
  options: UploadOptions = {}
): Promise<CloudinaryUploadResult[]> {
  const uploadPromises = files.map((file) => uploadToCloudinary(file, options));
  return Promise.all(uploadPromises);
}

/**
 * Deleta arquivo do Cloudinary
 */
export async function deleteFromCloudinary(publicId: string): Promise<boolean> {
  // IMPORTANTE: Deletar do Cloudinary requer autenticação no backend
  // Esta função deve ser chamada de uma API route ou Server Action
  
  try {
    const response = await fetch("/api/cloudinary/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ publicId }),
    });

    return response.ok;
  } catch (error) {
    console.error("Erro ao deletar do Cloudinary:", error);
    return false;
  }
}

/**
 * Constantes de validação para diferentes tipos de arquivo
 */
export const UPLOAD_CONSTRAINTS = {
  image: {
    maxSize: 3 * 1024 * 1024, // 3MB
    acceptedFormats: [".webp", ".png", ".avif", "image/webp", "image/png", "image/avif"],
  },
  pdf: {
    maxSize: 400 * 1024 * 1024, // 400MB
    acceptedFormats: [".pdf", "application/pdf"],
  },
  document: {
    maxSize: 50 * 1024 * 1024, // 50MB
    acceptedFormats: [".pdf", ".doc", ".docx", "application/pdf"],
  },
} as const;

