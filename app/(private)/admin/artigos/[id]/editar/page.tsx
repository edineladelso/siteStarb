"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArtigoForm } from "@/components/admin/forms/ArtigoForm"; // Ajuste o path se necessário
import { getArtigoById } from "@/lib/actions/artigos.actions"; // Importação direta da action
import type { Artigo } from "@/lib/types";
import { LoadingContent } from "../../../ui/Loading";
import { ErrorContent } from "../../../../../error/ErrorComponent";

export default function EditarArtigoPage() {
  const router = useRouter();
  const params = useParams();

  const [artigo, setArtigo] = useState<Artigo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Garantimos que o ID existe antes de chamar
    if (params?.id) {
      loadArtigo(Number(params.id));
    }
  }, [params?.id]);

  const loadArtigo = async (id: number) => {
    try {
      if (isNaN(id)) throw new Error("ID inválido");

      const data = await getArtigoById(id);

      if (!data) {
        setError(true);
      } else {
        setArtigo(data);
      }
    } catch (err) {
      console.error("Falha ao carregar artigo:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  // State: Loading
  if (loading) {
    return <LoadingContent conteudo="artigos" />;
  }

  // State: Error / Not Found
  if (error || !artigo) {
    return (
      <ErrorContent
        conteudo="Artigo"
        backUrl="/admin/artigos"
        secondaryAction={{
          label: "Criar novo Artigo",
          onClick: () => router.push("/admin/artigos/novo"),
        }}
      />
    );
  }

  // State: Success
  return (
    <div className="container mx-auto px-4">
      <ArtigoForm
        initialData={artigo}
        onCancel={() => router.push("/admin/artigos")}
      />
    </div>
  );
}
