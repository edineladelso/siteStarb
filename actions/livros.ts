// ==================== actions/livros.ts (TYPE-SAFE) ====================
"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/drizzle/db";
import { livros, type Livro, type NewLivro } from "@/lib/drizzle/db/schema";
import { livroSchema, type LivroFormData } from "@/lib/validations/livro.schema";
import { generateId } from "@/lib/utils";
import { eq, desc } from "drizzle-orm";

export async function createLivro(data: LivroFormData) {
  try {
    const validatedData = livroSchema.parse(data);

    const novoLivro: NewLivro = {
      id: generateId(),
      tipo: "livro",
      titulo: validatedData.titulo,
      autor: validatedData.autor,
      categoria: validatedData.categoria,
      descricao: validatedData.descricao,
      isbn: validatedData.isbn,
      anoPublicacao: validatedData.anoPublicacao,
      editora: validatedData.editora,
      idioma: validatedData.idioma,
      numeroPaginas: validatedData.numeroPaginas,
      capaUrl: validatedData.capaUrl,
      pdfUrl: validatedData.pdfUrl,
      tags: validatedData.tags,
      status: "rascunho",
    };

    const result = await db.insert(livros).values(novoLivro).returning();

    revalidatePath("/admin/livros");
    revalidatePath("/admin");
    
    return { success: true, data: result[0] };
  } catch (error) {
    console.error("Erro ao criar livro:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Erro ao criar livro" 
    };
  }
}

export async function updateLivro(id: string, data: Partial<LivroFormData>) {
  try {
    const validatedData = livroSchema.partial().parse(data);

    const result = await db
      .update(livros)
      .set({
        ...validatedData,
        dataAtualizacao: new Date().toISOString(),
      })
      .where(eq(livros.id, id))
      .returning();

    revalidatePath("/admin/livros");
    revalidatePath("/admin");
    
    return { success: true, data: result[0] };
  } catch (error) {
    console.error("Erro ao atualizar livro:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Erro ao atualizar livro" 
    };
  }
}

export async function deleteLivro(id: string) {
  try {
    await db.delete(livros).where(eq(livros.id, id));

    revalidatePath("/admin/livros");
    revalidatePath("/admin");
    
    return { success: true };
  } catch (error) {
    console.error("Erro ao deletar livro:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Erro ao deletar livro" 
    };
  }
}

export async function getLivros(): Promise<Livro[]> {
  try {
    const result = await db
      .select()
      .from(livros)
      .orderBy(desc(livros.dataCriacao));

    return result;
  } catch (error) {
    console.error("Erro ao buscar livros:", error);
    return [];
  }
}

export async function getLivroById(id: string): Promise<Livro | null> {
  try {
    const result = await db
      .select()
      .from(livros)
      .where(eq(livros.id, id))
      .limit(1);

    return result[0] ?? null;
  } catch (error) {
    console.error("Erro ao buscar livro:", error);
    return null;
  }
}

