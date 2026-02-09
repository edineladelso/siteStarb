// src/lib/actions/shared.ts
"use server";

import { db } from "@/lib/drizzle/db";
import { ActionResult } from "@/lib/types";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

/**
 * Um único handler para governar todas as exclusões.
 * @param table - O objeto da tabela do Drizzle (artigos, livros, etc)
 * @param id - O ID numérico do registro
 * @param path - O caminho do Next.js para revalidar o cache (ex: "/biblioteca")
 */
export async function genericDelete<T extends { id: number }>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  table: any, // Usamos any aqui para flexibilidade com as tabelas do Drizzle
  id: number,
  path: string,
): Promise<ActionResult<{ id: number }>> {
  try {
    // 1. Operação Atômica de Exclusão
    const result = await db
      .delete(table)
      .where(eq(table.id, id))
      .returning({ deletedId: table.id });

    if (result.length === 0) {
      return {
        success: false,
        error: "Registro não encontrado ou já excluído.",
      };
    }

    // 2. Limpeza de Cache (Crucial no Next.js App Router)
    revalidatePath(path);

    // Opcional: Revalidar a home ou buscas globais
    revalidatePath("/");

    return {
      success: true,
      data: { id: result[0].deletedId },
    };
  } catch (error) {
    console.error(`[Delete Error]:`, error);
    return {
      success: false,
      error: "Falha na integridade referencial ou erro de banco de dados.",
    };
  }
}
