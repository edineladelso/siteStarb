// ==================== app/admin/livros/[id]/editar/page.tsx ====================
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { LivroForm } from "@/components/admin/forms/LivroForm";
import { getLivroById, updateLivro } from "@/actions/livros";
import type { Livro } from "@/lib/types";

export default function EditarLivroPage() {
  const router = useRouter();
  const params = useParams();
  const [livro, setLivro] = useState<Livro | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLivro();
  }, [params.id]);

  const loadLivro = async () => {
    const data = await getLivroById(params.id as string);
    setLivro(data);
    setLoading(false);
  };

  const handleSubmit = async (data: any) => {
    const result = await updateLivro(params.id as string, data);
    if (result.success) {
      router.push("/admin/livros");
    } else {
      alert("Erro ao atualizar livro: " + result.error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!livro) {
    return <div>Livro não encontrado</div>;
  }

  return (
    <LivroForm
      initialData={livro}
      onSubmit={handleSubmit}
      onCancel={() => router.push("/admin/livros")}
    />
  );
}