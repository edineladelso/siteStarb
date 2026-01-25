// ==================== actions/livros.ts (exemplo) ====================

"use server";

import { revalidatePath } from "next/cache";
import { livroSchema, type LivroFormData } from "@/lib/validations/livro.schema";
import type { Livro } from "@/lib/types";

// Mock de banco de dados - substitua pela sua implementação real
const mockDB: Livro[] = [];

export async function createLivro(data: LivroFormData) {
  try {
    // Validar dados
    const validatedData = livroSchema.parse(data);

    // Criar livro
    const novoLivro: Livro = {
      id: Math.random().toString(36).substring(7),
      tipo: "livro",
      ...validatedData,
      status: "rascunho",
      views: 0,
      downloads: 0,
      avaliacao: 0,
      dataCriacao: new Date().toISOString(),
    };

    // Salvar no banco de dados
    // await db.livros.create(novoLivro);
    mockDB.push(novoLivro);

    revalidatePath("/admin/livros");
    return { success: true, data: novoLivro };
  } catch (error) {
    return { success: false, error: "Erro ao criar livro" };
  }
}

export async function updateLivro(id: string, data: Partial<LivroFormData>) {
  try {
    // await db.livros.update(id, data);
    revalidatePath("/admin/livros");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Erro ao atualizar livro" };
  }
}

export async function deleteLivro(id: string) {
  try {
    // await db.livros.delete(id);
    revalidatePath("/admin/livros");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Erro ao deletar livro" };
  }
}

export async function getLivros() {
  try {
    // const livros = await db.livros.findMany();
    return mockDB;
  } catch (error) {
    return [];
  }
}

export async function getLivroById(id: string): Promise<Livro | null> {
  try {
    return mockDB.find((l) => l.id === id) ?? null;
  } catch {
    return null;
  }
}
