import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { registrarComEmail } from "@/lib/supabase/auth/auth-actions";
import Image from "next/image";
import Link from "next/link";
import asideImage from "@/public/image/rotate1.jpg";
import { Info, AlertCircle } from "lucide-react";

export default async function RegistroPage({
  searchParams,
}: {
  searchParams: { message?: string; error?: string };
}) {
  return (
    <div className="bg-sidebar-foreground relative flex h-screen w-full items-center justify-center text-shadow-black p-6">
      <Image
        src={asideImage}
        alt="Aside image"
        fill
        className="z-30 h-screen w-screen object-cover opacity-40 blur-3xl"
      />
      <div className="absolute z-50 container mx-auto max-w-md sm:max-w-xl rounded-3xl p-6 sm:p-12 shadow-inner shadow-violet-300 backdrop-blur-3xl">
        <h1 className="mb-6 text-center text-3xl font-black text-white/90">
          Criar Conta
        </h1>

        {/* Mensagens de Erro/Sucesso */}
        {searchParams.error && (
          <div className="mb-4 rounded-lg bg-red-500/20 border border-red-500 p-3 flex gap-2 items-center">
            <AlertCircle size={16} className="text-red-500 flex-shrink-0" />
            <p className="text-sm text-red-200">{searchParams.error}</p>
          </div>
        )}
        {searchParams.message && (
          <div className="mb-4 rounded-lg bg-green-500/20 border border-green-500 p-3 flex gap-2 items-center">
            <Info size={16} className="text-green-500 flex-shrink-0" />
            <p className="text-sm text-green-200">{searchParams.message}</p>
          </div>
        )}

        <form action={registrarComEmail} className="space-y-4">
          <div>
            <label
              htmlFor="nome"
              className="block text-xs font-semibold text-white/70 mb-1"
            >
              Nome Completo
            </label>
            <Input
              id="nome"
              name="nome"
              placeholder="Seu nome completo"
              required
              minLength={3}
              className="text-sidebar"
              autoComplete="name"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-xs font-semibold text-white/70 mb-1"
            >
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="seu@email.com"
              required
              className="text-sidebar"
              autoComplete="email"
            />
          </div>

          <div>
            <label
              htmlFor="senha"
              className="block text-xs font-semibold text-white/70 mb-1"
            >
              Senha
            </label>
            <Input
              id="senha"
              name="senha"
              type="password"
              placeholder="Mínimo 6 caracteres"
              required
              minLength={6}
              className="text-sidebar"
              autoComplete="new-password"
            />
          </div>

          <div>
            <label
              htmlFor="confirmarSenha"
              className="block text-xs font-semibold text-white/70 mb-1"
            >
              Confirmar Senha
            </label>
            <Input
              id="confirmarSenha"
              name="confirmarSenha"
              type="password"
              placeholder="Repita a senha"
              required
              minLength={6}
              className="text-sidebar"
              autoComplete="new-password"
            />
          </div>



          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
          >
            Criar Conta
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-300">
          Já tem uma conta?{" "}
          <Link
            href="/login"
            className="font-bold text-blue-400 hover:underline"
          >
            Fazer login
          </Link>
        </p>

        <div className="mt-6 rounded-lg bg-neutral-700/50 p-4">
          <p className="flex items-start gap-3 text-xs text-gray-300">
            <Info size={16} className="flex-shrink-0 mt-0.5" />
            <span>
              Ao criar uma conta, você receberá um email de confirmação.
              Verifique sua caixa de entrada e pasta de spam.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
