
// ==================== actions/projetos.ts (TYPE-SAFE) ====================
"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/drizzle/db";
import { projetos, type Projeto, type NewProjeto } from "@/lib/drizzle/db/schema";
import { projetoSchema, type ProjetoFormData } from "@/lib/validations/projeto.schema";
import { generateId } from "@/lib/utils";
import { eq, desc } from "drizzle-orm";

export async function createProjeto(data: ProjetoFormData) {
  try {
    const validatedData = projetoSchema.parse(data);

    const novoProjeto: NewProjeto = {
      id: generateId(),
      tipo: "projeto",
      titulo: validatedData.titulo,
      autor: validatedData.autor,
      categoria: validatedData.categoria,
      descricao: validatedData.descricaoGeral,
      problemaResolvido: validatedData.problemaResolvido,
      tecnologias: validatedData.tecnologias,
      repositorioGithub: validatedData.repositorioGithub,
      documentacaoUrl: validatedData.documentacaoUrl,
      imagensUrl: validatedData.imagensUrl,
      dificuldade: validatedData.dificuldade,
      duracao: validatedData.duracao,
      status: "rascunho",
    };

    const result = await db.insert(projetos).values(novoProjeto).returning();

    revalidatePath("/admin/projetos");
    revalidatePath("/admin");
    
    return { success: true, data: result[0] };
  } catch (error) {
    console.error("Erro ao criar projeto:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Erro ao criar projeto" 
    };
  }
}

export async function updateProjeto(id: string, data: Partial<ProjetoFormData>) {
  try {
    const validatedData = projetoSchema.partial().parse(data);

    const result = await db
      .update(projetos)
      .set({
        titulo: validatedData.titulo,
        autor: validatedData.autor,
        categoria: validatedData.categoria,
        descricao: validatedData.descricaoGeral,
        problemaResolvido: validatedData.problemaResolvido,
        tecnologias: validatedData.tecnologias,
        repositorioGithub: validatedData.repositorioGithub,
        documentacaoUrl: validatedData.documentacaoUrl,
        imagensUrl: validatedData.imagensUrl,
        dificuldade: validatedData.dificuldade,
        duracao: validatedData.duracao,
        dataAtualizacao: new Date().toISOString(),
      })
      .where(eq(projetos.id, id))
      .returning();

    revalidatePath("/admin/projetos");
    revalidatePath("/admin");
    
    return { success: true, data: result[0] };
  } catch (error) {
    console.error("Erro ao atualizar projeto:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Erro ao atualizar projeto" 
    };
  }
}

export async function deleteProjeto(id: string) {
  try {
    await db.delete(projetos).where(eq(projetos.id, id));

    revalidatePath("/admin/projetos");
    revalidatePath("/admin");
    
    return { success: true };
  } catch (error) {
    console.error("Erro ao deletar projeto:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Erro ao deletar projeto" 
    };
  }
}

export async function getProjetos(): Promise<Projeto[]> {
  try {
    const result = await db
      .select()
      .from(projetos)
      .orderBy(desc(projetos.dataCriacao));

    return result;
  } catch (error) {
    console.error("Erro ao buscar projetos:", error);
    return [];
  }
}

export async function getProjetoById(id: string): Promise<Projeto | null> {
  try {
    const result = await db
      .select()
      .from(projetos)
      .where(eq(projetos.id, id))
      .limit(1);

    return result[0] ?? null;
  } catch (error) {
    console.error("Erro ao buscar projeto:", error);
    return null;
  }
}
