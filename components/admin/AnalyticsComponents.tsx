// ============================================================================
// MAIN ANALYTICS COMPONENT
// ============================================================================
"use client";

import type {
  AnalyticsDatas,
  AnalyticsFilters
} from "@/lib/types";
import {
  BookOpen,
  Calendar,
  Code,
  Download,
  Eye,
  FileText,
  Filter,
  RefreshCw,
  TrendingDown,
  TrendingUp,
  Users,
  Wrench
} from "lucide-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import AnalyticsService from "./AnaliticsServices";
import { ChartCard, MetricCard } from "./charts";

const AnalyticsComponent: React.FC = () => {
  const [data, setData] = useState<AnalyticsDatas | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<AnalyticsFilters>({
    period: 30,
    contentType: "all",
  });
  const [autoRefresh, setAutoRefresh] = useState(false);

  const analyticsService = useMemo(() => AnalyticsService.getInstance(), []);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await analyticsService.getAnalyticsData(filters);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar dados");
    } finally {
      setLoading(false);
    }
  }, [analyticsService, filters]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        analyticsService.clearCache();
        loadData();
      }, 60000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh, analyticsService, loadData]);

  const CHART_COLORS = [
    "#3b82f6",
    "#8b5cf6",
    "#ec4899",
    "#f59e0b",
    "#10b981",
    "#6366f1",
  ];

  const contentTypeIcons = {
    livro: <BookOpen className="h-5 w-5" />,
    software: <Code className="h-5 w-5" />,
    projeto: <Wrench className="h-5 w-5" />,
    artigo: <FileText className="h-5 w-5" />,
  };

  if (loading && !data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30">
        <div className="text-center">
          <RefreshCw className="mx-auto mb-4 h-12 w-12 animate-spin text-blue-600" />
          <p className="text-lg font-medium text-slate-600">
            Carregando analytics...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30">
        <div className="max-w-md rounded-xl border border-red-200 bg-red-50 p-8">
          <h2 className="mb-3 text-xl font-bold text-red-800">
            Erro ao Carregar
          </h2>
          <p className="mb-6 text-red-600">{error}</p>
          <button
            onClick={loadData}
            className="w-full rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-red-700"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="mb-2 text-3xl font-bold text-slate-900">
                Analytics Dashboard
              </h1>
              <p className="text-slate-600">
                Última atualização:{" "}
                {new Date(data.lastUpdated).toLocaleString("pt-BR")}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Period Filter */}
              <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2">
                <Calendar
                  className="h-5 w-5 text-slate-500"
                  aria-hidden="true"
                />
                <select
                  value={filters.period}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      period: Number(e.target.value) as 7 | 30 | 90,
                    })
                  }
                  className="cursor-pointer border-none bg-transparent text-sm font-medium text-slate-700 outline-none"
                  aria-label="Selecionar período"
                >
                  <option value={7}>Últimos 7 dias</option>
                  <option value={30}>Últimos 30 dias</option>
                  <option value={90}>Últimos 90 dias</option>
                </select>
              </div>

              {/* Content Type Filter */}
              <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2">
                <Filter className="h-5 w-5 text-slate-500" aria-hidden="true" />
                <select
                  value={filters.contentType || "all"}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      contentType: e.target.value as any,
                    })
                  }
                  className="cursor-pointer border-none bg-transparent text-sm font-medium text-slate-700 outline-none"
                  aria-label="Filtrar por tipo de conteúdo"
                >
                  <option value="all">Todos os tipos</option>
                  <option value="livro">Livros</option>
                  <option value="software">Softwares</option>
                  <option value="projeto">Projetos</option>
                  <option value="artigo">Artigos</option>
                </select>
              </div>

              {/* Auto Refresh */}
              <button
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={`flex items-center gap-2 rounded-lg border px-4 py-2 transition-all ${
                  autoRefresh
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
                aria-pressed={autoRefresh}
              >
                <RefreshCw
                  className={`h-4 w-4 ${autoRefresh ? "animate-spin" : ""}`}
                />
                <span className="text-sm font-medium">Auto-refresh</span>
              </button>

              {/* Manual Refresh */}
              <button
                onClick={() => {
                  analyticsService.clearCache();
                  loadData();
                }}
                disabled={loading}
                className="rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 font-medium text-white shadow-lg transition-all hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl disabled:opacity-50"
              >
                <RefreshCw
                  className={`mr-2 inline h-4 w-4 ${loading ? "animate-spin" : ""}`}
                />
                Atualizar
              </button>
            </div>
          </div>
        </header>

        {/* Overview Metrics */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Total de Visualizações"
            value={data.overview.totalViews}
            change={12.5}
            trend="up"
            icon={<Eye className="h-6 w-6" />}
            color="from-blue-500 to-blue-600"
          />
          <MetricCard
            title="Total de Downloads"
            value={data.overview.totalDownloads}
            change={8.3}
            trend="up"
            icon={<Download className="h-6 w-6" />}
            color="from-purple-500 to-purple-600"
          />
          <MetricCard
            title="Usuários Ativos"
            value={data.overview.activeUsers}
            change={15.7}
            trend="up"
            icon={<Users className="h-6 w-6" />}
            color="from-green-500 to-green-600"
          />
          <MetricCard
            title="Avaliação Média"
            value={data.overview.avgRating.toFixed(1)}
            change={2.1}
            trend="down"
            icon={<TrendingUp className="h-6 w-6" />}
            color="from-orange-500 to-orange-600"
          />
        </div>

        {/* Time Series Chart */}
        <ChartCard
          title="Tendência ao Longo do Tempo"
          description="Visualizações, downloads e usuários ativos"
        >
          <div role="img" aria-label="Gráfico de tendências">
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={data.timeSeries}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient
                    id="colorDownloads"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="date"
                  stroke="#64748b"
                  style={{ fontSize: "12px" }}
                />
                <YAxis stroke="#64748b" style={{ fontSize: "12px" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="views"
                  stroke="#3b82f6"
                  fillOpacity={1}
                  fill="url(#colorViews)"
                  strokeWidth={2}
                  name="Visualizações"
                />
                <Area
                  type="monotone"
                  dataKey="downloads"
                  stroke="#8b5cf6"
                  fillOpacity={1}
                  fill="url(#colorDownloads)"
                  strokeWidth={2}
                  name="Downloads"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Charts Grid */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Categories Distribution */}
          <ChartCard title="Distribuição por Categoria">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data.categories}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry: any) => `${entry.name} ${entry.percentage}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {data.categories.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={CHART_COLORS[index % CHART_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Content Type Metrics */}
          <ChartCard title="Métricas por Tipo de Conteúdo">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.contentTypeMetrics}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="tipo"
                  stroke="#64748b"
                  style={{ fontSize: "12px" }}
                />
                <YAxis stroke="#64748b" style={{ fontSize: "12px" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar
                  dataKey="views"
                  fill="#3b82f6"
                  name="Visualizações"
                  radius={[8, 8, 0, 0]}
                />
                <Bar
                  dataKey="downloads"
                  fill="#8b5cf6"
                  name="Downloads"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* Top Content Table */}
        <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-slate-900">
              Conteúdo Mais Popular
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Ranking baseado em visualizações e downloads
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full" role="table">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="px-4 py-4 text-left text-sm font-bold text-slate-700">
                    Posição
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-bold text-slate-700">
                    Título
                  </th>
                  <th className="px-4 py-4 text-left text-sm font-bold text-slate-700">
                    Tipo
                  </th>
                  <th className="px-4 py-4 text-right text-sm font-bold text-slate-700">
                    Visualizações
                  </th>
                  <th className="px-4 py-4 text-right text-sm font-bold text-slate-700">
                    Downloads
                  </th>
                  <th className="px-4 py-4 text-right text-sm font-bold text-slate-700">
                    Conversão
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.topContent.map((item, index) => {
                  const conversion = (
                    (item.downloads / item.views) *
                    100
                  ).toFixed(1);
                  return (
                    <tr
                      key={index}
                      className="border-b border-slate-100 transition-colors hover:bg-slate-50"
                    >
                      <td className="px-4 py-4">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold ${
                            index === 0
                              ? "bg-yellow-100 text-yellow-700"
                              : index === 1
                                ? "bg-slate-200 text-slate-700"
                                : index === 2
                                  ? "bg-orange-100 text-orange-700"
                                  : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {index + 1}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <p className="font-semibold text-slate-900">
                          {item.title}
                        </p>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                            {
                              contentTypeIcons[
                                item.tipo as keyof typeof contentTypeIcons
                              ]
                            }
                          </div>
                          <span className="text-sm font-medium text-slate-700 capitalize">
                            {item.tipo}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <span
                          className={`inline-flex items-center rounded-lg px-3 py-1 text-sm font-semibold ${
                            parseFloat(conversion) >= 30
                              ? "bg-green-100 text-green-700"
                              : parseFloat(conversion) >= 20
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                          }`}
                        >
                          {conversion}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Content Type Summary Cards */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {data.contentTypeMetrics.map((metric, index) => (
            <div
              key={metric.tipo}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg"
            >
              <div className="mb-4 flex items-center justify-between">
                <div
                  className={`h-12 w-12 rounded-xl bg-gradient-to-br ${
                    CHART_COLORS[index] === "#3b82f6"
                      ? "from-blue-500 to-blue-600"
                      : CHART_COLORS[index] === "#8b5cf6"
                        ? "from-purple-500 to-purple-600"
                        : CHART_COLORS[index] === "#ec4899"
                          ? "from-pink-500 to-pink-600"
                          : "from-orange-500 to-orange-600"
                  } flex items-center justify-center text-white shadow-lg`}
                >
                  {
                    contentTypeIcons[
                      metric.tipo as keyof typeof contentTypeIcons
                    ]
                  }
                </div>
                <span className="text-3xl font-bold text-slate-900">
                  {metric.total}
                </span>
              </div>

              <h4 className="mb-3 text-lg font-bold text-slate-900 capitalize">
                {metric.tipo}s
              </h4>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Visualizações</span>
                  <span className="font-semibold text-slate-900">
                    {metric.views.toLocaleString("pt-BR")}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Downloads</span>
                  <span className="font-semibold text-slate-900">
                    {metric.downloads.toLocaleString("pt-BR")}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Avaliação</span>
                  <span className="flex items-center gap-1 font-semibold text-yellow-600">
                    <svg
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {metric.avgRating.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Insights */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Conversion Rate Card */}
          <div className="rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 p-6 text-white shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold">Taxa de Conversão</h3>
              <TrendingUp className="h-8 w-8 opacity-80" />
            </div>
            <p className="mb-2 text-4xl font-bold">
              {data.overview.conversionRate}%
            </p>
            <p className="text-sm text-green-100">
              De visualizações para downloads
            </p>
            <div className="mt-4 border-t border-green-400/30 pt-4">
              <p className="text-sm text-green-100">
                <span className="font-semibold">Meta: 30%</span> • Faltam{" "}
                {(30 - data.overview.conversionRate).toFixed(1)}% para atingir
              </p>
            </div>
          </div>

          {/* Total Content Card */}
          <div className="rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 p-6 text-white shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold">Total de Conteúdo</h3>
              <BookOpen className="h-8 w-8 opacity-80" />
            </div>
            <p className="mb-2 text-4xl font-bold">
              {data.overview.totalContent}
            </p>
            <p className="text-sm text-blue-100">
              Itens publicados na plataforma
            </p>
            <div className="mt-4 border-t border-blue-400/30 pt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-blue-100">Média por categoria</span>
                <span className="font-semibold">
                  {Math.floor(
                    data.overview.totalContent / data.categories.length,
                  )}{" "}
                  itens
                </span>
              </div>
            </div>
          </div>

          {/* User Engagement Card */}
          <div className="rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 p-6 text-white shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold">Engajamento</h3>
              <Users className="h-8 w-8 opacity-80" />
            </div>
            <p className="mb-2 text-4xl font-bold">
              {(data.overview.totalViews / data.overview.activeUsers).toFixed(
                1,
              )}
            </p>
            <p className="text-sm text-purple-100">
              Visualizações por usuário ativo
            </p>
            <div className="mt-4 border-t border-purple-400/30 pt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-purple-100">Downloads por usuário</span>
                <span className="font-semibold">
                  {(
                    data.overview.totalDownloads / data.overview.activeUsers
                  ).toFixed(1)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Indicators */}
        <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-slate-900">
              Indicadores de Performance
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Métricas de crescimento comparadas ao período anterior
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {data.growth.map((metric, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-lg border-2 border-slate-200 p-4 transition-all hover:border-blue-300"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-600">
                    {metric.metric}
                  </span>
                  {metric.trend === "up" ? (
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100">
                      <TrendingUp className="h-5 w-5 text-green-600" />
                    </div>
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-100">
                      <TrendingDown className="h-5 w-5 text-red-600" />
                    </div>
                  )}
                </div>

                <p className="mb-2 text-2xl font-bold text-slate-900">
                  {metric.value.toLocaleString("pt-BR")}
                </p>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-sm font-semibold ${
                      metric.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {metric.trend === "up" ? "+" : "-"}
                    {Math.abs(metric.change)}%
                  </span>
                  <span className="text-xs text-slate-500">
                    vs período anterior
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      metric.trend === "up" ? "bg-green-500" : "bg-red-500"
                    }`}
                    style={{
                      width: `${Math.min(Math.abs(metric.change) * 5, 100)}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer Info */}
        <div className="mt-8 rounded-xl border border-blue-100 bg-blue-50 p-6">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-600">
              <svg
                className="h-6 w-6 text-white"
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
            </div>
            <div className="flex-1">
              <h4 className="mb-2 font-bold text-blue-900">
                Sobre os Dados de Analytics
              </h4>
              <p className="text-sm leading-relaxed text-blue-800">
                Os dados apresentados são atualizados em tempo real e refletem
                as métricas de toda a plataforma Star B. As estatísticas incluem
                visualizações, downloads, avaliações e engajamento de usuários.
                Use os filtros acima para personalizar a visualização por
                período ou tipo de conteúdo.
              </p>
              <div className="mt-3 flex items-center gap-4 text-xs text-blue-700">
                <span className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-blue-600"></div>
                  Dados em cache por 5 minutos
                </span>
                <span className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-green-600"></div>
                  Auto-refresh disponível
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsComponent;
