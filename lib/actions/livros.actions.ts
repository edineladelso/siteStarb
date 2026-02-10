"use server";

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

export async function criarLivro(formData: FormData) {
  const titulo = String(formData.get("titulo"));
  const slug = await gerarSlugUnico(titulo, "livro");

  // Processamento de Arrays (vindo como strings separadas por vírgula)
  const areasRaw = formData.get("areas") as string;
  const areas = (
    areasRaw ? areasRaw.split(",").map((a) => a.trim()) : []
  ) as AreaLivro[];

  const tagsRaw = formData.get("tags") as string;
  const tags = tagsRaw ? tagsRaw.split(",").map((t) => t.trim()) : [];

  // Derivação automática via Domínio
  const macroAreas = toMacroAreas(areas);

  const bruto = {
    titulo,
    slug,
    categoria: String(formData.get("categoria")),
    descricao: String(formData.get("descricao")),
    status: (formData.get("status") as Status) || "rascunho",

    autor: String(formData.get("autor")),
    anoPublicacao: formData.get("anoPublicacao")
      ? Number(formData.get("anoPublicacao"))
      : null,
    idioma: formData.get("idioma") ? String(formData.get("idioma")) : null,

    detalhes: {
      sinopse: String(formData.get("sinopse") || formData.get("descricao")),
      numeroPaginas: Number(formData.get("numeroPaginas")),
      autor: String(formData.get("autor")),
      editora: formData.get("editora") ? String(formData.get("editora")) : null,
      isbn: formData.get("isbn") ? String(formData.get("isbn")) : null,
    },

    midia: {
      capa: String(formData.get("capa_url")),
      pdf: String(formData.get("pdf_url")),
      epub: String(formData.get("epub_url") || ""),
      resumo: String(formData.get("resumo_url")),
    },

    areas,
    macroAreas,
    tags,
    novo: Boolean(formData.get("novo")),
    popular: Boolean(formData.get("popular")),
  };

  const parsed = insertLivroSchema.safeParse(bruto);

  if (!parsed.success) {
    console.error("Erro de Validação:", parsed.error.flatten());
    throw new Error("Dados inválidos para o Livro.");
  }

  try {
    await db.insert(livros).values(parsed.data);
    revalidatePath("/biblioteca");
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
  if (!id || isNaN(id)) return null;

  try {
    const res = await db
      .select()
      .from(livros)
      .where(eq(livros.id, id))
      .limit(1);

    return res[0] || null;
  } catch (error) {
    console.error("Erro ao buscar livro por ID: ", error);
  }
}

// src/lib/actions/livros.actions.ts

export async function atualizarLivro(
  id: number,
  formData: FormData,
): Promise<ActionResult<Livro>> {
  const titulo = String(formData.get("titulo"));

  // Nota: Não alteramos o slug em updates para preservar SEO

  const areasRaw = formData.get("areas") as string;
  const areas = (
    areasRaw ? areasRaw.split(",").map((a) => a.trim()) : []
  ) as AreaLivro[];
  const macroAreas = toMacroAreas(areas);

  const bruto = {
    titulo,
    categoria: String(formData.get("categoria")),
    descricao: String(formData.get("descricao")),
    status: (formData.get("status") as Status) || "rascunho",
    autor: String(formData.get("autor")),
    anoPublicacao: formData.get("anoPublicacao")
      ? Number(formData.get("anoPublicacao"))
      : null,
    idioma: formData.get("idioma") ? String(formData.get("idioma")) : null,
    numeroPaginas: formData.get("numeroPaginas")
      ? Number(formData.get("numeroPaginas"))
      : null,

    detalhes: {
      autor: String(formData.get("autor")),
      sinopse: String(formData.get("sinopse") || formData.get("descricao")),
      numeroPaginas: Number(formData.get("numeroPaginas")),
      isbn: formData.get("isbn") ? String(formData.get("isbn")) : null,
      editora: formData.get("editora") ? String(formData.get("editora")) : null,
    },
    midia: {
      capa: String(formData.get("capa_url")),
      pdf: String(formData.get("pdf_url")),
      epub: String(formData.get("epub_url") || ""),
      resumo: String(formData.get("resumo_url")),
    },
    areas,
    macroAreas,
    tags: formData.get("tags")
      ? (formData.get("tags") as string).split(",").map((t) => t.trim())
      : [],
  };

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

    revalidatePath("/biblioteca");
    revalidatePath(`/biblioteca/livro/${atualizado.slug}`);
    return { success: true, data: atualizado };
  } catch (error) {
    console.error("Erro ao atualizar livro:", error);
    return { success: false, error: "Falha ao atualizar o livro no banco." };
  }
}
