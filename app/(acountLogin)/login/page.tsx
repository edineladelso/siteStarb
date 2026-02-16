import {
  fazerLoginComEmail,
  loginComGoogle,
  loginComGithub,
} from "@/lib/supabase/auth/auth-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Github, GlobeIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import rotateImage from "@/public/image/rotate.jpg";

export default async function LoginPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center p-5">
      <Image
        src={rotateImage}
        alt="backImage"
        className="h-full object-cover blur-3xl"
      />
      <div className="absolute container mx-auto max-w-md rounded-3xl p-10 shadow-inner backdrop-brightness-80 backdrop-saturate-120  shadow-violet-300 backdrop-blur-3xl">
        <h1 className="mb-6 text-center text-3xl font-black text-white/80 font-text">
          Entrar
        </h1>
        {/* Login Social */}
        <div className="mb-6 space-y-3">
          <form action={loginComGoogle}>
            <Button type="submit" variant="outline" className="w-full bg-white/80 font-bold">
              <GlobeIcon /> Continuar com Google
            </Button>
          </form>
          <form action={loginComGithub}>
            <Button type="submit" variant="outline" className="w-full bg-white/80 font-bold">
              <Github /> Continuar com GitHub
            </Button>
          </form>
        </div>
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-t-white/50" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-gray-300/90 backdrop-blur-lg rounded-t-2xl px-2 text-gray-600">Ou com email</span>
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
              className="text-sidebar"
            />
          </div>
          <div>
            <Input
              name="senha"
              type="password"
              placeholder="Sua senha"
              required
              className="text-sidebar"
            />
          </div>
          <Button type="submit" className="w-full">
            Entrar
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Não tem conta?{" "}
          <Link href="/registro" className="text-blue-600 hover:underline">
            Criar conta
          </Link>
        </p>
        <p className="mt-2 text-center text-sm text-gray-500">
          <Link href="/admin-setup" className="hover:underline">
            Promover esta conta a administrador
          </Link>
        </p>
      </div>
    </div>
  );
}
