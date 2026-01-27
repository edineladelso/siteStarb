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

export default function ProjetosPage() {
  const router = useRouter();
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja deletar este projeto?")) {
      const result = await deleteProjeto(id);
      if (result.success) {
        loadProjetos();
      }
    }
  };

  const filteredProjetos = projetos.filter(projeto =>
    projeto.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    projeto.autor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    projeto.categoria.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Projetos</h1>
          <p className="text-slate-600 mt-1">
            Gerencie os projetos técnicos da plataforma
          </p>
        </div>
        <Link href="/admin/projetos/novo">
          <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Projeto
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg border border-slate-200 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por título, autor ou categoria..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <Wrench className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-slate-600">Total</p>
              <p className="text-2xl font-bold text-slate-900">{projetos.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div>
            <p className="text-sm text-slate-600 mb-1">Iniciante</p>
            <p className="text-2xl font-bold text-green-600">
              {projetos.filter(p => p.dificuldade === "Iniciante").length}
            </p>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div>
            <p className="text-sm text-slate-600 mb-1">Intermediário</p>
            <p className="text-2xl font-bold text-yellow-600">
              {projetos.filter(p => p.dificuldade === "Intermediário").length}
            </p>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div>
            <p className="text-sm text-slate-600 mb-1">Avançado</p>
            <p className="text-2xl font-bold text-red-600">
              {projetos.filter(p => p.dificuldade === "Avançado").length}
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
            <td className="py-4 px-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white">
                  <Wrench className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{projeto.titulo}</p>
                  <p className="text-sm text-slate-500">{projeto.duracao || "—"}</p>
                </div>
              </div>
            </td>
            <td className="py-4 px-6 text-slate-700">{projeto.autor}</td>
            <td className="py-4 px-6">
              <Badge variant="outline">{projeto.categoria}</Badge>
            </td>
            <td className="py-4 px-6">
              <Badge className={
                projeto.dificuldade === "Iniciante" ? "bg-green-100 text-green-800" :
                projeto.dificuldade === "Intermediário" ? "bg-yellow-100 text-yellow-800" :
                "bg-red-100 text-red-800"
              }>
                {projeto.dificuldade}
              </Badge>
            </td>
            <td className="py-4 px-6">
              <p className="text-sm text-slate-600 truncate max-w-xs">
                {projeto.tecnologias}
              </p>
            </td>
            <td className="py-4 px-6">
              <StatusBadge status={projeto.status} />
            </td>
            <td className="py-4 px-6 text-slate-700">
              {projeto.views.toLocaleString('pt-BR')}
            </td>
            <td className="py-4 px-6">
              <ActionMenu
                onEdit={() => router.push(`/admin/projetos/${projeto.id}/editar`)}
                onDelete={() => handleDelete(projeto.id)}
              />
            </td>
          </>
        )}
        emptyMessage="Nenhum projeto cadastrado"
        emptyDescription="Clique em 'Adicionar Projeto' para começar"
      />
    </div>
  );
}
