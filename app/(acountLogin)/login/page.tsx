import {
  fazerLoginComEmail,
  loginComGoogle,
  loginComGithub,
} from "@/lib/supabase/auth/auth-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Github, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import rotateImage from "@/public/image/rotate.jpg";

// Ícone Google SVG correto
function GoogleIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

export default async function LoginPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center p-5">
      <Image
        src={rotateImage}
        alt="backImage"
        className="h-full object-cover blur-3xl"
      />
      <div className="absolute container mx-auto max-w-md rounded-3xl p-10 shadow-inner shadow-violet-300 backdrop-blur-3xl backdrop-brightness-80 backdrop-saturate-120">
        <h1 className="font-text mb-6 text-center text-3xl font-black text-white/80">
          Entrar
        </h1>

        {/* Login Social */}
        <div className="mb-6 space-y-3">
          <form action={loginComGoogle}>
            <Button
              type="submit"
              variant="outline"
              className="w-full bg-white/80 font-bold text-gray-800 transition-colors hover:bg-white"
            >
              <GoogleIcon /> Continuar com Google
            </Button>
          </form>
          <form action={loginComGithub}>
            <Button
              type="submit"
              variant="outline"
              className="w-full bg-white/80 font-bold text-gray-800 transition-colors hover:bg-white"
            >
              <Github size={16} /> Continuar com GitHub
            </Button>
          </form>
        </div>

        {/* Divider */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-t-white/50" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="rounded-t-2xl bg-gray-300/90 px-2 text-gray-600 backdrop-blur-lg">
              Ou com email
            </span>
          </div>
        </div>

        {/* Login com Email */}
        <form action={fazerLoginComEmail} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="text-xs font-semibold text-white/70"
            >
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="seu@email.com"
              required
              autoComplete="email"
              className="text-sidebar mt-1"
            />
          </div>
          <div>
            <label
              htmlFor="senha"
              className="text-xs font-semibold text-white/70"
            >
              Senha
            </label>
            <Input
              id="senha"
              name="senha"
              type="password"
              placeholder="Sua senha"
              required
              autoComplete="current-password"
              className="text-sidebar mt-1"
            />
          </div>
          <Button type="submit" className="w-full">
            <Mail size={16} /> Entrar
          </Button>
        </form>

        {/* Links */}
        <div className="mt-6 space-y-2 text-center">
          <p className="text-sm text-gray-600">
            Não tem conta?{" "}
            <Link
              href="/registro"
              className="font-semibold text-blue-600 hover:underline"
            >
              Criar conta
            </Link>
          </p>
          <p className="text-sm text-gray-500">
            <Link href="/admin-setup" className="hover:underline">
              Promover esta conta a administrador
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
