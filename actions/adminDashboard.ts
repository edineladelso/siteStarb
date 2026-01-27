
// ==================== actions/dashboard.ts ====================
"use server";

import { db } from "@/lib/drizzle/db";
import { livros, softwares, projetos, artigos } from "@/lib/drizzle/db/schema";
import { count, sum, avg, eq, or, desc } from "drizzle-orm";
import { sql } from "drizzle-orm";

export async function getDashboardStats() {
  try {
    // Contar totais
    const [livrosCount] = await db.select({ count: count() }).from(livros);
    const [softwaresCount] = await db.select({ count: count() }).from(softwares);
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

    const avgRating = (
      (Number(livrosMetrics.avgRating) || 0) +
      (Number(softwaresMetrics.avgRating) || 0) +
      (Number(projetosMetrics.avgRating) || 0) +
      (Number(artigosMetrics.avgRating) || 0)
    ) / 4;

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

export async function getRecentContent(limit: number = 10) {
  try {
    // Buscar conteúdo recente de cada tipo
    const recentLivros = await db
      .select()
      .from(livros)
      .orderBy(desc(livros.dataCriacao))
      .limit(limit);

    const recentSoftwares = await db
      .select()
      .from(softwares)
      .orderBy(desc(softwares.dataCriacao))
      .limit(limit);

    const recentProjetos = await db
      .select()
      .from(projetos)
      .orderBy(desc(projetos.dataCriacao))
      .limit(limit);

    const recentArtigos = await db
      .select()
      .from(artigos)
      .orderBy(desc(artigos.dataCriacao))
      .limit(limit);

    // Combinar e ordenar
    const allContent = [
      ...recentLivros,
      ...recentSoftwares,
      ...recentProjetos,
      ...recentArtigos,
    ]
      .sort((a, b) => 
        new Date(b.dataCriacao).getTime() - new Date(a.dataCriacao).getTime()
      )
      .slice(0, limit);

    return allContent;
  } catch (error) {
    console.error("Erro ao buscar conteúdo recente:", error);
    return [];
  }
}