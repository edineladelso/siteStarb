// ==================== app/admin/softwares/[id]/editar/page.tsx ====================
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { SoftwareForm } from "@/components/admin/forms/SoftwareForm";
import { getSoftwareById } from "@/lib/actions";
import type { Software } from "@/lib/types";
import { LoadingContent } from "../../../ui/Loading";
import { ErrorContent } from "@/app/error/ErrorComponent";

export default function EditarSoftwarePage() {
  const router = useRouter();
  const params = useParams();
  const [software, setSoftware] = useState<Software | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadSoftware = async (id: number) => {
    try {
      if (isNaN(id)) throw new Error("ID inválido");

      const data = await getSoftwareById(id);

      if (!data) {
        setError(true);
      } else {
        setSoftware(data);
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
      loadSoftware(Number(params.id));
    }
  }, [params.id]);

  if (loading) {
    return <LoadingContent conteudo="softwares" />;
  }

  if (error || !software) {
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
    <SoftwareForm
      initialData={software}
      onCancel={() => router.push("/admin/softwares")}
    />
  );
}
