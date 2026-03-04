// ==================== actions/dashboard.ts ====================
"use server";

import { artigos, db, livros, projetos, softwares } from "@/lib/drizzle/db";
import { avg, count, desc, inArray, sum } from "drizzle-orm";

type ContentTipo = "livro" | "software" | "projeto" | "artigo";

export type RecentContentItem = {
  id: number;
  titulo: string;
  createdAt: Date;
  tipo: ContentTipo;
};

export type AdminInternalNotification = {
  id: string;
  tipo: ContentTipo | "sistema";
  titulo: string;
  descricao: string;
  createdAt: string;
  href: string;
};

export async function getDashboardStats() {
  try {
    // Contar totais
    const [livrosCount] = await db.select({ count: count() }).from(livros);
    const [softwaresCount] = await db
      .select({ count: count() })
      .from(softwares);
    const [projetosCount] = await db.select({ count: count() }).from(projetos);
    const [artigosCount] = await db.select({ count: count() }).from(artigos);

    // Somar views e downloads
    const [livrosMetrics] = await db
      .select({
        views: sum(livros.views),
        downloads: sum(livros.downloads),
        avgRating: avg(livros.avaliacao),
      })
      .from(livros);

    const [softwaresMetrics] = await db
      .select({
        views: sum(softwares.views),
        downloads: sum(softwares.downloads),
        avgRating: avg(softwares.avaliacao),
      })
      .from(softwares);

    const [projetosMetrics] = await db
      .select({
        views: sum(projetos.views),
        downloads: sum(projetos.downloads),
        avgRating: avg(projetos.avaliacao),
      })
      .from(projetos);

    const [artigosMetrics] = await db
      .select({
        views: sum(artigos.views),
        downloads: sum(artigos.downloads),
        avgRating: avg(artigos.avaliacao),
      })
      .from(artigos);

    const totalViews =
      (Number(livrosMetrics.views) || 0) +
      (Number(softwaresMetrics.views) || 0) +
      (Number(projetosMetrics.views) || 0) +
      (Number(artigosMetrics.views) || 0);

    const totalDownloads =
      (Number(livrosMetrics.downloads) || 0) +
      (Number(softwaresMetrics.downloads) || 0) +
      (Number(projetosMetrics.downloads) || 0) +
      (Number(artigosMetrics.downloads) || 0);

    const avgRating =
      ((Number(livrosMetrics.avgRating) || 0) +
        (Number(softwaresMetrics.avgRating) || 0) +
        (Number(projetosMetrics.avgRating) || 0) +
        (Number(artigosMetrics.avgRating) || 0)) /
      4;

    return {
      totalLivros: livrosCount.count,
      totalSoftwares: softwaresCount.count,
      totalProjetos: projetosCount.count,
      totalArtigos: artigosCount.count,
      totalViews,
      totalDownloads,
      activeUsers: Math.floor(totalViews * 0.075),
      avgRating: Number(avgRating.toFixed(1)),
    };
  } catch (error) {
    console.error("Erro ao buscar estatísticas:", error);
    return {
      totalLivros: 0,
      totalSoftwares: 0,
      totalProjetos: 0,
      totalArtigos: 0,
      totalViews: 0,
      totalDownloads: 0,
      activeUsers: 0,
      avgRating: 0,
    };
  }
}

export async function getRecentContent(limit: number = 10): Promise<RecentContentItem[]> {
  try {
    // Buscar conteúdo recente de cada tipo com metadados normalizados
    const recentLivros = (await db
      .select()
      .from(livros)
      .orderBy(desc(livros.createdAt))
      .limit(limit)).map((item) => ({
        id: item.id,
        titulo: item.titulo,
        createdAt: item.createdAt,
        tipo: "livro" as const,
      }));

    const recentSoftwares = (await db
      .select()
      .from(softwares)
      .orderBy(desc(softwares.createdAt))
      .limit(limit)).map((item) => ({
        id: item.id,
        titulo: item.titulo,
        createdAt: item.createdAt,
        tipo: "software" as const,
      }));

    const recentProjetos = (await db
      .select()
      .from(projetos)
      .orderBy(desc(projetos.createdAt))
      .limit(limit)).map((item) => ({
        id: item.id,
        titulo: item.titulo,
        createdAt: item.createdAt,
        tipo: "projeto" as const,
      }));

    const recentArtigos = (await db
      .select()
      .from(artigos)
      .orderBy(desc(artigos.createdAt))
      .limit(limit)).map((item) => ({
        id: item.id,
        titulo: item.titulo,
        createdAt: item.createdAt,
        tipo: "artigo" as const,
      }));

    // Combinar e ordenar
    const allContent = [
      ...recentLivros,
      ...recentSoftwares,
      ...recentProjetos,
      ...recentArtigos,
    ]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      .slice(0, limit);

    return allContent;
  } catch (error) {
    console.error("Erro ao buscar conteúdo recente:", error);
    return [];
  }
}

function tipoToLabel(tipo: ContentTipo): string {
  switch (tipo) {
    case "livro":
      return "livro";
    case "software":
      return "software";
    case "projeto":
      return "projeto";
    case "artigo":
    default:
      return "artigo";
  }
}

function tipoToAdminHref(tipo: ContentTipo, id: number): string {
  switch (tipo) {
    case "livro":
      return `/admin/livros/${id}/editar`;
    case "software":
      return `/admin/softwares/${id}/editar`;
    case "projeto":
      return `/admin/projetos/${id}/editar`;
    case "artigo":
    default:
      return `/admin/artigos/${id}/editar`;
  }
}

async function getPendingContentCount(): Promise<number> {
  const pendingStatuses = ["rascunho", "pendente"] as const;

  const [livrosPending, softwaresPending, projetosPending, artigosPending] =
    await Promise.all([
      db
        .select({ count: count() })
        .from(livros)
        .where(inArray(livros.status, pendingStatuses)),
      db
        .select({ count: count() })
        .from(softwares)
        .where(inArray(softwares.status, pendingStatuses)),
      db
        .select({ count: count() })
        .from(projetos)
        .where(inArray(projetos.status, pendingStatuses)),
      db
        .select({ count: count() })
        .from(artigos)
        .where(inArray(artigos.status, pendingStatuses)),
    ]);

  return (
    Number(livrosPending[0]?.count || 0) +
    Number(softwaresPending[0]?.count || 0) +
    Number(projetosPending[0]?.count || 0) +
    Number(artigosPending[0]?.count || 0)
  );
}

export async function getInternalNotifications(
  limit: number = 8,
): Promise<AdminInternalNotification[]> {
  try {
    const [recentContent, pendingCount] = await Promise.all([
      getRecentContent(Math.max(limit, 6)),
      getPendingContentCount(),
    ]);

    const contentNotifications: AdminInternalNotification[] = recentContent.map(
      (item) => ({
        id: `${item.tipo}-${item.id}`,
        tipo: item.tipo,
        titulo: item.titulo,
        descricao: `Novo ${tipoToLabel(item.tipo)} adicionado ao sistema.`,
        createdAt: new Date(item.createdAt).toISOString(),
        href: tipoToAdminHref(item.tipo, item.id),
      }),
    );

    const systemNotification: AdminInternalNotification[] =
      pendingCount > 0
        ? [
            {
              id: "sistema-pendencias",
              tipo: "sistema",
              titulo: `${pendingCount} itens pendentes`,
              descricao: "Existem conteúdos em rascunho ou pendentes de publicação.",
              createdAt: new Date().toISOString(),
              href: "/admin",
            },
          ]
        : [];

    return [...systemNotification, ...contentNotifications].slice(0, limit);
  } catch (error) {
    console.error("Erro ao buscar notificações internas:", error);
    return [];
  }
}
