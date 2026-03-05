const MB_IN_BYTES = 1024 * 1024;

export const LIVRO_BLOB_ROOT_FOLDER = "starb/livros/arquivos";
export const LIVRO_BLOB_MAX_SIZE_MB = 400;
export const LIVRO_BLOB_MAX_SIZE_BYTES = LIVRO_BLOB_MAX_SIZE_MB * MB_IN_BYTES;

export const LIVRO_DOCUMENT_ACCEPTED_FORMATS = [
  ".pdf",
  ".epub",
  ".txt",
  ".md",
  ".doc",
  ".docx",
  "application/pdf",
  "application/epub+zip",
  "text/plain",
  "text/markdown",
  "text/x-markdown",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
] as const;

export const LIVRO_BLOB_ALLOWED_CONTENT_TYPES = [
  "application/pdf",
  "application/epub+zip",
  "text/plain",
  "text/markdown",
  "text/x-markdown",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
] as const;

export function sanitizeFileName(fileName: string): string {
  return fileName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9._-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function normalizeLivroBlobFolder(folder?: string): string {
  const candidate = (folder ?? LIVRO_BLOB_ROOT_FOLDER)
    .trim()
    .replace(/^\/+|\/+$/g, "")
    .replace(/\/{2,}/g, "/");

  if (!candidate.startsWith(LIVRO_BLOB_ROOT_FOLDER)) {
    throw new Error("Pasta inválida para arquivos de livros.");
  }

  if (candidate.includes("..")) {
    throw new Error("Pasta inválida para arquivos de livros.");
  }

  return candidate;
}

export function normalizeLivroBlobPathname(pathname: string): string {
  const normalized = pathname
    .trim()
    .replace(/^\/+|\/+$/g, "")
    .replace(/\/{2,}/g, "/");

  if (!normalized.startsWith(`${LIVRO_BLOB_ROOT_FOLDER}/`)) {
    throw new Error("Pathname inválido para Blob de livros.");
  }

  if (normalized.includes("..")) {
    throw new Error("Pathname inválido para Blob de livros.");
  }

  return normalized;
}

export function buildLivroBlobPathname(folder: string, fileName: string): string {
  const safeFolder = normalizeLivroBlobFolder(folder);
  const normalizedName = sanitizeFileName(fileName) || "arquivo";
  const unique = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  return `${safeFolder}/${unique}-${normalizedName}`;
}

export function isLivroBlobUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.hostname.includes("blob.vercel-storage.com");
  } catch {
    return false;
  }
}

export function getLivroBlobPathnameFromUrl(url: string): string {
  const parsed = new URL(url);
  return normalizeLivroBlobPathname(parsed.pathname);
}

