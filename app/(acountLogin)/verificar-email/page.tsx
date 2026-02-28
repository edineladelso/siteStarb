import Image from "next/image";
import Link from "next/link";
import asideImage from "@/public/image/rotate1.jpg";
import { Mail, RefreshCw, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { reenviarConfirmacaoEmail } from "@/lib/supabase/auth/auth-actions";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verifique seu Email",
  description: "Confirme seu email para ativar sua conta.",
  robots: { index: false, follow: false },
};

interface PageProps {
  searchParams: Promise<{ email?: string; error?: string; resent?: string }>;
}

export default async function VerificarEmailPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const email = params.email ?? "";

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-sidebar-foreground p-6">
      {/* Background decorativo */}
      <Image
        src={asideImage}
        alt=""
        aria-hidden="true"
        fill
        className="z-30 object-cover opacity-40 blur-3xl"
        priority
      />

      <main className="absolute z-50 container mx-auto w-full max-w-md rounded-3xl p-8 shadow-inner shadow-violet-300 backdrop-blur-3xl sm:max-w-lg sm:p-12">

        {/* Ícone central */}
        <div
          aria-hidden="true"
          className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-500/20 shadow-lg shadow-blue-500/20"
        >
          <Mail size={36} className="text-blue-400" />
        </div>

        {/* Título e descrição */}
        <h1 className="mb-3 text-center text-2xl font-black text-white/90 sm:text-3xl">
          Verifique seu Email
        </h1>

        <p className="mb-2 text-center text-sm text-gray-300">
          Enviamos um link de confirmação para:
        </p>

        {email && (
          <p className="mb-6 text-center font-semibold text-blue-400 break-all">
            {email}
          </p>
        )}

        <p className="mb-8 text-center text-sm leading-relaxed text-gray-400">
          Clique no link do email para ativar sua conta e ser redirecionado
          ao site. Verifique também a pasta de <strong className="text-gray-300">spam</strong>.
        </p>

        {/* Feedback de reenvio */}
        {params.resent === "true" && (
          <div
            role="status"
            aria-live="polite"
            className="mb-4 rounded-lg border border-green-500 bg-green-500/20 p-3 text-center text-sm text-green-200"
          >
            Email reenviado com sucesso! Verifique sua caixa de entrada.
          </div>
        )}

        {params.error && (
          <div
            role="alert"
            aria-live="assertive"
            className="mb-4 rounded-lg border border-red-500 bg-red-500/20 p-3 text-center text-sm text-red-200"
          >
            {params.error}
          </div>
        )}

        {/* Reenviar email */}
        {email && (
          <form action={reenviarConfirmacaoEmail} className="mb-4">
            <input type="hidden" name="email" value={email} />
            <Button
              type="submit"
              variant="outline"
              className="w-full gap-2 border-white/20 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white"
            >
              <RefreshCw size={15} aria-hidden="true" />
              Reenviar email de confirmação
            </Button>
          </form>
        )}

        {/* Voltar para login */}
        <Link
          href="/login"
          className="flex items-center justify-center gap-2 text-sm text-gray-400 transition-colors hover:text-white focus-visible:underline"
        >
          <ArrowLeft size={15} aria-hidden="true" />
          Voltar para o login
        </Link>

        {/* Dica de prazo */}
        <p className="mt-8 text-center text-xs text-gray-500">
          O link de confirmação expira em <span className="text-gray-400">24 horas</span>.
          Após confirmar, você será redirecionado automaticamente ao site.
        </p>
      </main>
    </div>
  );
}