"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

// Tipagem profissional
export type Livro = {
  id: string;
  titulo: string;
  autor: string;
  descricao: string;
  capa: string;
  categoria:
    | "IA"
    | "Programação"
    | "Eletrônica"
    | "Mecatrônica"
    | "Engenharia"
    | "Mecânica"
    | "Matemática";
  popular: boolean;
  novo: boolean;
  avaliacao: number;
  downloads: number;
};

// Mock profissional expandido
const livros: Livro[] = [
  {
    id: "1",
    titulo: "Inteligência Artificial Aplicada",
    autor: "Star B",
    descricao:
      "Livro técnico aprofundado sobre fundamentos, modelos modernos de IA e aplicações reais em engenharia e sistemas inteligentes.",
    capa: "",
    categoria: "IA",
    popular: true,
    novo: true,
    avaliacao: 4.8,
    downloads: 2340,
  },
  {
    id: "2",
    titulo: "Engenharia de Software Moderna",
    autor: "Star B",
    descricao:
      "Arquitetura profissional de sistemas, padrões de projeto, escalabilidade e boas práticas reais de mercado.",
    capa: "",
    categoria: "Programação",
    popular: true,
    novo: false,
    avaliacao: 4.9,
    downloads: 3120,
  },
  {
    id: "3",
    titulo: "Mecatrônica Essencial",
    autor: "Star B",
    descricao:
      "Integração entre mecânica, eletrônica e programação aplicada a sistemas físicos inteligentes.",
    capa: "",
    categoria: "Mecatrônica",
    popular: true,
    novo: true,
    avaliacao: 4.7,
    downloads: 1890,
  },
  {
    id: "4",
    titulo: "Machine Learning Avançado",
    autor: "Star B",
    descricao:
      "Algoritmos de aprendizado profundo, redes neurais e aplicações práticas em projetos reais.",
    capa: "",
    categoria: "IA",
    popular: true,
    novo: false,
    avaliacao: 4.9,
    downloads: 2870,
  },
  {
    id: "5",
    titulo: "Eletrônica Digital",
    autor: "Star B",
    descricao:
      "Circuitos digitais, microcontroladores e design de sistemas embarcados profissionais.",
    capa: "",
    categoria: "Eletrônica",
    popular: false,
    novo: true,
    avaliacao: 4.6,
    downloads: 1560,
  },
  {
    id: "6",
    titulo: "Cálculo para Engenharia",
    autor: "Star B",
    descricao:
      "Matemática aplicada com foco em problemas reais de engenharia e computação.",
    capa: "",
    categoria: "Matemática",
    popular: false,
    novo: true,
    avaliacao: 4.8,
    downloads: 2100,
  },
  {
    id: "7",
    titulo: "Python para Ciência de Dados",
    autor: "Star B",
    descricao:
      "Análise de dados, visualização e machine learning usando Python moderno.",
    capa: "",
    categoria: "Programação",
    popular: false,
    novo: false,
    avaliacao: 4.7,
    downloads: 2450,
  },
  {
    id: "8",
    titulo: "Sistemas Embarcados",
    autor: "Star B",
    descricao:
      "Design e implementação de sistemas embarcados para IoT e automação industrial.",
    capa: "",
    categoria: "Eletrônica",
    popular: false,
    novo: false,
    avaliacao: 4.5,
    downloads: 1320,
  },
];

const categorias = [
  { nome: "IA", icon: "🤖" },
  { nome: "Programação", icon: "💻" },
  { nome: "Eletrônica", icon: "⚡" },
  { nome: "Mecatrônica", icon: "⚙️" },
  { nome: "Engenharia", icon: "🏗️" },
  { nome: "Matemática", icon: "📐" },
];

export default function LivrosPage() {
  const [categoriaAtiva, setCategoriaAtiva] = useState<string | null>(null);
  const [ordenacao, setOrdenacao] = useState<"popular" | "novo" | "avaliacao">(
    "popular",
  );
  const [busca, setBusca] = useState("");

  // Filtrar e ordenar livros
  const livrosFiltrados = livros
    .filter((l) => !categoriaAtiva || l.categoria === categoriaAtiva)
    .filter(
      (l) =>
        l.titulo.toLowerCase().includes(busca.toLowerCase()) ||
        l.autor.toLowerCase().includes(busca.toLowerCase()),
    )
    .sort((a, b) => {
      if (ordenacao === "popular") return b.downloads - a.downloads;
      if (ordenacao === "novo") return (b.novo ? 1 : 0) - (a.novo ? 1 : 0);
      if (ordenacao === "avaliacao") return b.avaliacao - a.avaliacao;
      return 0;
    });

  const populares = livros.filter((l) => l.popular);
  const novos = livros.filter((l) => l.novo);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50/30 to-indigo-50/30">
      {/* HERO PROFISSIONAL COM FUNDO SUTIL */}
      <section className="relative overflow-hidden border-b border-blue-100 bg-linear-to-br from-blue-600/10 via-indigo-600/5 to-purple-600/10 py-12 sm:py-16 lg:py-24">
        {/* Background pattern sutil */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230A4D8C' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        <div className="relative z-10 container mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl space-y-6 text-center sm:space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 shadow-lg">
              <svg
                className="h-5 w-5 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
              </svg>
              <span className="text-sm font-semibold text-slate-700">
                500+ Livros Técnicos
              </span>
            </div>

            {/* Título */}
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-4xl leading-tight font-black text-slate-900 sm:text-5xl lg:text-6xl xl:text-7xl">
                Biblioteca Técnica
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-slate-600 sm:text-xl lg:text-2xl">
                Conhecimento profissional em engenharia, tecnologia e IA
              </p>
            </div>

            {/* Busca */}
            <div className="mx-auto max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar por título, autor ou tema..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  className="w-full rounded-2xl border-2 border-blue-100 bg-white px-5 py-4 pl-14 text-slate-800 shadow-lg transition-all outline-none placeholder:text-slate-400 hover:shadow-xl focus:border-blue-400"
                />
                <svg
                  className="absolute top-1/2 left-5 h-6 w-6 -translate-y-1/2 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-4 pt-4 sm:gap-6">
              <div className="flex items-center gap-2 rounded-xl border border-slate-100 bg-white px-4 py-2 shadow-md">
                <svg
                  className="h-5 w-5 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
                <span className="text-sm font-semibold text-slate-700">
                  500+ Livros
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-slate-100 bg-white px-4 py-2 shadow-md">
                <svg
                  className="h-5 w-5 text-indigo-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
                <span className="text-sm font-semibold text-slate-700">
                  5.000+ Leitores
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-slate-100 bg-white px-4 py-2 shadow-md">
                <svg
                  className="h-5 w-5 text-purple-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm font-semibold text-slate-700">
                  Atualizado Semanalmente
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto max-w-7xl space-y-10 px-4 py-8 sm:space-y-12 sm:px-6 sm:py-12 lg:space-y-16 lg:px-8 lg:py-16">
        {/* CATEGORIAS COM CARDS BRANCOS E SHADOW */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Explorar por Área
            </h2>
            <button
              onClick={() => setCategoriaAtiva(null)}
              className={`text-sm font-medium transition-colors ${categoriaAtiva === null ? "text-blue-700" : "text-slate-500 hover:text-blue-700"}`}
            >
              Ver Todas
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
            {categorias.map((cat) => (
              <button
                key={cat.nome}
                onClick={() =>
                  setCategoriaAtiva(
                    cat.nome === categoriaAtiva ? null : cat.nome,
                  )
                }
                className={`group relative rounded-2xl border-2 bg-white p-5 transition-all duration-300 sm:p-6 ${
                  categoriaAtiva === cat.nome
                    ? "scale-105 border-blue-500 shadow-xl shadow-blue-500/20"
                    : "border-slate-100 shadow-lg hover:scale-105 hover:border-blue-300 hover:shadow-xl"
                }`}
              >
                <div className="space-y-2 text-center">
                  <div className="text-4xl sm:text-5xl">{cat.icon}</div>
                  <div className="text-xs font-semibold text-slate-700 sm:text-sm">
                    {cat.nome}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* FILTROS */}
        <section className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-lg sm:p-5">
          <div className="flex items-center gap-2">
            <svg
              className="h-5 w-5 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            <span className="text-sm font-semibold text-slate-700">
              Ordenar:
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setOrdenacao("popular")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                ordenacao === "popular"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
              </svg>
              Popular
            </button>

            <button
              onClick={() => setOrdenacao("novo")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                ordenacao === "novo"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                  clipRule="evenodd"
                />
              </svg>
              Novos
            </button>

            <button
              onClick={() => setOrdenacao("avaliacao")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                ordenacao === "avaliacao"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Avaliação
            </button>
          </div>

          <div className="text-sm font-medium text-slate-600">
            {livrosFiltrados.length}{" "}
            {livrosFiltrados.length === 1 ? "livro" : "livros"}
          </div>
        </section>

        {/* CAROUSELS - Populares e Novos */}
        {!categoriaAtiva && !busca && (
          <>
            {/* POPULARES CAROUSEL */}
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                  Mais Populares
                </h2>
              </div>

              <div className="relative">
                <Carousel
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                  className="w-full"
                >
                  <CarouselContent className="-ml-4">
                    {populares.map((livro) => (
                      <CarouselItem
                        key={livro.id}
                        className="basis-full pl-4 sm:basis-1/2 lg:basis-1/3"
                      >
                        <LivroCard livro={livro} />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="absolute -bottom-16 left-1/2 hidden -translate-x-1/2 items-center gap-2 lg:flex">
                    <CarouselPrevious className="relative inset-0 translate-y-0 border-2 border-slate-200 bg-white shadow-lg hover:bg-slate-50" />
                    <CarouselNext className="relative inset-0 translate-y-0 border-2 border-slate-200 bg-white shadow-lg hover:bg-slate-50" />
                  </div>
                </Carousel>
              </div>
            </section>

            {/* NOVOS CAROUSEL */}
            <section className="space-y-6 pt-8 lg:pt-12">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                  Novidades
                </h2>
              </div>

              <div className="relative">
                <Carousel
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                  className="w-full"
                >
                  <CarouselContent className="-ml-4">
                    {novos.map((livro) => (
                      <CarouselItem
                        key={livro.id}
                        className="basis-full pl-4 sm:basis-1/2 lg:basis-1/3"
                      >
                        <LivroCard livro={livro} />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="absolute -bottom-16 left-1/2 hidden -translate-x-1/2 items-center gap-2 lg:flex">
                    <CarouselPrevious className="relative inset-0 translate-y-0 border-2 border-slate-200 bg-white shadow-lg hover:bg-slate-50" />
                    <CarouselNext className="relative inset-0 translate-y-0 border-2 border-slate-200 bg-white shadow-lg hover:bg-slate-50" />
                  </div>
                </Carousel>
              </div>
            </section>
          </>
        )}

        {/* TODOS OS LIVROS - GRID RESPONSIVO */}
        <section className="space-y-6 pt-8 lg:pt-12">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              {categoriaAtiva || busca ? "Resultados" : "Toda a Biblioteca"}
            </h2>
          </div>

          {livrosFiltrados.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 lg:gap-6 xl:grid-cols-5">
              {livrosFiltrados.map((livro) => (
                <LivroCard key={livro.id} livro={livro} compact />
              ))}
            </div>
          ) : (
            <div className="px-4 py-16 text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
                <svg
                  className="h-10 w-10 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-slate-700">
                Nenhum livro encontrado
              </h3>
              <p className="mb-6 text-slate-500">
                Tente ajustar os filtros ou buscar por outro termo
              </p>
              <Button
                onClick={() => {
                  setCategoriaAtiva(null);
                  setBusca("");
                }}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Limpar Filtros
              </Button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function LivroCard({
  livro,
  compact = false,
}: {
  livro: Livro;
  compact?: boolean;
}) {
  const [favorito, setFavorito] = useState(false);

  return (
    <Card className="group relative overflow-hidden border-2 border-slate-100 bg-white transition-all duration-300 hover:-translate-y-2 hover:border-blue-300 hover:shadow-2xl hover:shadow-blue-500/10">
      {/* Badges */}
      <div className="absolute top-2 left-2 z-20 flex flex-wrap gap-1">
        {livro.novo && (
          <Badge className="border-0 bg-green-600 text-xs shadow-lg">
            <svg
              className="mr-1 h-3 w-3"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                clipRule="evenodd"
              />
            </svg>
            Novo
          </Badge>
        )}
        {livro.popular && (
          <Badge
            variant="secondary"
            className="border-0 bg-orange-600 text-xs text-white shadow-lg"
          >
            <svg
              className="mr-1 h-3 w-3"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
            </svg>
            Popular
          </Badge>
        )}
      </div>

      {/* Favorito */}
      <button
        onClick={() => setFavorito(!favorito)}
        className="absolute top-2 right-2 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-lg transition-all hover:scale-110"
      >
        <svg
          className={`h-4 w-4 transition-colors ${favorito ? "fill-current text-red-500" : "text-slate-400"}`}
          fill={favorito ? "currentColor" : "none"}
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>

      <CardHeader className="p-0">
        <div
          className={`relative ${compact ? "h-40 sm:h-48" : "h-48 sm:h-56"} overflow-hidden`}
        >
          <div
            className={`absolute inset-0 bg-linear-to-br ${
              livro.categoria === "IA"
                ? "from-blue-400 via-indigo-500 to-purple-600"
                : livro.categoria === "Programação"
                  ? "from-indigo-400 via-purple-500 to-pink-600"
                  : livro.categoria === "Eletrônica"
                    ? "from-yellow-400 via-orange-500 to-red-600"
                    : livro.categoria === "Mecatrônica"
                      ? "from-green-400 via-teal-500 to-cyan-600"
                      : livro.categoria === "Matemática"
                        ? "from-purple-400 via-pink-500 to-rose-600"
                        : "from-slate-400 via-gray-500 to-zinc-600"
            } flex items-center justify-center transition-transform duration-500 group-hover:scale-110`}
          >
            <div className="px-4 text-center text-white">
              <svg
                className={`${compact ? "h-12 w-12" : "h-16 w-16"} mx-auto mb-2 opacity-90`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
              </svg>
              <div className="text-xs font-semibold opacity-75">
                {livro.categoria}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      {/* estava aqui */}
      <CardContent className="px-3">
        <CardTitle
          className={`${compact ? "text-sm" : "text-base"} line-clamp-2 transition-colors group-hover:text-blue-700`}
        >
          {livro.titulo}
        </CardTitle>

        <p className="flex items-center gap-1 text-xs text-slate-600">
          <svg
            className="h-3 w-3 shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            />
          </svg>
          <span className="truncate">{livro.autor}</span>
        </p>

        {/* Avaliação e Downloads */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-1">
          <div className="flex items-center gap-1">
            <svg
              className="h-3.5 w-3.5 text-yellow-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-xs font-semibold text-slate-700">
              {livro.avaliacao}
            </span>
          </div>

          <div className="flex items-center gap-1 text-slate-500">
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            <span className="text-xs font-medium">
              {livro.downloads.toLocaleString()}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2 px-3 pt-0 pb-3">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 text-xs hover:border-blue-500 hover:bg-blue-50"
            >
              <svg
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="max-w-lg">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-xl font-bold text-slate-900">
                {livro.titulo}
              </AlertDialogTitle>
              <AlertDialogDescription className="pt-2 text-sm leading-relaxed">
                {livro.descricao}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="space-y-2 pt-4">
              <div className="flex items-center gap-2 text-sm">
                <svg
                  className="h-4 w-4 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-slate-700">
                  <strong>Autor:</strong> {livro.autor}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <svg
                  className="h-4 w-4 text-indigo-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-slate-700">
                  <strong>Categoria:</strong> {livro.categoria}
                </span>
              </div>
            </div>
            <AlertDialogFooter className="mt-6">
              <AlertDialogAction className="bg-blue-600 hover:bg-blue-700">
                Fechar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Button
          size="sm"
          className="flex-1 bg-blue-600 text-xs hover:bg-blue-700"
        >
          <svg
            className="h-3.5 w-3.5"
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
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="sm"
              variant="secondary"
              className="px-2.5 hover:bg-slate-200"
            >
              <svg
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32">
            <DropdownMenuItem className="gap-2 text-xs">
              <svg
                className="h-3.5 w-3.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                  clipRule="evenodd"
                />
              </svg>
              PDF
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 text-xs">
              <svg
                className="h-3.5 w-3.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
              </svg>
              EPUB
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 text-xs">
              <svg
                className="h-3.5 w-3.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
                <path d="M3 8a2 2 0 012-2v10h8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
              </svg>
              Resumo
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
}
