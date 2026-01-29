"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book, FolderKanban, AppWindow, Download } from "lucide-react";

const stats = [
  { title: "Livros", value: 42, icon: Book },
  { title: "Projetos", value: 8, icon: FolderKanban },
  { title: "Softwares", value: 15, icon: AppWindow },
  { title: "Downloads", value: 1280, icon: Download },
];

export default function AdminDashboard() {
  return (
    <div className="p-6 space-y-8">
      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4">
        <Button>+ Novo Livro</Button>
        <Button variant="outline">+ Novo Projeto</Button>
        <Button variant="secondary">+ Novo Software</Button>
      </div>

      {/* Placeholder for Table & Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Conteúdo Recente</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Tabela de conteúdos recentes (mock)
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Gráficos de visualizações e interesse (mock)
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
