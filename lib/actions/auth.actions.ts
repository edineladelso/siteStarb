// src/lib/actions/auth.actions.ts
"use server";

import { createClient } from "@/lib/supabase/server"; // Você precisará criar este helper
import { db } from "@/lib/drizzle/db";
import { profiles } from "@/lib/drizzle/db/schema/profile";
import { loginSchema, registerSchema, type RegisterInput } from "@/lib/drizzle/validations/auth.schema";
import { ActionResult } from "@/lib/types";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

/**
 * Login com Google ou GitHub
 */
export async function loginComProvider(provider: "google" | "github"): Promise<ActionResult<string>> {
  const supabase = await createClient();
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  if (error) return { success: false, error: error.message };
  return { success: true, data: data.url };
}

/**
 * Registro com E-mail e Senha
 */
export async function registrarComEmail(values: RegisterInput): Promise<ActionResult> {
  const parsed = registerSchema.safeParse(values);
  if (!parsed.success) return { success: false, error: "Dados inválidos" };

  const supabase = await createClient();

  // 1. Criar usuário no Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: { full_name: parsed.data.nome }
    }
  });

  if (authError) return { success: false, error: authError.message };
  if (!authData.user) return { success: false, error: "Erro ao criar usuário" };

  // 2. Criar perfil no nosso Banco via Drizzle
  try {
    await db.insert(profiles).values({
      id: authData.user.id,
      email: parsed.data.email,
      nome: parsed.data.nome,
      provider: "email",
    });
    
    return { success: true };
  } catch (err) {
    return { success: false, error: "Usuário autenticado, mas erro ao criar perfil." };
  }
}