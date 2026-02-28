"use server";

import { createSSClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

// ─────────────────────────────────────────────
// REGISTRO COM EMAIL
// ─────────────────────────────────────────────
export async function registrarComEmail(formData: FormData) {
  const email = String(formData.get("email") || "").trim();
  const senha = String(formData.get("senha") || "");
  const confirmarSenha = String(formData.get("confirmarSenha") || "");
  const nome = String(formData.get("nome") || "").trim();

  if (!email || !senha || !confirmarSenha) {
    redirect("/registro?error=Preencha todos os campos obrigatórios");
  }

  if (senha !== confirmarSenha) {
    redirect("/registro?error=As senhas não coincidem");
  }

  if (senha.length < 6) {
    redirect("/registro?error=A senha deve ter no mínimo 6 caracteres");
  }

  try {
    const supabase = await createSSClient();

    const { error } = await supabase.auth.signUp({
      email,
      password: senha,
      options: {
        data: { nome },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    });

    if (error) {
      const mensagem = traduzirErroSupabase(error.message);
      redirect(`/registro?error=${encodeURIComponent(mensagem)}`);
    }
  } catch (e: unknown) {
    const isNetworkError =
      e instanceof Error &&
      (e.message.includes("fetch failed") ||
        e.message.includes("ENOTFOUND") ||
        e.message.includes("ECONNREFUSED"));

    if (isNetworkError) {
      redirect(
        "/registro?error=" +
          encodeURIComponent(
            "Erro de conexão com o servidor. Tente novamente em instantes."
          )
      );
    }

    throw e;
  }

  // ✅ Redireciona para página de verificação com o email visível
  redirect(`/verificar-email?email=${encodeURIComponent(email)}`);
}

// ─────────────────────────────────────────────
// REENVIAR EMAIL DE CONFIRMAÇÃO
// ─────────────────────────────────────────────
export async function reenviarConfirmacaoEmail(formData: FormData) {
  const email = String(formData.get("email") || "").trim();

  if (!email) {
    redirect("/verificar-email?error=Email não encontrado");
  }

  try {
    const supabase = await createSSClient();

    const { error } = await supabase.auth.resend({
      type: "signup",
      email,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    });

    if (error) {
      const mensagem = traduzirErroSupabase(error.message);
      redirect(
        `/verificar-email?email=${encodeURIComponent(email)}&error=${encodeURIComponent(mensagem)}`
      );
    }
  } catch (e: unknown) {
    const isNetworkError =
      e instanceof Error &&
      (e.message.includes("fetch failed") ||
        e.message.includes("ENOTFOUND") ||
        e.message.includes("ECONNREFUSED"));

    if (isNetworkError) {
      redirect(
        `/verificar-email?email=${encodeURIComponent(email)}&error=` +
          encodeURIComponent("Erro de conexão. Tente novamente em instantes.")
      );
    }

    throw e;
  }

  redirect(`/verificar-email?email=${encodeURIComponent(email)}&resent=true`);
}

// ─────────────────────────────────────────────
// LOGIN COM EMAIL
// ─────────────────────────────────────────────
export async function fazerLoginComEmail(formData: FormData) {
  const email = String(formData.get("email") || "").trim();
  const senha = String(formData.get("senha") || "");

  if (!email || !senha) {
    redirect("/login?error=Preencha email e senha");
  }

  try {
    const supabase = await createSSClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });

    if (error) {
      const mensagem = traduzirErroSupabase(error.message);
      redirect(`/login?error=${encodeURIComponent(mensagem)}`);
    }
  } catch (e: unknown) {
    const isNetworkError =
      e instanceof Error &&
      (e.message.includes("fetch failed") ||
        e.message.includes("ENOTFOUND") ||
        e.message.includes("ECONNREFUSED"));

    if (isNetworkError) {
      redirect(
        "/login?error=" +
          encodeURIComponent(
            "Erro de conexão com o servidor. Tente novamente em instantes."
          )
      );
    }

    throw e;
  }

  redirect("/admin");
}

// ─────────────────────────────────────────────
// OAUTH — GOOGLE
// ─────────────────────────────────────────────
export async function loginComGoogle() {
  try {
    const supabase = await createSSClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    });

    if (error) {
      redirect(`/login?error=${encodeURIComponent(error.message)}`);
    }

    if (data?.url) {
      redirect(data.url);
    }
  } catch (e: unknown) {
    const isRedirect = e instanceof Error && e.message === "NEXT_REDIRECT";
    if (isRedirect) throw e;

    redirect(
      "/login?error=" +
        encodeURIComponent("Erro ao autenticar com Google. Tente novamente.")
    );
  }
}

// ─────────────────────────────────────────────
// OAUTH — GITHUB
// ─────────────────────────────────────────────
export async function loginComGithub() {
  try {
    const supabase = await createSSClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      },
    });

    if (error) {
      redirect(`/login?error=${encodeURIComponent(error.message)}`);
    }

    if (data?.url) {
      redirect(data.url);
    }
  } catch (e: unknown) {
    const isRedirect = e instanceof Error && e.message === "NEXT_REDIRECT";
    if (isRedirect) throw e;

    redirect(
      "/login?error=" +
        encodeURIComponent("Erro ao autenticar com GitHub. Tente novamente.")
    );
  }
}

// ─────────────────────────────────────────────
// LOGOUT
// ─────────────────────────────────────────────
export async function fazerLogout() {
  try {
    const supabase = await createSSClient();
    await supabase.auth.signOut();
  } catch {
    // Garante logout local mesmo com falha de rede
  }

  redirect("/login");
}

// ─────────────────────────────────────────────
// HELPER — Tradução de erros Supabase → PT
// ─────────────────────────────────────────────
function traduzirErroSupabase(mensagem: string): string {
  const mapa: Record<string, string> = {
    "Invalid login credentials": "Email ou senha incorretos",
    "Email not confirmed":
      "Email não confirmado. Verifique sua caixa de entrada",
    "User already registered": "Este email já possui cadastro",
    "Password should be at least 6 characters":
      "A senha deve ter no mínimo 6 caracteres",
    "Unable to validate email address: invalid format":
      "Formato de email inválido",
    "signup is disabled": "Cadastro temporariamente desabilitado",
    "Email rate limit exceeded": "Muitas tentativas. Aguarde alguns minutos",
    over_email_send_rate_limit:
      "Limite de emails atingido. Tente novamente mais tarde",
    "For security purposes, you can only request this after":
      "Por segurança, aguarde alguns minutos antes de reenviar",
  };

  return mapa[mensagem] ?? mensagem;
}