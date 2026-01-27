// ==================== app/admin/artigos/[id]/editar/page.tsx ====================
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArtigoForm } from "@/components/admin/forms/ArtigoForm";
import { getArtigoById, updateArtigo } from "@/actions/artigos";
import type { Artigo } from "@/lib/types";
import { string } from "zod";
import { artigoSchema } from "@/lib/validations/artigo.shema";

export default function EditarArtigoPage() {
  const router = useRouter();
  const params = useParams();
  const [artigo, setArtigo] = useState<Artigo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadArtigo();
  }, [params.id]);

  const loadArtigo = async () => {
    const data = await getArtigoById(params.id as string );
    setArtigo(artigo);
    setLoading(false);
  };

  const handleSubmit = async (data: any) => {
    const result = await updateArtigo(params.id as string, data);
    if (result.success) {
      router.push("/admin/artigos");
    } else {
      alert("Erro ao atualizar artigo: " + result.error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!artigo) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600">Artigo não encontrado</p>
      </div>
    );
  }

  return (
    <ArtigoForm
      initialData={artigo}
      onSubmit={handleSubmit}
      onCancel={() => router.push("/admin/artigos")}
    />
  );
}