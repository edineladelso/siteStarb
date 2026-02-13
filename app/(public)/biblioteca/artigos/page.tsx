"use client";

import {
  BarChart3,
  BookOpen,
  ChevronRight,
  FileText,
  Search,
  Sparkles,
  Tag,
} from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { artigosBiblioteca } from "../../../../lib/localDadosHome/dadosArtigos";
import ArtigoCard, { clampStyle } from "./ui/ArtigoCard";
import { listarArtigos } from "@/lib/actions";
import type { Artigo } from "@/lib";
import { LoadingContent, LoadingVariant } from "@/app/loading/Loading";

function StatPill({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-gray-800 shadow shadow-gray-600 backdrop-blur">
      <div className="rounded-full bg-white/15 p-2 text-black">{icon}</div>
      <div className="flex flex-col">
        <span className="text-xs tracking-wide text-black/70 uppercase">
          {label}
        </span>
        <strong className="text-lg">{value}</strong>
      </div>
    </div>
  );
}

export default function ArtigosPage() {
  const [busca, setBusca] = useState("");
  const [tagAtiva, setTagAtiva] = useState<string | null>(null);
  const [arigosItems, setArtigosItems] = useState<Artigo[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArtigos() {
      try {
        const artigosServidor = await listarArtigos();
        // Mesmo que venha vazio do servidor, respeitamos o retorno (pode não haver dados)
        setArtigosItems(artigosServidor);
      } catch (err) {
        console.error("Erro ao buscar Artigos: ", err);
        // Fallback já é garantido por artigosFrontend (usa dados locais)
      } finally {
        setLoading(false);
      }
    }
    fetchArtigos();
  }, []);

  const artigosFrontend = arigosItems ?? artigosBiblioteca;

  const todasTags = useMemo(
    () =>
      Array.from(
        new Set(artigosFrontend.flatMap((a) => a.tags ?? []).filter(Boolean)),
      ),
    [artigosFrontend],
  );

  const artigosFiltrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    return artigosFrontend.filter((artigo) => {
      const atendeBusca =
        !termo ||
        artigo.titulo.toLowerCase().includes(termo) ||
        artigo.resumo.toLowerCase().includes(termo) ||
        artigo.autores.some((autor) => autor.toLowerCase().includes(termo));

      const atendeTag = !tagAtiva || (artigo.tags ?? []).includes(tagAtiva);
      return atendeBusca && atendeTag;
    });
  }, [busca, tagAtiva, artigosFrontend]);

  if (loading) {
    return <LoadingVariant conteudo="Artigos" />;
  }

  const artigoDestaque =
    artigosFiltrados.find((a) => a.destaque) ||
    artigosFiltrados[0] ||
    artigosFrontend[0];
  const capaDestaque =
    artigoDestaque?.capa ?? "https://placehold.co/800x480?text=Artigo";

  const totalViews = artigosFrontend.reduce(
    (acc, artigo) => acc + (artigo.views ?? 0),
    0,
  );
  const totalCitacoes = artigosFrontend.reduce(
    (acc, artigo) => acc + artigo.citacoes,
    0,
  );

  return (
    <div className="bg-sidebar mx-auto w-full space-y-10">
      {/* Section Hero */}
      <section className="xl:[70vh] flex w-full items-center justify-center border border-slate-200 bg-linear-to-br from-neutral-200 via-neutral-100 to-neutral-200 text-slate-900">
        <div className="grid max-w-6xl gap-8 p-8 md:p-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide text-orange-900 uppercase">
              <Sparkles className="h-4 w-4" /> Biblioteca de Artigos
            </div>
            <h1 className="text-3xl leading-tight font-bold md:text-4xl">
              Artigos técnicos e científicos prontos para leitura web
            </h1>
            <p className="max-w-2xl text-base text-slate-800 md:text-lg">
              Seleção curada com HTML responsivo, métricas auditáveis e foco em
              aplicabilidade prática. Filtre por assunto, explore destaques e
              mergulhe nos detalhes sem sair da plataforma.
            </p>

            <div className="grid gap-3 text-black sm:grid-cols-2">
              <StatPill
                icon={<FileText className="h-4 w-4" />}
                label="Artigos publicados"
                value={`${artigosFrontend.length} ativos`}
              />
              <StatPill
                icon={<BarChart3 className="h-4 w-4" />}
                label="Leituras acumuladas"
                value={totalViews.toLocaleString("pt-BR")}
              />
              <StatPill
                icon={<BookOpen className="h-4 w-4" />}
                label="Média de leitura"
                value="11 min"
              />
              <StatPill
                icon={<Sparkles className="h-4 w-4" />}
                label="Citações"
                value={totalCitacoes.toLocaleString("pt-PT")}
              />
            </div>
          </div>

          {artigoDestaque && (
            <Link
              href={`/biblioteca/artigos/${artigoDestaque.slug}`}
              className="group relative block overflow-hidden rounded-2xl border border-white/15 bg-white/10 shadow-2xl shadow-black/20"
            >
              <img
                src={capaDestaque}
                alt={artigoDestaque.titulo}
                className="h-64 w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-b from-black/20 via-black/30 to-black/60" />
              <div className="absolute inset-0 flex flex-col justify-end gap-3 p-6 text-white">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="bg-white/20 text-white backdrop-blur">
                    Destaque
                  </Badge>
                  <Badge className="bg-orange-500 text-white">
                    {artigoDestaque.categoria}
                  </Badge>
                  <Badge className="bg-white/20 text-white backdrop-blur">
                    {artigoDestaque.leituraMin} min
                  </Badge>
                </div>
                <h2 className="text-2xl leading-snug font-semibold">
                  {artigoDestaque.titulo}
                </h2>
                <p className="text-sm text-slate-100" style={clampStyle}>
                  {artigoDestaque.resumo}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-orange-100 transition group-hover:translate-x-1">
                  Ler agora <ChevronRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-6 px-4 py-10 lg:py-14">
        <div className="rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-sm md:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-1 flex-col gap-3 sm:items-center">
              <div className="relative w-full sm:max-w-md">
                <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <Input
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  placeholder="Busque por título, autor ou palavra-chave..."
                  className="w-full rounded-xl py-8 pl-11 shadow outline-none"
                />
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Tag className="h-4 w-4 text-orange-500" />
                Filtre por tema
              </div>
            </div>

            <div className="flex flex-1 flex-wrap gap-2">
              <Button
                variant={tagAtiva === null ? "default" : "outline"}
                size="sm"
                onClick={() => setTagAtiva(null)}
              >
                Todos
              </Button>
              {todasTags.map((tag) => (
                <Button
                  key={tag}
                  variant={tagAtiva === tag ? "default" : "outline"}
                  size="sm"
                  className={
                    tagAtiva === tag ? "bg-orange-600 hover:bg-orange-700" : ""
                  }
                  onClick={() => setTagAtiva(tag)}
                >
                  #{tag}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {artigosFiltrados.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-orange-600">
              <Search className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-slate-900">
              Nenhum artigo encontrado
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Ajuste sua busca ou selecione outra tag para explorar novas áreas.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {artigosFiltrados.map((artigo) => (
              <ArtigoCard key={artigo.id} artigo={artigo} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
