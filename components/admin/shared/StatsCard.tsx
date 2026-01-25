"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

// ==================== STATS CARD ====================
export function StatsCard({
  title,
  value,
  change,
  trend = "neutral",
  icon,
  color = "from-blue-500 to-indigo-600",
  description,
}: {
  title: string;
  value: string | number;
  change?: number;
  trend?: "up" | "down" | "neutral";
  icon?: React.ReactNode;
  color?: string;
  description?: string;
}) {
  return (
    <Card className="border-slate-200 bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <CardContent className="p-6">
        <div className="mb-3 flex items-start justify-between">
          <div className="flex-1">
            <p className="mb-1 text-sm text-slate-600">{title}</p>
            <p className="text-3xl font-bold text-slate-900">{value}</p>
            {description && (
              <p className="mt-1 text-xs text-slate-500">{description}</p>
            )}
          </div>
          {icon && (
            <div
              className={`h-14 w-14 rounded-xl bg-linear-to-br ${color} flex shrink-0 items-center justify-center text-white`}
            >
              {icon}
            </div>
          )}
        </div>

        {change !== undefined && (
          <div className="flex items-center gap-2">
            <Badge
              className={
                trend === "up"
                  ? "bg-green-100 text-green-800"
                  : trend === "down"
                    ? "bg-red-100 text-red-800"
                    : "bg-slate-100 text-slate-800"
              }
            >
              {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"}{" "}
              {Math.abs(change)}%
            </Badge>
            <span className="text-xs text-slate-500">vs mês anterior</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
