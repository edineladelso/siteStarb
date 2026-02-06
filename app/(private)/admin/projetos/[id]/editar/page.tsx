// ==================== app/admin/projetos/[id]/editar/page.tsx ====================
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ProjetoForm } from "@/components/admin/forms/ProjetoForm";
import { getProjetoById } from "@/lib/actions";
import type { Projeto } from "@/lib/types";

export default function EditarProjetoPage() {
  const router = useRouter();
  const params = useParams();
  const [projeto, setProjeto] = useState<Projeto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjeto();
  }, [params.id]);

  const loadProjeto = async () => {
    const id = Number(params.id);
    if (Number.isNaN(id)) {
      setProjeto(null);
      setLoading(false);
      return;
    }
    const data = await getProjetoById(id);
    setProjeto(data);
    setLoading(false);
  };


  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-green-600 border-t-transparent"></div>
          <p className="text-slate-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!projeto) {
    return (
      <div className="py-12 text-center">
        <p className="text-slate-600">Projeto não encontrado</p>
      </div>
    );
  }

  return (
    <ProjetoForm
      initialData={projeto}
      onCancel={() => router.push("/admin/projetos")}
    />
  );
}
