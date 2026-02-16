import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { registrarComEmail } from "@/lib/supabase/auth/auth-actions";
import Image from "next/image";
import Link from "next/link";
import asideImage from "@/public/image/rotate1.jpg";
import { Info } from "lucide-react";
export default async function RegistroPage({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  return (
    <div className="bg-sidebar-foreground relative flex h-screen w-full items-center justify-center text-shadow-black p-6">
      <Image
        src={asideImage}
        alt="Aside image"
        fill
        className="z-30 h-screen w-screen object-cover opacity-40 blur-3xl"
      />
      <div className="t-0 blur-out-2xl absolute z-50 container mx-auto max-w-md sm:max-w-xl rounded-3xl p-6 sm:p-12 shadow-inner shadow-violet-300 backdrop-blur-3xl">
        <h1 className="mb-6 text-center text-3xl font-black text-white/90">
          Criar Conta
        </h1>
        <form action={registrarComEmail} className="space-y-4">
          <div className="flex items-center gap-3">
            <label
              htmlFor="nome"
              className="block rounded bg-neutral-700 p-1 px-3 text-sm font-bold text-white/90"
            >
              Nome
            </label>
            <Input
              id="nome"
              name="nome"
              placeholder="Seu nome completo"
              required
              minLength={3}
              className="text-sidebar"
            />
          </div>
          <div className="flex items-center gap-3">
            <label
              htmlFor="email"
              className="block rounded bg-neutral-700 p-1 px-3 text-sm font-bold text-white/90"
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
            />
          </div>
          <div className="flex items-center gap-3">
            <label
              htmlFor="senha"
              className="block rounded bg-neutral-700 p-1 px-3 text-sm font-bold text-white/90"
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
            />
          </div>
          <div className="flex items-center gap-3">
            <label
              htmlFor="confirmarSenha"
              className="block rounded bg-neutral-700 p-1 px-3 text-sm font-bold text-white/90"
            >
              Confirmar
            </label>
            <Input
              id="senha"
              name="senha"
              type="password"
              placeholder="Mínimo 6 caracteres"
              required
              minLength={6}
              className="text-sidebar"
            />
          </div>
          <div className="flex items-center gap-3">
            <label
              htmlFor="idade"
              className="flex rounded bg-neutral-700 p-1 px-3 text-sm font-bold text-white/90"
            >
              Idade <span className="text-gray-400"> (Opcional)</span>
            </label>
            <Input
              id="idade"
              name="idade"
              type="number"
              placeholder="Ex: 25"
              min={1}
              max={120}
              className="text-sidebar"
            />
          </div>
          <Button type="submit" className="w-full bg-blue-900">
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
        <div>{searchParams.message}</div>
        <div className="mt-6 rounded-lg bg-neutral-700/50 p-4">
          <p className="flex items-center gap-3 text-center text-xs text-gray-300">
            <Info size={40} />
            <span>
              Ao criar uma conta, você receberá um email de confirmação.
              Verifique sua caixa de entrada e spam.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
