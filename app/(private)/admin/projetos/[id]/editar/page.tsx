// ==================== app/admin/projetos/[id]/editar/page.tsx ====================
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ProjetoForm } from "@/components/admin/forms/ProjetoForm";
import { getProjetoById } from "@/lib/actions";
import type { Projeto } from "@/lib/types";
import { LoadingContent } from "../../../../../loading/Loading";
import { ErrorContent } from "@/app/error/ErrorComponent";

export default function EditarProjetoPage() {
  const router = useRouter();
  const params = useParams();
  const [projeto, setProjeto] = useState<Projeto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadProjet = async (id: number) => {
    try {
      if (isNaN(id)) throw new Error("ID inválido");

      const data = await getProjetoById(id);

      if (!data) {
        setError(true);
      } else {
        setProjeto(data);
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
      loadProjet(Number(params.id));
    }
  }, [params.id]);

  if (loading) {
    return <LoadingContent conteudo="projetos" />;
  }

  if (error || !projeto) {
    return (
      <ErrorContent
        conteudo="Projeto"
        backUrl="/admin/projetos"
        secondaryAction={{
          label: "Criar novo Projeto",
          onClick: () => router.push("/admin/projetos/novo"),
        }}
      />
    );
  }

  return (
    <ProjetoForm
      initialData={projeto}
      onCancel={() => router.push("/admin/projetos")}
    />
  );
}
