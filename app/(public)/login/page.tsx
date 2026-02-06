import {
  fazerLoginComEmail,
  loginComGoogle,
  loginComGithub,
} from "@/lib/supabase/auth/auth-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Github, GlobeIcon } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="container mx-auto max-w-md p-8">
      <h1 className="mb-6 text-center text-3xl font-bold">Entrar</h1>

      {/* Login Social */}
      <div className="mb-6 space-y-3">
        <form action={loginComGoogle}>
          <Button type="submit" variant="outline" className="w-full">
            <GlobeIcon/> Continuar com Google
          </Button>
        </form>

        <form action={loginComGithub}>
          <Button type="submit" variant="outline" className="w-full">
            <Github /> Continuar com GitHub
          </Button>
        </form>
      </div>

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-gray-500">Ou com email</span>
        </div>
      </div>

      {/* Login com Email */}
      <form action={fazerLoginComEmail} className="space-y-4">
        <div>
          <Input
            name="email"
            type="email"
            placeholder="seu@email.com"
            required
          />
        </div>

        <div>
          <Input
            name="senha"
            type="password"
            placeholder="Sua senha"
            required
          />
        </div>

        <Button type="submit" className="w-full">
          Entrar
        </Button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        Não tem conta?{" "}
        <a href="/registro" className="text-blue-600 hover:underline">
          Criar conta
        </a>
      </p>
      <p className="mt-2 text-center text-sm text-gray-500">
        <Link href="/admin-setup" className="hover:underline">
          Promover esta conta a administrador
        </Link>
      </p>
    </div>
  );
}
