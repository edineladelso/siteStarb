"use server";

import cloudinary from "@/lib/cloudinary";
import { toMacroAreas, type AreaLivro } from "@/lib/domain/areas";
import { db } from "@/lib/drizzle/db";
import { livros } from "@/lib/drizzle/db/schema/livro";
import {
  insertLivroSchema,
  selectLivroSchema,
} from "@/lib/drizzle/validations";
import { gerarSlugUnico } from "@/lib/utils/slugify";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import type { Status } from "../domain/enums";
import type { ActionResult, Livro } from "../types";

function parseAreas(formData: FormData): AreaLivro[] {
  const areasRaw = formData.get("areas") as string;
  return (areasRaw ? areasRaw.split(",").map((a) => a.trim()) : []) as AreaLivro[];
}

function parseTags(formData: FormData): string[] {
  const tagsRaw = formData.get("tags") as string;
  return tagsRaw ? tagsRaw.split(",").map((t) => t.trim()) : [];
}

function parseBytes(formData: FormData): number {
  const value = Number(formData.get("pdf_byte") ?? 0);
  return Number.isFinite(value) && value >= 0 ? Math.trunc(value) : 0;
}

function buildPdfAccessRoute(publicId: string, format = "pdf"): string {
  const params = new URLSearchParams({
    publicId,
    resourceType: "raw",
    format: format || "pdf",
  });

  return `/api/cloudinary/download?${params.toString()}`;
}

function getLegacySafeCapaPublicId(capa: unknown): string {
  if (!capa || typeof capa !== "object") return "";
  const publicId = (capa as { capaPublicId?: unknown }).capaPublicId;
  return typeof publicId === "string" ? publicId : "";
}

function getLegacySafePdfPublicId(midia: unknown): string {
  if (!midia || typeof midia !== "object") return "";
  const publicId = (midia as { pdfPublicId?: unknown }).pdfPublicId;
  return typeof publicId === "string" ? publicId : "";
}

function buildLivroPayload(formData: FormData, slug: string) {
  const areas = parseAreas(formData);
  const tags = parseTags(formData);
  const macroAreas = toMacroAreas(areas);

  const pdfUrl = String(formData.get("pdf_url") ?? "").trim();
  const pdfPublicId = String(formData.get("pdf_public_id") ?? "").trim();
  const pdfFormat = String(formData.get("pdf_format") ?? "").trim() || "pdf";
  const pdfRoute = pdfPublicId ? buildPdfAccessRoute(pdfPublicId, pdfFormat) : "";
  const epubUrl = String(formData.get("epub_url") ?? "").trim();
  const resumoUrl = String(formData.get("resumo_url") ?? "").trim();
  const capaUrl = String(formData.get("capa_url") ?? "").trim();

  return {
    titulo: String(formData.get("titulo")),
    slug,
    categoria: String(formData.get("categoria")),
    descricao: String(formData.get("descricao")),
    status: (formData.get("status") as Status) || "rascunho",

    autor: String(formData.get("autor")),
    anoPublicacao: formData.get("anoPublicacao")
      ? Number(formData.get("anoPublicacao"))
      : null,
    idioma: formData.get("idioma") ? String(formData.get("idioma")) : null,

    capa: {
      capaUrl,
      capaPublicId: String(formData.get("capa_public_id") ?? "").trim(),
    },

    detalhes: {
      sinopse: String(formData.get("sinopse") || formData.get("descricao")),
      numeroPaginas: Number(formData.get("numeroPaginas")),
      autor: String(formData.get("autor")),
      editora: formData.get("editora")
        ? String(formData.get("editora"))
        : undefined,
      isbn: formData.get("isbn") ? String(formData.get("isbn")) : null,
    },

    midia: {
      pdf: pdfRoute || pdfUrl || undefined,
      pdfPublicId: pdfPublicId || undefined,
      byte: parseBytes(formData) || undefined,
      format: pdfFormat || undefined,
      epub: epubUrl,
      resumo: resumoUrl || undefined,
    },

    areas,
    macroAreas,
    tags,
    novo: Boolean(formData.get("novo")),
    popular: Boolean(formData.get("popular")),
  };
}

async function cleanupReplacedAssets(params: {
  previousCapaPublicId?: string;
  previousPdfPublicId?: string;
  nextCapaPublicId?: string;
  nextPdfPublicId?: string;
}) {
  const deletions: Promise<unknown>[] = [];

  if (
    params.previousCapaPublicId &&
    params.previousCapaPublicId !== params.nextCapaPublicId
  ) {
    deletions.push(
      cloudinary.uploader.destroy(params.previousCapaPublicId, {
        resource_type: "image",
        invalidate: true,
      }),
    );
  }

  if (
    params.previousPdfPublicId &&
    params.previousPdfPublicId !== params.nextPdfPublicId
  ) {
    deletions.push(
      cloudinary.uploader.destroy(params.previousPdfPublicId, {
        resource_type: "raw",
        invalidate: true,
      }),
    );
  }

  if (!deletions.length) return;

  const results = await Promise.allSettled(deletions);
  const failures = results.filter((result) => result.status === "rejected");
  if (failures.length) {
    console.warn("[livros] Falha parcial na limpeza de assets antigos:", failures);
  }
}

export async function criarLivro(formData: FormData) {
  const titulo = String(formData.get("titulo"));
  const slug = await gerarSlugUnico(titulo, "livro");

  const bruto = buildLivroPayload(formData, slug);

  const parsed = insertLivroSchema.safeParse(bruto);

  if (!parsed.success) {
    console.error("Erro de Validação:", parsed.error.flatten());
    throw new Error("Dados inválidos para o Livro.");
  }

  try {
    await db.insert(livros).values(parsed.data);
    revalidatePath("/biblioteca");
    revalidatePath("/admin/livros");
    return { success: true };
  } catch (error) {
    console.error("Erro no Banco:", error);
    throw new Error("Falha ao persistir livro.");
  }
}

export async function listarLivros() {
  const data = await db.select().from(livros);
  return z.array(selectLivroSchema).parse(data);
}

export async function getLivroBySlug(slug: string) {
  const result = await db
    .select()
    .from(livros)
    .where(eq(livros.slug, slug))
    .limit(1);
  return result[0] || null;
}

export async function getLivroById(id: number) {
  if (!id || Number.isNaN(id)) return null;

  try {
    const res = await db
      .select()
      .from(livros)
      .where(eq(livros.id, id))
      .limit(1);

    return res[0] || null;
  } catch (error) {
    console.error("Erro ao buscar livro por ID: ", error);
    return null;
  }
}

export async function atualizarLivro(
  id: number,
  formData: FormData,
): Promise<ActionResult<Livro>> {
  if (!id || Number.isNaN(id)) {
    return { success: false, error: "ID inválido para atualização." };
  }

  const atual = await getLivroById(id);
  if (!atual) {
    return { success: false, error: "Livro não encontrado." };
  }

  const bruto = buildLivroPayload(formData, atual.slug);

  const parsed = insertLivroSchema.safeParse(bruto);

  if (!parsed.success) {
    return {
      success: false,
      error: "Erro de validação",
      validationErrors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const [atualizado] = await db
      .update(livros)
      .set({ ...parsed.data, updatedAt: new Date() })
      .where(eq(livros.id, id))
      .returning();

    await cleanupReplacedAssets({
      previousCapaPublicId: getLegacySafeCapaPublicId(atual.capa),
      previousPdfPublicId: getLegacySafePdfPublicId(atual.midia),
      nextCapaPublicId: atualizado.capa?.capaPublicId,
      nextPdfPublicId: atualizado.midia?.pdfPublicId,
    });

    revalidatePath("/biblioteca");
    revalidatePath("/admin/livros");
    revalidatePath(`/biblioteca/livros/${atualizado.slug}`);
    return { success: true, data: atualizado };
  } catch (error) {
    console.error("Erro ao atualizar livro:", error);
    return { success: false, error: "Falha ao atualizar o livro no banco." };
  }
}

export async function deletarLivro(id: number): Promise<ActionResult<{ id: number }>> {
  if (!id || Number.isNaN(id)) {
    return { success: false, error: "ID inválido para exclusão." };
  }

  const atual = await getLivroById(id);

  if (!atual) {
    return { success: false, error: "Livro não encontrado." };
  }

  try {
    const [deleted] = await db
      .delete(livros)
      .where(eq(livros.id, id))
      .returning({ id: livros.id });

    if (!deleted) {
      return { success: false, error: "Livro não encontrado." };
    }

    await cleanupReplacedAssets({
      previousCapaPublicId: getLegacySafeCapaPublicId(atual.capa),
      previousPdfPublicId: getLegacySafePdfPublicId(atual.midia),
    });

    revalidatePath("/biblioteca");
    revalidatePath("/admin/livros");

    return { success: true, data: { id: deleted.id } };
  } catch (error) {
    console.error("Erro ao deletar livro:", error);
    return { success: false, error: "Falha ao excluir livro." };
  }
}
