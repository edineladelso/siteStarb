import { createSSClient } from "@/lib/supabase/server";
import { db } from "@/lib/drizzle/db";
import { profiles } from "@/lib/drizzle/db/schema/profile";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);

  const code      = searchParams.get("code");
  const errorCode = searchParams.get("error_code");
  const errorDesc = searchParams.get("error_description");

  // ── Erro vindo direto do Supabase na URL ──────────────────────────────────
  if (errorCode) {
    const mensagem = traduzirErroCallback(errorCode, errorDesc ?? "");
    return NextResponse.redirect(
      `${origin}/verificar-email?error=${encodeURIComponent(mensagem)}`
    );
  }

  // ── Fluxo normal com code ─────────────────────────────────────────────────
  if (code) {
    try {
      const supabase = await createSSClient();
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        const mensagem = traduzirErroCallback(
          error.code ?? "unknown",
          error.message
        );
        return NextResponse.redirect(
          `${origin}/verificar-email?error=${encodeURIComponent(mensagem)}`
        );
      }

      // ✅ Sessão criada — garantir que o perfil existe (fallback do trigger)
      const authUser = data.user;
      if (authUser) {
        await garantirPerfilExiste(authUser);
      }

      return NextResponse.redirect(`${origin}/`);
    } catch (e) {
      console.error("[auth/callback] Erro inesperado:", e);
      return NextResponse.redirect(
        `${origin}/verificar-email?error=${encodeURIComponent(
          "Erro ao processar a confirmação. Tente novamente."
        )}`
      );
    }
  }

  // ── URL sem code nem error ─────────────────────────────────────────────────
  return NextResponse.redirect(
    `${origin}/verificar-email?error=${encodeURIComponent(
      "Link de confirmação inválido."
    )}`
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Garante que o perfil existe — cobre o caso em que o trigger
// do Supabase ainda não foi criado ou falhou silenciosamente
// ─────────────────────────────────────────────────────────────────────────────
async function garantirPerfilExiste(authUser: {
  id: string;
  email?: string;
  user_metadata?: Record<string, string>;
  app_metadata?: Record<string, string>;
}) {
  try {
    const [existente] = await db
      .select({ id: profiles.id })
      .from(profiles)
      .where(eq(profiles.id, authUser.id))
      .limit(1);

    if (existente) return; // já existe, nada a fazer

    const meta     = authUser.user_metadata ?? {};
    const appMeta  = authUser.app_metadata  ?? {};

    const nome = (
      meta["nome"] ??
      meta["full_name"] ??
      meta["name"] ??
      authUser.email?.split("@")[0] ??
      "Utilizador"
    );

    await db.insert(profiles).values({
      id:        authUser.id,
      email:     authUser.email ?? "",
      nome,
      avatarUrl: meta["avatar_url"] ?? meta["picture"] ?? null,
      role:      "user",
      provider:  (appMeta["provider"] ?? "email") as "email" | "google" | "github",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  } catch (error) {
    // Não bloquear o redirect em caso de falha aqui —
    // o trigger do Supabase é a solução principal
    console.error("[garantirPerfilExiste] Erro:", error);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Tradução de error_code → PT
// ─────────────────────────────────────────────────────────────────────────────
function traduzirErroCallback(errorCode: string, errorDesc: string): string {
  const mapa: Record<string, string> = {
    otp_expired:
      "O link de confirmação expirou. Solicite um novo abaixo.",
    access_denied:
      "Link inválido ou já utilizado. Solicite um novo abaixo.",
    email_not_confirmed:
      "Email ainda não confirmado. Verifique sua caixa de entrada.",
    invalid_grant:
      "Link inválido ou já utilizado. Solicite um novo abaixo.",
    refresh_token_not_found:
      "Sessão expirada. Faça login novamente.",
    user_not_found:
      "Utilizador não encontrado. Verifique se o cadastro foi concluído.",
  };

  return mapa[errorCode] ?? errorDesc ?? "Erro desconhecido. Tente novamente.";
}