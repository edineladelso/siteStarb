"use server";

import type { Status } from "@/lib/domain/enums";
import { db } from "@/lib/drizzle/db";
import { softwares } from "@/lib/drizzle/db/schema/software";
import {
  insertSoftwareSchema,
  selectSoftwareSchema,
} from "@/lib/drizzle/validations/software.schema";
import { gerarSlugUnico } from "@/lib/utils/slugify";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import type { ActionResult, Software } from "../types";

export async function criarSoftware(formData: FormData) {
  const titulo = String(formData.get("titulo"));
  const slug = await gerarSlugUnico(titulo, "software");

  // Processamento de Arrays (Strings separadas por vírgulas ou quebras de linha)
  const plataformasRaw = formData.get("plataformas") as string | null;
  const plataformas = plataformasRaw
    ? plataformasRaw
        .split(/[,\n]+/)
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  const screenshotsRaw = formData.get("screenshots") as string | null;
  const screenshots = screenshotsRaw
    ? screenshotsRaw
        .split(/[,\n]+/)
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  const bruto = {
    titulo,
    slug,
    categoria: String(formData.get("categoria")),
    descricao: String(formData.get("descricao")),
    status: (formData.get("status") as Status) || "rascunho",

    siteOficial: String(formData.get("siteOficial")),
    funcionalidades: formData.get("funcionalidades")
      ? String(formData.get("funcionalidades"))
      : null,
    requisitos: formData.get("requisitos")
      ? String(formData.get("requisitos"))
      : null,

    preco: String(formData.get("preco")),
    plataformas,
    screenshots,

    tutorialUrl: formData.get("tutorialUrl")
      ? String(formData.get("tutorialUrl"))
      : null,
  };

  const parsed = insertSoftwareSchema.safeParse(bruto);

  if (!parsed.success) {
    console.error("Erro de Validação (Software):", parsed.error.flatten());
    throw new Error("Falha na validação dos dados do software.");
  }

  try {
    await db.insert(softwares).values(parsed.data);
    revalidatePath("/softwares");
    return { success: true };
  } catch (error) {
    console.error("Erro no Banco (Softwares):", error);
    throw new Error("Erro ao persistir o software no banco de dados.");
  }
}

export async function listarSoftwares() {
  const data = await db.select().from(softwares);
  const parsed = z.array(selectSoftwareSchema).safeParse(data);

  if (!parsed.success) return [];
  return parsed.data;
}

export async function getSoftwareBySlug(slug: string) {
  if (!slug) return null;
  const result = await db
    .select()
    .from(softwares)
    .where(eq(softwares.slug, slug))
    .limit(1);
  return result[0] || null;
}

export async function getSoftwareById(id: number) {
  if (!id || isNaN(id)) return null;

  try {
    const res = await db
      .select()
      .from(softwares)
      .where(eq(softwares.id, id))
      .limit(1);

    return res[0] || null;
  } catch (error) {
    console.error("Erro ao buscar sofware por ID: ", error);
  }
}

// ... imports existentes

/**
 * Atualizar Software
 */
export async function atualizarSoftware(
  id: number,
  formData: FormData,
): Promise<ActionResult<Software>> {
  // 1. Reutilizamos a lógica de extração que já temos (ou extraímos para uma função helper)
  const bruto = {
    titulo: String(formData.get("titulo")),
    // ... restante da extração (mesma da função 'criar')
  };

  const parsed = insertSoftwareSchema.safeParse(bruto);

  if (!parsed.success) {
    return {
      success: false,
      error: "Dados inválidos",
      validationErrors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    const [atualizado] = await db
      .update(softwares)
      .set({ ...parsed.data, updatedAt: new Date() })
      .where(eq(softwares.id, id))
      .returning();

    revalidatePath("/softwares");
    return { success: true, data: atualizado };
  } catch (error) {
    console.error("Erro ao atualizar software:", error);
    return { success: false, error: "Erro ao atualizar software" };
  }
}

/**
 * Deletar Software
 */
export async function deletarSoftware(
  id: number,
): Promise<ActionResult<{ id: number }>> {
  try {
    await db.delete(softwares).where(eq(softwares.id, id));

    revalidatePath("/softwares");
    return { success: true, data: { id } };
  } catch (error) {
    console.error("Erro ao excluir software:", error);
    return { success: false, error: "Não foi possível excluir o software" };
  }
}
