// ==================== app/admin/artigos/page.tsx ====================
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/shared/StatusBadge";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, FileText } from "lucide-react";
import type { Artigo } from "@/lib/types";
import { getArtigos, deleteArtigo } from "@/actions/artigos";
import { ActionMenu } from "@/components/admin/shared/ActionMenu";

export default function ArtigosPage() {
  const router = useRouter();
  const [artigos, setArtigos] = useState<Artigo[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadArtigos();
  }, []);

  const loadArtigos = async () => {
    try {
      const data = await getArtigos();
      setArtigos(data);
    } catch (error) {
      console.error("Erro ao carregar artigos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja deletar este artigo?")) {
      const result = await deleteArtigo(id);
      if (result.success) {
        loadArtigos();
      }
    }
  };

  const filteredArtigos = artigos.filter(artigo =>
    artigo.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    artigo.autores.toLowerCase().includes(searchTerm.toLowerCase()) ||
    artigo.palavrasChave!.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Artigos</h1>
          <p className="text-slate-600 mt-1">
            Gerencie os artigos científicos e técnicos
          </p>
        </div>
        <Link href="/admin/artigos/novo">
          <Button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Artigo
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg border border-slate-200 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por título, autores ou palavras-chave..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
              <FileText className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Total</p>
              <p className="text-2xl font-bold text-slate-900">{artigos.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-slate-600">Publicados</p>
              <p className="text-2xl font-bold text-slate-900">
                {artigos.filter(a => a.status === "publicado").length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-slate-600">Total Views</p>
              <p className="text-2xl font-bold text-slate-900">
                {artigos.reduce((acc, a) => acc + a.views, 0).toLocaleString('pt-BR')}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-slate-600">Downloads</p>
              <p className="text-2xl font-bold text-slate-900">
                {artigos.reduce((acc, a) => acc + a.downloads, 0).toLocaleString('pt-BR')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <DataTable
        data={filteredArtigos}
        loading={loading}
        columns={[
          { key: "titulo", label: "Título" },
          { key: "autores", label: "Autores" },
          { key: "categoria", label: "Categoria" },
          { key: "anoPublicacao", label: "Ano" },
          { key: "status", label: "Status" },
          { key: "views", label: "Views" },
          { key: "downloads", label: "Downloads" },
        ]}
        renderRow={(artigo) => (
          <>
            <td className="py-4 px-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{artigo.titulo}</p>
                  <p className="text-sm text-slate-500">
                    {artigo.instituicao || "—"}
                  </p>
                </div>
              </div>
            </td>
            <td className="py-4 px-6 text-slate-700">{artigo.autores}</td>
            <td className="py-4 px-6">
              <Badge variant="outline">{artigo.categoria}</Badge>
            </td>
            <td className="py-4 px-6 text-slate-700">
              {artigo.anoPublicacao || "—"}
            </td>
            <td className="py-4 px-6">
              <StatusBadge status={artigo.status} />
            </td>
            <td className="py-4 px-6 text-slate-700">
              {artigo.views.toLocaleString('pt-BR')}
            </td>
            <td className="py-4 px-6 text-slate-700">
              {artigo.downloads.toLocaleString('pt-BR')}
            </td>
            <td className="py-4 px-6">
              <ActionMenu
                onEdit={() => router.push(`/admin/artigos/${artigo.id}/editar`)}
                onDelete={() => handleDelete(artigo.id)}
              />
            </td>
          </>
        )}
        emptyMessage="Nenhum artigo cadastrado"
        emptyDescription="Clique em 'Adicionar Artigo' para começar"
      />
    </div>
  );
}