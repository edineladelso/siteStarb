// ==================== app/admin/projetos/[id]/editar/page.tsx ====================
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ProjetoForm } from "@/components/admin/forms/ProjetoForm";
import { getProjetoById, updateProjeto } from "@/actions/projetos";
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
    const data = await getProjetoById(params.id as string);
    setProjeto(data);
    setLoading(false);
  };

  const handleSubmit = async (data: any) => {
    const result = await updateProjeto(params.id as string, data);
    if (result.success) {
      router.push("/admin/projetos");
    } else {
      alert("Erro ao atualizar projeto: " + result.error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!projeto) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600">Projeto não encontrado</p>
      </div>
    );
  }

  return (
    <ProjetoForm
      initialData={projeto}
      onSubmit={handleSubmit}
      onCancel={() => router.push("/admin/projetos")}
    />
  );
}
