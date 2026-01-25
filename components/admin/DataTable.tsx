"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// ==================== TIPOS ====================
type ContentType = "livro" | "software" | "projeto" | "artigo";
// ==================== components/admin/DataTable.tsx ====================

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

interface Column<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  render?: (value: any, item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  renderRow: (item: T) => React.ReactNode;
  emptyMessage?: string;
  emptyDescription?: string;
  itemsPerPage?: number;
  onRowClick?: (item: T) => void;
}

export function DataTable<T extends { id: string }>({
  data,
  columns,
  loading = false,
  renderRow,
  emptyMessage = "Nenhum item encontrado",
  emptyDescription = "Adicione novos itens para começar",
  itemsPerPage = 10,
  onRowClick,
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Paginação
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Ordenação
  const sortedData = [...data].sort((a, b) => {
    if (!sortColumn) return 0;

    const aValue = (a as any)[sortColumn];
    const bValue = (b as any)[sortColumn];

    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const paginatedData = sortedData.slice(startIndex, endIndex);

  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(columnKey);
      setSortDirection("asc");
    }
  };

  // Loading State
  if (loading) {
    return (
      <Card className="border-slate-200 bg-white shadow-lg">
        <CardContent className="p-0">
          <div className="space-y-4 p-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-slate-200"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-3/4 rounded bg-slate-200"></div>
                    <div className="h-3 w-1/2 rounded bg-slate-200"></div>
                  </div>
                  <div className="h-6 w-20 rounded bg-slate-200"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Empty State
  if (data.length === 0) {
    return (
      <Card className="border-slate-200 bg-white shadow-lg">
        <CardContent className="p-0">
          <div className="py-16 text-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center">
                <svg
                  className="h-8 w-8 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                  />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-slate-900 text-lg">{emptyMessage}</p>
                <p className="mt-1 text-sm text-slate-500">{emptyDescription}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="border-slate-200 bg-white shadow-lg">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              {/* Header */}
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  {columns.map((column) => (
                    <th
                      key={String(column.key)}
                      className="px-6 py-4 text-left text-sm font-semibold text-slate-700"
                    >
                      {column.sortable !== false ? (
                        <button
                          onClick={() => handleSort(String(column.key))}
                          className="flex items-center gap-2 hover:text-blue-600 transition-colors"
                        >
                          {column.label}
                          {sortColumn === column.key && (
                            <span className="text-blue-600">
                              {sortDirection === "asc" ? (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                </svg>
                              ) : (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                              )}
                            </span>
                          )}
                        </button>
                      ) : (
                        column.label
                      )}
                    </th>
                  ))}
                  <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">
                    Ações
                  </th>
                </tr>
              </thead>

              {/* Body */}
              <tbody>
                {paginatedData.map((item, index) => (
                  <tr
                    key={item.id}
                    onClick={() => onRowClick?.(item)}
                    className={`
                      border-b border-slate-100 transition-colors
                      ${onRowClick ? 'cursor-pointer hover:bg-slate-50' : 'hover:bg-slate-50'}
                      ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}
                    `}
                  >
                    {renderRow(item)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-600">
            Mostrando {startIndex + 1} a {Math.min(endIndex, data.length)} de {data.length} itens
          </p>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              aria-label="Primeira página"
            >
              <ChevronsLeft className="w-4 h-4" />
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Página anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(page => {
                  // Mostrar apenas páginas próximas à atual
                  return (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  );
                })
                .map((page, index, array) => {
                  // Adicionar "..." entre páginas não consecutivas
                  const showEllipsis = index > 0 && page - array[index - 1] > 1;
                  
                  return (
                    <div key={page} className="flex items-center gap-1">
                      {showEllipsis && (
                        <span className="px-2 text-slate-400">...</span>
                      )}
                      <Button
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className={currentPage === page ? "bg-blue-600 hover:bg-blue-700" : ""}
                      >
                        {page}
                      </Button>
                    </div>
                  );
                })}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Próxima página"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              aria-label="Última página"
            >
              <ChevronsRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}



interface StatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  trend?: "up" | "down" | "neutral";
  icon: React.ReactNode;
  color: string;
  description?: string;
}


type Content = {
  id: string;
  tipo: ContentType;
  titulo: string;
  autor?: string;
  categoria: string;
  views: number;
  downloads: number;
  avaliacao: number;
  status: "ativo" | "rascunho" | "arquivado";
  dataCriacao: string;
};

// ==================== DADOS MOCK ====================
const mockData: Content[] = [
  {
    id: "1",
    tipo: "livro",
    titulo: "Inteligência Artificial Aplicada",
    autor: "Star B",
    categoria: "IA",
    views: 2340,
    downloads: 1200,
    avaliacao: 4.8,
    status: "ativo",
    dataCriacao: "2024-01-15",
  },
  {
    id: "2",
    tipo: "software",
    titulo: "AutoCAD 2024",
    categoria: "Engenharia",
    views: 5600,
    downloads: 3400,
    avaliacao: 4.9,
    status: "ativo",
    dataCriacao: "2024-01-10",
  },
  {
    id: "3",
    tipo: "projeto",
    titulo: "Sistema IoT para Automação Residencial",
    autor: "João Silva",
    categoria: "IoT",
    views: 890,
    downloads: 450,
    avaliacao: 4.6,
    status: "ativo",
    dataCriacao: "2024-02-01",
  },
  {
    id: "4",
    tipo: "livro",
    titulo: "Machine Learning Avançado",
    autor: "Star B",
    categoria: "IA",
    views: 3120,
    downloads: 1890,
    avaliacao: 4.9,
    status: "ativo",
    dataCriacao: "2024-01-20",
  },
  {
    id: "5",
    tipo: "artigo",
    titulo: "Redes Neurais Convolucionais",
    autor: "Maria Santos",
    categoria: "IA",
    views: 1560,
    downloads: 890,
    avaliacao: 4.7,
    status: "rascunho",
    dataCriacao: "2024-02-10",
  },
];

const categorias = [
  "IA",
  "Programação",
  "Eletrônica",
  "Mecatrônica",
  "Engenharia",
  "Matemática",
];


// ==================== STATS CARD COMPONENT ====================
function StatsCard({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <Card className="border-slate-200 bg-white shadow-lg transition-shadow hover:shadow-xl">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="mb-1 text-sm text-slate-600">{title}</p>
            <p className="text-3xl font-bold text-slate-900">{value}</p>
          </div>
          <div
            className={`h-14 w-14 rounded-xl bg-linear-to-br ${color} flex items-center justify-center text-white`}
          >
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// ==================== CONTENT MANAGER COMPONENT ====================
function ContentManager({
  tipo,
  data,
  setData,
}: {
  tipo: ContentType;
  data: Content[];
  setData: (data: Content[]) => void;
}) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const filteredData = data.filter((d) => d.tipo === tipo);

  const tipoLabels = {
    livro: "Livro",
    software: "Software",
    projeto: "Projeto",
    artigo: "Artigo",
  };

  return (
    <div className="space-y-6">
      {/* HEADER COM BOTÃO DE ADICIONAR */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Gerenciar {tipoLabels[tipo]}s
          </h2>
          <p className="mt-1 text-slate-600">
            {filteredData.length} {tipoLabels[tipo].toLowerCase()}(s)
            cadastrado(s)
          </p>
        </div>

        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Adicionar {tipoLabels[tipo]}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Adicionar Novo {tipoLabels[tipo]}</DialogTitle>
              <DialogDescription>
                Preencha os campos abaixo para adicionar um novo{" "}
                {tipoLabels[tipo].toLowerCase()}. PDFs: máx 400MB. Imagens
                (PNG/WEBP/AVIF): máx 3MB
              </DialogDescription>
            </DialogHeader>

            {tipo === "livro" && (
              <AddLivroForm onClose={() => setIsAddDialogOpen(false)} />
            )}
            {tipo === "software" && (
              <AddSoftwareForm onClose={() => setIsAddDialogOpen(false)} />
            )}
            {tipo === "projeto" && (
              <AddProjetoForm onClose={() => setIsAddDialogOpen(false)} />
            )}
            {tipo === "artigo" && (
              <AddArtigoForm onClose={() => setIsAddDialogOpen(false)} />
            )}
          </DialogContent>
        </Dialog>
      </div>

      {/* TABELA PERSONALIZADA */}
      <Card className="border-slate-200 bg-white shadow-lg">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <div className="min-w-full">
              {/* Cabeçalho */}
              <div className="border-b border-slate-200 bg-slate-50">
                <div className="grid grid-cols-12 gap-4 px-6 py-4 text-sm font-semibold text-slate-700">
                  <div className="col-span-3">Título</div>
                  {tipo !== "software" && (
                    <div className="col-span-2">Autor</div>
                  )}
                  <div className="col-span-1">Categoria</div>
                  <div className="col-span-1 text-center">Views</div>
                  <div className="col-span-1 text-center">Downloads</div>
                  <div className="col-span-1 text-center">Avaliação</div>
                  <div className="col-span-2">Status</div>
                  <div className="col-span-1 text-right">Ações</div>
                </div>
              </div>

              {/* Corpo */}
              <div>
                {filteredData.length === 0 ? (
                  <div className="py-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <svg
                        className="h-16 w-16 text-slate-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                        />
                      </svg>
                      <div>
                        <p className="font-medium text-slate-600">
                          Nenhum {tipoLabels[tipo].toLowerCase()} cadastrado
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                          Clique em "Adicionar {tipoLabels[tipo]}" para começar
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  filteredData.map((item) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-12 items-center gap-4 border-b border-slate-100 px-6 py-4 transition-colors hover:bg-slate-50"
                    >
                      <div className="col-span-3 truncate font-medium text-slate-900">
                        {item.titulo}
                      </div>
                      {tipo !== "software" && (
                        <div className="col-span-2 truncate text-slate-600">
                          {item.autor}
                        </div>
                      )}
                      <div className="col-span-1">
                        <Badge variant="outline" className="text-xs">
                          {item.categoria}
                        </Badge>
                      </div>
                      <div className="col-span-1 text-center text-slate-600">
                        {item.views.toLocaleString()}
                      </div>
                      <div className="col-span-1 text-center text-slate-600">
                        {item.downloads.toLocaleString()}
                      </div>
                      <div className="col-span-1 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <span className="font-semibold text-slate-900">
                            {item.avaliacao}
                          </span>
                          <svg
                            className="h-4 w-4 text-yellow-500"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>
                      </div>
                      <div className="col-span-2">
                        <Badge
                          className={
                            item.status === "ativo"
                              ? "bg-green-100 text-green-800"
                              : item.status === "rascunho"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-slate-100 text-slate-800"
                          }
                        >
                          {item.status}
                        </Badge>
                      </div>
                      <div className="col-span-1 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <svg
                                className="h-5 w-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                                />
                              </svg>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="gap-2">
                              <svg
                                className="h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                              Visualizar
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2">
                              <svg
                                className="h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                              </svg>
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 text-red-600">
                              <svg
                                className="h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                              Deletar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ==================== FORMULÁRIOS ====================
function AddLivroForm({ onClose }: { onClose: () => void }) {
  const [uploading, setUploading] = useState(false);

  const handleSubmit = () => {
    setUploading(true);
    // Simula upload - aqui você implementaria integração com Cloudinary
    setTimeout(() => {
      setUploading(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="space-y-6 py-4">
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700">
          Título do Livro *
        </label>
        <input
          type="text"
          required
          placeholder="Ex: Inteligência Artificial Aplicada"
          className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 transition-colors outline-none focus:border-blue-500"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700">Autor *</label>
        <input
          type="text"
          required
          placeholder="Nome do autor"
          className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 transition-colors outline-none focus:border-blue-500"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700">
          Categoria *
        </label>
        <select
          required
          className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 transition-colors outline-none focus:border-blue-500"
        >
          <option value="">Selecione uma categoria</option>
          {categorias.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700">
          Descrição *
        </label>
        <textarea
          required
          rows={4}
          placeholder="Descreva o conteúdo do livro..."
          className="w-full resize-none rounded-xl border-2 border-slate-200 px-4 py-3 transition-colors outline-none focus:border-blue-500"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700">
          Capa do Livro (PNG/WEBP/AVIF - máx 3MB) *
        </label>
        <div className="cursor-pointer rounded-xl border-2 border-dashed border-slate-300 p-8 text-center transition-colors hover:border-blue-500">
          <svg
            className="mx-auto mb-3 h-12 w-12 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <p className="text-sm font-medium text-slate-600">
            Clique para fazer upload
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Upload será enviado para Cloudinary
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700">
          Arquivo PDF (máx 400MB) *
        </label>
        <div className="cursor-pointer rounded-xl border-2 border-dashed border-slate-300 p-8 text-center transition-colors hover:border-blue-500">
          <svg
            className="mx-auto mb-3 h-12 w-12 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
          <p className="text-sm font-medium text-slate-600">Upload do PDF</p>
          <p className="mt-1 text-xs text-slate-500">
            Será enviado para Cloudinary
          </p>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="flex-1"
        >
          Cancelar
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={uploading}
          className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
        >
          {uploading ? "Enviando..." : "Adicionar Livro"}
        </Button>
      </div>
    </div>
  );
}

function AddSoftwareForm({ onClose }: { onClose: () => void }) {
  return (
    <div className="space-y-6 py-4">
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700">
          Nome do Software *
        </label>
        <input
          type="text"
          placeholder="Ex: AutoCAD 2024"
          className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700">
          Site Oficial *
        </label>
        <input
          type="url"
          placeholder="https://exemplo.com"
          className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700">
          Categoria *
        </label>
        <select className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 outline-none focus:border-blue-500">
          <option value="">Selecione</option>
          {categorias.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700">
          Descrição *
        </label>
        <textarea
          rows={6}
          placeholder="Descreva funcionalidades..."
          className="w-full resize-none rounded-xl border-2 border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
        />
      </div>
      <div className="flex gap-3 pt-4">
        <Button variant="outline" onClick={onClose} className="flex-1">
          Cancelar
        </Button>
        <Button
          onClick={onClose}
          className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600"
        >
          Adicionar
        </Button>
      </div>
    </div>
  );
}

function AddProjetoForm({ onClose }: { onClose: () => void }) {
  return (
    <div className="space-y-6 py-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">
            Nome do Projeto *
          </label>
          <input
            type="text"
            placeholder="Ex: Sistema IoT..."
            className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">
            Autor *
          </label>
          <input
            type="text"
            placeholder="Nome"
            className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700">
          Descrição *
        </label>
        <textarea
          rows={4}
          placeholder="Visão geral..."
          className="w-full resize-none rounded-xl border-2 border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700">
          Tecnologias *
        </label>
        <input
          type="text"
          placeholder="Arduino, Python, etc"
          className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
        />
      </div>
      <div className="flex gap-3 pt-4">
        <Button variant="outline" onClick={onClose} className="flex-1">
          Cancelar
        </Button>
        <Button
          onClick={onClose}
          className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600"
        >
          Adicionar
        </Button>
      </div>
    </div>
  );
}

function AddArtigoForm({ onClose }: { onClose: () => void }) {
  return (
    <div className="space-y-6 py-4">
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700">Título *</label>
        <input
          type="text"
          placeholder="Título do artigo"
          className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">
            Autor(es) *
          </label>
          <input
            type="text"
            placeholder="Nomes"
            className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">
            Categoria *
          </label>
          <select className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 outline-none focus:border-blue-500">
            <option value="">Selecione</option>
            {categorias.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700">Resumo *</label>
        <textarea
          rows={4}
          placeholder="Resumo..."
          className="w-full resize-none rounded-xl border-2 border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
        />
      </div>
      <div className="flex gap-3 pt-4">
        <Button variant="outline" onClick={onClose} className="flex-1">
          Cancelar
        </Button>
        <Button
          onClick={onClose}
          className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600"
        >
          Adicionar
        </Button>
      </div>
    </div>
  );
}

// ==================== ANALYTICS DASHBOARD ====================
function AnalyticsDashboard({ data }: { data: Content[] }) {
  const ultimos7Dias = [
    { dia: "Seg", views: 1200, downloads: 450 },
    { dia: "Ter", views: 1400, downloads: 520 },
    { dia: "Qua", views: 1100, downloads: 380 },
    { dia: "Qui", views: 1600, downloads: 610 },
    { dia: "Sex", views: 1800, downloads: 720 },
    { dia: "Sáb", views: 900, downloads: 340 },
    { dia: "Dom", views: 800, downloads: 290 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">
          Analytics & Métricas
        </h2>
        <p className="mt-1 text-slate-600">
          Análise detalhada de desempenho e engajamento
        </p>
      </div>

      <Card className="border-slate-200 bg-white shadow-lg">
        <CardHeader>
          <CardTitle>Visualizações e Downloads - Últimos 7 Dias</CardTitle>
          <CardDescription>
            Comparação de métricas de engajamento
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {ultimos7Dias.map((dia) => (
              <div key={dia.dia} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="w-12 font-medium text-slate-700">
                    {dia.dia}
                  </span>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="text-blue-600">👁️ {dia.views}</span>
                    <span className="text-indigo-600">⬇️ {dia.downloads}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
                      style={{ width: `${(dia.views / 2000) * 100}%` }}
                    />
                  </div>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600"
                      style={{ width: `${(dia.downloads / 800) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="border-slate-200 bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">Taxa de Conversão</CardTitle>
            <CardDescription>Views → Downloads</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-blue-700">38.5%</div>
            <p className="mt-2 text-sm text-green-600">
              ↑ 5.2% vs mês anterior
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">Tempo Médio</CardTitle>
            <CardDescription>Na plataforma</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-indigo-700">12m 34s</div>
            <p className="mt-2 text-sm text-green-600">
              ↑ 2.1% vs mês anterior
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">Taxa de Retorno</CardTitle>
            <CardDescription>Usuários recorrentes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-purple-700">67%</div>
            <p className="mt-2 text-sm text-green-600">
              ↑ 8.3% vs mês anterior
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
