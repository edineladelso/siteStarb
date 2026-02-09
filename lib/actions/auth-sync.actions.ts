"use server";

import { db } from "@/lib/drizzle/db";
import type { AuthProvider } from "@/lib/drizzle/db/schema/profile";
import { profiles } from "@/lib/drizzle/db/schema/profile";
import { createClient } from "@/lib/supabase/server";
import { ActionResult } from "@/lib/types";
import { eq } from "drizzle-orm";

/**
 * Sincroniza o usuário autenticado no Supabase com a tabela de perfis no Drizzle.
 * Ideal para ser chamado no layout raiz ou após o callback de login.
 */
export async function syncUserProfile(): Promise<ActionResult> {
  const supabase = await createClient();

  // 1. Obter usuário da sessão atual do Supabase
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, error: "Usuário não autenticado no Supabase." };
  }

  try {
    // 2. Verificar se o perfil já existe no nosso banco
    const [existingProfile] = await db
      .select()
      .from(profiles)
      .where(eq(profiles.id, user.id));

    // Metadados vindos do Google/GitHub/Email
    const meta = user.user_metadata;
    const provider = user.app_metadata.provider as AuthProvider;

    const profileData = {
      id: user.id,
      email: user.email!,
      nome: meta.full_name || meta.name || meta.user_name || "Usuário",
      avatarUrl: meta.avatar_url || meta.picture || null,
      provider: provider || "email",
      updatedAt: new Date(),
    };

    if (!existingProfile) {
      // 3a. Criar novo perfil se não existir
      await db.insert(profiles).values({
        ...profileData,
        role: "user", // Default role
      });
      console.log(`[Sync] Novo perfil criado para: ${profileData.email}`);
    } else {
      // 3b. Atualizar perfil existente (mantém nome/avatar sincronizados)
      await db
        .update(profiles)
        .set(profileData)
        .where(eq(profiles.id, user.id));
      console.log(`[Sync] Perfil atualizado para: ${profileData.email}`);
    }

    return { success: true };
  } catch (dbError) {
    console.error("[Sync Error]:", dbError);
    return {
      success: false,
      error: "Erro ao sincronizar dados com o banco local.",
    };
  }
}
