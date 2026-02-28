"use server";

import { db } from "@/lib/drizzle/db";
import { profiles } from "@/lib/drizzle/db/schema/profile";
import { createSSClient } from "@/lib/supabase/server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// ─── Schema de validação ──────────────────────────────────────────────────────
const perfilSchema = z.object({
  nome: z
    .string()
    .min(2, "O nome deve ter pelo menos 2 caracteres")
    .max(80, "O nome deve ter no máximo 80 caracteres")
    .trim(),
  apelido: z
    .string()
    .max(40, "O apelido deve ter no máximo 40 caracteres")
    .trim()
    .optional()
    .or(z.literal("")),
});

export type AtualizarPerfilResult =
  | { success: true; mensagem: string }
  | { success: false; erro: string };

// ─── Atualizar dados do perfil ────────────────────────────────────────────────
export async function atualizarPerfil(
  formData: FormData
): Promise<AtualizarPerfilResult> {
  try {
    const supabase = await createSSClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return { success: false, erro: "Sessão expirada. Faça login novamente." };
    }

    // Validar com Zod
    const parsed = perfilSchema.safeParse({
      nome:    formData.get("nome"),
      apelido: formData.get("apelido"),
    });

    if (!parsed.success) {
      const primeiro = parsed.error.issues[0];
      return { success: false, erro: primeiro.message };
    }

    const { nome, apelido } = parsed.data;

    // Atualizar no Drizzle
    await db
      .update(profiles)
      .set({
        nome,
        apelido:   apelido || null,
        updatedAt: new Date(),
      })
      .where(eq(profiles.id, user.id));

    // Sincronizar metadados no Supabase Auth
    await supabase.auth.updateUser({
      data: { nome },
    });

    revalidatePath("/minha-conta");
    revalidatePath("/", "layout");

    return { success: true, mensagem: "Perfil atualizado com sucesso!" };
  } catch (error) {
    console.error("[atualizarPerfil]:", error);
    return { success: false, erro: "Erro ao atualizar o perfil. Tente novamente." };
  }
}

// ─── Sincronizar avatar do provider OAuth ────────────────────────────────────
export async function sincronizarAvatar(): Promise<AtualizarPerfilResult> {
  try {
    const supabase = await createSSClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return { success: false, erro: "Sessão expirada." };
    }

    const meta = user.user_metadata ?? {};
    const avatarUrl =
      meta["avatar_url"] ??
      meta["picture"] ??
      null;

    if (!avatarUrl) {
      return {
        success: false,
        erro: "Nenhum avatar encontrado na sua conta Google/GitHub.",
      };
    }

    await db
      .update(profiles)
      .set({ avatarUrl, updatedAt: new Date() })
      .where(eq(profiles.id, user.id));

    revalidatePath("/minha-conta");
    revalidatePath("/", "layout");

    return { success: true, mensagem: "Avatar sincronizado com sucesso!" };
  } catch (error) {
    console.error("[sincronizarAvatar]:", error);
    return { success: false, erro: "Erro ao sincronizar avatar. Tente novamente." };
  }
}