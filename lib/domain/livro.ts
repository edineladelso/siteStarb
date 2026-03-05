import { AreaLivro, MacroAreaLivro } from "./areas";
import { isLivroBlobUrl } from "@/lib/blob/livros";
import { ContentBase } from "./content";

export interface MidiaFileType {
  pdf: string;
  pdfPublicId?: string;
  byte: number;
  format: string;
}

export interface CapaFileType {
  capaUrl: string;
  capaPublicId: string;
}

export interface DetalhesLivro {
  numeroPaginas: number;
  autor: string;
  sinopse?: string;
  editora?: string;
  isbn?: string | null;
}

export interface Livro extends ContentBase {
  tipo: "livro";

  autor: string;

  isbn?: string;
  anoPublicacao?: number;

  editora?: string;
  idioma?: string;

  numeroPaginas?: number;

  capa: CapaFileType;
  detalhes: DetalhesLivro;
  midia: MidiaLivro;

  areas: AreaLivro[];
  macroAreas?: MacroAreaLivro[];

  tags: string[];
}

export interface MidiaLivro extends Partial<MidiaFileType> {
  epub?: string;
  resumo?: string;
}

export function getLivroCapaUrl(capa: CapaFileType | string | null | undefined): string {
  if (!capa) return "";
  return typeof capa === "string" ? capa : capa.capaUrl;
}

export function getLivroCapaPublicId(
  capa: CapaFileType | string | null | undefined,
): string {
  if (!capa || typeof capa === "string") return "";
  return capa.capaPublicId;
}

export function getLivroPdfAccessUrl(midia: MidiaLivro | null | undefined): string {
  if (!midia) return "";

  const fromUrl = (() => {
    if (!midia.pdf) return "";
    try {
      const parsed = new URL(midia.pdf);
      const match = parsed.pathname.match(/\/(raw|image)\/upload\/(?:v\d+\/)?(.+)$/);
      if (!match?.[2]) return "";
      return `${match[1]}::${decodeURIComponent(match[2])}`;
    } catch {
      return "";
    }
  })();

  const [resourceTypeFromUrl, publicIdFromUrl] = fromUrl
    ? fromUrl.split("::")
    : ["", ""];
  const resolvedPublicId = midia.pdfPublicId || publicIdFromUrl;
  const resolvedResourceType =
    resourceTypeFromUrl === "image" ? "image" : "raw";

  if (resolvedPublicId) {
    const format = midia.format?.trim() || "pdf";
    const params = new URLSearchParams({
      publicId: resolvedPublicId,
      resourceType: resolvedResourceType,
      format,
    });
    return `/api/cloudinary/download?${params.toString()}`;
  }

  return midia.pdf ?? "";
}

export function getLivroFileDownloadUrl(url: string): string {
  const normalized = url.trim();
  if (!normalized) return "";

  if (isLivroBlobUrl(normalized)) {
    return `/api/blob/download?url=${encodeURIComponent(normalized)}`;
  }

  if (normalized.startsWith("/api/cloudinary/download?")) {
    const [base, queryString = ""] = normalized.split("?");
    const params = new URLSearchParams(queryString);
    params.set("attachment", "1");
    return `${base}?${params.toString()}`;
  }

  return normalized;
}

export function getLivroPdfDownloadUrl(midia: MidiaLivro | null | undefined): string {
  return getLivroFileDownloadUrl(getLivroPdfAccessUrl(midia));
}

export function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return "0 B";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}
