"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// ==================== TIPOS ====================
type AnalyticsData = {
  views: { label: string; value: number }[];
  downloads: { label: string; value: number }[];
  categories: { name: string; count: number; percentage: number }[];
  topContent: {
    title: string;
    views: number;
    downloads: number;
    tipo: string;
  }[];
  growth: {
    metric: string;
    value: number;
    change: number;
    trend: "up" | "down";
  }[];
};

// ==================== MOCK DATA ====================
const mockAnalytics: AnalyticsData = {
  views: [
    { label: "Seg", value: 1200 },
    { label: "Ter", value: 1400 },
    { label: "Qua", value: 1100 },
    { label: "Qui", value: 1600 },
    { label: "Sex", value: 1800 },
    { label: "Sáb", value: 900 },
    { label: "Dom", value: 800 },
  ],
  downloads: [
    { label: "Seg", value: 450 },
    { label: "Ter", value: 520 },
    { label: "Qua", value: 380 },
    { label: "Qui", value: 610 },
    { label: "Sex", value: 720 },
    { label: "Sáb", value: 340 },
    { label: "Dom", value: 290 },
  ],
  categories: [
    { name: "IA", count: 45, percentage: 35 },
    { name: "Programação", count: 38, percentage: 30 },
    { name: "Engenharia", count: 25, percentage: 20 },
    { name: "Eletrônica", count: 12, percentage: 10 },
    { name: "Matemática", count: 8, percentage: 5 },
  ],
  topContent: [
    {
      title: "Inteligência Artificial Aplicada",
      views: 5600,
      downloads: 3400,
      tipo: "livro",
    },
    {
      title: "Machine Learning Avançado",
      views: 3120,
      downloads: 1890,
      tipo: "livro",
    },
    { title: "AutoCAD 2024", views: 2340, downloads: 1200, tipo: "software" },
    {
      title: "Sistema IoT Residencial",
      views: 1890,
      downloads: 890,
      tipo: "projeto",
    },
    { title: "Redes Neurais CNN", views: 1560, downloads: 720, tipo: "artigo" },
  ],
  growth: [
    { metric: "Visualizações", value: 8800, change: 12.3, trend: "up" },
    { metric: "Downloads", value: 4320, change: 8.7, trend: "up" },
    { metric: "Taxa de Conversão", value: 49.1, change: 5.2, trend: "up" },
    { metric: "Tempo Médio", value: 12.5, change: -2.1, trend: "down" },
  ],
};

// ==================== ANALYTICS COMPONENT ====================
export default function AnalyticsCharts({
  data = mockAnalytics,
}: {
  data?: AnalyticsData;
}) {
  const maxViews = Math.max(...data.views.map((d) => d.value));
  const maxDownloads = Math.max(...data.downloads.map((d) => d.value));

  return (
    <div className="space-y-6">
      {/* MÉTRICAS DE CRESCIMENTO */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
        {data.growth.map((metric, index) => (
          <Card
            key={index}
            className="border-slate-200 bg-white shadow-lg transition-shadow hover:shadow-xl"
          >
            <CardContent className="p-6">
              <div className="mb-3 flex items-start justify-between">
                <p className="text-sm text-slate-600">{metric.metric}</p>
                <Badge
                  className={
                    metric.trend === "up"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }
                >
                  {metric.trend === "up" ? "↑" : "↓"} {Math.abs(metric.change)}%
                </Badge>
              </div>
              <div className="flex items-end gap-2">
                <p className="text-3xl font-bold text-slate-900">
                  {metric.metric === "Taxa de Conversão" ||
                  metric.metric === "Tempo Médio"
                    ? metric.value.toFixed(1)
                    : metric.value.toLocaleString()}
                </p>
                {(metric.metric === "Taxa de Conversão" ||
                  metric.metric === "Tempo Médio") && (
                  <p className="pb-1 text-sm text-slate-500">
                    {metric.metric === "Taxa de Conversão" ? "%" : "min"}
                  </p>
                )}
              </div>
              <p className="mt-2 text-xs text-slate-500">vs mês anterior</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* GRÁFICOS PRINCIPAIS */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Gráfico de Views e Downloads */}
        <Card className="border-slate-200 bg-white shadow-lg">
          <CardHeader>
            <CardTitle>Visualizações e Downloads</CardTitle>
            <CardDescription>Últimos 7 dias</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Legenda */}
              <div className="flex items-center justify-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-linear-to-r from-blue-500 to-blue-600"></div>
                  <span className="text-sm text-slate-600">Visualizações</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-linear-to-r from-indigo-500 to-indigo-600"></div>
                  <span className="text-sm text-slate-600">Downloads</span>
                </div>
              </div>

              {/* Gráfico de Barras */}
              <div className="space-y-4">
                {data.views.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="w-12 font-medium text-slate-700">
                        {item.label}
                      </span>
                      <div className="flex items-center gap-4 text-xs">
                        <span className="font-semibold text-blue-600">
                          {item.value.toLocaleString()}
                        </span>
                        <span className="font-semibold text-indigo-600">
                          {data.downloads[index].value.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Barras duplas */}
                    <div className="flex gap-2">
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-linear-to-r from-blue-500 to-blue-600 transition-all duration-500"
                          style={{ width: `${(item.value / maxViews) * 100}%` }}
                        />
                      </div>
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-linear-to-r from-indigo-500 to-indigo-600 transition-all duration-500"
                          style={{
                            width: `${(data.downloads[index].value / maxDownloads) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totais */}
              <div className="grid grid-cols-2 gap-4 border-t border-slate-200 pt-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">
                    {data.views
                      .reduce((acc, d) => acc + d.value, 0)
                      .toLocaleString()}
                  </p>
                  <p className="mt-1 text-xs text-slate-600">Total de Views</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-indigo-600">
                    {data.downloads
                      .reduce((acc, d) => acc + d.value, 0)
                      .toLocaleString()}
                  </p>
                  <p className="mt-1 text-xs text-slate-600">
                    Total de Downloads
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Distribuição por Categoria */}
        <Card className="border-slate-200 bg-white shadow-lg">
          <CardHeader>
            <CardTitle>Distribuição por Categoria</CardTitle>
            <CardDescription>
              Total de {data.categories.reduce((acc, c) => acc + c.count, 0)}{" "}
              itens
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Gráfico de Pizza Simplificado */}
              <div className="flex items-center justify-center">
                <div className="relative h-48 w-48">
                  <svg className="h-full w-full" viewBox="0 0 100 100">
                    {data.categories.map((cat, index) => {
                      const colors = [
                        "rgb(59, 130, 246)", // blue
                        "rgb(99, 102, 241)", // indigo
                        "rgb(139, 92, 246)", // purple
                        "rgb(236, 72, 153)", // pink
                        "rgb(251, 146, 60)", // orange
                      ];

                      let currentPercentage = 0;
                      for (let i = 0; i < index; i++) {
                        currentPercentage += data.categories[i].percentage;
                      }

                      const startAngle = (currentPercentage * 360) / 100;
                      const endAngle =
                        ((currentPercentage + cat.percentage) * 360) / 100;

                      const startX =
                        50 + 40 * Math.cos((startAngle * Math.PI) / 180);
                      const startY =
                        50 + 40 * Math.sin((startAngle * Math.PI) / 180);
                      const endX =
                        50 + 40 * Math.cos((endAngle * Math.PI) / 180);
                      const endY =
                        50 + 40 * Math.sin((endAngle * Math.PI) / 180);

                      const largeArcFlag = cat.percentage > 50 ? 1 : 0;

                      return (
                        <path
                          key={index}
                          d={`M 50 50 L ${startX} ${startY} A 40 40 0 ${largeArcFlag} 1 ${endX} ${endY} Z`}
                          fill={colors[index]}
                          className="cursor-pointer transition-opacity hover:opacity-80"
                        />
                      );
                    })}
                    {/* Centro branco */}
                    <circle cx="50" cy="50" r="25" fill="white" />
                  </svg>

                  {/* Número central */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="text-3xl font-bold text-slate-900">
                      {data.categories.reduce((acc, c) => acc + c.count, 0)}
                    </p>
                    <p className="text-xs text-slate-500">Total</p>
                  </div>
                </div>
              </div>

              {/* Legenda */}
              <div className="space-y-3">
                {data.categories.map((cat, index) => {
                  const colors = [
                    "from-blue-500 to-blue-600",
                    "from-indigo-500 to-indigo-600",
                    "from-purple-500 to-purple-600",
                    "from-pink-500 to-pink-600",
                    "from-orange-500 to-orange-600",
                  ];

                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg bg-slate-50 p-3 transition-colors hover:bg-slate-100"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`h-4 w-4 rounded-full bg-linear-to-r ${colors[index]}`}
                        ></div>
                        <span className="text-sm font-medium text-slate-700">
                          {cat.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-slate-900">
                          {cat.count}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {cat.percentage}%
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* TOP CONTEÚDOS */}
      <Card className="border-slate-200 bg-white shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Top 5 Conteúdos</CardTitle>
              <CardDescription>
                Mais visualizados nos últimos 30 dias
              </CardDescription>
            </div>
            <Badge className="bg-linear-to-r from-yellow-500 to-orange-600 text-white">
              🏆 Destaques
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {data.topContent.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 rounded-xl border border-slate-200 bg-linear-to-r from-slate-50 to-blue-50 p-4 transition-all hover:from-slate-100 hover:to-blue-100"
              >
                {/* Posição */}
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-bold text-white ${
                    index === 0
                      ? "bg-linear-to-br from-yellow-500 to-orange-600"
                      : index === 1
                        ? "bg-linear-to-br from-slate-400 to-slate-600"
                        : index === 2
                          ? "bg-linear-to-br from-orange-600 to-red-700"
                          : "bg-linear-to-br from-blue-500 to-indigo-600"
                  }`}
                >
                  {index + 1}
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <p className="mb-1 truncate font-semibold text-slate-900">
                    {item.title}
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-xs text-slate-600">
                      <svg
                        className="h-4 w-4 text-blue-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path
                          fillRule="evenodd"
                          d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="font-semibold">
                        {item.views.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-600">
                      <svg
                        className="h-4 w-4 text-indigo-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="font-semibold">
                        {item.downloads.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Tipo */}
                <Badge variant="outline" className="shrink-0 capitalize">
                  {item.tipo}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* INSIGHTS RÁPIDOS */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-0 bg-linear-to-br from-blue-500 to-indigo-600 text-white shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/20">
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm text-white/80">Crescimento</p>
                <p className="text-2xl font-bold">+12.3%</p>
                <p className="mt-1 text-xs text-white/70">Este mês</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-linear-to-br from-green-500 to-teal-600 text-white shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/20">
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-white/80">Usuários Ativos</p>
                <p className="text-2xl font-bold">5.2K</p>
                <p className="mt-1 text-xs text-white/70">Últimos 7 dias</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-linear-to-br from-purple-500 to-pink-600 text-white shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/20">
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-white/80">Avaliação Média</p>
                <p className="text-2xl font-bold">4.8/5.0</p>
                <p className="mt-1 text-xs text-white/70">320 avaliações</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
