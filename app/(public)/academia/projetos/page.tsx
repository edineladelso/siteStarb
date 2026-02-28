import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projetos | Star B",
  description: "Projetos e estudos aplicados da Star B.",
};

export default function ProjetosPage() {
  return (
    <main className="min-h-screen w-full bg-zinc-100 px-4 py-10 text-center">
      <h1 className="text-3xl font-bold text-zinc-900">Projetos</h1>
      <p className="mt-3 text-zinc-600">Página em desenvolvimento.</p>
    </main>
  );
}
