"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input"; // Assumindo que usa shadcn/ui
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import CloudinaryUpload from "../CloudinaryUpload";
import { criarArtigo, atualizarArtigo } from "@/lib/actions/artigos.actions";
import { CATEGORIAS, type Artigo } from "@/lib/types";
import { areaLivroValues } from "@/lib/domain/areas";

interface ArtigoFormProps {
  initialData?: Artigo;
  onCancel?: () => void;
}

export function ArtigoForm({ initialData, onCancel }: ArtigoFormProps) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  
  // Estado para campos que precisam de manipulação antes do envio
  const [pdfUrl, setPdfUrl] = useState(
    initialData?.midia.tipo === "pdf" ? initialData.midia.pdfUrl : ""
  );
  const [selectedAreas, setSelectedAreas] = useState<string[]>(
    initialData?.areas || []
  );

  async function handleSubmit(formData: FormData) {
    setIsPending(true);
    try {
      // Adicionamos manualmente os campos complexos ao FormData
      formData.set("midia_tipo", "pdf");
      formData.set("pdf_url", pdfUrl);
      formData.set("areas", selectedAreas.join(","));
      
      // Se não houver status no form, definimos como rascunho por padrão
      if (!formData.has("status")) formData.set("status", "rascunho");
      
      // A descrição no seu schema é obrigatória (ContentBase)
      formData.set("descricao", formData.get("resumo") as string);

      let result;
      if (initialData?.id) {
        result = await atualizarArtigo(Number(initialData.id), formData);
      } else {
        result = await criarArtigo(formData);
      }

      if (result.success) {
        router.push("/admin/artigos");
        router.refresh();
      } else {
        alert(result.error || "Erro ao salvar artigo");
      }
    } catch (error) {
      console.error("Erro fatal:", error);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <form action={handleSubmit} className="mx-auto max-w-4xl space-y-8 py-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            {initialData ? "Editar" : "Novo"} Artigo
          </h1>
          <p className="mt-1 text-slate-600">Gestão de publicações científicas e técnicas</p>
        </div>
        <Button variant="outline" onClick={onCancel} type="button">
          Voltar
        </Button>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Dados Principais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="titulo">Título do Artigo *</Label>
              <Input
                id="titulo"
                name="titulo"
                required
                defaultValue={initialData?.titulo}
                placeholder="Ex: Impacto da IA na Engenharia Civil"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="autores">Autores *</Label>
                <Input
                  id="autores"
                  name="autores"
                  required
                  defaultValue={initialData?.autores}
                  placeholder="Nome dos autores separados por vírgula"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="categoria">Categoria *</Label>
                <select
                  id="categoria"
                  name="categoria"
                  required
                  defaultValue={initialData?.categoria}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="">Selecione...</option>
                  {CATEGORIAS.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="instituicao">Instituição</Label>
                <Input
                  id="instituicao"
                  name="instituicao"
                  defaultValue={initialData?.instituicao || ""}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="anoPublicacao">Ano de Publicação</Label>
                <Input
                  id="anoPublicacao"
                  name="anoPublicacao"
                  type="number"
                  defaultValue={initialData?.anoPublicacao || ""}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="resumo">Resumo (Abstract) *</Label>
              <Textarea
                id="resumo"
                name="resumo"
                required
                rows={5}
                defaultValue={initialData?.resumo}
                placeholder="Descreva brevemente o conteúdo do artigo..."
              />
            </div>
            
            <div className="space-y-2">
              <Label>Áreas de Conhecimento *</Label>
              <div className="grid grid-cols-2 gap-2 rounded-md border p-3 md:grid-cols-3">
                {areaLivroValues.slice(0, 12).map((area) => ( // Limitado para brevidade
                  <label key={area} className="flex items-center gap-2 text-xs">
                    <input
                      type="checkbox"
                      checked={selectedAreas.includes(area)}
                      onChange={(e) => {
                        if (e.target.checked) setSelectedAreas([...selectedAreas, area]);
                        else setSelectedAreas(selectedAreas.filter(a => a !== area));
                      }}
                    />
                    {area.replace("_", " ")}
                  </label>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mídia e Arquivos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <CloudinaryUpload
              type="pdf"
              label="Upload do PDF *"
              onUploadComplete={(files: any) => setPdfUrl(files[0].url)}
            />
            {pdfUrl && (
              <p className="text-xs text-green-600 font-medium">
                Arquivo pronto: {pdfUrl.split('/').pop()}
              </p>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="status">Status de Publicação</Label>
              <select
                id="status"
                name="status"
                defaultValue={initialData?.status || "rascunho"}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="rascunho">Rascunho</option>
                <option value="publicado">Publicado</option>
                <option value="arquivado">Arquivado</option>
              </select>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button 
            type="submit" 
            disabled={isPending || !pdfUrl}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {isPending ? "Salvando..." : initialData ? "Atualizar Artigo" : "Criar Artigo"}
          </Button>
        </div>
      </div>
    </form>
  );
}