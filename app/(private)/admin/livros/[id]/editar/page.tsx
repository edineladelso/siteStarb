// ==================== app/admin/livros/[id]/editar/page.tsx ====================
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { LivroForm } from "@/components/admin/forms/LivroForm";
import { getLivroById } from "@/lib/actions";
import type { Livro } from "@/lib/types";
import { LoadingContent } from "../../../ui/Loading";
import { ErrorContent } from "../../../../../error/ErrorComponent";

export default function EditarLivroPage() {
  const router = useRouter();
  const params = useParams();
  const [livro, setLivro] = useState<Livro | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadLivro = async (id: number) => {
    try {
      if (isNaN(id)) throw new Error("ID inválido");

      const data = await getLivroById(id);

      if (!data) {
        setError(true);
      } else {
        setLivro(data);
      }
    } catch (err) {
      console.error("Falha ao carregar livro: ", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params?.id) {
      loadLivro(Number(params.id));
    }
  }, [params.id]);

  if (loading) {
    return <LoadingContent conteudo="livros" />;
  }

  if (error || !livro) {
    return (
      <ErrorContent
        conteudo="Livro"
        backUrl="/admin/livros"
        secondaryAction={{
          label: "Criar novo Artigo",
          onClick: () => router.push("/admin/livros/novo"),
        }}
      />
    );
  }

  return (
    <LivroForm
      initialData={livro}
      onCancel={() => router.push("/admin/livros")}
    />
  );
}
