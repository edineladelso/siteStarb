/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import CloudinaryUpload from "../CloudinaryUpload";
import { criarArtigo, atualizarArtigo } from "@/lib/actions/artigos.actions";
import { CATEGORIAS, type Artigo } from "@/lib/types";
import { areaLivroValues, type AreaLivro } from "@/lib/domain/areas";
import {
  FileText,
  Users,
  Calendar,
  Tag,
  BookOpen,
  Upload,
  Settings,
  Sparkles,
  X,
  Check,
  Grid3x3,
  Loader2,
  Maximize,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ArtigoFormProps {
  initialData?: Artigo;
  onCancel?: () => void;
}

// Schema dedicado para o formulário - não usar omit() para evitar conflitos de tipo
const formSchema = z
  .object({
    titulo: z
      .string()
      .min(3, "Título deve ter no mínimo 3 caracteres")
      .max(200),
    categoria: z.string().min(2, "Selecione uma categoria"),
    descricao: z.string().min(10, "Descrição deve ter no mínimo 10 caracteres"),
    status: z.enum(["ativo", "rascunho", "arquivado", "pendente", "publicado"]),
    autores: z.array(z.string().min(2)).min(1, "Adicione pelo menos um autor"),
    resumo: z.string().min(10, "Resumo deve ter no mínimo 10 caracteres"),
    palavrasChave: z.string().nullable().optional(),
    instituicao: z.string().nullable().optional(),
    anoPublicacao: z.number().int().nullable().optional(),
    areas: z
      .array(z.enum(areaLivroValues))
      .min(1, "Selecione pelo menos uma área"),
    capa: z.string().url("URL da capa inválida").optional().nullable(),
    midia: z
      .discriminatedUnion("tipo", [
        z.object({
          tipo: z.literal("pdf"),
          pdfUrl: z.string().url("URL do PDF inválida"),
        }),
        z.object({
          tipo: z.literal("plataforma"),
          htmlUrl: z.string().url("URL HTML inválida"),
        }),
      ])
      .nullable()
      .optional(),
    leituraMin: z.number().int().min(0).default(0),
    tags: z.array(z.string().min(1)).default([]),
    destaque: z.boolean().default(false),
    citacoes: z.number().int().min(0).default(0),
    html: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.midia && !data.html) {
      ctx.addIssue({
        path: ["html"],
        code: "custom",
        message: "Forneça o HTML do artigo ou anexe uma mídia.",
      });
    }
  });

// Usamos z.input para alinhar o tipo do useForm com o zodResolver (RHF espera o tipo de entrada)
type FormValues = z.input<typeof formSchema>;

// Helper para transformar mídia inicial no formato correto
function normalizarMidiaInicial(midia: unknown): FormValues["midia"] {
  if (!midia || typeof midia !== "object") return null;

  const tipo = (midia as any).tipo;

  if (
    tipo === "pdf" &&
    typeof (midia as any).pdfUrl === "string" &&
    (midia as any).pdfUrl.length > 0
  ) {
    return { tipo: "pdf", pdfUrl: (midia as any).pdfUrl };
  }

  if (
    tipo === "plataforma" &&
    typeof (midia as any).htmlUrl === "string" &&
    (midia as any).htmlUrl.length > 0
  ) {
    return { tipo: "plataforma", htmlUrl: (midia as any).htmlUrl };
  }

  return null;
}

export function ArtigoForm({ initialData, onCancel }: ArtigoFormProps) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);
  const [isAreasDialogOpen, setIsAreasDialogOpen] = useState(false);
  const [isHtmlDialogOpen, setIsHtmlDialogOpen] = useState(false);
  const [selectedAreas, setSelectedAreas] = useState<AreaLivro[]>(
    (initialData?.areas as AreaLivro[]) || [],
  );

  // Preparar valores iniciais normalizados
  const defaultValues: FormValues = {
    titulo: initialData?.titulo || "",
    categoria: initialData?.categoria || "",
    descricao: initialData?.resumo || "",
    status: (initialData?.status as FormValues["status"]) || "rascunho",
    autores: Array.isArray(initialData?.autores)
      ? initialData.autores
      : initialData?.autores
        ? [String(initialData.autores)]
        : [],
    resumo: initialData?.resumo || "",
    palavrasChave: initialData?.palavrasChave || null,
    instituicao: initialData?.instituicao || null,
    anoPublicacao: initialData?.anoPublicacao || null,
    areas: (initialData?.areas as AreaLivro[]) || [],
    capa: initialData?.capa ?? null,
    midia: normalizarMidiaInicial(initialData?.midia),
    leituraMin: initialData?.leituraMin ?? 0,
    tags: Array.isArray(initialData?.tags) ? initialData.tags : [],
    destaque: initialData?.destaque ?? false,
    citacoes: initialData?.citacoes ?? 0,
    html: initialData?.html || "",
  };

  // Entrada livre para autores (texto) - só parseamos vírgulas na submissão/blur
  const [autoresInput, setAutoresInput] = useState(() =>
    defaultValues.autores.join(", "),
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onChange",
  });

  const { watch, setValue } = form;
  const midiaAtual = watch("midia");
  const midiaTipo = midiaAtual?.tipo;
  const currentAreas = watch("areas");
  const currentTags: string[] = watch("tags") ?? [];
  const resumoAtual = watch("resumo");

  // Sincronizar áreas selecionadas com o form
  useEffect(() => {
    setValue("areas", selectedAreas);
  }, [selectedAreas, setValue]);

  // Manter descricao em sincronia com o resumo para satisfazer a validação
  useEffect(() => {
    setValue("descricao", resumoAtual || "");
  }, [resumoAtual, setValue]);

  const parseAutores = (raw: string) =>
    raw
      .split(",")
      .map((a) => a.trim())
      .filter(Boolean);

  async function onSubmit(values: FormValues) {
    // Garantir que autores estão sincronizados com o texto digitado
    const autoresParsed = parseAutores(autoresInput);
    values = { ...values, autores: autoresParsed };

    setIsPending(true);
    try {
      const formData = new FormData();

      // Campos básicos
      formData.set("titulo", values.titulo);
      formData.set("categoria", values.categoria);
      formData.set("descricao", values.descricao);
      if (values.capa) formData.set("capa", values.capa);
      formData.set("status", values.status);
      formData.set("resumo", values.resumo);
      formData.set("autores", autoresParsed.join(", "));

      // Campos opcionais
      if (values.palavrasChave)
        formData.set("palavrasChave", values.palavrasChave);
      if (values.instituicao) formData.set("instituicao", values.instituicao);
      if (values.anoPublicacao)
        formData.set("anoPublicacao", String(values.anoPublicacao));

      // Áreas
      formData.set("areas", values.areas.join(","));

      // Mídia
      if (values.midia) {
        formData.set("midia_tipo", values.midia.tipo);
        if (values.midia.tipo === "pdf" && "pdfUrl" in values.midia) {
          formData.set("pdf_url", values.midia.pdfUrl);
        } else if (
          values.midia.tipo === "plataforma" &&
          "htmlUrl" in values.midia
        ) {
          formData.set("html_url", values.midia.htmlUrl);
        }
      }

      // Metadados
      formData.set("leituraMin", String(values.leituraMin));
      formData.set("citacoes", String(values.citacoes));
      const tags = values.tags ?? [];
      formData.set("tags", tags.join(","));
      if (values.destaque) formData.set("destaque", "on");
      if (values.html) formData.set("html", values.html);

      let result;
      if (initialData?.id) {
        result = await atualizarArtigo(String(initialData.slug), formData);
      } else {
        result = await criarArtigo(formData);
      }

      if (result.success) {
        router.push("/admin/artigos");
        router.refresh();
      } else {
        console.error("Erro ao salvar:", result.error);
      }
    } catch (error) {
      console.error("Erro fatal:", error);
    } finally {
      setIsPending(false);
    }
  }

  const handleAddTag = (tag: string) => {
    if (tag && !currentTags.includes(tag)) {
      setValue("tags", [...currentTags, tag]);
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setValue(
      "tags",
      currentTags.filter((tag) => tag !== tagToRemove),
    );
  };

  return (
    <div className="bg-sidebar mx-auto max-w-6xl space-y-6 rounded-3xl py-8 shadow-gray-400 sm:px-16 sm:py-10 sm:shadow">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            {initialData ? "Editar Artigo" : "Novo Artigo"}
          </h1>
          <p className="text-sm text-slate-600">
            Gestão de publicações científicas e técnicas
          </p>
        </div>
        <Button
          variant="outline"
          onClick={onCancel}
          type="button"
          className="shadow-sm"
        >
          Voltar
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Dados Principais */}
          <Card className="bg-accent border-slate-300 shadow-md">
            <CardHeader className="m-0 p-0">
              <div className="flex w-full items-center gap-2 border-b py-2 pl-5">
                <FileText className="h-5 w-5 text-blue-600" />
                <CardTitle className="text-base">
                  Informações Principais
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <FormField
                control={form.control}
                name="titulo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold">
                      Título do Artigo *
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: Impacto da IA na Engenharia Civil"
                        className="text-sm shadow-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-6 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="categoria"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">
                        Categoria *
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="shadow-sm">
                            <SelectValue placeholder="Selecione uma categoria" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {CATEGORIAS.map((cat) => (
                            <SelectItem key={cat} value={cat}>
                              {cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="capa"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">
                        Capa
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="URL da capa do artigo"
                          className="shadow-sm"
                          name={field.name}
                          ref={field.ref}
                          onBlur={field.onBlur}
                          value={field.value ?? ""}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value.trim() ? e.target.value.trim() : null,
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="resumo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold">
                      Resumo (Abstract) *
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Descreva brevemente o conteúdo do artigo..."
                        className="min-h-[120px] resize-none shadow-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-xs">
                      Mínimo de 10 caracteres
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Autoria e Publicação */}
          <Card className="bg-accent border-slate-300 shadow-md">
            <CardHeader className="m-0 p-0">
              <div className="flex w-full items-center gap-2 border-b py-2 pl-5">
                <Users className="h-5 w-5 text-purple-600" />
                <CardTitle className="text-base">
                  Autoria e Publicação
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <FormField
                control={form.control}
                name="autores"
                render={() => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold">
                      Autores *
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nome dos autores (separados por vírgula)"
                        className="shadow-sm"
                        value={autoresInput}
                        onChange={(e) => {
                          setAutoresInput(e.target.value);
                        }}
                        onBlur={() => {
                          const autores = parseAutores(autoresInput);
                          setValue("autores", autores, {
                            shouldValidate: true,
                          });
                        }}
                      />
                    </FormControl>
                    <FormDescription className="text-xs">
                      Separe múltiplos autores com vírgula
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-6 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="instituicao"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">
                        Instituição
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ex: Universidade de São Paulo"
                          className="shadow-sm"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="anoPublicacao"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">
                        Ano de Publicação
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="2024"
                          className="shadow-sm"
                          {...field}
                          value={field.value || ""}
                          onChange={(e) => {
                            const val = e.target.value;
                            field.onChange(val ? Number(val) : null);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Conteúdo e Mídia */}
          <Card className="bg-accent border-slate-300 shadow-md">
            <CardHeader className="m-0 p-0">
              <div className="flex w-full items-center gap-2 border-b py-2 pl-5">
                <Upload className="h-5 w-5 text-green-600" />
                <CardTitle className="text-base">Conteúdo e Mídia</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-4">
                <FormLabel className="text-sm font-semibold">
                  Tipo de Mídia
                </FormLabel>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    type="button"
                    variant={midiaTipo === "plataforma" ? "default" : "outline"}
                    className={cn(
                      "bg-sidebar h-auto flex-col gap-2 py-2 shadow-sm sm:py-4",
                      midiaTipo === "plataforma" &&
                        "bg-blue-600 hover:bg-blue-700",
                    )}
                    onClick={() =>
                      setValue("midia", { tipo: "plataforma", htmlUrl: "" })
                    }
                  >
                    <BookOpen className="h-5 w-5" />
                    <span className="text-xs text-wrap">Plataforma (HTML)</span>
                  </Button>
                  <Button
                    type="button"
                    variant={midiaTipo === "pdf" ? "default" : "outline"}
                    className={cn(
                      "bg-sidebar h-auto flex-col gap-2 py-2 shadow-sm sm:py-4",
                      midiaTipo === "pdf" && "bg-blue-600 hover:bg-blue-700",
                    )}
                    onClick={() =>
                      setValue("midia", { tipo: "pdf", pdfUrl: "" })
                    }
                  >
                    <FileText className="h-5 w-5" />
                    <span className="text-xs">PDF</span>
                  </Button>
                  <Button
                    type="button"
                    variant={!midiaTipo ? "default" : "outline"}
                    className={cn(
                      "bg-sidebar h-auto flex-col gap-2 py-2 shadow-sm sm:py-4",
                      !midiaTipo && "bg-blue-600 hover:bg-blue-700",
                    )}
                    onClick={() => setValue("midia", null)}
                  >
                    <FileText className="h-5 w-5" />
                    <span className="text-xs text-wrap">Somente HTML</span>
                  </Button>
                </div>
              </div>

              {midiaTipo === "pdf" && (
                <div className="space-y-3 rounded-lg border border-blue-200 bg-blue-50/50 p-4">
                  <FormLabel className="text-sm font-semibold">
                    Upload do PDF
                  </FormLabel>
                  <CloudinaryUpload
                    type="pdf"
                    label=""
                    onUploadComplete={(files: any) => {
                      setValue("midia", { tipo: "pdf", pdfUrl: files[0].url });
                    }}
                  />
                  {midiaAtual &&
                    midiaAtual.tipo === "pdf" &&
                    midiaAtual.pdfUrl && (
                      <div className="flex items-center gap-2 rounded-md bg-green-100 px-3 py-2">
                        <Check className="h-4 w-4 text-green-700" />
                        <p className="text-xs font-medium text-green-700">
                          PDF carregado: {midiaAtual.pdfUrl.split("/").pop()}
                        </p>
                      </div>
                    )}
                </div>
              )}

              <FormField
                control={form.control}
                name="html"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel className="text-sm font-semibold">
                        Conteúdo HTML
                      </FormLabel>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => setIsHtmlDialogOpen(true)}
                        className="h-8"
                      >
                        <Maximize />
                      </Button>
                    </div>
                    <FormControl>
                      <Textarea
                        placeholder="<h1>Título</h1><p>Conteúdo do artigo...</p>"
                        className="min-h-[200px] resize-none font-mono text-xs shadow-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-xs">
                      HTML renderizado na plataforma. Obrigatório se não houver
                      PDF.
                    </FormDescription>
                    <FormMessage />

                    <Dialog
                      open={isHtmlDialogOpen}
                      onOpenChange={setIsHtmlDialogOpen}
                    >
                      <DialogContent
                        className="flex h-[calc(100%-1rem)] w-[calc(100%-1rem)] flex-col gap-3 p-4 sm:h-[95vh] sm:max-h-[90vh] sm:w-[90vw] sm:max-w-5xl sm:p-6 lg:h-[80vh] lg:w-[80vw]"
                        classNameX="top-1 sm:top-3 right-1 sm:right-3 p-1 border rounded-lg border-gray-600"
                        size={5}
                      >
                        <DialogHeader className="m-0 p-0">
                          <DialogTitle>Editar Conteúdo HTML</DialogTitle>
                        </DialogHeader>
                        <div className="w-full flex-1">
                          <Textarea
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="<h1>Título</h1><p>Conteúdo do artigo...</p>"
                            className="h-full w-full resize-none font-mono text-xs shadow-sm sm:text-sm"
                          />
                        </div>
                        <DialogFooter className="m-0 p-0 text-xs">
                          O conteúdo salva automaticamente no form.
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Metadados */}
          <Card className="bg-accent border-slate-300 shadow-md">
            <CardHeader className="m-0 p-0">
              <div className="flex w-full items-center gap-2 border-b py-2 pl-5">
                <Settings className="h-5 w-5 text-orange-600" />
                <CardTitle className="text-lg">
                  Metadados e Configurações
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid gap-6 sm:grid-cols-3">
                <FormField
                  control={form.control}
                  name="leituraMin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-4 w-4" />
                          Leitura (min)
                        </div>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          className="shadow-sm"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="citacoes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">
                        <div className="flex items-center gap-1.5">
                          <BookOpen className="h-4 w-4" />
                          Citações
                        </div>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          className="shadow-sm"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="destaque"
                  render={({ field }) => (
                    <FormItem className="flex flex-col justify-end">
                      <div className="flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50/50 px-3 py-2.5">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="flex items-center gap-1.5">
                          <Sparkles className="h-4 w-4 text-amber-600" />
                          <FormLabel className="cursor-pointer text-sm font-semibold">
                            Destacar
                          </FormLabel>
                        </div>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <Separator />

              {/* Tags */}
              <div className="space-y-3">
                <FormLabel className="flex items-center gap-1.5 text-sm font-semibold">
                  <Tag className="h-4 w-4" />
                  Tags
                </FormLabel>
                <div className="flex gap-2">
                  <Input
                    placeholder="Digite uma tag e pressione Enter"
                    className="shadow-sm"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        const input = e.currentTarget;
                        handleAddTag(input.value.trim());
                        input.value = "";
                      }
                    }}
                  />
                </div>
                {currentTags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {currentTags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="gap-1 shadow-sm"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="hover:text-destructive ml-1"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <Separator />

              {/* Áreas de Conhecimento */}
              <div className="space-y-3">
                <FormLabel className="flex items-center gap-1.5 text-sm font-semibold">
                  <Grid3x3 className="h-4 w-4" />
                  Áreas de Conhecimento *
                </FormLabel>
                <Dialog
                  open={isAreasDialogOpen}
                  onOpenChange={setIsAreasDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full justify-start shadow-sm"
                    >
                      {currentAreas.length > 0
                        ? `${currentAreas.length} área(s) selecionada(s)`
                        : "Selecionar áreas"}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-h-[80vh] max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Áreas de Conhecimento</DialogTitle>
                      <DialogDescription>
                        Selecione as áreas relacionadas ao artigo
                      </DialogDescription>
                    </DialogHeader>
                    <ScrollArea className="h-[400px] pr-4">
                      <div className="grid grid-cols-2 gap-3">
                        {areaLivroValues.map((area) => (
                          <label
                            key={area}
                            className={cn(
                              "flex cursor-pointer items-center gap-2 rounded-lg border-2 p-3 transition-all hover:bg-slate-50",
                              selectedAreas.includes(area)
                                ? "border-blue-500 bg-blue-50"
                                : "border-slate-200",
                            )}
                          >
                            <Checkbox
                              checked={selectedAreas.includes(area)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedAreas([...selectedAreas, area]);
                                } else {
                                  setSelectedAreas(
                                    selectedAreas.filter((a) => a !== area),
                                  );
                                }
                              }}
                            />
                            <span className="text-sm">
                              {area.replace(/_/g, " ")}
                            </span>
                          </label>
                        ))}
                      </div>
                    </ScrollArea>
                    <DialogFooter>
                      <Button
                        type="button"
                        onClick={() => setIsAreasDialogOpen(false)}
                      >
                        Confirmar ({selectedAreas.length})
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                {currentAreas.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {currentAreas.map((area) => (
                      <Badge key={area} variant="outline" className="shadow-sm">
                        {area.replace(/_/g, " ")}
                      </Badge>
                    ))}
                  </div>
                )}
                {form.formState.errors.areas && (
                  <p className="text-destructive text-sm font-medium">
                    {form.formState.errors.areas.message}
                  </p>
                )}
              </div>

              <FormField
                control={form.control}
                name="palavrasChave"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold">
                      Palavras-chave
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Palavras-chave para SEO"
                        className="shadow-sm"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormDescription className="text-xs">
                      Termos relevantes para otimização de busca
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <div className="flex gap-2 rounded-md border pl-2">
                    <FormLabel className="text-sm font-bold">Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="border-y-0 border-r-0 border-l shadow-none">
                        <SelectTrigger className="">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="shadow-none">
                        <SelectItem value="rascunho">Rascunho</SelectItem>
                        <SelectItem value="publicado">Publicado</SelectItem>
                        <SelectItem value="arquivado">Arquivado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isPending}
              className="shadow-sm"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="bg-blue-600 shadow-md hover:bg-blue-700"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : initialData ? (
                "Atualizar Artigo"
              ) : (
                "Criar Artigo"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
