"use server";

// src/lib/actions/artigos.actions.ts
import { toMacroAreas, type AreaLivro } from "@/lib/domain/areas";
import type { Status } from "@/lib/domain/enums";
import { db } from "@/lib/drizzle/db";
import { artigos } from "@/lib/drizzle/db/schema/artigo";
import {
  insertArtigoSchema,
  selectArtigoSchema,
} from "@/lib/drizzle/validations/artigo.schema";
import { gerarSlugUnico } from "@/lib/utils/slugify";
import { eq, StringChunk } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import type { ActionResult, Artigo } from "../types";

export async function criarArtigo(
  formData: FormData,
): Promise<ActionResult<Artigo>> {
  try {
    const titulo = String(formData.get("titulo"));
    const slug = await gerarSlugUnico(titulo, "artigo");

    const areasRaw = formData.get("areas") as string | null;
    const areas = (
      areasRaw ? areasRaw.split(",").map((a) => a.trim()) : []
    ) as AreaLivro[];
    const macroAreas = toMacroAreas(areas);

    const tipoMidia = formData.get("midia_tipo") as "pdf" | "plataforma" | null;
    const autoresRaw = (formData.get("autores") as string | null) ?? "";
    const autores = autoresRaw
      .split(",")
      .map((a) => a.trim())
      .filter(Boolean);

    const midia =
      tipoMidia === "pdf"
        ? { tipo: "pdf", pdfUrl: String(formData.get("pdf_url")) }
        : tipoMidia === "plataforma"
          ? {
              tipo: "plataforma",
              htmlUrl: String(formData.get("html_url") ?? ""),
            }
          : null;

    const leituraMin = Number(formData.get("leituraMin") || 0);
    const tags = ((formData.get("tags") as string) || "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const destaque = formData.get("destaque") === "on";
    const citacoes = Number(formData.get("citacoes") || 0);
    const html = (formData.get("html") as string) || undefined;

    const bruto = {
      titulo,
      slug,
      categoria: String(formData.get("categoria")),
      descricao: String(formData.get("descricao")),
      status: (formData.get("status") as Status) || "rascunho",
      capa: String(formData.get("capa")),
      autores,
      resumo: String(formData.get("resumo")),
      palavrasChave: formData.get("palavrasChave") || null,
      instituicao: formData.get("instituicao") || null,
      anoPublicacao: formData.get("anoPublicacao")
        ? Number(formData.get("anoPublicacao"))
        : null,
      areas,
      macroAreas,
      midia,
      leituraMin,
      tags,
      destaque,
      citacoes,
      html,
    };

    const parsed = insertArtigoSchema.safeParse(bruto);

    if (!parsed.success) {
      return {
        success: false,
        error: "Dados do artigo são inválidos.",
        // Opcional: passar os erros detalhados do Zod se o tipo permitir
      };
    }

    const [novoArtigo] = await db
      .insert(artigos)
      .values(parsed.data)
      .returning();

    revalidatePath("/biblioteca/artigos");
    return { success: true, data: novoArtigo };
  } catch (error) {
    console.error("Erro ao criar artigo:", error);
    return { success: false, error: "Falha técnica ao salvar o artigo." };
  }
}

export async function listarArtigos() {
  const data = await db.select().from(artigos);
  return z.array(selectArtigoSchema).parse(data);
}

export async function getArtigoBySlug(slug: string) {
  if (!slug) return null;
  try {
    const res = await db
      .select()
      .from(artigos)
      .where(eq(artigos.slug, slug))
      .limit(1);
    return res[0] || null;
  } catch (error) {
    console.error("Erro ao buscar artigo pelo slug: ", error);
  }
}

export async function getArtigoById(id: number) {
  if (!id || isNaN(id)) return null;

  try {
    const res = await db
      .select()
      .from(artigos)
      .where(eq(artigos.id, id))
      .limit(1);

    return res[0] || null;
  } catch (error) {
    console.error("Erro ao buscar artigo por ID:", error);
    return null;
  }
}
// src/lib/actions/artigos.actions.ts
// Atualizar artigo
export async function atualizarArtigo(
  id: number,
  formData: FormData,
): Promise<ActionResult<Artigo>> {
  const areasRaw = formData.get("areas") as string | null;
  const areas = (
    areasRaw ? areasRaw.split(",").map((a) => a.trim()) : []
  ) as AreaLivro[];
  const macroAreas = toMacroAreas(areas);

  const tipoMidia = formData.get("midia_tipo") as "pdf" | "plataforma" | null;
  const autoresRaw = (formData.get("autores") as string | null) ?? "";
  const autores = autoresRaw
    .split(",")
    .map((a) => a.trim())
    .filter(Boolean);
  const midia =
    tipoMidia === "pdf"
      ? { tipo: "pdf", pdfUrl: String(formData.get("pdf_url")) }
      : tipoMidia === "plataforma"
        ? {
            tipo: "plataforma",
            htmlUrl: String(formData.get("html_url") ?? ""),
          }
        : null;

  const leituraMin = Number(formData.get("leituraMin") || 0);
  const tags = ((formData.get("tags") as string) || "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
  const destaque = formData.get("destaque") === "on";
  const citacoes = Number(formData.get("citacoes") || 0);
  const html = (formData.get("html") as string) || undefined;

  const bruto = {
    titulo: String(formData.get("titulo")),
    categoria: String(formData.get("categoria")),
    descricao: String(formData.get("descricao")),
    status: (formData.get("status") as Status) || "rascunho",
    autores,
    resumo: String(formData.get("resumo")),
    palavrasChave: formData.get("palavrasChave") || null,
    instituicao: formData.get("instituicao") || null,
    anoPublicacao: formData.get("anoPublicacao")
      ? Number(formData.get("anoPublicacao"))
      : null,
    areas,
    macroAreas,
    midia,
    leituraMin,
    tags,
    destaque,
    citacoes,
    html,
  };

  const parsed = insertArtigoSchema.safeParse(bruto);

  if (!parsed.success) return { success: false, error: "Validação falhou" };

  try {
    const [atualizado] = await db
      .update(artigos)
      .set({ ...parsed.data, updatedAt: new Date() })
      .where(eq(artigos.id, id))
      .returning();

    revalidatePath("/biblioteca/artigos");
    return { success: true, data: atualizado };
  } catch (error) {
    console.error("Erro ao atualizar artigo:", error);
    return { success: false, error: "Erro ao atualizar artigo" };
  }
}
