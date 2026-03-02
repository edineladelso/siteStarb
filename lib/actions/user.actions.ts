"use server";

import { db } from "@/lib/drizzle/db";
import { profiles } from "@/lib/drizzle/db/schema/profile";
import { createSSClient } from "@/lib/supabase/server";
import { ActionResult } from "@/lib/types";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import z from "zod";
import cloudinary from "@/lib/cloudinary";
import { uploadToCloudinary } from "./upload.actions";

export type CurrentUser = {
  id: string;
  email: string;
  nome: string;
  apelido: string | null;
  avatarUrl: string | null;
  role: "admin" | "user";
  provider: "email" | "google" | "github";
};

const UpdateAvatarSchema = z.object({
  userId: z.string().uuid(),
  fileBase64: z.string().min(1, "Arquivo obrigatório"), // base64 da imagem
});

const SaveAvatarSchema = z.object({
  avatarUrl: z.string().url("URL de avatar inválida"),
  avatarPublicId: z.string().min(1, "publicId obrigatório"),
});

type AvatarActionResult =
  | { success: true; url: string; mensagem: string }
  | { success: false; error: string };

export async function updateAvatar(input: z.infer<typeof UpdateAvatarSchema>) {
  const parsed = UpdateAvatarSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: "Dados inválidos" };

  const supabase = await createSSClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, error: "Sessão expirada. Faça login novamente." };
  }

  if (user.id !== parsed.data.userId) {
    return { success: false, error: "Operação não autorizada." };
  }

  // 1. Upload para o Cloudinary
  const upload = await uploadToCloudinary({
    file: parsed.data.fileBase64,
    folder: "meu-projeto/avatars",
    publicId: `avatar_${parsed.data.userId}`,
  });

  if (!upload.success || !upload.data) {
    return { success: false, error: "Erro no upload" };
  }

  // 2. Atualizar avatar no perfil existente
  const [updatedProfile] = await db
    .update(profiles)
    .set({
      avatarUrl: upload.data.url,
      avatarPublicId: upload.data.publicId,
      updatedAt: new Date(),
    })
    .where(eq(profiles.id, parsed.data.userId))
    .returning({ id: profiles.id });

  if (!updatedProfile) {
    return { success: false, error: "Perfil não encontrado para atualizar avatar" };
  }

  revalidatePath("/minha-conta");
  revalidatePath("/", "layout");

  return { success: true, url: upload.data.url };
}

export async function saveAvatarFromCloudinary(
  input: z.infer<typeof SaveAvatarSchema>,
): Promise<AvatarActionResult> {
  const parsed = SaveAvatarSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: "Dados inválidos para guardar avatar." };
  }

  try {
    const supabase = await createSSClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return { success: false, error: "Sessão expirada. Faça login novamente." };
    }

    const [currentProfile] = await db
      .select({
        id: profiles.id,
        avatarPublicId: profiles.avatarPublicId,
      })
      .from(profiles)
      .where(eq(profiles.id, user.id))
      .limit(1);

    if (!currentProfile) {
      return { success: false, error: "Perfil não encontrado." };
    }

    await db
      .update(profiles)
      .set({
        avatarUrl: parsed.data.avatarUrl,
        avatarPublicId: parsed.data.avatarPublicId,
        updatedAt: new Date(),
      })
      .where(eq(profiles.id, user.id));

    const previousPublicId = currentProfile.avatarPublicId;
    if (
      previousPublicId &&
      previousPublicId !== parsed.data.avatarPublicId
    ) {
      try {
        await cloudinary.uploader.destroy(previousPublicId);
      } catch (error) {
        console.warn("[saveAvatarFromCloudinary] Falha ao remover avatar antigo:", error);
      }
    }

    revalidatePath("/minha-conta");
    revalidatePath("/", "layout");

    return {
      success: true,
      url: parsed.data.avatarUrl,
      mensagem: "Avatar atualizado com sucesso!",
    };
  } catch (error) {
    console.error("[saveAvatarFromCloudinary]:", error);
    return { success: false, error: "Erro ao guardar avatar. Tente novamente." };
  }
}
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
