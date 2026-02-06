import { registrarComEmail } from "@/lib/supabase/auth/auth-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function RegistroPage() {
  return (
    <div className="container mx-auto max-w-md p-8">
      <h1 className="mb-6 text-center text-3xl font-bold">Criar Conta</h1>

      <form action={registrarComEmail} className="space-y-4">
        <div>
          <label htmlFor="nome" className="mb-1 block text-sm font-medium">
            Nome Completo
          </label>
          <Input
            id="nome"
            name="nome"
            placeholder="Seu nome completo"
            required
            minLength={3}
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="seu@email.com"
            required
          />
        </div>

        <div>
          <label htmlFor="senha" className="mb-1 block text-sm font-medium">
            Senha
          </label>
          <Input
            id="senha"
            name="senha"
            type="password"
            placeholder="Mínimo 6 caracteres"
            required
            minLength={6}
          />
        </div>

        <div>
          <label htmlFor="idade" className="mb-1 block text-sm font-medium">
            Idade <span className="text-gray-400">(opcional)</span>
          </label>
          <Input
            id="idade"
            name="idade"
            type="number"
            placeholder="Ex: 25"
            min={1}
            max={120}
          />
        </div>

        <Button type="submit" className="w-full">
          Criar Conta
        </Button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        Já tem uma conta?{" "}
        <a href="/login" className="text-blue-600 hover:underline">
          Fazer login
        </a>
      </p>

      <div className="mt-6 rounded-lg bg-blue-50 p-4">
        <p className="text-xs text-gray-600">
          ℹ️ Ao criar uma conta, você receberá um email de confirmação.
          Verifique sua caixa de entrada e spam.
        </p>
      </div>
    </div>
  );
}
