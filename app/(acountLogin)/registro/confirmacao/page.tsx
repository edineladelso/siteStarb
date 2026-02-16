import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ConfirmacaoPage() {
  return (
    <div className="container mx-auto max-w-md p-8 text-center">
      <div className="mb-6 text-6xl">✉️</div>
      <h1 className="mb-4 text-2xl font-bold">Verifique seu Email</h1>
      <p className="mb-6 text-gray-600">
        Enviamos um link de confirmação para o seu email. 
        Por favor, verifique sua caixa de entrada e clique no link para ativar sua conta.
      </p>
      <Link href="/login">
        <Button>Ir para Login</Button>
      </Link>
    </div>
  );
}