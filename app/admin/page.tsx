// ==================== app/admin/page.tsx ====================
"use client";

import { StatsCard } from "@/components/admin/shared/StatsCard";
import {
  BookOpen, Code,
  Download,
  Eye,
  FileText,
  TrendingUp,
  Users,
  Wrench
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalLivros: 45,
    totalSoftwares: 12,
    totalProjetos: 8,
    totalArtigos: 23,
    totalViews: 45678,
    totalDownloads: 12453,
    activeUsers: 3421,
    avgRating: 4.6
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Aqui você pode chamar suas actions
        // const data = await getDashboardStats();
        // setStats(data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
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
          change={12.5}
          trend="up"
          icon={<BookOpen className="w-6 h-6" />}
          color="from-blue-500 to-blue-600"
          description={`${stats.totalLivros} livros publicados`}
        />

        <StatsCard
          title="Total de Softwares"
          value={stats.totalSoftwares}
          change={8.3}
          trend="up"
          icon={<Code className="w-6 h-6" />}
          color="from-purple-500 to-purple-600"
          description={`${stats.totalSoftwares} softwares cadastrados`}
        />

        <StatsCard
          title="Total de Projetos"
          value={stats.totalProjetos}
          change={15.7}
          trend="up"
          icon={<Wrench className="w-6 h-6" />}
          color="from-green-500 to-green-600"
          description={`${stats.totalProjetos} projetos ativos`}
        />

        <StatsCard
          title="Total de Artigos"
          value={stats.totalArtigos}
          change={5.2}
          trend="up"
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
          change={18.9}
          trend="up"
          icon={<Eye className="w-6 h-6" />}
          color="from-blue-500 to-indigo-600"
        />

        <StatsCard
          title="Total de Downloads"
          value={stats.totalDownloads.toLocaleString('pt-BR')}
          change={14.3}
          trend="up"
          icon={<Download className="w-6 h-6" />}
          color="from-purple-500 to-pink-600"
        />

        <StatsCard
          title="Usuários Ativos"
          value={stats.activeUsers.toLocaleString('pt-BR')}
          change={22.1}
          trend="up"
          icon={<Users className="w-6 h-6" />}
          color="from-green-500 to-emerald-600"
        />

        <StatsCard
          title="Avaliação Média"
          value={stats.avgRating.toFixed(1)}
          change={-2.1}
          trend="down"
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
          {[
            { action: "Novo livro publicado", title: "Machine Learning Avançado", time: "5 minutos atrás", type: "livro" },
            { action: "Software atualizado", title: "AutoCAD 2024", time: "1 hora atrás", type: "software" },
            { action: "Projeto aprovado", title: "Sistema IoT Residencial", time: "2 horas atrás", type: "projeto" },
            { action: "Artigo publicado", title: "Redes Neurais Profundas", time: "3 horas atrás", type: "artigo" },
          ].map((activity, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-4 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                activity.type === "livro" ? "bg-blue-100" :
                activity.type === "software" ? "bg-purple-100" :
                activity.type === "projeto" ? "bg-green-100" :
                "bg-orange-100"
              }`}>
                {activity.type === "livro" && <BookOpen className="w-5 h-5 text-blue-600" />}
                {activity.type === "software" && <Code className="w-5 h-5 text-purple-600" />}
                {activity.type === "projeto" && <Wrench className="w-5 h-5 text-green-600" />}
                {activity.type === "artigo" && <FileText className="w-5 h-5 text-orange-600" />}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-slate-900">{activity.title}</p>
                <p className="text-sm text-slate-500">{activity.action}</p>
              </div>
              <span className="text-xs text-slate-400">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
