"use client";

// ==================== ARTIGO FORM ====================
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { useState } from "react";
import CloudinaryUpload from "../CloudinaryUpload";


const categorias = [
  "IA",
  "Programação",
  "Eletrônica",
  "Mecatrônica",
  "Engenharia",
  "Matemática",
];

export function ArtigoForm({
  initialData,
  onSubmit,
  onCancel,
}: {
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel?: () => void;
}) {
  const [formData, setFormData] = useState({
    titulo: initialData?.titulo || "",
    autores: initialData?.autores || "",
    categoria: initialData?.categoria || "",
    resumo: initialData?.resumo || "",
    palavrasChave: initialData?.palavrasChave || "",
    anoPublicacao: initialData?.anoPublicacao || "",
    instituicao: initialData?.instituicao || "",
    pdfUrl: initialData?.pdfUrl || "",
  });

  return (
    <div className="mx-auto max-w-4xl space-y-8 py-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            {initialData ? "Editar" : "Adicionar"} Artigo
          </h1>
          <p className="mt-1 text-slate-600">Artigo científico ou técnico</p>
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
            <CardTitle>Informações do Artigo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Título do Artigo *
              </label>
              <input
                type="text"
                required
                value={formData.titulo}
                onChange={(e) =>
                  setFormData({ ...formData, titulo: e.target.value })
                }
                placeholder="Ex: Análise de Redes Neurais Convolucionais"
                className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Autor(es) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.autores}
                  onChange={(e) =>
                    setFormData({ ...formData, autores: e.target.value })
                  }
                  placeholder="João Silva, Maria Santos"
                  className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

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
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Instituição
                </label>
                <input
                  type="text"
                  value={formData.instituicao}
                  onChange={(e) =>
                    setFormData({ ...formData, instituicao: e.target.value })
                  }
                  placeholder="Universidade Federal..."
                  className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Ano de Publicação
                </label>
                <input
                  type="number"
                  value={formData.anoPublicacao}
                  onChange={(e) =>
                    setFormData({ ...formData, anoPublicacao: e.target.value })
                  }
                  placeholder="2024"
                  className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Resumo *
              </label>
              <textarea
                required
                rows={6}
                value={formData.resumo}
                onChange={(e) =>
                  setFormData({ ...formData, resumo: e.target.value })
                }
                placeholder="Resumo do artigo..."
                className="w-full resize-none rounded-xl border-2 border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Palavras-chave
              </label>
              <input
                type="text"
                value={formData.palavrasChave}
                onChange={(e) =>
                  setFormData({ ...formData, palavrasChave: e.target.value })
                }
                placeholder="machine learning, deep learning, CNN"
                className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Arquivo PDF</CardTitle>
          </CardHeader>
          <CardContent>
            <CloudinaryUpload
              type="pdf"
              label="Artigo Completo *"
              description="PDF - máx 400MB"
              onUploadComplete={(files: any) =>
                setFormData({ ...formData, pdfUrl: files[0].url })
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
            onClick={(e) => {
              e.preventDefault();
              onSubmit(formData);
            }}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          >
            {initialData ? "Atualizar" : "Adicionar"} Artigo
          </Button>
        </div>
      </div>
    </div>
  );
}
