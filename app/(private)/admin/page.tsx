// ==================== app/admin/page.tsx ====================

import { StatsCard } from "@/components/admin/shared/StatsCard";
import {
  BookOpen,
  Code,
  Download,
  Eye,
  FileText,
  TrendingUp,
  Users,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import { getDashboardStats, getRecentContent } from "@/lib/actions/adminDashboard";

export default async function AdminDashboardPage() {
  // Server component: dados carregados direto do banco (em paralelo)
  const [stats, recent] = await Promise.all([
    getDashboardStats(),
    getRecentContent(6),
  ]);

  return (
    <div className="space-y-8 ">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Dashboard
        </h1>
        <p className="text-slate-600">
          Visão geral da plataforma Star B
        </p>
      </div>

      {/* Stats Grid - Conteúdo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total de Livros"
          value={stats.totalLivros}
          icon={<BookOpen className="w-6 h-6" />}
          color="from-blue-500 to-blue-600"
          description={`${stats.totalLivros} livros publicados`}
        />

        <StatsCard
          title="Total de Softwares"
          value={stats.totalSoftwares}
          icon={<Code className="w-6 h-6" />}
          color="from-purple-500 to-purple-600"
          description={`${stats.totalSoftwares} softwares cadastrados`}
        />

        <StatsCard
          title="Total de Projetos"
          value={stats.totalProjetos}
          icon={<Wrench className="w-6 h-6" />}
          color="from-green-500 to-green-600"
          description={`${stats.totalProjetos} projetos ativos`}
        />

        <StatsCard
          title="Total de Artigos"
          value={stats.totalArtigos}
          icon={<FileText className="w-6 h-6" />}
          color="from-orange-500 to-orange-600"
          description={`${stats.totalArtigos} artigos publicados`}
        />
      </div>

      {/* Stats Grid - Engajamento */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total de Visualizações"
          value={stats.totalViews.toLocaleString('pt-BR')}
          icon={<Eye className="w-6 h-6" />}
          color="from-blue-500 to-indigo-600"
        />

        <StatsCard
          title="Total de Downloads"
          value={stats.totalDownloads.toLocaleString('pt-BR')}
          icon={<Download className="w-6 h-6" />}
          color="from-purple-500 to-pink-600"
        />

        <StatsCard
          title="Usuários Ativos"
          value={stats.activeUsers.toLocaleString('pt-BR')}
          icon={<Users className="w-6 h-6" />}
          color="from-green-500 to-emerald-600"
        />

        <StatsCard
          title="Avaliação Média"
          value={stats.avgRating.toFixed(1)}
          icon={<TrendingUp className="w-6 h-6" />}
          color="from-yellow-500 to-orange-600"
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
        <h2 className="text-xl font-bold text-slate-900 mb-4">
          Ações Rápidas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/admin/livros/novo"
            className="flex items-center gap-3 p-4 rounded-lg border-2 border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all group"
          >
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
              <BookOpen className="w-6 h-6 text-blue-600 group-hover:text-white" />
            </div>
            <div>
              <p className="font-semibold text-slate-900">Adicionar Livro</p>
              <p className="text-sm text-slate-500">Novo livro técnico</p>
            </div>
          </Link>

          <Link
            href="/admin/softwares/novo"
            className="flex items-center gap-3 p-4 rounded-lg border-2 border-slate-200 hover:border-purple-500 hover:bg-purple-50 transition-all group"
          >
            <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center group-hover:bg-purple-600 transition-colors">
              <Code className="w-6 h-6 text-purple-600 group-hover:text-white" />
            </div>
            <div>
              <p className="font-semibold text-slate-900">Adicionar Software</p>
              <p className="text-sm text-slate-500">Novo software</p>
            </div>
          </Link>

          <Link
            href="/admin/projetos/novo"
            className="flex items-center gap-3 p-4 rounded-lg border-2 border-slate-200 hover:border-green-500 hover:bg-green-50 transition-all group"
          >
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center group-hover:bg-green-600 transition-colors">
              <Wrench className="w-6 h-6 text-green-600 group-hover:text-white" />
            </div>
            <div>
              <p className="font-semibold text-slate-900">Adicionar Projeto</p>
              <p className="text-sm text-slate-500">Novo projeto</p>
            </div>
          </Link>

          <Link
            href="/admin/artigos/novo"
            className="flex items-center gap-3 p-4 rounded-lg border-2 border-slate-200 hover:border-orange-500 hover:bg-orange-50 transition-all group"
          >
            <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center group-hover:bg-orange-600 transition-colors">
              <FileText className="w-6 h-6 text-orange-600 group-hover:text-white" />
            </div>
            <div>
              <p className="font-semibold text-slate-900">Adicionar Artigo</p>
              <p className="text-sm text-slate-500">Novo artigo</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-900">
            Atividade Recente
          </h2>
          <Link
            href="/admin/analytics"
            className="text-sm text-blue-600 hover:text-blue-700 font-semibold"
          >
            Ver Analytics Completo →
          </Link>
        </div>

        <div className="space-y-4">
          {recent.length === 0 && (
            <p className="text-sm text-slate-500">Nenhuma atividade recente.</p>
          )}
          {recent.map((activity) => (
            <div
              key={`${activity.tipo}-${activity.id}`}
              className="flex items-center gap-4 p-4 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  activity.tipo === "livro"
                    ? "bg-blue-100"
                    : activity.tipo === "software"
                      ? "bg-purple-100"
                      : activity.tipo === "projeto"
                        ? "bg-green-100"
                        : "bg-orange-100"
                }`}
              >
                {activity.tipo === "livro" && (
                  <BookOpen className="w-5 h-5 text-blue-600" />
                )}
                {activity.tipo === "software" && (
                  <Code className="w-5 h-5 text-purple-600" />
                )}
                {activity.tipo === "projeto" && (
                  <Wrench className="w-5 h-5 text-green-600" />
                )}
                {activity.tipo === "artigo" && (
                  <FileText className="w-5 h-5 text-orange-600" />
                )}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-slate-900">
                  {activity.titulo}
                </p>
                <p className="text-sm text-slate-500">
                  {labelFromTipo(activity.tipo)}
                </p>
              </div>
              <span className="text-xs text-slate-400">
                {formatRelativeTime(activity.createdAt)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function labelFromTipo(tipo: "livro" | "software" | "projeto" | "artigo") {
  switch (tipo) {
    case "livro":
      return "Novo livro publicado";
    case "software":
      return "Software atualizado";
    case "projeto":
      return "Projeto adicionado";
    case "artigo":
    default:
      return "Artigo publicado";
  }
}

function formatRelativeTime(date: string | Date) {
  const d = new Date(date);
  const diff = Date.now() - d.getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "agora";
  if (minutes < 60) return `${minutes} min atrás`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} h atrás`;
  const days = Math.floor(hours / 24);
  return `${days} d atrás`;
}
