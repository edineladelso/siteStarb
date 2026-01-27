import type {
  AnalyticsData,
  AnalyticsFilters,
  AnalyticsOverview,
  CategoryData,
  ContentTypeMetrics,
  GrowthMetric,
  TimeSeriesData,
  TopContentItem,
  ViewsDownloadsData,
} from "@/lib/types";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

// ============================================================================
// UI COMPONENTS
// ============================================================================

const MetricCard: React.FC<{
  title: string;
  value: string | number;
  change?: number;
  trend?: "up" | "down";
  icon: React.ReactNode;
  color: string;
}> = ({ title, value, change, trend, icon, color }) => (
  <article
    className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    role="article"
    aria-label={`Métrica: ${title}`}
  >
    <div className="mb-4 flex items-start justify-between">
      <div className="flex-1">
        <p className="mb-2 text-sm font-medium text-slate-600">{title}</p>
        <p className="text-3xl font-bold text-slate-900">
          {typeof value === "number" ? value.toLocaleString("pt-BR") : value}
        </p>
      </div>
      <div
        className={`h-12 w-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white shadow-lg`}
      >
        {icon}
      </div>
    </div>

    {change !== undefined && trend && (
      <div className="mt-4 flex items-center gap-2">
        <div
          className={`flex items-center gap-1 rounded-lg px-2 py-1 ${
            trend === "up" ? "bg-green-50" : "bg-red-50"
          }`}
        >
          {trend === "up" ? (
            <ArrowUpRight className="h-4 w-4 text-green-600" />
          ) : (
            <ArrowDownRight className="h-4 w-4 text-red-600" />
          )}
          <span
            className={`text-sm font-semibold ${
              trend === "up" ? "text-green-700" : "text-red-700"
            }`}
          >
            {Math.abs(change)}%
          </span>
        </div>
        <span className="text-xs text-slate-500">vs período anterior</span>
      </div>
    )}
  </article>
);

const ChartCard: React.FC<{
  title: string;
  description?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}> = ({ title, description, children, actions }) => (
  <section
    className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
    aria-labelledby={`chart-${title.toLowerCase().replace(/\s+/g, "-")}`}
  >
    <div className="mb-6 flex items-start justify-between">
      <div>
        <h3
          id={`chart-${title.toLowerCase().replace(/\s+/g, "-")}`}
          className="text-lg font-bold text-slate-900"
        >
          {title}
        </h3>
        {description && (
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        )}
      </div>
      {actions}
    </div>
    {children}
  </section>
);

export { ChartCard, MetricCard };
