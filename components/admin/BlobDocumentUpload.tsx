"use client";

import { upload } from "@vercel/blob/client";
import { useRef, useState } from "react";
import {
  buildLivroBlobPathname,
  LIVRO_BLOB_MAX_SIZE_BYTES,
  LIVRO_BLOB_ROOT_FOLDER,
  LIVRO_DOCUMENT_ACCEPTED_FORMATS,
} from "@/lib/blob/livros";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export type UploadedBlobFile = {
  id: string;
  name: string;
  size: number;
  type: string;
  url?: string;
  pathname?: string;
  bytes?: number;
  format?: string;
  progress: number;
  status: "uploading" | "success" | "error";
  error?: string;
};

type BlobDocumentUploadProps = {
  folder?: string;
  onUploadComplete?: (files: UploadedBlobFile[]) => void;
  onUploadError?: (error: string) => void;
  onFileRemove?: (file: UploadedBlobFile) => void;
  label?: string;
  description?: string;
  acceptedFormats?: string[];
  maxSize?: number;
  multiple?: boolean;
  showInfoCards?: boolean;
};

function inferFileFormat(file: File): string {
  const ext = file.name.split(".").pop()?.toLowerCase();
  if (ext) return ext;
  if (file.type.includes("/")) return file.type.split("/")[1] || "";
  return "";
}

export default function BlobDocumentUpload({
  folder = LIVRO_BLOB_ROOT_FOLDER,
  onUploadComplete,
  onUploadError,
  onFileRemove,
  label,
  description,
  acceptedFormats,
  maxSize,
  multiple = false,
  showInfoCards = false,
}: BlobDocumentUploadProps) {
  const [files, setFiles] = useState<UploadedBlobFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resolvedAcceptedFormats = acceptedFormats ?? [...LIVRO_DOCUMENT_ACCEPTED_FORMATS];
  const resolvedMaxSize = maxSize ?? LIVRO_BLOB_MAX_SIZE_BYTES;

  const validateFile = (file: File): { valid: boolean; error?: string } => {
    if (file.size > resolvedMaxSize) {
      const maxSizeMB = resolvedMaxSize / (1024 * 1024);
      return {
        valid: false,
        error: `Arquivo muito grande. Tamanho máximo: ${maxSizeMB}MB`,
      };
    }

    const fileExtension = `.${file.name.split(".").pop()?.toLowerCase()}`;
    const isValidFormat = resolvedAcceptedFormats.some(
      (format) =>
        format === fileExtension ||
        format === file.type ||
        file.type.startsWith(format.replace("/*", "")),
    );

    if (!isValidFormat) {
      return {
        valid: false,
        error: `Formato não suportado. Formatos aceitos: ${resolvedAcceptedFormats
          .filter((f) => f.startsWith("."))
          .join(", ")}`,
      };
    }

    return { valid: true };
  };

  const deleteRemoteFile = async (file: UploadedBlobFile) => {
    if (!file.url && !file.pathname) return;
    await fetch("/api/blob/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url: file.url,
        pathname: file.pathname,
      }),
    });
  };

  const uploadToBlob = async (file: File): Promise<UploadedBlobFile> => {
    const fileId = Math.random().toString(36).substring(7);
    const uploadingFile: UploadedBlobFile = {
      id: fileId,
      name: file.name,
      size: file.size,
      type: file.type,
      progress: 0,
      status: "uploading",
    };

    setFiles((prev) => [...prev, uploadingFile]);

    try {
      const pathname = buildLivroBlobPathname(folder, file.name);
      const result = await upload(pathname, file, {
        access: "public",
        contentType: file.type || undefined,
        handleUploadUrl: "/api/blob/upload",
        multipart: true,
        onUploadProgress: (event) => {
          setFiles((prev) =>
            prev.map((item) =>
              item.id === fileId
                ? { ...item, progress: Math.round(event.percentage || 0) }
                : item,
            ),
          );
        },
      });

      const completed: UploadedBlobFile = {
        ...uploadingFile,
        progress: 100,
        status: "success",
        url: result.url,
        pathname: result.pathname,
        bytes: file.size,
        format: inferFileFormat(file) || undefined,
      };

      setFiles((prev) => prev.map((item) => (item.id === fileId ? completed : item)));

      return completed;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Erro ao enviar arquivo para o Blob";

      setFiles((prev) =>
        prev.map((item) =>
          item.id === fileId
            ? { ...item, status: "error", error: errorMessage }
            : item,
        ),
      );

      throw new Error(errorMessage);
    }
  };

  const handleFiles = async (fileList: FileList) => {
    const filesToUpload = Array.from(fileList);

    if (!multiple && filesToUpload.length > 1) {
      onUploadError?.("Apenas um arquivo pode ser enviado por vez");
      return;
    }

    const validationResults = filesToUpload.map((file) => ({
      file,
      validation: validateFile(file),
    }));

    const invalidFiles = validationResults.filter((r) => !r.validation.valid);
    if (invalidFiles.length > 0) {
      onUploadError?.(invalidFiles[0].validation.error || "Arquivo inválido");
      return;
    }

    try {
      if (!multiple) {
        const uploadedFiles = files.filter((file) => file.status === "success");
        await Promise.all(uploadedFiles.map((file) => deleteRemoteFile(file)));
        uploadedFiles.forEach((file) => onFileRemove?.(file));
        setFiles([]);
      }

      const uploadedFiles = await Promise.all(
        validationResults.map((item) => uploadToBlob(item.file)),
      );
      onUploadComplete?.(uploadedFiles);
    } catch (error) {
      onUploadError?.(error instanceof Error ? error.message : "Erro no upload");
    }
  };

  const removeFile = async (fileId: string) => {
    const target = files.find((file) => file.id === fileId);
    setFiles((prev) => prev.filter((item) => item.id !== fileId));
    if (target?.status === "success") {
      try {
        await deleteRemoteFile(target);
      } catch {
        // limpeza best-effort
      }
      onFileRemove?.(target);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-4 overflow-hidden">
      {label && (
        <div>
          <label className="text-sm font-semibold text-slate-700">{label}</label>
          {description && <p className="mt-1 break-words text-xs text-slate-500">{description}</p>}
        </div>
      )}

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setIsDragging(false);
        }}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          if (e.dataTransfer.files.length > 0) {
            handleFiles(e.dataTransfer.files);
          }
        }}
        onClick={() => fileInputRef.current?.click()}
        className={`relative cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed p-6 text-center transition-all sm:p-8 ${
          isDragging
            ? "border-blue-500 bg-blue-50"
            : "border-slate-300 hover:border-blue-400 hover:bg-slate-50"
        } `}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple={multiple}
          accept={resolvedAcceptedFormats.join(",")}
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              handleFiles(e.target.files);
            }
          }}
          className="hidden"
        />

        <div className="flex flex-col items-center gap-4">
          <p className="mx-auto max-w-full break-words text-sm text-slate-500">
            {resolvedAcceptedFormats
              .filter((f) => f.startsWith("."))
              .join(", ")
              .toUpperCase()}
            {" • "}
            Máx. {formatFileSize(resolvedMaxSize)}
          </p>

          <Button type="button" variant="outline" size="sm" className="gap-2">
            Selecionar {multiple ? "Arquivos" : "Arquivo"}
          </Button>
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm font-semibold text-slate-700">Arquivos ({files.length})</p>
          <div className="space-y-2 overflow-hidden">
            {files.map((file) => (
              <div
                key={file.id}
                className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 overflow-hidden rounded-xl border border-slate-200 bg-white p-3 sm:p-4"
              >
                <div className="min-w-0 flex-1">
                  <p className="break-all text-sm font-medium leading-snug text-slate-900">
                    {file.name}
                  </p>
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <p className="text-xs text-slate-500">{formatFileSize(file.size)}</p>
                    {file.status === "success" && (
                      <Badge className="bg-green-100 text-xs text-green-800">✓ Completo</Badge>
                    )}
                    {file.status === "error" && (
                      <Badge className="bg-red-100 text-xs text-red-800">✗ Erro</Badge>
                    )}
                  </div>

                  {file.status === "uploading" && (
                    <div className="mt-2">
                      <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300"
                          style={{ width: `${file.progress}%` }}
                        />
                      </div>
                      <p className="mt-1 text-xs text-slate-500">{file.progress}% enviado</p>
                    </div>
                  )}

                  {file.status === "error" && file.error && (
                    <p className="mt-1 text-xs text-red-600">{file.error}</p>
                  )}
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  {file.status === "success" && file.url && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(file.url, "_blank", "noopener,noreferrer");
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

      {showInfoCards && (
        <div className="mt-6 rounded-xl border border-indigo-100 bg-indigo-50 p-4">
          <p className="text-sm font-semibold text-indigo-900">Tamanho Máximo</p>
          <p className="mt-1 text-xs text-indigo-700">{formatFileSize(resolvedMaxSize)} por arquivo</p>
        </div>
      )}
    </div>
  );
}
