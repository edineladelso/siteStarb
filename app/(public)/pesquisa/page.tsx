import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  Code2,
  FileText,
  FolderKanban,
  Search,
  Sparkles,
} from "lucide-react";
import type { ElementType } from "react";

import {
  PUBLIC_SEARCH_ENTITY_LABELS,
  searchPublicContent,
} from "@/lib/search/public-search";
import type {
  PublicSearchItem,
  PublicSearchType,
} from "@/lib/search/public-search.types";
import { HighlightedText } from "./_components/highlighted-text";
import { SearchForm } from "./_components/search-form";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}): Promise<Metadata> {
  const { q = "" } = await searchParams;
  const query = q.trim();

  return {
    title: query ? `Resultados para "${query}" | Star B` : "Pesquisa | Star B",
    description: query
      ? `Resultados de busca para "${query}" — livros, artigos, projetos e softwares.`
      : "Busca global por livros, artigos, projetos, softwares e páginas da Star B.",
    robots: { index: false, follow: true },
    openGraph: {
      title: query ? `Resultados para "${query}"` : "Pesquisa | Star B",
      type: "website",
    },
  };
}

const typeIconMap: Record<PublicSearchType, ElementType> = {
  livro: BookOpen,
  artigo: FileText,
  software: Code2,
  projeto: FolderKanban,
  pagina: Sparkles,
};

const RESULT_ORDER: PublicSearchType[] = [
  "livro",
  "artigo",
  "software",
  "projeto",
  "pagina",
];

const QUICK_TERMS = [
  "engenharia",
  "inteligência artificial",
  "cálculo",
  "projetos",
  "autocad",
  "tcc",
];

function groupByType(items: PublicSearchItem[]) {
  return items.reduce<Record<PublicSearchType, PublicSearchItem[]>>(
    (acc, item) => {
      if (!acc[item.type]) acc[item.type] = [];
      acc[item.type].push(item);
      return acc;
    },
    { livro: [], artigo: [], software: [], projeto: [], pagina: [] },
  );
}

function SearchItemCard({ item }: { item: PublicSearchItem }) {
  const Icon = typeIconMap[item.type];

  return (
    <Link
      href={item.href}
      className="group block rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      aria-label={`${PUBLIC_SEARCH_ENTITY_LABELS[item.type]}: ${item.title}`}
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-zinc-600 uppercase">
          <Icon size={13} aria-hidden="true" />
          {PUBLIC_SEARCH_ENTITY_LABELS[item.type]}
        </span>
        <ArrowUpRight
          size={14}
          aria-hidden="true"
          className="text-zinc-400 transition group-hover:text-zinc-700"
        />
      </div>

      <h3 className="line-clamp-1 text-sm font-bold text-zinc-900 transition-colors group-hover:text-blue-700">
        {item.highlights?.title ? (
          <HighlightedText html={item.highlights.title} />
        ) : (
          item.title
        )}
      </h3>

      {item.subtitle && (
        <p className="mt-1 line-clamp-1 text-xs text-zinc-500">
          {item.highlights?.subtitle ? (
            <HighlightedText html={item.highlights.subtitle} />
          ) : (
            item.subtitle
          )}
        </p>
      )}

      <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-zinc-600">
        {item.highlights?.description ? (
          <HighlightedText html={item.highlights.description} />
        ) : (
          item.description
        )}
      </p>
    </Link>
  );
}

function ResultSection({
  type,
  items,
}: {
  type: PublicSearchType;
  items: PublicSearchItem[];
}) {
  if (!items.length) return null;

  const Icon = typeIconMap[type];

  return (
    <section
      aria-labelledby={`section-${type}`}
      className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="mb-4 flex items-center justify-between gap-3 border-b border-zinc-100 pb-3">
        <h2
          id={`section-${type}`}
          className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-zinc-700 uppercase"
        >
          <Icon size={15} aria-hidden="true" className="text-zinc-500" />
          {PUBLIC_SEARCH_ENTITY_LABELS[type]}
        </h2>
        <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-semibold text-zinc-600">
          {items.length}
        </span>
      </div>

      <div
        className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3"
        role="list"
        aria-label={`${PUBLIC_SEARCH_ENTITY_LABELS[type]} encontrados`}
      >
        {items.map((item) => (
          <div key={item.id} role="listitem">
            <SearchItemCard item={item} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default async function PesquisaPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const query = q.trim();
  const hasQuery = query.length >= 2;

  const result = hasQuery
    ? await searchPublicContent(query, { limit: 40 })
    : { query: "", total: 0, items: [], byType: {} };

  const grouped = groupByType(result.items);
  const hasResults = result.total > 0;

  return (
    <main className="relative min-h-screen mx-auto overflow-hidden" id="main-content">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.10),transparent_40%),radial-gradient(circle_at_top_left,rgba(16,185,129,0.08),transparent_35%)]"
      />

      <section
        className="relative border-b border-zinc-200 bg-linear-to-br from-zinc-100 via-zinc-50 to-zinc-100"
        aria-label="Cabeçalho da pesquisa"
      >
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <div className="max-w-4xl space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-3 py-1 text-xs font-semibold tracking-wide text-zinc-600 uppercase">
              <Search size={13} aria-hidden="true" />
              Busca Global
            </div>

            <div className="space-y-2">
              <h1 className="text-xl leading-tight font-black text-zinc-900 sm:text-2xl md:text-3xl">
                {hasQuery ? (
                  <>
                    Resultados para <span className="text-blue-700">&quot;{query}&quot;</span>
                  </>
                ) : (
                  "Encontre conteúdo público com precisão"
                )}
              </h1>
              <p className="max-w-2xl text-sm text-zinc-600 sm:text-base">
                Pesquise livros, artigos, softwares, projetos e páginas da Star B
                em um único fluxo.
              </p>
            </div>

            <div className="rounded-2xl border  border-zinc-200 bg-white p-3 shadow-sm sm:p-4">
              <SearchForm initialQuery={query} />
            </div>

            {hasQuery && (
              <div
                className="flex flex-wrap items-center gap-2"
                aria-live="polite"
                aria-atomic="true"
              >
                <span className="rounded-full bg-zinc-900 px-3 py-1 text-xs font-semibold text-white">
                  {result.total} resultado{result.total !== 1 ? "s" : ""}
                </span>
                {RESULT_ORDER.map((type) => {
                  const count = result.byType[type] ?? 0;
                  if (!count) return null;

                  return (
                    <span
                      key={type}
                      className="rounded-full border border-zinc-300 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-600"
                    >
                      {PUBLIC_SEARCH_ENTITY_LABELS[type]}: {count}
                    </span>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      <section
        className="relative mx-auto max-w-6xl space-y-6 px-4 py-8 sm:px-6"
        aria-label="Resultados da pesquisa"
      >
        {!hasQuery && (
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-zinc-700">
              Inicie com 2 ou mais caracteres. Exemplos rápidos:
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {QUICK_TERMS.map((term) => (
                <Link
                  key={term}
                  href={`/pesquisa?q=${encodeURIComponent(term)}`}
                  className="rounded-full border border-zinc-300 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-600 transition hover:border-zinc-400 hover:bg-zinc-100"
                >
                  {term}
                </Link>
              ))}
            </div>
          </div>
        )}

        {hasQuery && !hasResults && (
          <div className="rounded-2xl border border-zinc-200 bg-white p-10 text-center shadow-sm">
            <Search size={34} className="mx-auto mb-3 text-zinc-300" aria-hidden="true" />
            <p className="text-base font-semibold text-zinc-800">
              Nenhum resultado para &quot;{query}&quot;
            </p>
            <p className="mt-2 text-sm text-zinc-500">
              Tente termos mais curtos, sinônimos ou outra categoria de conteúdo.
            </p>
          </div>
        )}

        {hasResults &&
          RESULT_ORDER.map((type) => (
            <ResultSection key={type} type={type} items={grouped[type]} />
          ))}
      </section>
    </main>
  );
}
