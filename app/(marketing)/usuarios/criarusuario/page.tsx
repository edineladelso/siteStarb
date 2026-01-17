import { criarUsuario } from "@/lib/drizzle/db/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { redirect } from "next/navigation";

export default function criarUsuarioPage() {
  async function handleSubmit(formData: FormData) {
    "use server";
    const result = await criarUsuario(formData);

    if (result.success) {
      redirect("/usuarios");
    }
  }

  return (
    <div className="container mx-auto max-w-md p-8">
      <h1 className="font-body mb-6 text-2xl">Criar Novo Usuário</h1>
      <form action={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="nome" className="mb-1 block text-sm font-medium">
            Nome
          </label>
          <Input
            id="nome"
            name="nome"
            placeholder="Digite o nome"
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="starb@exemplo.com"
            required
          />
        </div>
        <div>
          <label htmlFor="idade" className="block text-sm font-medium mb-1">
            Idade
          </label>
          <Input
            id="idade"
            name="idade"
            type="number"
            placeholder="Digite a idade"
            required
          />
        </div>
        <Button type="submit" >Criar Usuário</Button>
      </form>
    </div>
  );
}
