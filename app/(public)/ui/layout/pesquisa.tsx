"use client";

import {
  BookOpen,
  Clock,
  Code2,
  FileText,
  FolderKanban,
  Search,
  Sparkles,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useLruCache } from "@/hooks/search";
import { useSearchHistory } from "@/lib/search/search-history";
import type {
  PublicSearchItem,
  PublicSearchResponse,
  PublicSearchType,
} from "@/lib/search/public-search.types";

// ─── Constantes ────────────────────────────────────────────────────────────────

const MIN_QUERY_LENGTH = 2;
const SEARCH_LIMIT = 10;
const DEBOUNCE_MS = 220;

const ENTITY_LABELS: Record<PublicSearchType, string> = {
  livro: "Livro",
  artigo: "Artigo",
  software: "Software",
  projeto: "Projeto",
  pagina: "Página",
};

const QUICK_SUGGESTIONS: PublicSearchItem[] = [
  {
    id: "quick-livros",
    type: "pagina",
    title: "Biblioteca de Livros",
    description: "Ver todos os livros",
    href: "/biblioteca/livros",
  },
  {
    id: "quick-artigos",
    type: "pagina",
    title: "Biblioteca de Artigos",
    description: "Ver todos os artigos",
    href: "/biblioteca/artigos",
  },
  {
    id: "quick-softwares",
    type: "pagina",
    title: "Softwares",
    description: "Acessar softwares e documentação",
    href: "/academia/softwares",
  },
  {
    id: "quick-projetos",
    type: "pagina",
    title: "Projetos",
    description: "Ver projetos públicos",
    href: "/academia/projetos",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getTypeIcon(type: PublicSearchType) {
  switch (type) {
    case "livro":
      return BookOpen;
    case "artigo":
      return FileText;
    case "software":
      return Code2;
    case "projeto":
      return FolderKanban;
    default:
      return Sparkles;
  }
}

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

// ─── Componente Principal ─────────────────────────────────────────────────────

export default function Pesquisa({ compact = false }: { compact?: boolean }) {
  const router = useRouter();

  // LRU Cache com limite de 30 entradas (substitui Map ilimitado)
  const cache = useLruCache<PublicSearchResponse>(30);

  // Histórico de buscas
  const { history, add: addToHistory, clear: clearHistory } = useSearchHistory();

  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [debouncedQuery, setDebouncedQuery] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [result, setResult] = React.useState<PublicSearchResponse | null>(null);

  const trimmedQuery = query.trim();
  const canSearch = trimmedQuery.length >= MIN_QUERY_LENGTH;

  // ── Debounce ───────────────────────────────────────────────────────────────
  React.useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedQuery(trimmedQuery);
    }, DEBOUNCE_MS);
    return () => window.clearTimeout(timer);
  }, [trimmedQuery]);

  // ── Atalho de teclado ──────────────────────────────────────────────────────
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // ── Reset ao fechar ────────────────────────────────────────────────────────
  React.useEffect(() => {
    if (!open) {
      setQuery("");
      setResult(null);
      setError(null);
    }
  }, [open]);

  // ── Busca com cache LRU ────────────────────────────────────────────────────
  React.useEffect(() => {
    if (!open) return;

    if (debouncedQuery.length < MIN_QUERY_LENGTH) {
      setLoading(false);
      setError(null);
      setResult(null);
      return;
    }

    const cached = cache.get(debouncedQuery);
    if (cached) {
      setResult(cached);
      setError(null);
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    async function fetchSearch() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `/api/public-search?q=${encodeURIComponent(debouncedQuery)}&limit=${SEARCH_LIMIT}`,
          { method: "GET", signal: controller.signal, cache: "no-store" },
        );

        if (!response.ok) throw new Error("Falha ao pesquisar.");

        const data = (await response.json()) as PublicSearchResponse;
        cache.set(debouncedQuery, data);
        setResult(data);
      } catch (err) {
        if (controller.signal.aborted) return;
        console.error("[Pesquisa] Erro:", err);
        setError("Não foi possível concluir a pesquisa agora.");
        setResult(null);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    fetchSearch();
    return () => controller.abort();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, debouncedQuery]);

  const grouped = React.useMemo(
    () => groupByType(result?.items ?? []),
    [result?.items],
  );

  // ── Handlers ───────────────────────────────────────────────────────────────
  function handleSelect(href: string) {
    setOpen(false);
    router.push(href);
  }

  function handleSubmitFullSearch() {
    if (!canSearch) return;
    addToHistory(trimmedQuery);
    setOpen(false);
    router.push(`/pesquisa?q=${encodeURIComponent(trimmedQuery)}`);
  }

  function handleHistorySelect(historyQuery: string) {
    setOpen(false);
    router.push(`/pesquisa?q=${encodeURIComponent(historyQuery)}`);
  }

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <>
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
        size="sm"
        className={`text-muted-foreground hover:text-foreground flex items-center justify-between gap-2 border-none bg-white shadow shadow-gray-400/55 transition-colors sm:h-9 ${
          compact ? "w-10 justify-center px-2 sm:w-10" : "sm:w-64 xl:w-72"
        }`}
        aria-label="Abrir pesquisa global (Ctrl+K)"
        aria-keyshortcuts="Control+K"
      >
        <div className="flex items-center gap-2">
          <Search className="h-5 w-5" aria-hidden="true" />
          {!compact && (
            <span className="hidden text-sm font-medium sm:inline-flex">
              Pesquisar...
            </span>
          )}
        </div>

        {!compact && (
          <kbd
            className="pointer-events-none hidden h-5 items-center gap-1 rounded bg-gray-700 px-2 font-mono text-[10px] font-medium text-white sm:inline-flex"
            aria-hidden="true"
          >
            <span className="text-xs">Ctrl+K</span>
          </kbd>
        )}
      </Button>

      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Pesquisa Global"
        description="Pesquise livros, artigos, softwares, projetos e páginas"
      >
        <CommandInput
          value={query}
          onValueChange={setQuery}
          placeholder="Pesquisar livros, artigos, projetos, softwares..."
          onKeyDown={(event) => {
            if (event.key === "Enter" && canSearch) {
              event.preventDefault();
              handleSubmitFullSearch();
            }
          }}
          aria-label="Campo de pesquisa global"
        />

        {/*
          aria-live: anuncia resultados para leitores de tela
          sem causar interrupções desnecessárias (polite)
        */}
        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
        >
          {loading && "Buscando resultados..."}
          {!loading && result && `${result.total} resultados encontrados para ${debouncedQuery}`}
          {error && `Erro na busca: ${error}`}
        </div>

        <CommandList>
          <CommandEmpty>
            {canSearch
              ? "Sem resultado para essa consulta."
              : "Digite ao menos 2 letras para pesquisar."}
          </CommandEmpty>

          {/* ── Histórico de buscas ──────────────────────────────────────── */}
          {!canSearch && history.length > 0 && (
            <CommandGroup
              heading={
                <span className="flex w-full items-center justify-between">
                  <span>Buscas recentes</span>
                  <button
                    onClick={clearHistory}
                    className="text-muted-foreground hover:text-foreground ml-2 rounded p-0.5 text-xs transition-colors"
                    aria-label="Limpar histórico de buscas"
                  >
                    <Trash2 size={12} />
                  </button>
                </span>
              }
            >
              {history.slice(0, 5).map((item) => (
                <CommandItem
                  key={`history-${item.at}`}
                  value={`history-${item.query}`}
                  onSelect={() => handleHistorySelect(item.query)}
                >
                  <Clock className="size-4 text-zinc-400" aria-hidden="true" />
                  <span className="truncate">{item.query}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {/* ── Atalhos rápidos ──────────────────────────────────────────── */}
          {!canSearch && (
            <CommandGroup heading="Atalhos rápidos">
              {QUICK_SUGGESTIONS.map((item) => {
                const Icon = getTypeIcon(item.type);
                return (
                  <CommandItem
                    key={item.id}
                    value={`${item.title} ${item.description}`}
                    onSelect={() => handleSelect(item.href)}
                  >
                    <Icon className="size-4" aria-hidden="true" />
                    <div className="flex min-w-0 flex-1 flex-col">
                      <span className="truncate font-medium">{item.title}</span>
                      <span className="text-muted-foreground truncate text-xs">
                        {item.description}
                      </span>
                    </div>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          )}

          {/* ── Loading ──────────────────────────────────────────────────── */}
          {canSearch && loading && (
            <CommandGroup heading="Buscando">
              <CommandItem disabled aria-busy="true">
                <Search
                  className="size-4 animate-pulse"
                  aria-hidden="true"
                />
                A pesquisar no sistema público...
              </CommandItem>
            </CommandGroup>
          )}

          {/* ── Erro ─────────────────────────────────────────────────────── */}
          {canSearch && error && !loading && (
            <CommandGroup heading="Erro">
              <CommandItem disabled aria-invalid="true">
                {error}
              </CommandItem>
            </CommandGroup>
          )}

          {/* ── Resultados agrupados ─────────────────────────────────────── */}
          {canSearch && !loading && !error && result && result.total > 0 && (
            <>
              {(Object.keys(grouped) as PublicSearchType[]).map((type) => {
                const items = grouped[type];
                if (!items.length) return null;

                return (
                  <CommandGroup
                    key={type}
                    heading={`${ENTITY_LABELS[type]}${items.length > 1 ? "s" : ""}`}
                  >
                    {items.map((item) => {
                      const Icon = getTypeIcon(item.type);
                      return (
                        <CommandItem
                          key={item.id}
                          value={`${item.title} ${item.subtitle ?? ""} ${item.description}`}
                          onSelect={() => handleSelect(item.href)}
                        >
                          <Icon className="size-4" aria-hidden="true" />
                          <div className="flex min-w-0 flex-1 flex-col">
                            <span className="truncate font-medium">
                              {item.title}
                            </span>
                            <span className="text-muted-foreground truncate text-xs">
                              {item.subtitle
                                ? `${ENTITY_LABELS[item.type]} • ${item.subtitle}`
                                : ENTITY_LABELS[item.type]}
                            </span>
                          </div>
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                );
              })}

              <CommandSeparator />

              <CommandGroup heading="Pesquisa completa">
                <CommandItem onSelect={handleSubmitFullSearch}>
                  <Search className="size-4" aria-hidden="true" />
                  Ver todos os resultados para &quot;{trimmedQuery}&quot;
                </CommandItem>
              </CommandGroup>
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}