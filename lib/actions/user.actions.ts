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
  avatarUrl: string | null;
  role: "admin" | "user";
  provider: "email" | "google" | "github";
};

/**
 * Obtém o usuário autenticado atualmente
 */
export async function getCurrentUser(): Promise<CurrentUser | null> {
  try {
    const supabase = await createSSClient();

    // 1. Obter usuário do Supabase Auth
    const {
      data: { user: authUser },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !authUser) {
      return null;
    }

    // 2. Buscar perfil no Drizzle
    const [profile] = await db
      .select()
      .from(profiles)
      .where(eq(profiles.id, authUser.id))
      .limit(1);

    if (!profile) {
      return null;
    }

    return {
      id: profile.id,
      email: profile.email,
      nome: profile.nome,
      avatarUrl: profile.avatarUrl,
      role: profile.role as "admin" | "user",
      provider: profile.provider as "email" | "google" | "github",
    };
  } catch (error) {
    console.error("[getCurrentUser Error]:", error);
    return null;
  }
}

/**
 * Faz logout do usuário
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
 * Verifica se o usuário é administrador
 */
export async function isAdmin(): Promise<boolean> {
  const user = await getCurrentUser();
  return user?.role === "admin" ?? false;
}
