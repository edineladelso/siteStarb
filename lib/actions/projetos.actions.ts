"use server";

import type { Dificuldade, Status } from "@/lib/domain/enums";
import { db } from "@/lib/drizzle/db";
import { projetos } from "@/lib/drizzle/db/schema/projeto";
import {
  insertProjetoSchema,
  selectProjetoSchema,
} from "@/lib/drizzle/validations/projeto.schema";
import { gerarSlugUnico } from "@/lib/utils/slugify";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import type { ActionResult, Projeto } from "../types";

export async function criarProjeto(formData: FormData) {
  const titulo = String(formData.get("titulo"));
  const slug = await gerarSlugUnico(titulo, "projeto");

  // Tratamento de array de imagens (separadas por vírgula ou nova linha)
  const imagensRaw = formData.get("imagens_url") as string | null;
  const imagensUrl = imagensRaw
    ? imagensRaw
        .split(/[,\n]+/)
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  const bruto = {
    titulo,
    slug,
    categoria: String(formData.get("categoria")),
    descricao: String(formData.get("descricao")),

    // Cast explícito para os tipos de União do Domínio
    status: (formData.get("status") as Status) || "rascunho",
    dificuldade: (formData.get("dificuldade") as Dificuldade) || "Iniciante",

    autor: String(formData.get("autor")),
    problemaResolvido: String(formData.get("problemaResolvido")),
    tecnologias: String(formData.get("tecnologias")),

    repositorioGithub: formData.get("repositorioGithub")
      ? String(formData.get("repositorioGithub"))
      : null,
    documentacaoUrl: formData.get("documentacaoUrl")
      ? String(formData.get("documentacaoUrl"))
      : null,

    imagensUrl,
    duracao: formData.get("duracao") ? String(formData.get("duracao")) : null,
  };

  const parsed = insertProjetoSchema.safeParse(bruto);

  if (!parsed.success) {
    console.error("Erro de Validação (Projeto):", parsed.error.flatten());
    throw new Error("Dados inválidos para o Projeto.");
  }

  try {
    // Agora o parsed.data terá os tipos literais corretos para o Drizzle
    await db.insert(projetos).values(parsed.data);
    revalidatePath("/projetos");
    return { success: true };
  } catch (error) {
    console.error("Erro no Banco (Projetos):", error);
    throw new Error("Falha ao persistir o projeto.");
  }
}

export async function listarProjetos() {
  const lista = await db.select().from(projetos);
  return z.array(selectProjetoSchema).parse(lista);
}

export async function getProjetoBySlug(slug: string) {
  if (!slug) return null;
  const res = await db
    .select()
    .from(projetos)
    .where(eq(projetos.slug, slug))
    .limit(1);
  return res[0] || null;
}

export async function getProjetoById(id: number) {
  if (!id || isNaN(id)) return null;

  try {
    const res = await db
      .select()
      .from(projetos)
      .where(eq(projetos.id, id))
      .limit(1);

    return res[0] || null;
  } catch (error) {
    console.error("Erro ao buscar projeto por ID: ", error);
  }
}

// src/lib/actions/projetos.actions.ts

export async function atualizarProjeto(
  id: number,
  formData: FormData,
): Promise<ActionResult<Projeto>> {
  const imagensRaw = formData.get("imagens_url") as string | null;
  const imagensUrl = imagensRaw
    ? imagensRaw
        .split(/[,\n]+/)
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  const bruto = {
    titulo: String(formData.get("titulo")),
    categoria: String(formData.get("categoria")),
    descricao: String(formData.get("descricao")),
    status: (formData.get("status") as Status) || "rascunho",
    dificuldade: (formData.get("dificuldade") as Dificuldade) || "Iniciante",
    autor: String(formData.get("autor")),
    problemaResolvido: String(formData.get("problemaResolvido")),
    tecnologias: String(formData.get("tecnologias")),
    repositorioGithub: formData.get("repositorioGithub")
      ? String(formData.get("repositorioGithub"))
      : null,
    documentacaoUrl: formData.get("documentacaoUrl")
      ? String(formData.get("documentacaoUrl"))
      : null,
    imagensUrl,
    duracao: formData.get("duracao") ? String(formData.get("duracao")) : null,
  };

  const parsed = insertProjetoSchema.safeParse(bruto);

  if (!parsed.success) return { success: false, error: "Dados inválidos" };

  try {
    const [atualizado] = await db
      .update(projetos)
      .set({ ...parsed.data, updatedAt: new Date() })
      .where(eq(projetos.id, id))
      .returning();

    revalidatePath("/projetos");
    return { success: true, data: atualizado };
  } catch (error) {
    console.error("Erro ao atualizar projeto:", error);
    return { success: false, error: "Erro ao atualizar projeto" };
  }
}
