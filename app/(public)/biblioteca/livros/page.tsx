"use client";

import { Suspense, useCallback, useMemo, useState, useEffect } from "react";
import {
  Search,
  Filter,
  TrendingUp,
  Sparkles,
  Library,
  Users,
  Clock,
  Star,
  BookOpen,
} from "lucide-react";
import { useSearchParams } from "next/navigation";

import LivroCard from "@/app/(public)/biblioteca/livros/ui/LivroCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

import { fakeSelectLivros as livros } from "./dadosLivros";
import {
  CATEGORIAS_LIVROS,
  getCategoriaNome,
  type CategoriaLivroInfo,
} from "../../../../lib/domain/areasCategoriasPatern";
import {
  AreaLivroParaMacroArea,
  areaLivroValues,
  macroAreaLivroValues,
  type AreaLivro,
  type MacroAreaLivro,
} from "@/lib/domain/areas";

// Types
type OrdenacaoTipo = "popular" | "novo" | "avaliacao";

// Componente de Estatística Reutilizável
interface StatItemProps {
  icon: React.ReactNode;
  label: string;
  color?: string;
}

function StatItem({ icon, label, color = "blue" }: StatItemProps) {
  return (
    <div
      className="flex items-center gap-2 rounded-xl border border-slate-100 bg-white px-4 py-2 shadow-md transition-all hover:shadow-lg"
      role="listitem"
    >
      <div className={`text-${color}-600`} aria-hidden="true">
        {icon}
      </div>
      <span className="text-sm font-semibold text-slate-700">{label}</span>
    </div>
  );
}

// Componente de Botão de Ordenação Reutilizável
interface OrdenacaoButtonProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function OrdenacaoButton({
  icon,
  label,
  isActive,
  onClick,
}: OrdenacaoButtonProps) {
  return (
    <Button
      variant={isActive ? "default" : "secondary"}
      size="sm"
      onClick={onClick}
      className={`gap-2 transition-all ${
        isActive
          ? "bg-blue-600 shadow-lg shadow-blue-500/30 hover:bg-blue-700"
          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
      }`}
      aria-pressed={isActive}
    >
      <span aria-hidden="true">{icon}</span>
      {label}
    </Button>
  );
}

// Componente Principal
function LivrosPageInner() {
  const searchParams = useSearchParams();
  const [popularesApi, setPopularesApi] = useState<CarouselApi | null>(null);
  const [novosApi, setNovosApi] = useState<CarouselApi | null>(null);
  // Valores iniciais derivados da URL (sem efeito para evitar cascatas)
  const macroAreaFromParams = useMemo<MacroAreaLivro | null>(() => {
    const macroAreaParam = searchParams.get("macroArea");
    if (
      macroAreaParam &&
      macroAreaLivroValues.includes(macroAreaParam as MacroAreaLivro)
    ) {
      return macroAreaParam as MacroAreaLivro;
    }
    return null;
  }, [searchParams]);

  const areaFromParams = useMemo<AreaLivro | null>(() => {
    const areaParam = searchParams.get("area");
    if (areaParam && areaLivroValues.includes(areaParam as AreaLivro)) {
      return areaParam as AreaLivro;
    }
    return null;
  }, [searchParams]);

  // Estados com tipos corretos
  const [categoriaAtiva, setCategoriaAtiva] = useState<MacroAreaLivro | null>(
    () =>
      macroAreaFromParams ??
      (areaFromParams ? AreaLivroParaMacroArea[areaFromParams] : null),
  );
  const [areaAtiva, setAreaAtiva] = useState<AreaLivro | null>(
    () => areaFromParams,
  );
  const [ordenacao, setOrdenacao] = useState<OrdenacaoTipo>("popular");
  const [busca, setBusca] = useState("");

  // Handlers nomeados para melhor debugging
  const handleCategoriaClick = useCallback((categoria: MacroAreaLivro) => {
    setCategoriaAtiva((prev) => (prev === categoria ? null : categoria));
    setAreaAtiva(null);
  }, []);

  const handleLimparFiltros = useCallback(() => {
    setCategoriaAtiva(null);
    setAreaAtiva(null);
    setBusca("");
    setOrdenacao("popular");
  }, []);

  const handleBuscaChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setBusca(e.target.value);
    },
    [],
  );

  // Memoização de listas filtradas para performance
  // ✅ FILTRO CORRIGIDO - Usando .includes() para arrays
  const livrosFiltrados = useMemo(() => {
    return livros
      .filter((livro) => {
        // Filtro por categoria
        if (!categoriaAtiva) return true;

        // ✅ CORREÇÃO: macroAreas é array, use .includes()
        return livro.macroAreas?.includes(categoriaAtiva);
      })
      .filter((livro) => {
        if (!areaAtiva) return true;
        return livro.areas?.includes(areaAtiva);
      })
      .filter((livro) => {
        // Filtro por busca
        if (!busca) return true;
        const termo = busca.toLowerCase();
        return (
          livro.titulo.toLowerCase().includes(termo) ||
          livro.autor.toLowerCase().includes(termo) ||
          livro.descricao?.toLowerCase().includes(termo)
        );
      })
      .sort((a, b) => {
        // Ordenação
        switch (ordenacao) {
          case "popular":
            return b.downloads - a.downloads;
          case "novo":
            return (b.novo ? 1 : 0) - (a.novo ? 1 : 0);
          case "avaliacao":
            return (
              parseFloat(b.avaliacao ?? "0") - parseFloat(a.avaliacao ?? "0")
            );
          default:
            return 0;
        }
      });
  }, [categoriaAtiva, areaAtiva, busca, ordenacao]);

  const populares = useMemo(() => livros.filter((l) => l.popular), []);
  const novos = useMemo(() => livros.filter((l) => l.novo), []);

  // Autoplay contínuo usando requestAnimationFrame (sem timers bloqueantes)
  useEffect(() => {
    const AUTOPLAY_MS = 3500;
    let rafId: number;
    let lastTime = performance.now();

    const step = (time: number, api: CarouselApi | null) => {
      if (!api) return;
      if (time - lastTime >= AUTOPLAY_MS) {
        api.scrollNext();
        lastTime = time;
      }
      rafId = requestAnimationFrame((t) => step(t, api));
    };

    rafId = requestAnimationFrame((t) => step(t, popularesApi));
    return () => cancelAnimationFrame(rafId);
  }, [popularesApi]);

  useEffect(() => {
    const AUTOPLAY_MS = 3500;
    let rafId: number;
    let lastTime = performance.now();

    const step = (time: number, api: CarouselApi | null) => {
      if (!api) return;
      if (time - lastTime >= AUTOPLAY_MS) {
        api.scrollNext();
        lastTime = time;
      }
      rafId = requestAnimationFrame((t) => step(t, api));
    };

    rafId = requestAnimationFrame((t) => step(t, novosApi));
    return () => cancelAnimationFrame(rafId);
  }, [novosApi]);

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-linear-to-br from-slate-50 via-blue-50/30 to-indigo-50/30">
      {/* HERO SECTION */}
      <section
        className="relative overflow-hidden border-b border-blue-100 bg-linear-to-br from-blue-600/10 via-indigo-600/5 to-purple-600/10 py-12 sm:py-16 lg:py-24"
        aria-labelledby="hero-title"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5" aria-hidden="true">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230A4D8C' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="relative z-10 container mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-170 space-y-6 text-center sm:space-y-8">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 shadow-lg"
              role="status"
              aria-label="Total de livros disponíveis"
            >
              <BookOpen className="h-5 w-5 text-blue-600" aria-hidden="true" />
              <span className="text-sm font-semibold text-slate-700">
                500+ Livros Técnicos
              </span>
            </div>

            {/* Título */}
            <div className="space-y-3 sm:space-y-4">
              <h1
                id="hero-title"
                className="text-4xl leading-tight font-black text-slate-900 sm:text-5xl lg:text-6xl xl:text-7xl"
              >
                Biblioteca Técnica
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-slate-600 sm:text-xl lg:text-2xl">
                Conhecimento profissional em engenharia, tecnologia e IA
              </p>
            </div>

            {/* Campo de Busca Acessível */}
            <div className="mx-auto max-w-2xl">
              <div className="relative">
                <label htmlFor="busca-livros" className="sr-only">
                  Buscar livros por título, autor ou tema
                </label>
                <Input
                  id="busca-livros"
                  type="search"
                  placeholder="Buscar por título, autor ou tema..."
                  value={busca}
                  onChange={handleBuscaChange}
                  className="h-14 rounded-2xl border-2 border-blue-100 bg-white pr-4 pl-14 text-base shadow-lg transition-all placeholder:text-slate-400 hover:shadow-xl focus:border-blue-400 focus:shadow-xl focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
                  aria-describedby="busca-help"
                />
                <Search
                  className="pointer-events-none absolute top-1/2 left-5 h-6 w-6 -translate-y-1/2 text-blue-600"
                  aria-hidden="true"
                />
                <span id="busca-help" className="sr-only">
                  Digite para filtrar livros em tempo real
                </span>
              </div>
            </div>

            {/* Estatísticas */}
            <div
              className="flex flex-wrap justify-center gap-4 pt-4 sm:gap-6"
              role="list"
              aria-label="Estatísticas da biblioteca"
            >
              <StatItem
                icon={<Library className="h-5 w-5" />}
                label="500+ Livros"
                color="blue"
              />
              <StatItem
                icon={<Users className="h-5 w-5" />}
                label="5.000+ Leitores"
                color="indigo"
              />
              <StatItem
                icon={<Clock className="h-5 w-5" />}
                label="Atualizado Semanalmente"
                color="purple"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CONTEÚDO PRINCIPAL */}
      <div className="container mx-auto max-w-6xl space-y-10 px-4 py-8 sm:space-y-12 sm:px-6 sm:py-12 lg:w-5xl lg:space-y-16 lg:px-10 lg:py-16">
        {/* CATEGORIAS */}
        <section className="space-y-6" aria-labelledby="categorias-heading">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2
              id="categorias-heading"
              className="text-2xl font-bold text-slate-900 sm:text-3xl"
            >
              Explorar por Área
            </h2>
            <Button
              variant="ghost"
              onClick={() => setCategoriaAtiva(null)}
              className={`text-sm font-medium transition-colors hover:text-blue-700 ${
                categoriaAtiva === null ? "text-blue-700" : "text-slate-500"
              }`}
              aria-pressed={categoriaAtiva === null}
            >
              Ver Todas
            </Button>
          </div>

          <div
            className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-6"
            role="group"
            aria-label="Filtrar por categoria"
          >
            {CATEGORIAS_LIVROS.map((categoria: CategoriaLivroInfo) => {
              const isAtivo = categoriaAtiva === categoria.id;
              return (
                <button
                  key={categoria.id}
                  onClick={() => handleCategoriaClick(categoria.id)}
                  className={`group relative rounded-2xl p-4 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl focus:border-l focus:border-l-gray-600 focus:outline-none sm:p-4 ${
                    isAtivo
                      ? "scale-105 border-t-3 border-b-2 border-t-blue-600 border-b-gray-600 shadow-xl shadow-gray-700/20"
                      : "border border-slate-200 hover:border-gray-300"
                  }`}
                  aria-pressed={isAtivo}
                  aria-label={`${isAtivo ? "Remover filtro" : "Filtrar por"} ${categoria.nome}`}
                >
                  <div className="flex flex-col items-center space-y-2 text-center">
                    <div
                      className="mx-auto text-blue-700 [&>svg]:size-6 sm:[&>svg]:size-8"
                      aria-hidden="true"
                    >
                      {categoria.icon}
                    </div>
                    <div className="text-xs font-semibold text-slate-700 sm:text-sm">
                      {categoria.nome}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* FILTROS DE ORDENAÇÃO */}
        <section
          className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-lg sm:p-5"
          aria-labelledby="ordenacao-heading"
        >
          <div className="flex flex-wrap items-center gap-2">
            <Filter className="h-5 w-5 text-blue-600" aria-hidden="true" />
            <span
              id="ordenacao-heading"
              className="text-sm font-semibold text-slate-700"
            >
              Ordenar:
            </span>
          </div>

          <div
            className="flex flex-wrap gap-2 sm:gap-3"
            role="group"
            aria-label="Opções de ordenação"
          >
            <OrdenacaoButton
              icon={<TrendingUp className="h-4 w-4" />}
              label="Popular"
              isActive={ordenacao === "popular"}
              onClick={() => setOrdenacao("popular")}
            />
            <OrdenacaoButton
              icon={<Sparkles className="h-4 w-4" />}
              label="Novos"
              isActive={ordenacao === "novo"}
              onClick={() => setOrdenacao("novo")}
            />
            <OrdenacaoButton
              icon={<Star className="h-4 w-4" />}
              label="Avaliação"
              isActive={ordenacao === "avaliacao"}
              onClick={() => setOrdenacao("avaliacao")}
            />
          </div>

          <div
            className="text-sm font-medium text-slate-600"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            {livrosFiltrados.length}{" "}
            {livrosFiltrados.length === 1 ? "livro" : "livros"}
          </div>
        </section>

        {/* CAROUSELS - Só aparecem sem filtros */}
        {!categoriaAtiva && !busca && (
          <>
            {/* POPULARES */}
            <section className="space-y-6" aria-labelledby="populares-heading">
              <h2
                id="populares-heading"
                className="text-2xl font-bold text-slate-900 sm:text-3xl"
              >
                Mais Populares
              </h2>

              <Carousel
                opts={{
                  align: "center",
                  loop: true,
                }}
                setApi={setPopularesApi}
                className="w-full overflow-hidden"
              >
                <CarouselContent className="mx-auto max-w-5xl gap-3 px-2">
                  {populares.map((livro) => (
                    <CarouselItem
                      key={livro.id}
                      className="max-w-75 basis-[82%] sm:basis-1/2 lg:basis-[33%] 2xl:basis-1/4"
                    >
                      <LivroCard livro={livro} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="mt-8 flex justify-center gap-2">
                  <CarouselPrevious className="relative inset-0 translate-y-0 border-2 border-slate-200 bg-white shadow-lg hover:bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" />
                  <CarouselNext className="relative inset-0 translate-y-0 border-2 border-slate-200 bg-white shadow-lg hover:bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" />
                </div>
              </Carousel>
            </section>

            {/* NOVOS */}
            <section className="space-y-6" aria-labelledby="novos-heading">
              <h2
                id="novos-heading"
                className="text-2xl font-bold text-slate-900 sm:text-3xl"
              >
                Novidades
              </h2>

              <Carousel
                opts={{
                  align: "center",
                  loop: true,
                }}
                setApi={setNovosApi}
                className="w-full overflow-hidden"
              >
                <CarouselContent className="mx-auto max-w-5xl gap-3 px-2">
                  {novos.map((livro) => (
                    <CarouselItem
                      key={livro.id}
                      className="max-w-75 basis-[82%] sm:basis-1/2 lg:basis-[33%] 2xl:basis-1/4"
                    >
                      <LivroCard livro={livro} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="mt-8 flex justify-center gap-2">
                  <CarouselPrevious className="relative inset-0 translate-y-0 border-2 border-slate-200 bg-white shadow-lg hover:bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" />
                  <CarouselNext className="relative inset-0 translate-y-0 border-2 border-slate-200 bg-white shadow-lg hover:bg-slate-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" />
                </div>
              </Carousel>
            </section>
          </>
        )}

        {/* GRID DE RESULTADOS */}
        <section className="space-y-6" aria-labelledby="resultados-heading">
          <h2
            id="resultados-heading"
            className="text-2xl font-bold text-slate-900 sm:text-3xl"
          >
            {categoriaAtiva
              ? getCategoriaNome(categoriaAtiva)
              : busca
                ? "Resultados da Busca"
                : "Toda a Biblioteca"}
          </h2>

          {livrosFiltrados.length > 0 ? (
            <div
              className="grid grid-cols-1 gap-4 min-[400px]:grid-cols-2 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-6 2xl:grid-cols-5"
              role="list"
              aria-label="Lista de livros"
            >
              {livrosFiltrados.map((livro) => (
                <div key={livro.id} role="listitem">
                  <LivroCard livro={livro} compact />
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-16 text-center shadow-lg">
              <div
                className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100"
                aria-hidden="true"
              >
                <Search className="h-10 w-10 text-slate-400" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-slate-700">
                Nenhum livro encontrado
              </h3>
              <p className="mb-6 text-slate-500">
                Tente ajustar os filtros ou buscar por outro termo
              </p>
              <Button
                onClick={handleLimparFiltros}
                className="bg-blue-600 shadow-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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

export default function LivrosPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
      <LivrosPageInner />
    </Suspense>
  );
}
