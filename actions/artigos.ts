
// ==================== actions/artigos.ts (TYPE-SAFE) ====================
"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/drizzle/db";
import { artigos, type Artigo, type NewArtigo } from "@/lib/drizzle/db/schema";
import { artigoSchema, type ArtigoFormData } from "@/lib/validations/artigo.shema";
import { generateId } from "@/lib/utils";
import { eq, desc } from "drizzle-orm";

export async function createArtigo(data: ArtigoFormData) {
  try {
    const validatedData = artigoSchema.parse(data);

    const novoArtigo: NewArtigo = {
      id: generateId(),
      tipo: "artigo",
      titulo: validatedData.titulo,
      autores: validatedData.autores,
      categoria: validatedData.categoria,
      descricao: validatedData.resumo,
      resumo: validatedData.resumo,
      palavrasChave: validatedData.palavrasChave,
      anoPublicacao: validatedData.anoPublicacao,
      instituicao: validatedData.instituicao,
      pdfUrl: validatedData.pdfUrl,
      status: "rascunho",
    };

    const result = await db.insert(artigos).values(novoArtigo).returning();

    revalidatePath("/admin/artigos");
    revalidatePath("/admin");
    
    return { success: true, data: result[0] };
  } catch (error) {
    console.error("Erro ao criar artigo:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Erro ao criar artigo" 
    };
  }
}

export async function updateArtigo(id: string, data: Partial<ArtigoFormData>) {
  try {
    const validatedData = artigoSchema.partial().parse(data);

    const result = await db
      .update(artigos)
      .set({
        titulo: validatedData.titulo,
        autores: validatedData.autores,
        categoria: validatedData.categoria,
        descricao: validatedData.resumo,
        resumo: validatedData.resumo,
        palavrasChave: validatedData.palavrasChave,
        anoPublicacao: validatedData.anoPublicacao,
        instituicao: validatedData.instituicao,
        pdfUrl: validatedData.pdfUrl,
        dataAtualizacao: new Date().toISOString(),
      })
      .where(eq(artigos.id, id))
      .returning();

    revalidatePath("/admin/artigos");
    revalidatePath("/admin");
    
    return { success: true, data: result[0] };
  } catch (error) {
    console.error("Erro ao atualizar artigo:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Erro ao atualizar artigo" 
    };
  }
}

export async function deleteArtigo(id: string) {
  try {
    await db.delete(artigos).where(eq(artigos.id, id));

    revalidatePath("/admin/artigos");
    revalidatePath("/admin");
    
    return { success: true };
  } catch (error) {
    console.error("Erro ao deletar artigo:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Erro ao deletar artigo" 
    };
  }
}

export async function getArtigos(): Promise<Artigo[]> {
  try {
    const result = await db
      .select()
      .from(artigos)
      .orderBy(desc(artigos.dataCriacao));

    return result;
  } catch (error) {
    console.error("Erro ao buscar artigos:", error);
    return [];
  }
}

export async function getArtigoById(id: string): Promise<Artigo | null> {
  try {
    const result = await db
      .select()
      .from(artigos)
      .where(eq(artigos.id, id))
      .limit(1);

    return result[0] ?? null;
  } catch (error) {
    console.error("Erro ao buscar artigo:", error);
    return null;
  }
}