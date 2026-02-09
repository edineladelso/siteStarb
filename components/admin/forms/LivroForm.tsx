/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { criarLivro } from "@/lib/actions";
import { useRouter } from "next/navigation";
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

// ==================== LIVRO FORM ====================
export function LivroForm({
  initialData,
  onCancel,
}: {
  initialData?: any;
  onCancel?: () => void;
}) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [formData, setFormData] = useState({
    titulo: initialData?.titulo || "",
    autor: initialData?.autor || "",
    categoria: initialData?.categoria || "",
    descricao: initialData?.descricao || "",
    isbn: initialData?.isbn || "",
    anoPublicacao: initialData?.anoPublicacao || "",
    editora: initialData?.editora || "",
    idioma: initialData?.idioma || "Português",
    numeroPaginas: initialData?.numeroPaginas || "",
    capaUrl: initialData?.capaUrl || "",
    pdfUrl: initialData?.pdfUrl || "",
    tags: initialData?.tags || [],
  });

  const [newTag, setNewTag] = useState("");

  async function handleAction(payload: FormData) {
    try {
      setIsPending(true);
      if (initialData?.id) {
        payload.set("id", String(initialData.id));
       /// await atualizarLivro();
      } else {
        await criarLivro(payload);
        (document.getElementById("livro-form") as HTMLFormElement)?.reset();
        setFormData({
          titulo: "",
          autor: "",
          categoria: "",
          descricao: "",
          isbn: "",
          anoPublicacao: "",
          editora: "",
          idioma: "Português",
          numeroPaginas: "",
          capaUrl: "",
          pdfUrl: "",
          tags: [],
        });
      }
      router.push("/admin/livros");
    } catch (error) {
      console.error("Erro ao submeter livro:", error);
    } finally {
      setIsPending(false);
    }
  }

  const addTag = () => {
    if (newTag && !formData.tags.includes(newTag)) {
      setFormData({ ...formData, tags: [...formData.tags, newTag] });
      setNewTag("");
    }
  };

  const removeTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((t: string) => t !== tag),
    });
  };

  return (
    <form
      id="livro-form"
      action={handleAction}
      className="mx-auto max-w-4xl space-y-8 py-8"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            {initialData ? "Editar" : "Adicionar"} Livro
          </h1>
          <p className="mt-1 text-slate-600">
            Preencha os dados do livro técnico
          </p>
        </div>
        {onCancel && (
          <Button variant="outline" onClick={onCancel} type="button">
            Voltar
          </Button>
        )}
      </div>

      <div className="space-y-6">
        {/* Informações Básicas */}
        <Card>
          <CardHeader>
            <CardTitle>Informações Básicas</CardTitle>
            <CardDescription>Dados principais do livro</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Título *
                </label>
                <input
                  name="titulo"
                  type="text"
                  required
                  value={formData.titulo}
                  onChange={(e) =>
                    setFormData({ ...formData, titulo: e.target.value })
                  }
                  placeholder="Ex: Inteligência Artificial Aplicada"
                  className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Autor *
                </label>
                <input
                  name="autor"
                  type="text"
                  required
                  value={formData.autor}
                  onChange={(e) =>
                    setFormData({ ...formData, autor: e.target.value })
                  }
                  placeholder="Nome do autor"
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
                  name="categoria"
                  required
                  value={formData.categoria}
                  onChange={(e) =>
                    setFormData({ ...formData, categoria: e.target.value })
                  }
                  className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                >
                  <option value="">Selecione uma categoria</option>
                  {categorias.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  ISBN
                </label>
                <input
                  name="isbn"
                  type="text"
                  value={formData.isbn}
                  onChange={(e) =>
                    setFormData({ ...formData, isbn: e.target.value })
                  }
                  placeholder="978-3-16-148410-0"
                  className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Editora
                </label>
                <input
                  name="editora"
                  type="text"
                  value={formData.editora}
                  onChange={(e) =>
                    setFormData({ ...formData, editora: e.target.value })
                  }
                  placeholder="Nome da editora"
                  className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Ano de Publicação
                </label>
                <input
                  name="ano_publicacao"
                  type="number"
                  value={formData.anoPublicacao}
                  onChange={(e) =>
                    setFormData({ ...formData, anoPublicacao: e.target.value })
                  }
                  placeholder="2024"
                  className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Nº de Páginas
                </label>
                <input
                  name="numero_paginas"
                  type="number"
                  value={formData.numeroPaginas}
                  onChange={(e) =>
                    setFormData({ ...formData, numeroPaginas: e.target.value })
                  }
                  placeholder="350"
                  className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Descrição *
              </label>
              <textarea
                name="descricao"
                required
                rows={6}
                value={formData.descricao}
                onChange={(e) =>
                  setFormData({ ...formData, descricao: e.target.value })
                }
                placeholder="Descreva o conteúdo do livro, objetivos de aprendizagem e público-alvo..."
                className="w-full resize-none rounded-xl border-2 border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Tags
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addTag())
                  }
                  placeholder="Adicionar tag..."
                  className="flex-1 rounded-lg border-2 border-slate-200 px-4 py-2 outline-none focus:border-blue-500"
                />
                <Button type="button" onClick={addTag} variant="outline">
                  Adicionar
                </Button>
              </div>
              {formData.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {formData.tags.map((tag: string) => (
                    <Badge key={tag} variant="secondary" className="gap-1">
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-1 hover:text-red-600"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Upload de Arquivos */}
        <Card>
          <CardHeader>
            <CardTitle>Arquivos</CardTitle>
            <CardDescription>Capa e PDF do livro</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <CloudinaryUpload
              type="image"
              label="Capa do Livro *"
              description="PNG, WEBP ou AVIF - máx 3MB"
              onUploadComplete={(files: any) =>
                setFormData({ ...formData, capaUrl: files[0].url })
              }
            />

            <CloudinaryUpload
              type="pdf"
              label="Arquivo PDF *"
              description="PDF - máx 400MB"
              onUploadComplete={(files: any) =>
                setFormData({ ...formData, pdfUrl: files[0].url })
              }
            />
          </CardContent>
        </Card>

        {/* Ações */}
        <div className="flex justify-end gap-3 pt-4">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
          )}
          <Button
            type="submit"
            disabled={isPending}
            className="bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          >
            {isPending ? "A processar..." : initialData ? "Atualizar" : "Adicionar"} Livro
          </Button>
        </div>
      </div>
      <input type="hidden" name="slug" value={initialData?.slug ?? ""} />
      <input type="hidden" name="idioma" value={formData.idioma} />
      <input type="hidden" name="capa_url" value={formData.capaUrl} />
      <input type="hidden" name="pdf_url" value={formData.pdfUrl} />
      <input type="hidden" name="tags" value={formData.tags.join(",")} />
    </form>
  );
}
