"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  Check,
  FileText,
  Grid3x3,
  Loader2,
  Plus,
  Sparkles,
  Tags,
  Upload,
  X,
} from "lucide-react";

import BlobDocumentUpload from "@/components/admin/BlobDocumentUpload";
import type { UploadedBlobFile } from "@/components/admin/BlobDocumentUpload";
import CloudinaryUpload from "@/components/admin/CloudinaryUpload";
import type { UploadedFile } from "@/components/admin/CloudinaryUpload";
import {
  LIVRO_BLOB_MAX_SIZE_BYTES,
  LIVRO_DOCUMENT_ACCEPTED_FORMATS,
} from "@/lib/blob/livros";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { atualizarLivro, criarLivro } from "@/lib/actions/livros.actions";
import {
  AreaLivroParaMacroArea,
  areaLivroValues,
  macroAreaLivroValues,
  type AreaLivro,
  type MacroAreaLivro,
} from "@/lib/domain/areas";
import { LABELS_CATEGORIAS } from "@/lib/domain/areasCategoriasPatern";
import type { Status } from "@/lib/domain/enums";
import {
  getLivroCapaPublicId,
  getLivroCapaUrl,
} from "@/lib/domain/livro";
import type { Livro } from "@/lib/types";
import { cn } from "@/lib/utils";

interface LivroFormProps {
  initialData?: Livro;
  onCancel?: () => void;
}

type Feedback = { tipo: "success" | "error"; msg: string } | null;

type LivroFormState = {
  titulo: string;
  autor: string;
  macroArea: MacroAreaLivro | "";
  areas: AreaLivro[];
  status: Status;
  descricao: string;
  sinopse: string;
  isbn: string;
  anoPublicacao: string;
  editora: string;
  idioma: string;
  numeroPaginas: string;
  capaUrl: string;
  capaPublicId: string;
  pdfUrl: string;
  pdfByte: string;
  pdfFormat: string;
  epubUrl: string;
  resumoUrl: string;
  tags: string[];
  novo: boolean;
  popular: boolean;
};

const STATUS_OPTIONS: Array<{ value: Status; label: string }> = [
  { value: "rascunho", label: "Rascunho" },
  { value: "publicado", label: "Publicado" },
  { value: "ativo", label: "Ativo" },
  { value: "pendente", label: "Pendente" },
  { value: "arquivado", label: "Arquivado" },
];

const IDIOMA_OPTIONS = [
  "Português",
  "Inglês",
  "Espanhol",
  "Francês",
  "Alemão",
];

function toAreaLabel(area: AreaLivro): string {
  return area
    .replaceAll("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function resolveInitialMacroArea(livro?: Livro): MacroAreaLivro | "" {
  const macroFromArray = livro?.macroAreas?.[0];
  if (macroFromArray) return macroFromArray;

  const macroFromCategory = macroAreaLivroValues.find(
    (macro) =>
      LABELS_CATEGORIAS[macro] === livro?.categoria || macro === livro?.categoria,
  );

  return macroFromCategory ?? "";
}

function isActionFailure(value: unknown): value is { success: false; error?: string } {
  return (
    typeof value === "object" &&
    value !== null &&
    "success" in value &&
    (value as { success?: boolean }).success === false
  );
}

export function LivroForm({ initialData, onCancel }: LivroFormProps) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [newTag, setNewTag] = useState("");
  const [isAreasDialogOpen, setIsAreasDialogOpen] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>(null);

  const [formData, setFormData] = useState<LivroFormState>(() => {
    const macroArea = resolveInitialMacroArea(initialData);

    return {
      titulo: initialData?.titulo ?? "",
      autor: initialData?.autor ?? "",
      macroArea,
      areas: (initialData?.areas as AreaLivro[] | undefined) ?? [],
      status: (initialData?.status as Status | undefined) ?? "rascunho",
      descricao: initialData?.descricao ?? "",
      sinopse: initialData?.detalhes?.sinopse ?? initialData?.descricao ?? "",
      isbn: initialData?.detalhes?.isbn ?? "",
      anoPublicacao: initialData?.anoPublicacao
        ? String(initialData.anoPublicacao)
        : "",
      editora: initialData?.detalhes?.editora ?? "",
      idioma: initialData?.idioma ?? "Português",
      numeroPaginas: initialData?.detalhes?.numeroPaginas
        ? String(initialData.detalhes.numeroPaginas)
        : "",
      capaUrl: getLivroCapaUrl(initialData?.capa),
      capaPublicId: getLivroCapaPublicId(initialData?.capa),
      pdfUrl: initialData?.midia?.pdf ?? "",
      pdfByte: String(initialData?.midia?.byte ?? ""),
      pdfFormat: initialData?.midia?.format ?? "",
      epubUrl: initialData?.midia?.epub ?? "",
      resumoUrl: initialData?.midia?.resumo ?? "",
      tags: initialData?.tags ?? [],
      novo: Boolean(initialData?.novo),
      popular: Boolean(initialData?.popular),
    };
  });

  const areasDaMacroSelecionada = useMemo(() => {
    if (!formData.macroArea) return [];

    return areaLivroValues.filter(
      (area) => AreaLivroParaMacroArea[area] === formData.macroArea,
    );
  }, [formData.macroArea]);

  const areaCount = formData.areas.length;

  function setField<K extends keyof LivroFormState>(
    key: K,
    value: LivroFormState[K],
  ) {
    setFormData((prev) => ({ ...prev, [key]: value }));
  }

  function handleMacroAreaChange(value: MacroAreaLivro) {
    setFormData((prev) => ({
      ...prev,
      macroArea: value,
      areas: prev.areas.filter((area) => AreaLivroParaMacroArea[area] === value),
    }));
  }

  function toggleArea(area: AreaLivro, checked: boolean) {
    if (checked) {
      if (!formData.areas.includes(area)) {
        setField("areas", [...formData.areas, area]);
      }
      return;
    }

    setField(
      "areas",
      formData.areas.filter((item) => item !== area),
    );
  }

  function handleAddTag() {
    const tag = newTag.trim();
    if (!tag) return;
    if (formData.tags.includes(tag)) {
      setNewTag("");
      return;
    }

    setField("tags", [...formData.tags, tag]);
    setNewTag("");
  }

  function handleRemoveTag(tag: string) {
    setField(
      "tags",
      formData.tags.filter((item) => item !== tag),
    );
  }

  function validateForm(): string | null {
    if (formData.titulo.trim().length < 2) {
      return "Informe um título com pelo menos 2 caracteres.";
    }

    if (formData.autor.trim().length < 2) {
      return "Informe o autor do livro.";
    }

    if (!formData.macroArea) {
      return "Selecione uma categoria principal.";
    }

    if (!formData.areas.length) {
      return "Selecione pelo menos uma subcategoria.";
    }

    if (formData.descricao.trim().length < 10) {
      return "A descrição deve ter no mínimo 10 caracteres.";
    }

    if (!formData.numeroPaginas || Number(formData.numeroPaginas) <= 0) {
      return "Informe um número de páginas válido.";
    }

    if (!formData.capaUrl.trim()) {
      return "Faça upload da capa do livro.";
    }

    if (!formData.capaPublicId.trim()) {
      return "A capa precisa de um publicId válido no Cloudinary.";
    }

    if (!formData.pdfUrl.trim()) {
      return "Faça upload do arquivo principal do livro.";
    }

    if (!formData.pdfByte.trim() || Number(formData.pdfByte) <= 0) {
      return "O tamanho do arquivo principal é inválido.";
    }

    if (!formData.pdfFormat.trim()) {
      return "Formato do arquivo principal inválido.";
    }

    return null;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFeedback(null);

    const validationError = validateForm();
    if (validationError) {
      setFeedback({ tipo: "error", msg: validationError });
      return;
    }

    setIsPending(true);

    try {
      const payload = new FormData();

      payload.set("titulo", formData.titulo.trim());
      payload.set("autor", formData.autor.trim());
      payload.set("categoria", LABELS_CATEGORIAS[formData.macroArea as MacroAreaLivro]);
      payload.set("descricao", formData.descricao.trim());
      payload.set("sinopse", formData.sinopse.trim() || formData.descricao.trim());
      payload.set("status", formData.status);
      payload.set("idioma", formData.idioma.trim() || "Português");
      payload.set("numeroPaginas", String(Number(formData.numeroPaginas)));
      payload.set("areas", formData.areas.join(","));
      payload.set("tags", formData.tags.join(","));
      payload.set("capa_url", formData.capaUrl.trim());
      payload.set("capa_public_id", formData.capaPublicId.trim());
      payload.set("pdf_url", formData.pdfUrl.trim());
      payload.set("pdf_byte", formData.pdfByte.trim());
      payload.set("pdf_format", formData.pdfFormat.trim());

      if (formData.editora.trim()) payload.set("editora", formData.editora.trim());
      if (formData.isbn.trim()) payload.set("isbn", formData.isbn.trim());
      if (formData.anoPublicacao.trim()) {
        payload.set("anoPublicacao", formData.anoPublicacao.trim());
      }
      if (formData.epubUrl.trim()) payload.set("epub_url", formData.epubUrl.trim());
      if (formData.resumoUrl.trim()) payload.set("resumo_url", formData.resumoUrl.trim());
      if (formData.novo) payload.set("novo", "on");
      if (formData.popular) payload.set("popular", "on");

      const result = initialData?.id
        ? await atualizarLivro(initialData.id, payload)
        : await criarLivro(payload);

      if (isActionFailure(result)) {
        throw new Error(result.error || "Falha ao salvar livro.");
      }

      setFeedback({ tipo: "success", msg: "Livro salvo com sucesso." });
      router.push("/admin/livros");
      router.refresh();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro inesperado ao salvar livro.";
      setFeedback({ tipo: "error", msg: message });
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="bg-sidebar mx-auto max-w-6xl space-y-6 rounded-3xl py-8 shadow-gray-400 sm:px-16 sm:py-10 sm:shadow">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            {initialData ? "Editar Livro" : "Novo Livro"}
          </h1>
          <p className="text-sm text-slate-600">
            Gestão de livros técnicos com categoria, subcategorias e mídia.
          </p>
        </div>
        {onCancel && (
          <Button variant="outline" onClick={onCancel} type="button" className="shadow-sm">
            Voltar
          </Button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="bg-accent border-slate-300 shadow-md">
          <CardHeader className="m-0 p-0">
            <div className="flex w-full items-center gap-2 border-b py-2 pl-5">
              <BookOpen className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-base">Informações Principais</CardTitle>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 pt-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Título *</Label>
                <Input
                  value={formData.titulo}
                  onChange={(e) => setField("titulo", e.target.value)}
                  placeholder="Ex: Inteligência Artificial Aplicada"
                  className="shadow-sm"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold">Autor *</Label>
                <Input
                  value={formData.autor}
                  onChange={(e) => setField("autor", e.target.value)}
                  placeholder="Nome do autor"
                  className="shadow-sm"
                />
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Categoria *</Label>
                <Select
                  value={formData.macroArea}
                  onValueChange={(value) => handleMacroAreaChange(value as MacroAreaLivro)}
                >
                  <SelectTrigger className="shadow-sm">
                    <SelectValue placeholder="Selecione a categoria principal" />
                  </SelectTrigger>
                  <SelectContent>
                    {macroAreaLivroValues.map((macro) => (
                      <SelectItem key={macro} value={macro}>
                        {LABELS_CATEGORIAS[macro]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-3">
              <Label className="flex items-center gap-1.5 text-sm font-semibold">
                <Grid3x3 className="h-4 w-4" />
                Subcategorias (Áreas) *
              </Label>

              <Dialog open={isAreasDialogOpen} onOpenChange={setIsAreasDialogOpen}>
                <DialogTrigger asChild>
                  <Button type="button" variant="outline" className="w-full justify-start shadow-sm">
                    {areaCount > 0
                      ? `${areaCount} subcategoria(s) selecionada(s)`
                      : "Selecionar subcategorias"}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-h-[80vh] max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Subcategorias do Livro</DialogTitle>
                    <DialogDescription>
                      {formData.macroArea
                        ? `Selecione as subcategorias de ${LABELS_CATEGORIAS[formData.macroArea as MacroAreaLivro]}.`
                        : "Selecione primeiro a categoria principal para listar as subcategorias."}
                    </DialogDescription>
                  </DialogHeader>

                  {!formData.macroArea ? (
                    <div className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                      Escolha uma categoria principal antes de selecionar subcategorias.
                    </div>
                  ) : (
                    <div className="max-h-[420px] space-y-2 overflow-y-auto pr-1">
                      {areasDaMacroSelecionada.map((area) => {
                        const isChecked = formData.areas.includes(area);

                        return (
                          <label
                            key={area}
                            className={cn(
                              "flex cursor-pointer items-center gap-2 rounded-lg border-2 p-3 transition-colors hover:bg-slate-50",
                              isChecked ? "border-blue-500 bg-blue-50" : "border-slate-200",
                            )}
                          >
                            <Checkbox
                              checked={isChecked}
                              onCheckedChange={(checked) => toggleArea(area, checked === true)}
                            />
                            <span className="text-sm text-slate-700">{toAreaLabel(area)}</span>
                          </label>
                        );
                      })}
                    </div>
                  )}

                  <DialogFooter>
                    <Button type="button" onClick={() => setIsAreasDialogOpen(false)}>
                      Confirmar ({areaCount})
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {areaCount > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.areas.map((area) => (
                    <Badge key={area} variant="outline" className="shadow-sm">
                      {toAreaLabel(area)}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold">Descrição *</Label>
              <Textarea
                rows={5}
                value={formData.descricao}
                onChange={(e) => setField("descricao", e.target.value)}
                placeholder="Descreva o livro, objetivos de aprendizagem e público-alvo..."
                className="min-h-[130px] resize-none shadow-sm"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-accent border-slate-300 shadow-md">
          <CardHeader className="m-0 p-0">
            <div className="flex w-full items-center gap-2 border-b py-2 pl-5">
              <FileText className="h-5 w-5 text-purple-600" />
              <CardTitle className="text-base">Detalhes e Metadados</CardTitle>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 pt-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Editora</Label>
                <Input
                  value={formData.editora}
                  onChange={(e) => setField("editora", e.target.value)}
                  placeholder="Nome da editora"
                  className="shadow-sm"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold">Ano de Publicação</Label>
                <Input
                  type="number"
                  value={formData.anoPublicacao}
                  onChange={(e) => setField("anoPublicacao", e.target.value)}
                  placeholder="2025"
                  className="shadow-sm"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold">Idioma</Label>
                <Select value={formData.idioma} onValueChange={(value) => setField("idioma", value)}>
                  <SelectTrigger className="shadow-sm">
                    <SelectValue placeholder="Selecione o idioma" />
                  </SelectTrigger>
                  <SelectContent>
                    {IDIOMA_OPTIONS.map((idioma) => (
                      <SelectItem key={idioma} value={idioma}>
                        {idioma}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold">Nº de Páginas *</Label>
                <Input
                  type="number"
                  value={formData.numeroPaginas}
                  onChange={(e) => setField("numeroPaginas", e.target.value)}
                  placeholder="350"
                  className="shadow-sm"
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label className="text-sm font-semibold">ISBN</Label>
                <Input
                  value={formData.isbn}
                  onChange={(e) => setField("isbn", e.target.value)}
                  placeholder="978-3-16-148410-0"
                  className="shadow-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold">Sinopse</Label>
              <Textarea
                rows={4}
                value={formData.sinopse}
                onChange={(e) => setField("sinopse", e.target.value)}
                placeholder="Sinopse resumida para exibição nas páginas do livro"
                className="min-h-[110px] resize-none shadow-sm"
              />
            </div>

            <Separator />

            <div className="space-y-3">
              <Label className="flex items-center gap-1.5 text-sm font-semibold">
                <Tags className="h-4 w-4" />
                Tags
              </Label>

              <div className="flex gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                  placeholder="Digite uma tag e pressione Enter"
                  className="shadow-sm"
                />
                <Button type="button" variant="outline" onClick={handleAddTag}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="gap-1 shadow-sm">
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="hover:text-destructive ml-1"
                        aria-label={`Remover tag ${tag}`}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <Separator />

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5">
                <Checkbox
                  checked={formData.novo}
                  onCheckedChange={(checked) => setField("novo", checked === true)}
                />
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-amber-700">
                  <Sparkles className="h-4 w-4" />
                  Marcar como Novo
                </span>
              </label>

              <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2.5">
                <Checkbox
                  checked={formData.popular}
                  onCheckedChange={(checked) => setField("popular", checked === true)}
                />
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-700">
                  <Check className="h-4 w-4" />
                  Marcar como Popular
                </span>
              </label>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-accent border-slate-300 shadow-md">
          <CardHeader className="m-0 p-0">
            <div className="flex w-full items-center gap-2 border-b py-2 pl-5">
              <Upload className="h-5 w-5 text-green-600" />
              <CardTitle className="text-base">Arquivos</CardTitle>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 pt-6">
            <CloudinaryUpload
              type="image"
              folder="starb/livros/capas"
              label="Capa do Livro *"
              description="PNG, WEBP ou AVIF — máx 3MB"
              showInfoCards={false}
              onUploadComplete={(files: UploadedFile[]) => {
                const uploaded = files[0];
                if (uploaded?.url) setField("capaUrl", uploaded.url);
                if (uploaded?.publicId) {
                  setField("capaPublicId", uploaded.publicId);
                }
              }}
              onFileRemove={() => {
                setField("capaUrl", "");
                setField("capaPublicId", "");
              }}
            />

            <BlobDocumentUpload
              folder="starb/livros/arquivos"
              label="Arquivo Principal *"
              description="PDF, EPUB, DOC, DOCX, TXT ou MD — máx 400MB"
              acceptedFormats={[...LIVRO_DOCUMENT_ACCEPTED_FORMATS]}
              maxSize={LIVRO_BLOB_MAX_SIZE_BYTES}
              showInfoCards={false}
              onUploadComplete={(files: UploadedBlobFile[]) => {
                const uploaded = files[0];
                if (uploaded?.url) setField("pdfUrl", uploaded.url);
                if (typeof uploaded?.bytes === "number") {
                  setField("pdfByte", String(uploaded.bytes));
                }
                if (uploaded?.format) setField("pdfFormat", uploaded.format);
              }}
              onFileRemove={() => {
                setField("pdfUrl", "");
                setField("pdfByte", "");
                setField("pdfFormat", "");
              }}
            />

            <div className="grid gap-6 lg:grid-cols-2">
              <BlobDocumentUpload
                folder="starb/livros/arquivos"
                label="Arquivo EPUB (opcional)"
                description="PDF, EPUB, DOC, DOCX, TXT ou MD — máx 400MB"
                acceptedFormats={[...LIVRO_DOCUMENT_ACCEPTED_FORMATS]}
                maxSize={LIVRO_BLOB_MAX_SIZE_BYTES}
                showInfoCards={false}
                onUploadComplete={(files: UploadedBlobFile[]) => {
                  const uploaded = files[0];
                  if (uploaded?.url) setField("epubUrl", uploaded.url);
                }}
                onFileRemove={() => {
                  setField("epubUrl", "");
                }}
              />

              <BlobDocumentUpload
                folder="starb/livros/arquivos"
                label="Arquivo Resumo (opcional)"
                description="PDF, EPUB, DOC, DOCX, TXT ou MD — máx 400MB"
                acceptedFormats={[...LIVRO_DOCUMENT_ACCEPTED_FORMATS]}
                maxSize={LIVRO_BLOB_MAX_SIZE_BYTES}
                showInfoCards={false}
                onUploadComplete={(files: UploadedBlobFile[]) => {
                  const uploaded = files[0];
                  if (uploaded?.url) setField("resumoUrl", uploaded.url);
                }}
                onFileRemove={() => {
                  setField("resumoUrl", "");
                }}
              />
            </div>
          </CardContent>
        </Card>

        {feedback && (
          <div
            role={feedback.tipo === "error" ? "alert" : "status"}
            className={cn(
              "rounded-lg border px-4 py-3 text-sm font-medium",
              feedback.tipo === "success"
                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                : "border-red-200 bg-red-50 text-red-700",
            )}
          >
            {feedback.msg}
          </div>
        )}

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <div className="flex gap-2 rounded-md border pl-2">
            <Label className="text-sm font-bold">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => setField("status", value as Status)}
            >
              <SelectTrigger className="border-y-0 border-r-0 border-l shadow-none">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isPending}
              className="shadow-sm"
            >
              Cancelar
            </Button>
          )}

          <Button type="submit" disabled={isPending} className="bg-blue-600 shadow-md hover:bg-blue-700">
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Salvando...
              </>
            ) : initialData ? (
              "Atualizar Livro"
            ) : (
              "Adicionar Livro"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
