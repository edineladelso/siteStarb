"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// ==================== TIPOS ====================
type FileType = "image" | "pdf" | "document";

type UploadConfig = {
  maxSize: number; // em bytes
  acceptedFormats: string[];
  multiple?: boolean;
  folder?: string;
};

type UploadedFile = {
  id: string;
  name: string;
  size: number;
  type: string;
  url?: string;
  publicId?: string;
  progress: number;
  status: "uploading" | "success" | "error";
  error?: string;
};

// Configurações por tipo
const UPLOAD_CONFIGS: Record<FileType, UploadConfig> = {
  image: {
    maxSize: 3 * 1024 * 1024, // 3MB
    acceptedFormats: [
      ".webp",
      ".png",
      ".avif",
      "image/webp",
      "image/png",
      "image/avif",
    ],
    multiple: true,
  },
  pdf: {
    maxSize: 400 * 1024 * 1024, // 400MB
    acceptedFormats: [".pdf", "application/pdf"],
    multiple: false,
  },
  document: {
    maxSize: 50 * 1024 * 1024, // 50MB
    acceptedFormats: [".pdf", ".doc", ".docx", "application/pdf"],
    multiple: true,
  },
};

// ==================== CLOUDINARY UPLOAD COMPONENT ====================
export default function CloudinaryUpload({
  type = "image",
  folder = "starb",
  onUploadComplete,
  onUploadError,
  label,
  description,
}: {
  type?: FileType;
  folder?: string;
  onUploadComplete?: (files: UploadedFile[]) => void;
  onUploadError?: (error: string) => void;
  label?: string;
  description?: string;
}) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const config = UPLOAD_CONFIGS[type];

  // Validar arquivo
  const validateFile = (file: File): { valid: boolean; error?: string } => {
    // Validar tamanho
    if (file.size > config.maxSize) {
      const maxSizeMB = config.maxSize / (1024 * 1024);
      return {
        valid: false,
        error: `Arquivo muito grande. Tamanho máximo: ${maxSizeMB}MB`,
      };
    }

    // Validar formato
    const fileExtension = `.${file.name.split(".").pop()?.toLowerCase()}`;
    const isValidFormat = config.acceptedFormats.some(
      (format) =>
        format === fileExtension ||
        format === file.type ||
        file.type.startsWith(format.replace("/*", "")),
    );

    if (!isValidFormat) {
      return {
        valid: false,
        error: `Formato não suportado. Formatos aceitos: ${config.acceptedFormats
          .filter((f) => f.startsWith("."))
          .join(", ")}`,
      };
    }

    return { valid: true };
  };

  // Simular upload para Cloudinary
  const uploadToCloudinary = async (file: File): Promise<UploadedFile> => {
    const fileId = Math.random().toString(36).substring(7);

    // Criar objeto de arquivo
    const uploadedFile: UploadedFile = {
      id: fileId,
      name: file.name,
      size: file.size,
      type: file.type,
      progress: 0,
      status: "uploading",
    };

    setFiles((prev) => [...prev, uploadedFile]);

    try {
      // IMPORTANTE: Aqui você deve implementar o upload real para Cloudinary
      // Exemplo de código real:
      /*
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'seu_preset');
      formData.append('folder', `${folder}/${type}`);

      const response = await fetch(
        'https://api.cloudinary.com/v1_1/SEU_CLOUD_NAME/auto/upload',
        {
          method: 'POST',
          body: formData,
          onUploadProgress: (progressEvent) => {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setFiles(prev => prev.map(f => 
              f.id === fileId ? { ...f, progress } : f
            ));
          }
        }
      );

      const data = await response.json();
      */

      // Simulação de upload com progresso
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise((resolve) => setTimeout(resolve, 200));
        setFiles((prev) =>
          prev.map((f) => (f.id === fileId ? { ...f, progress } : f)),
        );
      }

      // Simular resposta do Cloudinary
      const mockCloudinaryResponse = {
        url: URL.createObjectURL(file),
        public_id: `${folder}/${type}/${fileId}`,
        secure_url: URL.createObjectURL(file),
      };

      const completedFile: UploadedFile = {
        ...uploadedFile,
        progress: 100,
        status: "success",
        url: mockCloudinaryResponse.secure_url,
        publicId: mockCloudinaryResponse.public_id,
      };

      setFiles((prev) =>
        prev.map((f) => (f.id === fileId ? completedFile : f)),
      );

      return completedFile;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Erro ao fazer upload";

      setFiles((prev) =>
        prev.map((f) =>
          f.id === fileId ? { ...f, status: "error", error: errorMessage } : f,
        ),
      );

      throw new Error(errorMessage);
    }
  };

  // Processar arquivos
  const handleFiles = async (fileList: FileList) => {
    const filesToUpload = Array.from(fileList);

    // Validar múltiplos arquivos
    if (!config.multiple && filesToUpload.length > 1) {
      onUploadError?.("Apenas um arquivo pode ser enviado por vez");
      return;
    }

    // Validar cada arquivo
    const validationResults = filesToUpload.map((file) => ({
      file,
      validation: validateFile(file),
    }));

    const invalidFiles = validationResults.filter((r) => !r.validation.valid);
    if (invalidFiles.length > 0) {
      onUploadError?.(invalidFiles[0].validation.error || "Arquivo inválido");
      return;
    }

    // Upload de arquivos válidos
    try {
      const uploadPromises = validationResults.map((r) =>
        uploadToCloudinary(r.file),
      );
      const uploadedFiles = await Promise.all(uploadPromises);
      onUploadComplete?.(uploadedFiles);
    } catch (error) {
      onUploadError?.(
        error instanceof Error ? error.message : "Erro no upload",
      );
    }
  };

  // Handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const removeFile = (fileId: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== fileId));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getTypeIcon = () => {
    switch (type) {
      case "image":
        return (
          <svg
            className="h-12 w-12"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        );
      case "pdf":
        return (
          <svg
            className="h-12 w-12"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
        );
      default:
        return (
          <svg
            className="h-12 w-12"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        );
    }
  };

  return (
    <div className="space-y-4">
      {/* Label */}
      {label && (
        <div>
          <label className="text-sm font-semibold text-slate-700">
            {label}
          </label>
          {description && (
            <p className="mt-1 text-xs text-slate-500">{description}</p>
          )}
        </div>
      )}

      {/* Upload Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition-all ${
          isDragging
            ? "border-blue-500 bg-blue-50"
            : "border-slate-300 hover:border-blue-400 hover:bg-slate-50"
        } `}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple={config.multiple}
          accept={config.acceptedFormats.join(",")}
          onChange={handleFileSelect}
          className="hidden"
        />

        <div className="flex flex-col items-center gap-4">
          <div
            className={`${isDragging ? "text-blue-600" : "text-slate-400"} transition-colors`}
          >
            {getTypeIcon()}
          </div>

          <div>
            <p className="mb-1 text-base font-medium text-slate-700">
              {isDragging
                ? "Solte os arquivos aqui"
                : "Clique para fazer upload ou arraste arquivos"}
            </p>
            <p className="text-sm text-slate-500">
              {config.acceptedFormats
                .filter((f) => f.startsWith("."))
                .join(", ")
                .toUpperCase()}
              {" • "}
              Máx. {formatFileSize(config.maxSize)}
            </p>
          </div>

          <Button type="button" variant="outline" size="sm" className="gap-2">
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            Selecionar {config.multiple ? "Arquivos" : "Arquivo"}
          </Button>
        </div>
      </div>

      {/* Lista de Arquivos */}
      {files.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm font-semibold text-slate-700">
            Arquivos ({files.length})
          </p>

          <div className="space-y-2">
            {files.map((file) => (
              <div
                key={file.id}
                className="flex items-center gap-4 rounded-xl border-2 border-slate-200 bg-white p-4"
              >
                {/* Thumbnail/Icon */}
                <div className="shrink-0">
                  {file.url && type === "image" ? (
                    <div className="h-12 w-12 overflow-hidden rounded-lg bg-slate-100">
                      <img
                        src={file.url}
                        alt={file.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                      <svg
                        className="h-6 w-6 text-blue-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-900">
                    {file.name}
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    <p className="text-xs text-slate-500">
                      {formatFileSize(file.size)}
                    </p>
                    {file.status === "success" && (
                      <Badge className="bg-green-100 text-xs text-green-800">
                        ✓ Completo
                      </Badge>
                    )}
                    {file.status === "error" && (
                      <Badge className="bg-red-100 text-xs text-red-800">
                        ✗ Erro
                      </Badge>
                    )}
                  </div>

                  {/* Progress Bar */}
                  {file.status === "uploading" && (
                    <div className="mt-2">
                      <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300"
                          style={{ width: `${file.progress}%` }}
                        />
                      </div>
                      <p className="mt-1 text-xs text-slate-500">
                        {file.progress}% enviado
                      </p>
                    </div>
                  )}

                  {/* Error Message */}
                  {file.status === "error" && file.error && (
                    <p className="mt-1 text-xs text-red-600">{file.error}</p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  {file.status === "success" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(file.url, "_blank");
                      }}
                    >
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </Button>
                  )}

                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-red-600 hover:bg-red-50 hover:text-red-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(file.id);
                    }}
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Info Cards */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-600">
              <svg
                className="h-4 w-4 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-blue-900">
                Formatos Aceitos
              </p>
              <p className="mt-1 text-xs text-blue-700">
                {config.acceptedFormats
                  .filter((f) => f.startsWith("."))
                  .join(", ")
                  .toUpperCase()}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-indigo-100 bg-indigo-50 p-4">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-600">
              <svg
                className="h-4 w-4 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-indigo-900">
                Tamanho Máximo
              </p>
              <p className="mt-1 text-xs text-indigo-700">
                {formatFileSize(config.maxSize)} por arquivo
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
