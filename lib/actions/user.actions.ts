"use server";

import { db } from "@/lib/drizzle/db";
import { profiles } from "@/lib/drizzle/db/schema/profile";
import { createSSClient } from "@/lib/supabase/server";
import { ActionResult } from "@/lib/types";
import { eq } from "drizzle-orm";

export type CurrentUser = {
  id: string;
  email: string;
  nome: string;
  apelido: string | null;
  avatarUrl: string | null;
  role: "admin" | "user";
  provider: "email" | "google" | "github";
};

/**
 * Obtém o utilizador autenticado com o seu perfil.
 *
 * Retorna null silenciosamente em qualquer um destes casos:
 *  - Não há sessão ativa
 *  - O perfil ainda não foi criado (trigger pendente)
 *  - Erro de rede/DB — não bloqueia o render da página
 */
export async function getCurrentUser(): Promise<CurrentUser | null> {
  try {
    const supabase = await createSSClient();

    // 1. Verificar sessão no Supabase Auth
    const {
      data: { user: authUser },
      error: authError,
    } = await supabase.auth.getUser();

    // Sem sessão → utilizador não autenticado (situação normal)
    if (authError || !authUser) return null;

    // 2. Buscar perfil no Drizzle
    const [profile] = await db
      .select()
      .from(profiles)
      .where(eq(profiles.id, authUser.id))
      .limit(1);

    // Perfil ainda não criado (trigger pode estar a processar)
    if (!profile) return null;

    return {
      id:        profile.id,
      email:     profile.email,
      nome:      profile.nome,
      apelido:   profile.apelido   ?? null,
      avatarUrl: profile.avatarUrl ?? null,
      role:      profile.role      as "admin" | "user",
      provider:  profile.provider  as "email" | "google" | "github",
    };
  } catch (error) {
    // Só loga em desenvolvimento para não poluir produção
    if (process.env.NODE_ENV === "development") {
      console.warn("[getCurrentUser] Não foi possível obter o utilizador:", error);
    }
    return null;
  }
}

/**
 * Faz logout do utilizador atual
 */
export async function logout(): Promise<ActionResult> {
  try {
    const supabase = await createSSClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error("[Logout Error]:", error);
    return { success: false, error: "Erro ao fazer logout" };
  }
}

/**
 * Verifica se o utilizador atual é administrador
 */
export async function isAdmin(): Promise<boolean> {
  const user = await getCurrentUser();
  return user?.role === "admin";
}