"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import CloudinaryUpload from "../CloudinaryUpload";

// ==================== SOFTWARE FORM ====================
const categorias = [
  "IA",
  "Programação",
  "Eletrônica",
  "Mecatrônica",
  "Engenharia",
  "Matemática",
];

export function SoftwareForm({
  initialData,
  onSubmit,
  onCancel,
}: {
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel?: () => void;
}) {
  const [formData, setFormData] = useState({
    nome: initialData?.nome || "",
    siteOficial: initialData?.siteOficial || "",
    categoria: initialData?.categoria || "",
    descricao: initialData?.descricao || "",
    funcionalidades: initialData?.funcionalidades || "",
    requisitos: initialData?.requisitos || "",
    preco: initialData?.preco || "Gratuito",
    plataformas: initialData?.plataformas || [],
    screenshots: initialData?.screenshots || [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8 py-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            {initialData ? "Editar" : "Adicionar"} Software
          </h1>
          <p className="mt-1 text-slate-600">
            Informações sobre o software profissional
          </p>
        </div>
        {onCancel && (
          <Button variant="outline" onClick={onCancel}>
            Voltar
          </Button>
        )}
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Informações do Software</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Nome do Software *
                </label>
                <input
                  type="text"
                  required
                  value={formData.nome}
                  onChange={(e) =>
                    setFormData({ ...formData, nome: e.target.value })
                  }
                  placeholder="Ex: AutoCAD 2024"
                  className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Site Oficial *
                </label>
                <input
                  type="url"
                  required
                  value={formData.siteOficial}
                  onChange={(e) =>
                    setFormData({ ...formData, siteOficial: e.target.value })
                  }
                  placeholder="https://exemplo.com"
                  className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Categoria *
                </label>
                <select
                  required
                  value={formData.categoria}
                  onChange={(e) =>
                    setFormData({ ...formData, categoria: e.target.value })
                  }
                  className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                >
                  <option value="">Selecione</option>
                  {categorias.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Preço
                </label>
                <input
                  type="text"
                  value={formData.preco}
                  onChange={(e) =>
                    setFormData({ ...formData, preco: e.target.value })
                  }
                  placeholder="Gratuito ou R$ 299,00"
                  className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Descrição Detalhada *
              </label>
              <textarea
                required
                rows={6}
                value={formData.descricao}
                onChange={(e) =>
                  setFormData({ ...formData, descricao: e.target.value })
                }
                placeholder="Descreva o software, suas características principais..."
                className="w-full resize-none rounded-xl border-2 border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Funcionalidades Principais
              </label>
              <textarea
                rows={4}
                value={formData.funcionalidades}
                onChange={(e) =>
                  setFormData({ ...formData, funcionalidades: e.target.value })
                }
                placeholder="Liste as principais funcionalidades..."
                className="w-full resize-none rounded-xl border-2 border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Requisitos do Sistema
              </label>
              <textarea
                rows={3}
                value={formData.requisitos}
                onChange={(e) =>
                  setFormData({ ...formData, requisitos: e.target.value })
                }
                placeholder="Windows 10+, 8GB RAM, etc..."
                className="w-full resize-none rounded-xl border-2 border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Screenshots</CardTitle>
            <CardDescription>
              Imagens demonstrando funcionalidades
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CloudinaryUpload
              type="image"
              label="Screenshots do Software"
              description="PNG, WEBP ou AVIF - máx 3MB cada"
              onUploadComplete={(files: any) =>
                setFormData({
                  ...formData,
                  screenshots: files.map((f: any) => f.url),
                })
              }
            />
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3 pt-4">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
          )}
          <Button
            onClick={handleSubmit}
            className="bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          >
            {initialData ? "Atualizar" : "Adicionar"} Software
          </Button>
        </div>
      </div>
    </div>
  );
}
