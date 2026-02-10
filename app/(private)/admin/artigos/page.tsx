// ==================== app/admin/artigos/page.tsx ====================
"use client";

import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/shared/StatusBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { listarArtigos } from "@/lib/actions";
import type { Artigo, ContentStatus } from "@/lib/types";
import { FileText, Plus, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { ActionMenu } from "@/components/admin/shared/ActionMenu";
import { ConfirmationDialog } from "@/components/admin/shared/ConfirmationDialog";

export default function ArtigosPage() {
  const router = useRouter();
  const [artigos, setArtigos] = useState<Artigo[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    loadArtigos();
  }, []);

  const loadArtigos = async () => {
    try {
      const data = await listarArtigos();
      setArtigos(data);
    } catch (error) {
      console.error("Erro ao carregar artigos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleteId(null);
    try {
      //await genericDelete(id);
      loadArtigos();
    } catch (error) {
      console.error("Erro ao deletar artigo:", error);
    }
  };

  const filteredArtigos = artigos.filter(
    (artigo) =>
      artigo.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artigo.autores.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artigo.palavrasChave!.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Artigos</h1>
          <p className="mt-1 text-slate-600">
            Gerencie os artigos científicos e técnicos
          </p>
        </div>
        <Link href="/admin/artigos/novo">
          <Button className="bg-linear-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Artigo
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <div className="relative">
          <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por título, autores ou palavras-chave..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-slate-300 py-2 pr-4 pl-10 outline-none focus:border-transparent focus:ring-2 focus:ring-orange-500"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100">
              <FileText className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Total</p>
              <p className="text-2xl font-bold text-slate-900">
                {artigos.length}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
              <svg
                className="h-5 w-5 text-green-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-slate-600">Publicados</p>
              <p className="text-2xl font-bold text-slate-900">
                {artigos.filter((a) => a.status === "publicado").length}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
              <svg
                className="h-5 w-5 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path
                  fillRule="evenodd"
                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-slate-600">Total Views</p>
              <p className="text-2xl font-bold text-slate-900">
                {artigos
                  .reduce((acc, a) => acc + a.views, 0)
                  .toLocaleString("pt-BR")}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
              <svg
                className="h-5 w-5 text-purple-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-slate-600">Downloads</p>
              <p className="text-2xl font-bold text-slate-900">
                {artigos
                  .reduce((acc, a) => acc + a.downloads, 0)
                  .toLocaleString("pt-BR")}
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
            <td className="px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-linear-to-br from-orange-500 to-red-600 text-white">
                  <FileText className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">
                    {artigo.titulo}
                  </p>
                  <p className="text-sm text-slate-500">
                    {artigo.instituicao || "—"}
                  </p>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 text-slate-700">{artigo.autores}</td>
            <td className="px-6 py-4">
              <Badge variant="outline">{artigo.categoria}</Badge>
            </td>
            <td className="px-6 py-4 text-slate-700">
              {artigo.anoPublicacao || "—"}
            </td>
            <td className="px-6 py-4">
              <StatusBadge status={artigo.status as ContentStatus} />
            </td>
            <td className="px-6 py-4 text-slate-700">
              {artigo.views.toLocaleString("pt-BR")}
            </td>
            <td className="px-6 py-4 text-slate-700">
              {artigo.downloads.toLocaleString("pt-BR")}
            </td>
            <td className="px-6 py-4">
              <ActionMenu
                onEdit={() => router.push(`/admin/artigos/${artigo.id}/editar`)}
                onDelete={() => setDeleteId(artigo.id)}
              />
            </td>
          </>
        )}
        emptyMessage="Nenhum artigo cadastrado"
        emptyDescription="Clique em 'Adicionar Artigo' para começar"
      />

      <ConfirmationDialog
        open={deleteId !== null}
        onOpenChange={(open) => {
          if (!open) setDeleteId(null);
        }}
        title="Excluir artigo"
        description="Tem certeza que deseja deletar este artigo? Esta ação não pode ser desfeita."
        confirmLabel="Deletar"
        cancelLabel="Cancelar"
        variant="destructive"
        onConfirm={handleDelete}
      />
    </div>
  );
}
