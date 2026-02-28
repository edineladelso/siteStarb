import "server-only";

import { fakeSelectLivros } from "@/app/(public)/biblioteca/livros/dadosLivros";
import { artigosBiblioteca } from "@/lib/localDadosHome/dadosArtigos";
import { db } from "@/lib/drizzle/db";
import { artigos } from "@/lib/drizzle/db/schema/artigo";
import { livros } from "@/lib/drizzle/db/schema/livro";
import { projetos } from "@/lib/drizzle/db/schema/projeto";
import { softwares } from "@/lib/drizzle/db/schema/software";
import { and, desc, ilike, inArray, or } from "drizzle-orm";

import type {
  PublicSearchItem,
  PublicSearchResponse,
  PublicSearchType,
} from "./public-search.types";

const PUBLIC_STATUSES = ["publicado", "ativo"] as const;
const MIN_QUERY_LENGTH = 2;
const MAX_LIMIT = 40;

const STATIC_PAGES: PublicSearchItem[] = [
  {
    id: "page-home",
    type: "pagina",
    title: "Home",
    description: "Página inicial da Star B",
    href: "/",
    keywords: ["inicio", "star b", "home"],
  },
  {
    id: "page-livros",
    type: "pagina",
    title: "Biblioteca de Livros",
    description: "Livros técnicos por área e macroárea",
    href: "/biblioteca/livros",
    keywords: ["livros", "biblioteca", "engenharia"],
  },
  {
    id: "page-artigos",
    type: "pagina",
    title: "Biblioteca de Artigos",
    description: "Artigos técnicos e científicos",
    href: "/biblioteca/artigos",
    keywords: ["artigos", "papers", "pesquisas"],
  },
  {
    id: "page-softwares",
    type: "pagina",
    title: "Softwares Profissionais",
    description: "Ferramentas e documentação técnica",
    href: "/academia/softwares",
    keywords: ["software", "ferramentas", "autocad", "matlab"],
  },
  {
    id: "page-projetos",
    type: "pagina",
    title: "Projetos",
    description: "Projetos aplicados e estudos",
    href: "/academia/projetos",
    keywords: ["projetos", "tcc", "casos"],
  },
  {
    id: "page-cursos",
    type: "pagina",
    title: "Cursos",
    description: "Conteúdo formativo da academia",
    href: "/academia/cursos",
    keywords: ["cursos", "aulas", "aprendizagem"],
  },
  {
    id: "page-documentacao",
    type: "pagina",
    title: "Documentação",
    description: "Base de conhecimento e docs",
    href: "/academia/documentacao",
    keywords: ["documentacao", "docs", "manual"],
  },
  {
    id: "page-sobre",
    type: "pagina",
    title: "Sobre",
    description: "Sobre a Star B",
    href: "/sobre",
    keywords: ["sobre", "empresa", "missao"],
  },
  {
    id: "page-contato",
    type: "pagina",
    title: "Contato",
    description: "Canais de contato e suporte",
    href: "/sobre/contato",
    keywords: ["contato", "suporte", "ajuda"],
  },
];

function normalizeText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function escapeLike(term: string): string {
  return term.replace(/[%_\\]/g, (m) => `\\${m}`);
}

function clampLimit(limit?: number): number {
  if (!limit || Number.isNaN(limit)) return 12;
  return Math.min(Math.max(limit, 1), MAX_LIMIT);
}

function scoreItem(item: PublicSearchItem, normalizedQuery: string): number {
  const title = normalizeText(item.title);
  const subtitle = normalizeText(item.subtitle ?? "");
  const description = normalizeText(item.description);
  const keywords = (item.keywords ?? []).map(normalizeText);

  let score = 0;

  if (title === normalizedQuery) score += 120;
  if (title.startsWith(normalizedQuery)) score += 90;
  if (title.includes(normalizedQuery)) score += 60;
  if (subtitle.startsWith(normalizedQuery)) score += 30;
  if (subtitle.includes(normalizedQuery)) score += 20;
  if (description.includes(normalizedQuery)) score += 12;

  for (const keyword of keywords) {
    if (keyword === normalizedQuery) score += 25;
    else if (keyword.startsWith(normalizedQuery)) score += 15;
    else if (keyword.includes(normalizedQuery)) score += 8;
  }

  if (item.type === "livro" || item.type === "artigo") score += 4;

  return score;
}

function rankAndTrim(
  items: PublicSearchItem[],
  query: string,
  limit: number,
): PublicSearchItem[] {
  const normalizedQuery = normalizeText(query);

  return items
    .map((item) => ({ ...item, score: scoreItem(item, normalizedQuery) }))
    .filter((item) => (item.score ?? 0) > 0)
    .sort((a, b) => {
      const scoreDiff = (b.score ?? 0) - (a.score ?? 0);
      if (scoreDiff !== 0) return scoreDiff;
      return a.title.localeCompare(b.title, "pt");
    })
    .slice(0, limit);
}

function dedupeItems(items: PublicSearchItem[]): PublicSearchItem[] {
  const seen = new Set<string>();
  const result: PublicSearchItem[] = [];

  for (const item of items) {
    const key = `${item.type}:${item.href}`;
    if (seen.has(key)) continue;
    seen.add(key);
    result.push(item);
  }

  return result;
}

function buildByType(items: PublicSearchItem[]): PublicSearchResponse["byType"] {
  return items.reduce<PublicSearchResponse["byType"]>((acc, item) => {
    acc[item.type] = (acc[item.type] ?? 0) + 1;
    return acc;
  }, {});
}

async function searchLivrosDb(term: string, limit: number): Promise<PublicSearchItem[]> {
  const like = `%${escapeLike(term)}%`;

  const rows = await db
    .select({
      id: livros.id,
      titulo: livros.titulo,
      slug: livros.slug,
      descricao: livros.descricao,
      autor: livros.autor,
      categoria: livros.categoria,
    })
    .from(livros)
    .where(
      and(
        inArray(livros.status, [...PUBLIC_STATUSES]),
        or(
          ilike(livros.titulo, like),
          ilike(livros.descricao, like),
          ilike(livros.autor, like),
          ilike(livros.categoria, like),
        ),
      ),
    )
    .orderBy(desc(livros.views), desc(livros.downloads))
    .limit(limit);

  return rows.map((row) => ({
    id: `livro-db-${row.id}`,
    type: "livro",
    title: row.titulo,
    description: row.descricao,
    subtitle: row.autor,
    href: `/biblioteca/livros/${row.slug}`,
    keywords: [row.categoria, row.autor],
  }));
}

async function searchArtigosDb(term: string, limit: number): Promise<PublicSearchItem[]> {
  const like = `%${escapeLike(term)}%`;

  const rows = await db
    .select({
      id: artigos.id,
      titulo: artigos.titulo,
      slug: artigos.slug,
      resumo: artigos.resumo,
      categoria: artigos.categoria,
      autores: artigos.autores,
    })
    .from(artigos)
    .where(
      and(
        inArray(artigos.status, [...PUBLIC_STATUSES]),
        or(
          ilike(artigos.titulo, like),
          ilike(artigos.resumo, like),
          ilike(artigos.descricao, like),
          ilike(artigos.categoria, like),
        ),
      ),
    )
    .orderBy(desc(artigos.views), desc(artigos.downloads))
    .limit(limit);

  return rows.map((row) => ({
    id: `artigo-db-${row.id}`,
    type: "artigo",
    title: row.titulo,
    description: row.resumo,
    subtitle: row.autores.join(", "),
    href: `/biblioteca/artigos/${row.slug}`,
    keywords: [row.categoria, ...row.autores],
  }));
}

async function searchSoftwaresDb(
  term: string,
  limit: number,
): Promise<PublicSearchItem[]> {
  const like = `%${escapeLike(term)}%`;

  const rows = await db
    .select({
      id: softwares.id,
      titulo: softwares.titulo,
      descricao: softwares.descricao,
      categoria: softwares.categoria,
      slug: softwares.slug,
    })
    .from(softwares)
    .where(
      and(
        inArray(softwares.status, [...PUBLIC_STATUSES]),
        or(
          ilike(softwares.titulo, like),
          ilike(softwares.descricao, like),
          ilike(softwares.categoria, like),
        ),
      ),
    )
    .orderBy(desc(softwares.views), desc(softwares.downloads))
    .limit(limit);

  return rows.map((row) => ({
    id: `software-db-${row.id}`,
    type: "software",
    title: row.titulo,
    description: row.descricao,
    subtitle: row.categoria,
    href: `/academia/softwares?q=${encodeURIComponent(row.titulo)}`,
    keywords: [row.categoria, row.slug],
  }));
}

async function searchProjetosDb(
  term: string,
  limit: number,
): Promise<PublicSearchItem[]> {
  const like = `%${escapeLike(term)}%`;

  const rows = await db
    .select({
      id: projetos.id,
      titulo: projetos.titulo,
      descricao: projetos.descricao,
      categoria: projetos.categoria,
      autor: projetos.autor,
    })
    .from(projetos)
    .where(
      and(
        inArray(projetos.status, [...PUBLIC_STATUSES]),
        or(
          ilike(projetos.titulo, like),
          ilike(projetos.descricao, like),
          ilike(projetos.categoria, like),
          ilike(projetos.autor, like),
        ),
      ),
    )
    .orderBy(desc(projetos.views), desc(projetos.downloads))
    .limit(limit);

  return rows.map((row) => ({
    id: `projeto-db-${row.id}`,
    type: "projeto",
    title: row.titulo,
    description: row.descricao,
    subtitle: row.autor,
    href: `/academia/projetos?q=${encodeURIComponent(row.titulo)}`,
    keywords: [row.categoria, row.autor],
  }));
}

function searchLivrosLocal(term: string): PublicSearchItem[] {
  const normalizedQuery = normalizeText(term);

  return fakeSelectLivros
    .filter((livro) => PUBLIC_STATUSES.includes(livro.status as (typeof PUBLIC_STATUSES)[number]))
    .map((livro) => ({
      id: `livro-local-${livro.id}`,
      type: "livro" as const,
      title: livro.titulo,
      description: livro.descricao,
      subtitle: livro.autor,
      href: `/biblioteca/livros/${livro.slug}`,
      keywords: [livro.categoria, livro.autor, ...(livro.tags ?? [])],
    }))
    .filter((item) => {
      const index = normalizeText(
        `${item.title} ${item.description} ${item.subtitle ?? ""} ${(item.keywords ?? []).join(" ")}`,
      );
      return index.includes(normalizedQuery);
    });
}

function searchArtigosLocal(term: string): PublicSearchItem[] {
  const normalizedQuery = normalizeText(term);

  return artigosBiblioteca
    .filter((artigo) => PUBLIC_STATUSES.includes(artigo.status as (typeof PUBLIC_STATUSES)[number]))
    .map((artigo) => ({
      id: `artigo-local-${artigo.id}`,
      type: "artigo" as const,
      title: artigo.titulo,
      description: artigo.resumo,
      subtitle: artigo.autores.join(", "),
      href: `/biblioteca/artigos/${artigo.slug}`,
      keywords: [artigo.categoria, ...artigo.autores, ...(artigo.tags ?? [])],
    }))
    .filter((item) => {
      const index = normalizeText(
        `${item.title} ${item.description} ${item.subtitle ?? ""} ${(item.keywords ?? []).join(" ")}`,
      );
      return index.includes(normalizedQuery);
    });
}

function searchPages(term: string): PublicSearchItem[] {
  const normalizedQuery = normalizeText(term);

  return STATIC_PAGES.filter((page) => {
    const index = normalizeText(
      `${page.title} ${page.description} ${(page.keywords ?? []).join(" ")}`,
    );
    return index.includes(normalizedQuery);
  });
}

export async function searchPublicContent(
  query: string,
  options?: { limit?: number },
): Promise<PublicSearchResponse> {
  const normalizedQuery = query.trim();
  const limit = clampLimit(options?.limit);

  if (normalizedQuery.length < MIN_QUERY_LENGTH) {
    return {
      query: normalizedQuery,
      total: 0,
      items: [],
      byType: {},
    };
  }

  const dbLimit = Math.min(limit, 12);

  const [livrosDb, artigosDb, softwaresDb, projetosDb] = await Promise.all([
    searchLivrosDb(normalizedQuery, dbLimit).catch(() => []),
    searchArtigosDb(normalizedQuery, dbLimit).catch(() => []),
    searchSoftwaresDb(normalizedQuery, dbLimit).catch(() => []),
    searchProjetosDb(normalizedQuery, dbLimit).catch(() => []),
  ]);

  const localResults = [
    ...searchLivrosLocal(normalizedQuery),
    ...searchArtigosLocal(normalizedQuery),
    ...searchPages(normalizedQuery),
  ];

  const deduped = dedupeItems([
    ...livrosDb,
    ...artigosDb,
    ...softwaresDb,
    ...projetosDb,
    ...localResults,
  ]);

  const ranked = rankAndTrim(deduped, normalizedQuery, limit);

  return {
    query: normalizedQuery,
    total: ranked.length,
    items: ranked,
    byType: buildByType(ranked),
  };
}

export function getDefaultSearchSuggestions(limit = 8): PublicSearchItem[] {
  return STATIC_PAGES.slice(0, clampLimit(limit));
}

export const PUBLIC_SEARCH_ENTITY_LABELS: Record<PublicSearchType, string> = {
  livro: "Livros",
  artigo: "Artigos",
  software: "Softwares",
  projeto: "Projetos",
  pagina: "Páginas",
};
