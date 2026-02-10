/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { useRouter } from "next/navigation";
import CloudinaryUpload from "../CloudinaryUpload";
import { criarProjeto } from "@/lib/actions";

// ==================== PROJETO FORM ====================

const categorias = [
  "IA",
  "Programação",
  "Eletrônica",
  "Mecatrônica",
  "Engenharia",
  "Matemática",
];

export function ProjetoForm({
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
    descricaoGeral: initialData?.descricao || initialData?.descricaoGeral || "",
    problemaResolvido: initialData?.problemaResolvido || "",
    tecnologias: initialData?.tecnologias || "",
    repositorioGithub: initialData?.repositorioGithub || "",
    documentacaoUrl: initialData?.documentacaoUrl || "",
    imagensUrl: initialData?.imagensUrl || [],
    dificuldade: initialData?.dificuldade || "Intermediário",
    duracao: initialData?.duracao || "",
  });

  async function handleAction(payload: FormData) {
    try {
      setIsPending(true);
      if (initialData?.id) {
        payload.set("id", String(initialData.id));
        // await atualizarProjeto(payload);
      } else {
        await criarProjeto(payload);
        (document.getElementById("projeto-form") as HTMLFormElement)?.reset();
        setFormData({
          titulo: "",
          autor: "",
          categoria: "",
          descricaoGeral: "",
          problemaResolvido: "",
          tecnologias: "",
          repositorioGithub: "",
          documentacaoUrl: "",
          imagensUrl: [],
          dificuldade: "Intermediário",
          duracao: "",
        });
      }
      router.push("/admin/projetos");
    } catch (error) {
      console.error("Erro ao submeter projeto:", error);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <form
      id="projeto-form"
      action={handleAction}
      className="mx-auto max-w-4xl space-y-8 py-8"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            {initialData ? "Editar" : "Adicionar"} Projeto
          </h1>
          <p className="mt-1 text-slate-600">
            Documentação completa do projeto técnico
          </p>
        </div>
        {onCancel && (
          <Button variant="outline" onClick={onCancel} type="button">
            Voltar
          </Button>
        )}
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Informações do Projeto</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Nome do Projeto *
                </label>
                <input
                  name="titulo"
                  type="text"
                  required
                  value={formData.titulo}
                  onChange={(e) =>
                    setFormData({ ...formData, titulo: e.target.value })
                  }
                  placeholder="Ex: Sistema IoT para Automação"
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
                  placeholder="Seu nome"
                  className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
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
                  Dificuldade
                </label>
                <select
                  name="dificuldade"
                  value={formData.dificuldade}
                  onChange={(e) =>
                    setFormData({ ...formData, dificuldade: e.target.value })
                  }
                  className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                >
                  <option value="Iniciante">Iniciante</option>
                  <option value="Intermediário">Intermediário</option>
                  <option value="Avançado">Avançado</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">
                  Duração Estimada
                </label>
                <input
                  name="duracao"
                  type="text"
                  value={formData.duracao}
                  onChange={(e) =>
                    setFormData({ ...formData, duracao: e.target.value })
                  }
                  placeholder="Ex: 2 semanas"
                  className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Descrição Geral *
              </label>
              <textarea
                name="descricao"
                required
                rows={4}
                value={formData.descricaoGeral}
                onChange={(e) =>
                  setFormData({ ...formData, descricaoGeral: e.target.value })
                }
                placeholder="Visão geral do projeto..."
                className="w-full resize-none rounded-xl border-2 border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Problema Resolvido *
              </label>
              <textarea
                name="problema_resolvido"
                required
                rows={3}
                value={formData.problemaResolvido}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    problemaResolvido: e.target.value,
                  })
                }
                placeholder="Qual problema este projeto resolve?"
                className="w-full resize-none rounded-xl border-2 border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Tecnologias Utilizadas *
              </label>
              <input
                name="tecnologias"
                type="text"
                required
                value={formData.tecnologias}
                onChange={(e) =>
                  setFormData({ ...formData, tecnologias: e.target.value })
                }
                placeholder="Arduino, Python, MQTT, Firebase, etc"
                className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">
                Repositório GitHub
              </label>
              <input
                name="repositorio_github"
                type="url"
                value={formData.repositorioGithub}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    repositorioGithub: e.target.value,
                  })
                }
                placeholder="https://github.com/usuario/projeto"
                className="w-full rounded-xl border-2 border-slate-200 px-4 py-3 outline-none focus:border-blue-500"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Documentação e Imagens</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <CloudinaryUpload
              type="pdf"
              label="Documentação Técnica"
              description="PDF - máx 400MB"
              onUploadComplete={(files: any) =>
                setFormData({ ...formData, documentacaoUrl: files[0].url })
              }
            />

            <CloudinaryUpload
              type="image"
              label="Fotos do Projeto"
              description="PNG, WEBP ou AVIF - máx 3MB cada"
              onUploadComplete={(files: any) =>
                setFormData({
                  ...formData,
                  imagensUrl: files.map((f: any) => f.url),
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
            type="submit"
            disabled={isPending}
            className="bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          >
            {isPending ? "A processar..." : initialData ? "Atualizar" : "Adicionar"} Projeto
          </Button>
        </div>
      </div>

      <input type="hidden" name="slug" value={initialData?.slug ?? ""} />
      <input type="hidden" name="documentacao_url" value={formData.documentacaoUrl} />
      <input type="hidden" name="imagens_url" value={formData.imagensUrl.join(",")} />
    </form>
  );
}
