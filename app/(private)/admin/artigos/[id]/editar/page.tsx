"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArtigoForm } from "@/components/admin/forms/ArtigoForm"; // Ajuste o path se necessário
import { getArtigoById } from "@/lib/actions/artigos.actions"; // Importação direta da action
import type { Artigo } from "@/lib/types";

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
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          <p className="animate-pulse text-sm font-medium text-slate-500">Carregando dados do artigo...</p>
        </div>
      </div>
    );
  }

  // State: Error / Not Found
  if (error || !artigo) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
        <div className="rounded-full bg-red-100 p-4">
          <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Artigo não encontrado</h2>
          <p className="text-slate-500">O artigo que você tenta editar não existe ou foi removido.</p>
        </div>
        <button 
          onClick={() => router.push("/admin/artigos")}
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          Voltar para a lista
        </button>
      </div>
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