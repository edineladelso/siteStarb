"use server";

import { db } from "@/lib/drizzle/db";
import { artigos } from "@/lib/drizzle/db/schema/artigo";
import { insertArtigoSchema, selectArtigoSchema } from "@/lib/drizzle/validations/artigo.schema";
import { gerarSlugUnico } from "@/lib/utils/slugify";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { toMacroAreas, type AreaLivro } from "@/lib/domain/areas";
import type { Status } from "@/lib/domain/enums";
import type { ActionResult, Artigo } from "../types";

export async function criarArtigo(formData: FormData) {
  const titulo = String(formData.get("titulo"));
  const slug = await gerarSlugUnico(titulo, "artigo");

  // Processamento de Áreas
  const areasRaw = formData.get("areas") as string | null;
  const areas = (areasRaw ? areasRaw.split(",").map(a => a.trim()) : []) as AreaLivro[];
  
  // Derivação automática de Macro Áreas
  const macroAreas = toMacroAreas(areas);

  // Construção da Mídia
  const tipoMidia = formData.get("midia_tipo") as "pdf" | "plataforma";
  const midia = tipoMidia === "pdf" 
    ? { tipo: "pdf", pdfUrl: String(formData.get("pdf_url")) }
    : { tipo: "plataforma", htmlUrl: String(formData.get("html_url")) };

  const bruto = {
    titulo,
    slug,
    categoria: String(formData.get("categoria")),
    descricao: String(formData.get("descricao")),
    status: (formData.get("status") as Status) || "rascunho",

    autores: String(formData.get("autores")),
    resumo: String(formData.get("resumo")),
    palavrasChave: formData.get("palavrasChave") ? String(formData.get("palavrasChave")) : null,
    instituicao: formData.get("instituicao") ? String(formData.get("instituicao")) : null,
    anoPublicacao: formData.get("anoPublicacao") ? Number(formData.get("anoPublicacao")) : null,

    areas,
    macroAreas,
    midia,
  };

  const parsed = insertArtigoSchema.safeParse(bruto);

  if (!parsed.success) {
    console.error("Erro de Validação (Artigo):", parsed.error.flatten());
    throw new Error("Dados inválidos para o Artigo.");
  }

  try {
    await db.insert(artigos).values(parsed.data);
    revalidatePath("/artigos");
    return { success: true };
  } catch (error) {
    console.error("Erro no Banco (Artigos):", error);
    throw new Error("Falha ao persistir o artigo no banco de dados.");
  }
}

export async function listarArtigos() {
  const data = await db.select().from(artigos);
  return z.array(selectArtigoSchema).parse(data);
}

export async function getArtigoBySlug(slug: string) {
  if (!slug) return null;
  const res = await db.select().from(artigos).where(eq(artigos.slug, slug)).limit(1);
  return res[0] || null;
}

// src/lib/actions/artigos.actions.ts

export async function atualizarArtigo(id: number, formData: FormData): Promise<ActionResult<Artigo>> {
  const areasRaw = formData.get("areas") as string | null;
  const areas = (areasRaw ? areasRaw.split(",").map(a => a.trim()) : []) as AreaLivro[];
  const macroAreas = toMacroAreas(areas);

  const tipoMidia = formData.get("midia_tipo") as "pdf" | "plataforma";
  const midia = tipoMidia === "pdf" 
    ? { tipo: "pdf", pdfUrl: String(formData.get("pdf_url")) }
    : { tipo: "plataforma", htmlUrl: String(formData.get("html_url")) };

  const bruto = {
    titulo: String(formData.get("titulo")),
    categoria: String(formData.get("categoria")),
    descricao: String(formData.get("descricao")),
    status: (formData.get("status") as Status) || "rascunho",
    autores: String(formData.get("autores")),
    resumo: String(formData.get("resumo")),
    palavrasChave: formData.get("palavrasChave") || null,
    instituicao: formData.get("instituicao") || null,
    anoPublicacao: formData.get("anoPublicacao") ? Number(formData.get("anoPublicacao")) : null,
    areas,
    macroAreas,
    midia,
  };

  const parsed = insertArtigoSchema.safeParse(bruto);

  if (!parsed.success) return { success: false, error: "Validação falhou" };

  try {
    const [atualizado] = await db
      .update(artigos)
      .set({ ...parsed.data, updatedAt: new Date() })
      .where(eq(artigos.id, id))
      .returning();

    revalidatePath("/artigos");
    return { success: true, data: atualizado };
  } catch (error) {
    return { success: false, error: "Erro ao atualizar artigo" };
  }
}