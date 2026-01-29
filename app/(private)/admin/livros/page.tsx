// ==================== app/admin/livros/page.tsx ====================
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/shared/StatusBadge";
import { Plus, Search } from "lucide-react";
import type { Livro } from "@/lib/types";
import { getLivros, deleteLivro } from "@/actions/livros";
import { ActionMenu } from "@/components/admin/shared/ActionMenu";

export default function LivrosPage() {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadLivros();
  }, []);

  const loadLivros = async () => {
    try {
      const data = await getLivros();
      setLivros(data);
    } catch (error) {
      console.error("Erro ao carregar livros:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Tem certeza que deseja deletar este livro?")) {
      const result = await deleteLivro(id);
      if (result.success) {
        loadLivros();
      }
    }
  };

  const filteredLivros = livros.filter(livro =>
    livro.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    livro.autor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Livros</h1>
          <p className="text-slate-600 mt-1">
            Gerencie os livros técnicos da plataforma
          </p>
        </div>
        <Link href="/admin/livros/novo">
          <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Livro
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg border border-slate-200 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por título ou autor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            <td className="py-4 px-4">
              <div className="flex items-center gap-3">
                <img 
                  src={livro.capaUrl} 
                  alt={livro.titulo}
                  className="w-12 h-16 object-cover rounded"
                />
                <div>
                  <p className="font-semibold text-slate-900">{livro.titulo}</p>
                  <p className="text-sm text-slate-500">{livro.isbn}</p>
                </div>
              </div>
            </td>
            <td className="py-4 px-4 text-slate-700">{livro.autor}</td>
            <td className="py-4 px-4 text-slate-700">{livro.categoria}</td>
            <td className="py-4 px-4">
              <StatusBadge status={livro.status} />
            </td>
            <td className="py-4 px-4 text-slate-700">{livro.views.toLocaleString('pt-BR')}</td>
            <td className="py-4 px-4 text-slate-700">{livro.downloads.toLocaleString('pt-BR')}</td>
            <td className="py-4 px-4">
              <ActionMenu
                onEdit={() => window.location.href = `/admin/livros/${livro.id}/editar`}
                onDelete={() => handleDelete(livro.id)}
                item={livro}
              />
            </td>
          </>
        )}
      />
    </div>
  );
}