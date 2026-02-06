// ==================== app/admin/artigos/[id]/editar/page.tsx ====================
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArtigoForm } from "@/components/admin/forms/ArtigoForm";
import { getArtigoById } from "@/lib/actions";
import type { Artigo } from "@/lib/types";

export default function EditarArtigoPage() {
  const router = useRouter();
  const params = useParams();
  const [artigo, setArtigo] = useState<Artigo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadArtigo();
  }, [params.id]);

  const loadArtigo = async () => {
    const id = Number(params.id);
    if (Number.isNaN(id)) {
      setArtigo(null);
      setLoading(false);
      return;
    }
    const data = await getArtigoById(id);
    setArtigo(data);
    setLoading(false);
  };


  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-orange-600 border-t-transparent"></div>
          <p className="text-slate-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!artigo) {
    return (
      <div className="py-12 text-center">
        <p className="text-slate-600">Artigo não encontrado</p>
      </div>
    );
  }

  return (
    <ArtigoForm
      initialData={artigo}
      onCancel={() => router.push("/admin/artigos")}
    />
  );
}
