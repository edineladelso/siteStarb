// ==================== app/admin/projetos/page.tsx ====================
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/shared/StatusBadge";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Wrench } from "lucide-react";
import type { Projeto } from "@/lib/types";
import { getProjetos, deleteProjeto } from "@/actions/projetos";
import { ActionMenu } from "@/components/admin/shared/ActionMenu";
import { ConfirmationDialog } from "@/components/admin/shared/ConfirmationDialog";

export default function ProjetosPage() {
  const router = useRouter();
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    loadProjetos();
  }, []);

  const loadProjetos = async () => {
    try {
      const data = await getProjetos();
      setProjetos(data);
    } catch (error) {
      console.error("Erro ao carregar projetos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    const id = deleteId;
    setDeleteId(null);
    const result = await deleteProjeto(id);
    if (result.success) {
      loadProjetos();
    }
  };

  const filteredProjetos = projetos.filter(
    (projeto) =>
      projeto.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      projeto.autor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      projeto.categoria.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Projetos</h1>
          <p className="mt-1 text-slate-600">
            Gerencie os projetos técnicos da plataforma
          </p>
        </div>
        <Link href="/admin/projetos/novo">
          <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Projeto
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <div className="relative">
          <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por título, autor ou categoria..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-slate-300 py-2 pr-4 pl-10 outline-none focus:border-transparent focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
              <Wrench className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Total</p>
              <p className="text-2xl font-bold text-slate-900">
                {projetos.length}
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <div>
            <p className="mb-1 text-sm text-slate-600">Iniciante</p>
            <p className="text-2xl font-bold text-green-600">
              {projetos.filter((p) => p.dificuldade === "Iniciante").length}
            </p>
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <div>
            <p className="mb-1 text-sm text-slate-600">Intermediário</p>
            <p className="text-2xl font-bold text-yellow-600">
              {projetos.filter((p) => p.dificuldade === "Intermediário").length}
            </p>
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <div>
            <p className="mb-1 text-sm text-slate-600">Avançado</p>
            <p className="text-2xl font-bold text-red-600">
              {projetos.filter((p) => p.dificuldade === "Avançado").length}
            </p>
          </div>
        </div>
      </div>

      {/* Table */}
      <DataTable
        data={filteredProjetos}
        loading={loading}
        columns={[
          { key: "titulo", label: "Projeto" },
          { key: "autor", label: "Autor" },
          { key: "categoria", label: "Categoria" },
          { key: "dificuldade", label: "Dificuldade" },
          { key: "tecnologias", label: "Tecnologias" },
          { key: "status", label: "Status" },
          { key: "views", label: "Views" },
        ]}
        renderRow={(projeto) => (
          <>
            <td className="px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 text-white">
                  <Wrench className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">
                    {projeto.titulo}
                  </p>
                  <p className="text-sm text-slate-500">
                    {projeto.duracao || "—"}
                  </p>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 text-slate-700">{projeto.autor}</td>
            <td className="px-6 py-4">
              <Badge variant="outline">{projeto.categoria}</Badge>
            </td>
            <td className="px-6 py-4">
              <Badge
                className={
                  projeto.dificuldade === "Iniciante"
                    ? "bg-green-100 text-green-800"
                    : projeto.dificuldade === "Intermediário"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                }
              >
                {projeto.dificuldade}
              </Badge>
            </td>
            <td className="px-6 py-4">
              <p className="max-w-xs truncate text-sm text-slate-600">
                {projeto.tecnologias}
              </p>
            </td>
            <td className="px-6 py-4">
              <StatusBadge status={projeto.status} />
            </td>
            <td className="px-6 py-4 text-slate-700">
              {projeto.views.toLocaleString("pt-BR")}
            </td>
            <td className="px-6 py-4">
              <ActionMenu
                onEdit={() =>
                  router.push(`/admin/projetos/${projeto.id}/editar`)
                }
                onDelete={() => setDeleteId(projeto.id)}
              />
            </td>
          </>
        )}
        emptyMessage="Nenhum projeto cadastrado"
        emptyDescription="Clique em 'Adicionar Projeto' para começar"
      />

      <ConfirmationDialog
        open={deleteId !== null}
        onOpenChange={(open) => {
          if (!open) setDeleteId(null);
        }}
        title="Excluir projeto"
        description="Tem certeza que deseja deletar este projeto? Esta ação não pode ser desfeita."
        confirmLabel="Deletar"
        cancelLabel="Cancelar"
        variant="destructive"
        onConfirm={handleDelete}
      />
    </div>
  );
}
