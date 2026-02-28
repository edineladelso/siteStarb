import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { registrarComEmail } from "@/lib/supabase/auth/auth-actions";
import asideImage from "@/public/image/rotate1.jpg";
import { AlertCircle, Info } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PasswordInput } from "../ui/passwordInput";

export const metadata: Metadata = {
  title: "Criar Conta",
  description: "Crie sua conta para acessar todos os recursos da plataforma.",
  robots: { index: false, follow: false },
};

interface PageProps {
  searchParams: Promise<{ message?: string; error?: string }>;
}

export default async function RegistroPage({ searchParams }: PageProps) {
  const params = await searchParams;

  return (
    <div className="bg-sidebar-foreground relative flex min-h-screen w-full items-center justify-center p-6">
      {/* Background decorativo */}
      <Image
        src={asideImage}
        alt=""
        aria-hidden="true"
        fill
        className="z-30 object-cover opacity-40 blur-3xl"
        priority
      />

      {/* Card principal */}
      <main className="absolute z-50 container mx-auto w-full max-w-md rounded-3xl p-6 shadow-inner shadow-violet-300 backdrop-blur-3xl sm:max-w-xl sm:p-12">
        <h1 className="mb-6 text-center text-3xl font-black text-white/90">
          Criar Conta
        </h1>

        {/* ── Erro ── */}
        {params.error && (
          <div
            role="alert"
            aria-live="assertive"
            className="mb-4 flex items-center gap-2 rounded-lg border border-red-500 bg-red-500/20 p-3"
          >
            <AlertCircle
              size={16}
              className="shrink-0 text-red-400"
              aria-hidden="true"
            />
            <p className="text-sm text-red-200">{params.error}</p>
          </div>
        )}

        {/* ── Sucesso ── */}
        {params.message && (
          <div
            role="status"
            aria-live="polite"
            className="mb-4 flex items-center gap-2 rounded-lg border border-green-500 bg-green-500/20 p-3"
          >
            <Info
              size={16}
              className="shrink-0 text-green-400"
              aria-hidden="true"
            />
            <p className="text-sm text-green-200">{params.message}</p>
          </div>
        )}

        {/* ── Formulário ── */}
        <form action={registrarComEmail} className="space-y-4" noValidate>
          {/* Nome */}
          <div>
            <label
              htmlFor="nome"
              className="mb-1 block text-xs font-semibold text-white/70"
            >
              Nome Completo{" "}
              <span aria-hidden="true" className="text-red-400">
                *
              </span>
              <span className="sr-only">(obrigatório)</span>
            </label>
            <Input
              id="nome"
              name="nome"
              type="text"
              placeholder="Seu nome completo"
              required
              minLength={3}
              className="text-sidebar"
              autoComplete="name"
              aria-required="true"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-xs font-semibold text-white/70"
            >
              Email{" "}
              <span aria-hidden="true" className="text-red-400">
                *
              </span>
              <span className="sr-only">(obrigatório)</span>
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="seu@email.com"
              required
              className="text-sidebar"
              autoComplete="email"
              aria-required="true"
            />
          </div>

          {/* Senha */}
          <div>
            <label
              htmlFor="senha"
              className="mb-1 block text-xs font-semibold text-white/70"
            >
              Senha{" "}
              <span aria-hidden="true" className="text-red-400">
                *
              </span>
              <span className="sr-only">(obrigatório)</span>
            </label>
            <PasswordInput
              id="senha"
              name="senha"
              placeholder="Mínimo 6 caracteres"
              required
              minLength={6}
              autoComplete="new-password"
              aria-required="true"
              aria-describedby="senha-hint"
            />
            <p id="senha-hint" className="mt-1 text-xs text-white/40">
              Mínimo de 6 caracteres
            </p>
          </div>

          {/* Confirmar Senha */}
          <div>
            <label
              htmlFor="confirmarSenha"
              className="mb-1 block text-xs font-semibold text-white/70"
            >
              Confirmar Senha{" "}
              <span aria-hidden="true" className="text-red-400">
                *
              </span>
              <span className="sr-only">(obrigatório)</span>
            </label>
            <PasswordInput
              id="confirmarSenha"
              name="confirmarSenha"
              placeholder="Repita a senha"
              required
              minLength={6}
              autoComplete="new-password"
              aria-required="true"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 font-semibold text-white hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
          >
            Criar Conta
          </Button>
        </form>

        {/* Link de login */}
        <p className="mt-4 text-center text-sm text-gray-300">
          Já tem uma conta?{" "}
          <Link
            href="/login"
            className="font-bold text-blue-400 hover:underline focus-visible:underline"
          >
            Fazer login
          </Link>
        </p>

        {/* Aviso de email */}
        <div className="mt-6 rounded-lg bg-neutral-700/50 p-4" role="note">
          <p className="flex items-start gap-3 text-xs text-gray-300">
            <Info
              size={16}
              className="mt-0.5 shrink-0 text-gray-400"
              aria-hidden="true"
            />
            <span>
              Ao criar uma conta, você receberá um email de confirmação.
              Verifique sua caixa de entrada e pasta de spam.
            </span>
          </p>
        </div>
      </main>
    </div>
  );
}
