// ==================== actions/softwares.ts (TYPE-SAFE) ====================
"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/drizzle/db";
import { softwares, type Software, type NewSoftware } from "@/lib/drizzle/db/schema";
import { softwareSchema, type SoftwareFormData } from "@/lib/validations/software.schema";
import { generateId } from "@/lib/utils";
import { eq, desc } from "drizzle-orm";

export async function createSoftware(data: SoftwareFormData) {
  try {
    const validatedData = softwareSchema.parse(data);

    const novoSoftware: NewSoftware = {
      id: generateId(),
      tipo: "software",
      titulo: validatedData.nome,
      categoria: validatedData.categoria,
      descricao: validatedData.descricao,
      siteOficial: validatedData.siteOficial,
      funcionalidades: validatedData.funcionalidades,
      requisitos: validatedData.requisitos,
      preco: validatedData.preco,
      plataformas: validatedData.plataformas,
      screenshots: validatedData.screenshots,
      status: "rascunho",
    };

    const result = await db.insert(softwares).values(novoSoftware).returning();

    revalidatePath("/admin/softwares");
    revalidatePath("/admin");
    
    return { success: true, data: result[0] };
  } catch (error) {
    console.error("Erro ao criar software:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Erro ao criar software" 
    };
  }
}

export async function updateSoftware(id: string, data: Partial<SoftwareFormData>) {
  try {
    const validatedData = softwareSchema.partial().parse(data);

    const result = await db
      .update(softwares)
      .set({
        titulo: validatedData.nome,
        categoria: validatedData.categoria,
        descricao: validatedData.descricao,
        siteOficial: validatedData.siteOficial,
        funcionalidades: validatedData.funcionalidades,
        requisitos: validatedData.requisitos,
        preco: validatedData.preco,
        plataformas: validatedData.plataformas,
        screenshots: validatedData.screenshots,
        dataAtualizacao: new Date().toISOString(),
      })
      .where(eq(softwares.id, id))
      .returning();

    revalidatePath("/admin/softwares");
    revalidatePath("/admin");
    
    return { success: true, data: result[0] };
  } catch (error) {
    console.error("Erro ao atualizar software:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Erro ao atualizar software" 
    };
  }
}

export async function deleteSoftware(id: string) {
  try {
    await db.delete(softwares).where(eq(softwares.id, id));

    revalidatePath("/admin/softwares");
    revalidatePath("/admin");
    
    return { success: true };
  } catch (error) {
    console.error("Erro ao deletar software:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Erro ao deletar software" 
    };
  }
}

export async function getSoftwares(): Promise<Software[]> {
  try {
    const result = await db
      .select()
      .from(softwares)
      .orderBy(desc(softwares.dataCriacao));

    return result;
  } catch (error) {
    console.error("Erro ao buscar softwares:", error);
    return [];
  }
}

export async function getSoftwareById(id: string): Promise<Software | null> {
  try {
    const result = await db
      .select()
      .from(softwares)
      .where(eq(softwares.id, id))
      .limit(1);

    return result[0] ?? null;
  } catch (error) {
    console.error("Erro ao buscar software:", error);
    return null;
  }
}
