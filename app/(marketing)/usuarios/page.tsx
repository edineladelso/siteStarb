import { buscarTodosUsuarios } from "@/lib/drizzle/db/queries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { ReactElement } from "react";

// ✅ Tipos derivados do schema Drizzle - zero overhead, type-safe
type Usuario = Awaited<ReturnType<typeof buscarTodosUsuarios>>[number];

// ✅ Força renderização dinâmica - resolve o erro de build
export const dynamic = 'force-dynamic';

// ✅ Desabilita cache para dados sempre atualizados
export const revalidate = 0;

export default async function UsuariosPage(): Promise<ReactElement> {
  // ✅ Tratamento de erro profissional com tipagem estrita
  let usuarios: Usuario[];
  let error: string | null;

  try {
    usuarios = await buscarTodosUsuarios();
    error = null;
  } catch (e) {
    error = e instanceof Error ? e.message : 'Erro ao carregar usuários';
    usuarios = [];
  }

  return (
    <main className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:px-6 sm:py-12">
      {/* Header */}
      <header className="space-y-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">
            Gestão de Usuários
          </h1>
          <Badge variant="outline" className="text-sm">
            {usuarios.length} {usuarios.length === 1 ? 'usuário' : 'usuários'}
          </Badge>
        </div>
        <p className="text-muted-foreground text-base">
          Visualize e gerencie todos os usuários cadastrados na plataforma.
        </p>
      </header>

      <Separator />

      {/* Error State */}
      {error && (
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Erro ao Carregar</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">{error}</p>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {!error && usuarios.length === 0 && (
        <Card>
          <CardContent className="flex min-h-[400px] flex-col items-center justify-center space-y-4 py-12">
            <div className="rounded-full bg-muted p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-lg font-semibold">Nenhum usuário cadastrado</h3>
              <p className="text-muted-foreground text-sm max-w-md">
                Ainda não há usuários registrados na plataforma. Os novos cadastros aparecerão aqui.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Users Grid */}
      {!error && usuarios.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {usuarios.map((usuario) => (
            <Card key={usuario.id} className="transition hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">{usuario.nome}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm font-medium break-all">{usuario.email}</p>
                </div>
                
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Idade</p>
                  <p className="text-sm font-medium">{usuario.idade} anos</p>
                </div>

                <Separator />

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>ID: {usuario.id}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </main>
  );
}