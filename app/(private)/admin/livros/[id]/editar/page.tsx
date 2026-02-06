// ==================== app/admin/livros/[id]/editar/page.tsx ====================
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { LivroForm } from "@/components/admin/forms/LivroForm";
import { getLivroById } from "@/lib/actions";
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
    const id = Number(params.id);
    if (Number.isNaN(id)) {
      setLivro(null);
      setLoading(false);
      return;
    }
    const data = await getLivroById(id);
    setLivro(data);
    setLoading(false);
  };


  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
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
      onCancel={() => router.push("/admin/livros")}
    />
  );
}
