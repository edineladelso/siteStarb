// ==================== app/admin/livros/page.tsx ====================
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/shared/StatusBadge";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Download, Eye, Plus, Search } from "lucide-react";
import type { ContentStatus, Livro } from "@/lib/types";
import { deletarLivro, listarLivros } from "@/lib/actions";
import { ActionMenu } from "@/components/admin/shared/ActionMenu";
import { ConfirmationDialog } from "@/components/admin/shared/ConfirmationDialog";
import { getLivroCapaUrl } from "@/lib/domain/livro";

export default function LivrosPage() {
  const router = useRouter();
  const [livros, setLivros] = useState<Livro[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    loadLivros();
  }, []);

  const loadLivros = async () => {
    try {
      const data = await listarLivros();
      setLivros(data);
    } catch (error) {
      console.error("Erro ao carregar livros:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    const id = deleteId;
    setDeleteId(null);
    try {
      await deletarLivro(id);
      loadLivros();
    } catch (error) {
      console.error("Erro ao deletar livro:", error);
    }
  };

  const filteredLivros = livros.filter(
    (livro) =>
      livro.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      livro.autor.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalViews = livros.reduce((acc, livro) => acc + livro.views, 0);
  const totalDownloads = livros.reduce((acc, livro) => acc + livro.downloads, 0);

  return (
    <div className="space-y-6 px-4 sm:px-0">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Livros</h1>
          <p className="mt-1 text-slate-600">
            Gerencie os livros técnicos da plataforma
          </p>
        </div>
        <Link href="/admin/livros/novo">
          <Button className="w-full bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Livro
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <div className="relative">
          <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por título ou autor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-slate-300 py-2 pr-4 pl-10 outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100">
              <BookOpen className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Total</p>
              <p className="text-2xl font-bold text-slate-900">{livros.length}</p>
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
                {livros.filter((livro) => livro.status === "publicado").length}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
              <Eye className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Total Views</p>
              <p className="text-2xl font-bold text-slate-900">
                {totalViews.toLocaleString("pt-BR")}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
              <Download className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Downloads</p>
              <p className="text-2xl font-bold text-slate-900">
                {totalDownloads.toLocaleString("pt-BR")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Table - desktop */}
      <div className="hidden sm:block">
        <DataTable
          data={filteredLivros}
          loading={loading}
          columns={[
            { key: "titulo", label: "Título" },
            { key: "autor", label: "Autor" },
            { key: "categoria", label: "Categoria" },
            { key: "status", label: "Status" },
            { key: "views", label: "Views" },
            { key: "downloads", label: "Downloads" },
          ]}
          renderRow={(livro: Livro) => {
            const capaUrl = getLivroCapaUrl(livro.capa);

            return (
              <>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-16 w-12 shrink-0 overflow-hidden rounded bg-slate-100">
                      {capaUrl ? (
                        <Image
                          src={capaUrl}
                          alt={livro.titulo}
                          width={48}
                          height={64}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-slate-700 to-slate-900 text-white">
                          <BookOpen className="h-5 w-5" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-slate-900">
                        {livro.titulo}
                      </p>
                      <p className="truncate text-sm text-slate-500">
                        {livro.detalhes.isbn || "ISBN não informado"}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-700">{livro.autor}</td>
                <td className="px-6 py-4">
                  <Badge variant="outline">{livro.categoria}</Badge>
                </td>
                <td className="px-6 py-4">
                  <StatusBadge status={livro.status as ContentStatus} />
                </td>
                <td className="px-6 py-4 text-slate-700">
                  {livro.views.toLocaleString("pt-BR")}
                </td>
                <td className="px-6 py-4 text-slate-700">
                  {livro.downloads.toLocaleString("pt-BR")}
                </td>
                <td className="px-6 py-4">
                  <ActionMenu
                    onEdit={() => router.push(`/admin/livros/${livro.id}/editar`)}
                    onDelete={() => setDeleteId(livro.id)}
                  />
                </td>
              </>
            );
          }}
          emptyMessage="Nenhum livro cadastrado"
          emptyDescription="Clique em 'Adicionar Livro' para começar"
        />
      </div>

      {/* Cards - mobile */}
      <div className="space-y-3 sm:hidden">
        {loading &&
          Array.from({ length: 4 }).map((_, index) => (
            <div
              key={`livro-skeleton-${index}`}
              className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="animate-pulse">
                <div className="flex items-start gap-3">
                  <div className="h-16 w-12 shrink-0 rounded bg-slate-200" />
                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="h-4 w-3/4 rounded bg-slate-200" />
                    <div className="h-3 w-1/2 rounded bg-slate-200" />
                    <div className="h-3 w-2/3 rounded bg-slate-200" />
                  </div>
                  <div className="h-8 w-8 rounded bg-slate-200" />
                </div>
              </div>
            </div>
          ))}

        {!loading &&
          filteredLivros.map((livro) => {
            const capaUrl = getLivroCapaUrl(livro.capa);

            return (
              <div
                key={livro.id}
                className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <div className="h-16 w-12 shrink-0 overflow-hidden rounded bg-slate-100">
                    {capaUrl ? (
                      <Image
                        src={capaUrl}
                        alt={livro.titulo}
                        width={48}
                        height={64}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-linear-to-br from-slate-700 to-slate-900 text-white">
                        <BookOpen className="h-5 w-5" />
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="line-clamp-2 font-semibold text-slate-900">
                        {livro.titulo}
                      </p>
                      <Badge variant="outline">{livro.categoria}</Badge>
                    </div>
                    <p className="text-sm text-slate-600">{livro.autor}</p>
                    <p className="truncate text-xs text-slate-500">
                      {livro.detalhes.isbn || "ISBN não informado"}
                    </p>
                    <div className="flex flex-wrap gap-3 text-xs text-slate-600">
                      <span>Views: {livro.views.toLocaleString("pt-BR")}</span>
                      <span>
                        Downloads: {livro.downloads.toLocaleString("pt-BR")}
                      </span>
                    </div>
                    <StatusBadge status={livro.status as ContentStatus} />
                  </div>

                  <ActionMenu
                    onEdit={() => router.push(`/admin/livros/${livro.id}/editar`)}
                    onDelete={() => setDeleteId(livro.id)}
                  />
                </div>
              </div>
            );
          })}

        {!loading && filteredLivros.length === 0 && (
          <div className="rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm">
            <p className="text-base font-semibold text-slate-900">
              Nenhum livro encontrado
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Tente outro termo de busca ou adicione um novo livro.
            </p>
          </div>
        )}
      </div>

      <ConfirmationDialog
        open={deleteId !== null}
        onOpenChange={(open) => {
          if (!open) setDeleteId(null);
        }}
        title="Excluir livro"
        description="Tem certeza que deseja deletar este livro? Esta ação não pode ser desfeita."
        confirmLabel="Deletar"
        cancelLabel="Cancelar"
        variant="destructive"
        onConfirm={handleDelete}
      />
    </div>
  );
}
