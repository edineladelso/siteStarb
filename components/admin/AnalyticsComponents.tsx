"use client";

import type { AnalyticsData, AnalyticsFilters } from "@/lib/types";
import type { TipoConteudo } from "@/lib/domain";
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
  Wrench,
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
  YAxis,
  type PieLabelRenderProps,
} from "recharts";
import AnalyticsService from "./AnaliticsServices";
import { ChartCard, MetricCard } from "./charts";

/**
 * Cores consistentes para os gráficos
 */
const CHART_COLORS = [
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
  "#f59e0b",
  "#10b981",
  "#6366f1",
] as const;

/**
 * Mapeamento de ícones por tipo de conteúdo
 */
const CONTENT_TYPE_ICONS: Record<string, React.ReactNode> = {
  livro: <BookOpen className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />,
  software: <Code className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />,
  projeto: <Wrench className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />,
  artigo: <FileText className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />,
};

/**
 * Mapeamento de cores de gradiente por índice
 */
const GRADIENT_COLORS = [
  "from-blue-500 to-blue-600",
  "from-purple-500 to-purple-600",
  "from-pink-500 to-pink-600",
  "from-amber-500 to-amber-600",
  "from-emerald-500 to-emerald-600",
  "from-indigo-500 to-indigo-600",
] as const;

/**
 * Componente principal de Analytics Dashboard
 * Completamente responsivo com abordagem mobile-first
 */
const AnalyticsComponent: React.FC = () => {
  // ==================== ESTADO ====================
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<AnalyticsFilters>({
    period: 30,
    contentType: "all",
  });
  const [autoRefresh, setAutoRefresh] = useState<boolean>(false);

  const analyticsService = useMemo(() => AnalyticsService.getInstance(), []);

  // ==================== HANDLERS ====================
  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await analyticsService.getAnalyticsData(filters);
      setData(result);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Erro ao carregar dados";
      setError(errorMessage);
      console.error("Erro ao carregar analytics:", err);
    } finally {
      setLoading(false);
    }
  }, [analyticsService, filters]);

  const handleManualRefresh = useCallback(() => {
    analyticsService.clearCache();
    loadData();
  }, [analyticsService, loadData]);

  const handlePeriodChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setFilters((prev) => ({
        ...prev,
        period: Number(e.target.value) as 7 | 30 | 90,
      }));
    },
    [],
  );

  const handleContentTypeChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setFilters((prev) => ({
        ...prev,
        contentType: e.target.value as TipoConteudo,
      }));
    },
    [],
  );

  const handleAutoRefreshToggle = useCallback(() => {
    setAutoRefresh((prev) => !prev);
  }, []);

  // ==================== EFEITOS ====================
  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      analyticsService.clearCache();
      loadData();
    }, 60000);

    return () => clearInterval(interval);
  }, [autoRefresh, analyticsService, loadData]);

  // ==================== RENDERIZAÇÃO CONDICIONAL ====================
  if (loading && !data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 px-4">
        <div className="text-center">
          <RefreshCw
            className="mx-auto mb-4 h-10 w-10 animate-spin text-blue-600 sm:h-12 sm:w-12"
            aria-hidden="true"
          />
          <p className="text-base font-medium text-slate-600 sm:text-lg">
            Carregando analytics...
          </p>
          <p className="sr-only">Carregando dados de analytics</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-slate-50 via-blue-50/30 to-indigo-50/30 p-4">
        <div
          className="w-full max-w-md rounded-xl border border-red-200 bg-red-50 p-6 shadow-lg"
          role="alert"
          aria-live="assertive"
        >
          <h2 className="mb-3 text-lg font-bold text-red-800 sm:text-xl">
            Erro ao Carregar
          </h2>
          <p className="mb-6 text-sm text-red-600 sm:text-base">{error}</p>
          <button
            onClick={handleManualRefresh}
            className="w-full rounded-lg bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-red-700 hover:shadow-lg focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none sm:text-base"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  if (!data) return null;

  // ==================== RENDER PRINCIPAL ====================
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50/30 to-indigo-50/30">
      {/* Container com padding responsivo */}
      <div className="mx-auto w-full max-w-7xl px-3 py-4 sm:px-4 sm:py-6 md:px-6 md:py-8">
        {/* ==================== HEADER ==================== */}
        <header className="mb-4 sm:mb-6 md:mb-8">
          <div className="space-y-4">
            {/* Título */}
            <div>
              <h1 className="mb-1 text-xl font-bold text-slate-900 sm:mb-2 sm:text-2xl md:text-3xl">
                Analytics Dashboard
              </h1>
              <p className="text-xs text-slate-600 sm:text-sm md:text-base">
                Atualizado:{" "}
                <time dateTime={new Date(data.lastUpdated).toISOString()}>
                  {new Date(data.lastUpdated).toLocaleString("pt-BR", {
                    dateStyle: "short",
                    timeStyle: "short",
                  })}
                </time>
              </p>
            </div>

            {/* Filtros - Stack em mobile, flex em desktop */}
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
              {/* Filtro de Período */}
              <div className="flex w-full items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm sm:w-auto">
                <Calendar
                  className="h-4 w-4 flex-shrink-0 text-slate-500 sm:h-5 sm:w-5"
                  aria-hidden="true"
                />
                <label htmlFor="period-filter" className="sr-only">
                  Selecionar período
                </label>
                <select
                  id="period-filter"
                  value={filters.period}
                  onChange={handlePeriodChange}
                  className="w-full cursor-pointer border-none bg-transparent text-xs font-medium text-slate-700 outline-none focus:ring-0 sm:w-auto sm:text-sm"
                >
                  <option value={7}>Últimos 7 dias</option>
                  <option value={30}>Últimos 30 dias</option>
                  <option value={90}>Últimos 90 dias</option>
                </select>
              </div>

              {/* Filtro de Tipo de Conteúdo */}
              <div className="flex w-full items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-sm sm:w-auto">
                <Filter
                  className="h-4 w-4 flex-shrink-0 text-slate-500 sm:h-5 sm:w-5"
                  aria-hidden="true"
                />
                <label htmlFor="content-type-filter" className="sr-only">
                  Filtrar por tipo de conteúdo
                </label>
                <select
                  id="content-type-filter"
                  value={filters.contentType || "all"}
                  onChange={handleContentTypeChange}
                  className="w-full cursor-pointer border-none bg-transparent text-xs font-medium text-slate-700 outline-none focus:ring-0 sm:w-auto sm:text-sm"
                >
                  <option value="all">Todos os tipos</option>
                  <option value="livro">Livros</option>
                  <option value="software">Softwares</option>
                  <option value="projeto">Projetos</option>
                  <option value="artigo">Artigos</option>
                </select>
              </div>

              {/* Botões de Ação */}
              <div className="flex w-full gap-2 sm:w-auto sm:gap-3">
                {/* Auto Refresh */}
                <button
                  onClick={handleAutoRefreshToggle}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium shadow-sm transition-all focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none sm:flex-none sm:text-sm ${
                    autoRefresh
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  }`}
                  aria-pressed={autoRefresh}
                >
                  <RefreshCw
                    className={`h-4 w-4 ${autoRefresh ? "animate-spin" : ""}`}
                    aria-hidden="true"
                  />
                  <span>Auto</span>
                </button>

                {/* Atualização Manual */}
                <button
                  onClick={handleManualRefresh}
                  disabled={loading}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-xs font-medium text-white shadow-md transition-all hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none sm:text-sm"
                >
                  <RefreshCw
                    className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
                    aria-hidden="true"
                  />
                  <span>Atualizar</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* ==================== MÉTRICAS PRINCIPAIS ==================== */}
        <section
          className="mb-4 grid grid-cols-2 gap-3 sm:mb-6 sm:gap-4 md:mb-8 lg:grid-cols-4 lg:gap-6"
          aria-label="Métricas principais"
        >
          <MetricCard
            title="Visualizações"
            value={data.overview.totalViews}
            change={12.5}
            trend="up"
            icon={<Eye className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />}
            color="from-blue-500 to-blue-600"
          />
          <MetricCard
            title="Downloads"
            value={data.overview.totalDownloads}
            change={8.3}
            trend="up"
            icon={
              <Download className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
            }
            color="from-purple-500 to-purple-600"
          />
          <MetricCard
            title="Usuários"
            value={data.overview.activeUsers}
            change={15.7}
            trend="up"
            icon={
              <Users className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
            }
            color="from-emerald-500 to-emerald-600"
          />
          <MetricCard
            title="Avaliação"
            value={data.overview.avgRating.toFixed(1)}
            change={2.1}
            trend="down"
            icon={
              <TrendingUp
                className="h-5 w-5 sm:h-6 sm:w-6"
                aria-hidden="true"
              />
            }
            color="from-amber-500 to-amber-600"
          />
        </section>

        {/* ==================== GRÁFICO DE TENDÊNCIAS ==================== */}
        <section className="mb-4 sm:mb-6 md:mb-8">
          <ChartCard
            title="Tendências"
            description="Visualizações e downloads ao longo do tempo"
          >
            <div role="img" aria-label="Gráfico de tendências">
              <ResponsiveContainer
                width="100%"
                height={250}
                className="sm:h-[300px] md:h-[350px]"
              >
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
                    style={{ fontSize: "10px" }}
                    tick={{ fill: "#64748b" }}
                    className="sm:text-xs"
                  />
                  <YAxis
                    stroke="#64748b"
                    style={{ fontSize: "10px" }}
                    tick={{ fill: "#64748b" }}
                    className="sm:text-xs"
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      fontSize: "12px",
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: "12px" }} />
                  <Area
                    type="monotone"
                    dataKey="views"
                    stroke="#3b82f6"
                    fillOpacity={1}
                    fill="url(#colorViews)"
                    strokeWidth={2}
                    name="Views"
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
        </section>

        {/* ==================== GRÁFICOS DE DISTRIBUIÇÃO ==================== */}
        <div className="mb-4 space-y-4 sm:mb-6 sm:space-y-6 md:mb-8 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
          {/* Distribuição por Categoria */}
          <ChartCard title="Por Categoria">
            <ResponsiveContainer
              width="100%"
              height={250}
              className="sm:h-[280px] md:h-[300px]"
            >
              <PieChart>
                <Pie
                  data={data.categories}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(props: PieLabelRenderProps) => {
                    const { name, percent } = props;
                    return `${name} ${((percent ?? 0) * 100).toFixed(0)}%`;
                  }}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                  style={{ fontSize: "11px" }}
                  className="sm:text-xs"
                >
                  {data.categories.map((entry, index) => (
                    <Cell
                      key={`cell-${entry.name}-${index}`}
                      fill={CHART_COLORS[index % CHART_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ fontSize: "12px" }} />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          {/* Métricas por Tipo */}
          <ChartCard title="Por Tipo">
            <ResponsiveContainer
              width="100%"
              height={250}
              className="sm:h-[280px] md:h-[300px]"
            >
              <BarChart data={data.contentTypeMetrics}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="tipo"
                  stroke="#64748b"
                  style={{ fontSize: "10px" }}
                  tick={{ fill: "#64748b" }}
                  className="sm:text-xs"
                />
                <YAxis
                  stroke="#64748b"
                  style={{ fontSize: "10px" }}
                  tick={{ fill: "#64748b" }}
                  className="sm:text-xs"
                />
                <Tooltip contentStyle={{ fontSize: "12px" }} />
                <Legend
                  wrapperStyle={{ fontSize: "11px" }}
                  className="sm:text-xs"
                />
                <Bar
                  dataKey="views"
                  fill="#3b82f6"
                  name="Views"
                  radius={[6, 6, 0, 0]}
                />
                <Bar
                  dataKey="downloads"
                  fill="#8b5cf6"
                  name="Downloads"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>

        {/* ==================== TABELA DE CONTEÚDO POPULAR ==================== */}
        <section className="mb-4 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm sm:mb-6 md:mb-8">
          <div className="p-3 sm:p-4 md:p-6">
            <div className="mb-3 sm:mb-4 md:mb-6">
              <h3 className="text-base font-bold text-slate-900 sm:text-lg">
                Mais Populares
              </h3>
              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                Top conteúdos por visualizações
              </p>
            </div>

            {/* Versão Mobile - Cards */}
            <div className="space-y-2 sm:hidden">
              {data.topContent.map((item, index) => {
                const conversion = (
                  (item.downloads / item.views) *
                  100
                ).toFixed(1);
                return (
                  <div
                    key={`${item.title}-${index}`}
                    className="rounded-lg border border-slate-200 bg-slate-50 p-3"
                  >
                    <div className="mb-2 flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div
                          className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg text-xs font-bold ${
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
                        <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-600">
                          {
                            CONTENT_TYPE_ICONS[
                              item.tipo as keyof typeof CONTENT_TYPE_ICONS
                            ]
                          }
                        </div>
                      </div>
                      <span
                        className={`inline-flex flex-shrink-0 items-center rounded-lg px-2 py-1 text-xs font-semibold ${
                          parseFloat(conversion) >= 30
                            ? "bg-emerald-100 text-emerald-700"
                            : parseFloat(conversion) >= 20
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {conversion}%
                      </span>
                    </div>
                    <p className="mb-2 line-clamp-2 text-sm font-semibold text-slate-900">
                      {item.title}
                    </p>
                    <div className="flex items-center justify-between text-xs text-slate-600">
                      <span className="capitalize">{item.tipo}</span>
                      <div className="flex items-center gap-3">
                        <span>{item.views.toLocaleString("pt-BR")} views</span>
                        <span>
                          {item.downloads.toLocaleString("pt-BR")} downloads
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Versão Desktop - Tabela */}
            <div className="hidden overflow-x-auto sm:block">
              <table className="w-full" role="table">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="px-3 py-3 text-left text-xs font-bold text-slate-700 md:px-4 md:text-sm">
                      #
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-bold text-slate-700 md:px-4 md:text-sm">
                      Título
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-bold text-slate-700 md:px-4 md:text-sm">
                      Tipo
                    </th>
                    <th className="px-3 py-3 text-right text-xs font-bold text-slate-700 md:px-4 md:text-sm">
                      Views
                    </th>
                    <th className="hidden px-4 py-3 text-right text-sm font-bold text-slate-700 lg:table-cell">
                      Downloads
                    </th>
                    <th className="px-3 py-3 text-right text-xs font-bold text-slate-700 md:px-4 md:text-sm">
                      Conv.
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
                        key={`${item.title}-${index}`}
                        className="border-b border-slate-100 transition-colors hover:bg-slate-50"
                      >
                        <td className="px-3 py-3 md:px-4">
                          <div
                            className={`flex h-6 w-6 items-center justify-center rounded-lg text-xs font-bold md:h-8 md:w-8 md:text-sm ${
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
                        <td className="px-3 py-3 md:px-4">
                          <p className="max-w-xs truncate text-xs font-semibold text-slate-900 md:text-sm">
                            {item.title}
                          </p>
                        </td>
                        <td className="px-3 py-3 md:px-4">
                          <div className="flex items-center gap-2">
                            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-50 text-blue-600 md:h-8 md:w-8">
                              {
                                CONTENT_TYPE_ICONS[
                                  item.tipo as keyof typeof CONTENT_TYPE_ICONS
                                ]
                              }
                            </div>
                            <span className="hidden text-xs font-medium text-slate-700 capitalize md:inline md:text-sm">
                              {item.tipo}
                            </span>
                          </div>
                        </td>
                        <td className="px-3 py-3 text-right text-xs md:px-4 md:text-sm">
                          <span className="font-semibold text-slate-900">
                            {item.views.toLocaleString("pt-BR")}
                          </span>
                        </td>
                        <td className="hidden px-4 py-3 text-right lg:table-cell">
                          <span className="text-sm font-semibold text-slate-900">
                            {item.downloads.toLocaleString("pt-BR")}
                          </span>
                        </td>
                        <td className="px-3 py-3 text-right md:px-4">
                          <span
                            className={`inline-flex items-center rounded-lg px-2 py-1 text-xs font-semibold md:px-3 ${
                              parseFloat(conversion) >= 30
                                ? "bg-emerald-100 text-emerald-700"
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
          </div>
        </section>

        {/* ==================== CARDS DE RESUMO POR TIPO ==================== */}
        <section
          className="mb-4 grid grid-cols-2 gap-3 sm:mb-6 sm:gap-4 md:mb-8 md:gap-6 lg:grid-cols-4"
          aria-label="Resumo por tipo"
        >
          {data.contentTypeMetrics.map((metric, index) => (
            <div
              key={metric.tipo}
              className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition-all duration-300 hover:shadow-lg sm:p-4 md:p-6"
            >
              <div className="mb-3 flex items-center justify-between md:mb-4">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-xl bg-linear-to-br text-white shadow-md sm:h-10 sm:w-10 md:h-12 md:w-12 ${
                    GRADIENT_COLORS[index % GRADIENT_COLORS.length]
                  }`}
                >
                  {
                    CONTENT_TYPE_ICONS[
                      metric.tipo as keyof typeof CONTENT_TYPE_ICONS
                    ]
                  }
                </div>
                <span className="text-xl font-bold text-slate-900 sm:text-2xl md:text-3xl">
                  {metric.total}
                </span>
              </div>

              <h4 className="mb-2 text-sm font-bold text-slate-900 capitalize sm:text-base md:mb-3 md:text-lg">
                {metric.tipo}s
              </h4>

              <div className="space-y-1 sm:space-y-2">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-slate-600">Views</span>
                  <span className="font-semibold text-slate-900">
                    {metric.views > 999
                      ? `${(metric.views / 1000).toFixed(1)}k`
                      : metric.views}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-slate-600">Downloads</span>
                  <span className="font-semibold text-slate-900">
                    {metric.downloads > 999
                      ? `${(metric.downloads / 1000).toFixed(1)}k`
                      : metric.downloads}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-slate-600">Rating</span>
                  <span className="flex items-center gap-1 font-semibold text-yellow-600">
                    <svg
                      className="h-3 w-3 sm:h-4 sm:w-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {metric.avgRating.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* ==================== CARDS DE INSIGHTS ==================== */}
        <section
          className="mb-4 space-y-3 sm:mb-6 sm:space-y-4 md:mb-8 md:space-y-6 lg:grid lg:grid-cols-3 lg:gap-6 lg:space-y-0"
          aria-label="Insights"
        >
          {/* Taxa de Conversão */}
          <div className="rounded-xl bg-linear-to-br from-emerald-500 to-emerald-600 p-4 text-white shadow-lg sm:p-5 md:p-6">
            <div className="mb-3 flex items-center justify-between md:mb-4">
              <h3 className="text-sm font-bold sm:text-base md:text-lg">
                Conversão
              </h3>
              <TrendingUp
                className="h-6 w-6 opacity-80 sm:h-7 sm:w-7 md:h-8 md:w-8"
                aria-hidden="true"
              />
            </div>
            <p className="mb-1 text-2xl font-bold sm:text-3xl md:mb-2 md:text-4xl">
              {data.overview.conversionRate}%
            </p>
            <p className="text-xs text-emerald-100 sm:text-sm">
              Views para downloads
            </p>
            <div className="mt-3 border-t border-emerald-400/30 pt-3 md:mt-4 md:pt-4">
              <p className="text-xs text-emerald-100 sm:text-sm">
                Meta: 30% • Faltam{" "}
                {(30 - data.overview.conversionRate).toFixed(1)}%
              </p>
            </div>
          </div>

          {/* Total de Conteúdo */}
          <div className="rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 p-4 text-white shadow-lg sm:p-5 md:p-6">
            <div className="mb-3 flex items-center justify-between md:mb-4">
              <h3 className="text-sm font-bold sm:text-base md:text-lg">
                Conteúdo
              </h3>
              <BookOpen
                className="h-6 w-6 opacity-80 sm:h-7 sm:w-7 md:h-8 md:w-8"
                aria-hidden="true"
              />
            </div>
            <p className="mb-1 text-2xl font-bold sm:text-3xl md:mb-2 md:text-4xl">
              {data.overview.totalContent}
            </p>
            <p className="text-xs text-blue-100 sm:text-sm">Itens publicados</p>
            <div className="mt-3 border-t border-blue-400/30 pt-3 md:mt-4 md:pt-4">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-blue-100">Média/categoria</span>
                <span className="font-semibold">
                  {Math.floor(
                    data.overview.totalContent / data.categories.length,
                  )}
                </span>
              </div>
            </div>
          </div>

          {/* Engajamento */}
          <div className="rounded-xl bg-linear-to-br from-purple-500 to-pink-600 p-4 text-white shadow-lg sm:p-5 md:p-6">
            <div className="mb-3 flex items-center justify-between md:mb-4">
              <h3 className="text-sm font-bold sm:text-base md:text-lg">
                Engajamento
              </h3>
              <Users
                className="h-6 w-6 opacity-80 sm:h-7 sm:w-7 md:h-8 md:w-8"
                aria-hidden="true"
              />
            </div>
            <p className="mb-1 text-2xl font-bold sm:text-3xl md:mb-2 md:text-4xl">
              {(data.overview.totalViews / data.overview.activeUsers).toFixed(
                1,
              )}
            </p>
            <p className="text-xs text-purple-100 sm:text-sm">
              Views por usuário
            </p>
            <div className="mt-3 border-t border-purple-400/30 pt-3 md:mt-4 md:pt-4">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <span className="text-purple-100">Downloads/usuário</span>
                <span className="font-semibold">
                  {(
                    data.overview.totalDownloads / data.overview.activeUsers
                  ).toFixed(1)}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== INDICADORES DE PERFORMANCE ==================== */}
        <section className="mb-4 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm sm:mb-6 md:mb-8">
          <div className="p-3 sm:p-4 md:p-6">
            <div className="mb-3 sm:mb-4 md:mb-6">
              <h3 className="text-base font-bold text-slate-900 sm:text-lg">
                Performance
              </h3>
              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                Crescimento vs período anterior
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:grid-cols-4">
              {data.growth.map((metric, index) => (
                <div
                  key={`${metric.metric}-${index}`}
                  className="rounded-lg border-2 border-slate-200 p-3 transition-all hover:border-blue-300 sm:p-4"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-600 sm:text-sm">
                      {metric.metric}
                    </span>
                    {metric.trend === "up" ? (
                      <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-100 sm:h-8 sm:w-8">
                        <TrendingUp
                          className="h-4 w-4 text-emerald-600 sm:h-5 sm:w-5"
                          aria-hidden="true"
                        />
                      </div>
                    ) : (
                      <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-red-100 sm:h-8 sm:w-8">
                        <TrendingDown
                          className="h-4 w-4 text-red-600 sm:h-5 sm:w-5"
                          aria-hidden="true"
                        />
                      </div>
                    )}
                  </div>

                  <p className="mb-2 text-lg font-bold text-slate-900 sm:text-xl md:text-2xl">
                    {metric.value.toLocaleString("pt-BR")}
                  </p>

                  <div className="mb-2 flex items-center gap-2">
                    <span
                      className={`text-xs font-semibold sm:text-sm ${
                        metric.trend === "up"
                          ? "text-emerald-600"
                          : "text-red-600"
                      }`}
                    >
                      {metric.trend === "up" ? "+" : "-"}
                      {Math.abs(metric.change)}%
                    </span>
                    <span className="text-xs text-slate-500">vs anterior</span>
                  </div>

                  <div className="h-1.5 overflow-hidden rounded-full bg-slate-100 sm:h-2">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        metric.trend === "up" ? "bg-emerald-500" : "bg-red-500"
                      }`}
                      style={{
                        width: `${Math.min(Math.abs(metric.change) * 5, 100)}%`,
                      }}
                      role="progressbar"
                      aria-valuenow={Math.abs(metric.change)}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== FOOTER INFO ==================== */}
        <footer className="rounded-xl border border-blue-100 bg-blue-50 p-4 sm:p-5 md:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-4">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-blue-600 sm:h-10 sm:w-10">
              <svg
                className="h-5 w-5 text-white sm:h-6 sm:w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
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
              <h4 className="mb-2 text-sm font-bold text-blue-900 sm:text-base md:text-lg">
                Sobre os Dados
              </h4>
              <p className="text-xs leading-relaxed text-blue-800 sm:text-sm">
                Dados atualizados em tempo real. Estatísticas incluem
                visualizações, downloads e engajamento. Use os filtros para
                personalizar.
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-blue-700 sm:mt-3 sm:gap-4">
                <span className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-blue-600" />
                  Cache 5min
                </span>
                <span className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-emerald-600" />
                  Auto-refresh
                </span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default AnalyticsComponent;
