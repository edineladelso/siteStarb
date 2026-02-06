// ==================== app/admin/livros/page.tsx ====================
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/shared/StatusBadge";
import { Plus, Search } from "lucide-react";
import type { ContentStatus, Livro } from "@/lib/types";
import { listarLivros } from "@/lib/actions";
import { ActionMenu } from "@/components/admin/shared/ActionMenu";
import { ConfirmationDialog } from "@/components/admin/shared/ConfirmationDialog";
import { genericDelete } from "@/lib/actions/shared";

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
      await genericDelete(livros, id, "/admin/livros");
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Livros</h1>
          <p className="mt-1 text-slate-600">
            Gerencie os livros técnicos da plataforma
          </p>
        </div>
        <Link href="/admin/livros/novo">
          <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
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
            className="w-full rounded-lg border border-slate-300 py-2 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Table */}
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
        renderRow={(livro: Livro) => (
          <>
            <td className="px-4 py-4">
              <div className="flex items-center gap-3">
                <img
                  src={livro.midia.capa}
                  alt={livro.titulo}
                  className="h-16 w-12 rounded object-cover"
                />
                <div>
                  <p className="font-semibold text-slate-900">{livro.titulo}</p>
                  <p className="text-sm text-slate-500">{livro.isbn}</p>
                </div>
              </div>
            </td>
            <td className="px-4 py-4 text-slate-700">{livro.autor}</td>
            <td className="px-4 py-4 text-slate-700">{livro.categoria}</td>
            <td className="px-4 py-4">
              <StatusBadge status={livro.status as ContentStatus} />
            </td>
            <td className="px-4 py-4 text-slate-700">
              {livro.views.toLocaleString("pt-BR")}
            </td>
            <td className="px-4 py-4 text-slate-700">
              {livro.downloads.toLocaleString("pt-BR")}
            </td>
            <td className="px-4 py-4">
              <ActionMenu
                onEdit={() => router.push(`/admin/livros/${livro.id}/editar`)}
                onDelete={() => setDeleteId(livro.id)}
                item={livro}
              />
            </td>
          </>
        )}
      />

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
