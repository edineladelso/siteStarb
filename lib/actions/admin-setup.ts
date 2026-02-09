"use server";

import { db, profiles } from "@/lib/drizzle/db";
import { createClient } from "@/lib/supabase/server";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

/**
 * Promove a conta do utilizador logado a administrador.
 * Só funciona se o "código de configuração" coincidir com ADMIN_SETUP_SECRET no .env
 */
export async function promoverParaAdmin(
  _prevState: { error?: string } | null,
  formData: FormData,
): Promise<{ error?: string }> {
  const codigo = (formData.get("codigo") as string)?.trim();
  if (!codigo) {
    return { error: "Digite o código de configuração." };
  }

  const secret = process.env.ADMIN_SETUP_SECRET;
  if (!secret) {
    return {
      error: "Configuração do servidor incompleta. Defina ADMIN_SETUP_SECRET.",
    };
  }
  if (secret !== codigo) {
    return { error: "Código inválido." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { error: "Faça login primeiro para se promover a administrador." };
  }

  await db
    .update(profiles)
    .set({ role: "admin" })
    .where(eq(profiles.id, user.id));

  redirect("/admin");
}
