import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  Download,
  Eye,
  FileText,
  Globe2,
  Hash,
  Layers3,
  Share2,
  Star,
  Tag,
  User2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { getCategoriaNome } from "@/lib/domain/areasCategoriasPatern";

import { fakeSelectLivros } from "../dadosLivros";
import { getLivroBySlug } from "@/lib/actions";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function formatDate(value: Date | string) {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "long",
  }).format(new Date(value));
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("pt-BR").format(value);
}

function formatArea(area: string) {
  return area
    .replaceAll("_", " ")
    .replace(/\b\w/g, (match) => match.toUpperCase());
}

function getStatusLabel(status: string) {
  const labels: Record<string, string> = {
    publicado: "Publicado",
    ativo: "Ativo",
    rascunho: "Rascunho",
    arquivado: "Arquivado",
    pendente: "Pendente",
  };

  return labels[status] ?? status;
}

function getStatusClasses(status: string) {
  const classes: Record<string, string> = {
    publicado: "bg-emerald-600 text-white",
    ativo: "bg-blue-600 text-white",
    rascunho: "bg-amber-500 text-white",
    arquivado: "bg-slate-600 text-white",
    pendente: "bg-orange-500 text-white",
  };

  return classes[status] ?? "bg-slate-500 text-white";
}

async function getLivroBySlugWithFallback(slug: string) {
  try {
    const livroFromDb = await getLivroBySlug(slug);
    if (livroFromDb) return livroFromDb;
  } catch (error) {
    console.error(`Erro ao buscar livro por slug "${slug}" no banco:`, error);
  }

  return fakeSelectLivros.find((item) => item.slug === slug) ?? null;
}

export function generateStaticParams() {
  return fakeSelectLivros.map((livro) => ({
    slug: livro.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const livro = await getLivroBySlugWithFallback(slug);

  if (!livro) {
    return {
      title: "Livro não encontrado | StarB",
      description: "O livro solicitado não foi encontrado na biblioteca StarB.",
    };
  }

  const categoriaPrincipal = livro.macroAreas?.[0]
    ? getCategoriaNome(livro.macroAreas[0])
    : livro.categoria;

  return {
    title: `${livro.titulo} | StarB Biblioteca`,
    description: livro.detalhes.sinopse ?? livro.descricao,
    alternates: {
      canonical: `/biblioteca/livros/${livro.slug}`,
    },
    openGraph: {
      title: livro.titulo,
      description: livro.detalhes.sinopse ?? livro.descricao,
      type: "article",
      images: livro.capa
        ? [
            {
              url: livro.capa,
              alt: `Capa do livro ${livro.titulo}`,
            },
          ]
        : undefined,
    },
    keywords: [
      livro.titulo,
      livro.autor,
      categoriaPrincipal,
      ...(livro.tags ?? []),
    ],
  };
}

export default async function LivroDetalhesPage({ params }: PageProps) {
  const { slug } = await params;
  const livro = await getLivroBySlugWithFallback(slug);

  if (!livro) {
    notFound();
  }

  const avaliacao = Number.parseFloat(livro.avaliacao ?? "0");
  const macroAreas = (livro.macroAreas ?? []).map((macro) =>
    getCategoriaNome(macro),
  );
  const categoriaPrincipal = macroAreas[0] ?? livro.categoria;

  const formatosDisponiveis = [
    { label: "PDF", url: livro.midia?.pdf ?? "" },
    { label: "EPUB", url: livro.midia?.epub ?? "" },
    { label: "Resumo", url: livro.midia?.resumo ?? "" },
  ].filter(
    (
      item,
    ): item is {
      label: string;
      url: string;
    } => Boolean(item.url && item.url.trim()),
  );

  const leituraPrincipalUrl = formatosDisponiveis[0]?.url;

  return (
    <div className="min-h-screen mx-auto bg-linear-to-br from-stone-100 via-stone-50 to-neutral-100 py-8 sm:py-10 lg:py-14">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb className="mb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Início</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/biblioteca/livros">Biblioteca</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{livro.titulo}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <article className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-2xl shadow-stone-300/20">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 bg-linear-to-r from-stone-50 to-white px-5 py-4 sm:px-8">
            <Link
              href="/biblioteca/livros"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-slate-900"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar para livros
            </Link>

            <Badge variant="outline" className="gap-1 rounded-full px-3 py-1.5">
              <BookOpen className="h-3.5 w-3.5" />
              Visualização técnica
            </Badge>
          </div>

          <div className="grid gap-8 p-6 lg:grid-cols-[300px_1fr] lg:gap-10 lg:p-10">
            <aside className="space-y-5">
              <div className="relative mx-auto aspect-[3/4] w-full max-w-[260px] overflow-hidden rounded-2xl border border-stone-200 bg-slate-100 shadow-2xl shadow-stone-300/30">
                {livro.capa ? (
                  <Image
                    src={livro.capa}
                    alt={`Capa do livro ${livro.titulo}`}
                    fill
                    sizes="(max-width: 1024px) 260px, 300px"
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center bg-linear-to-br from-slate-700 via-slate-800 to-slate-900 px-6 text-center text-white">
                    <BookOpen className="mb-3 h-10 w-10" />
                    <p className="text-sm font-semibold">{livro.titulo}</p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="rounded-xl border border-stone-200 bg-stone-50 px-2 py-3 text-center">
                  <p className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600">
                    <Star className="h-3.5 w-3.5 text-amber-500" /> Nota
                  </p>
                  <p className="mt-1 text-lg font-bold text-slate-900">
                    {Number.isFinite(avaliacao) ? avaliacao.toFixed(1) : "0.0"}
                  </p>
                </div>
                <div className="rounded-xl border border-stone-200 bg-stone-50 px-2 py-3 text-center">
                  <p className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600">
                    <Eye className="h-3.5 w-3.5 text-blue-600" /> Views
                  </p>
                  <p className="mt-1 text-lg font-bold text-slate-900">
                    {formatNumber(livro.views ?? 0)}
                  </p>
                </div>
                <div className="rounded-xl border border-stone-200 bg-stone-50 px-2 py-3 text-center">
                  <p className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600">
                    <Download className="h-3.5 w-3.5 text-emerald-600" />{" "}
                    Download
                  </p>
                  <p className="mt-1 text-lg font-bold text-slate-900">
                    {formatNumber(livro.downloads ?? 0)}
                  </p>
                </div>
              </div>
            </aside>

            <section className="space-y-6">
              <header className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="rounded-full bg-slate-900 text-white">
                    {categoriaPrincipal}
                  </Badge>
                  <Badge
                    className={`rounded-full ${getStatusClasses(livro.status)}`}
                  >
                    {getStatusLabel(livro.status)}
                  </Badge>
                  {livro.novo && (
                    <Badge className="rounded-full bg-indigo-600 text-white">
                      Novo
                    </Badge>
                  )}
                  {livro.popular && (
                    <Badge className="rounded-full bg-orange-500 text-white">
                      Popular
                    </Badge>
                  )}
                </div>

                <div className="space-y-2">
                  <h1 className="text-3xl leading-tight font-bold text-slate-900 lg:text-4xl">
                    {livro.titulo}
                  </h1>
                  <p className="inline-flex items-center gap-2 text-base font-medium text-slate-700">
                    <User2 className="h-4 w-4" />
                    {livro.autor}
                  </p>
                </div>

                <p className="max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
                  {livro.descricao}
                </p>
              </header>

              <div className="flex flex-wrap items-center gap-3">
                <Button
                  asChild={Boolean(leituraPrincipalUrl)}
                  className="rounded-full bg-slate-900 px-5 text-white hover:bg-slate-700"
                  disabled={!leituraPrincipalUrl}
                >
                  {leituraPrincipalUrl ? (
                    <a
                      href={leituraPrincipalUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <BookOpen className="h-4 w-4" />
                      Iniciar leitura
                    </a>
                  ) : (
                    <span>
                      <BookOpen className="h-4 w-4" />
                      Sem mídia disponível
                    </span>
                  )}
                </Button>

                {livro.midia?.pdf && (
                  <Button variant="outline" asChild className="rounded-full">
                    <a href={livro.midia.pdf} target="_blank" rel="noreferrer">
                      <Download className="h-4 w-4" />
                      Baixar PDF
                    </a>
                  </Button>
                )}

                <Button
                  variant="ghost"
                  asChild
                  className="rounded-full text-slate-600"
                >
                  <Link
                    href={`/biblioteca/livros/${livro.slug}`}
                    target="_blank"
                  >
                    <Share2 className="h-4 w-4" />
                    Abrir em nova guia
                  </Link>
                </Button>
              </div>

              <Separator />

              <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
                <div className="space-y-6">
                  <section className="space-y-3">
                    <h2 className="text-lg font-semibold text-slate-900">
                      Descrição
                    </h2>
                    <p className="text-sm leading-relaxed text-slate-700">
                      {livro.detalhes.sinopse ?? livro.descricao}
                    </p>
                    {livro.detalhes.sinopse && (
                      <p className="text-sm leading-relaxed text-slate-600">
                        {livro.descricao}
                      </p>
                    )}
                  </section>

                  <section className="space-y-3">
                    <h3 className="text-sm font-semibold tracking-wide text-slate-900 uppercase">
                      Formatos disponíveis
                    </h3>
                    {formatosDisponiveis.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {formatosDisponiveis.map((formato) => (
                          <Button
                            key={formato.label}
                            variant="outline"
                            size="sm"
                            asChild
                            className="rounded-full"
                          >
                            <a
                              href={formato.url}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <FileText className="h-3.5 w-3.5" />
                              {formato.label}
                            </a>
                          </Button>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-slate-500">
                        Este livro ainda não possui arquivos digitais anexados.
                      </p>
                    )}
                  </section>

                  <section className="space-y-3">
                    <h3 className="text-sm font-semibold tracking-wide text-slate-900 uppercase">
                      Áreas e tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {(livro.areas ?? []).map((area) => (
                        <Badge
                          key={area}
                          variant="secondary"
                          className="gap-1 bg-slate-100 text-slate-700"
                        >
                          <Layers3 className="h-3 w-3" />
                          {formatArea(area)}
                        </Badge>
                      ))}
                      {(livro.tags ?? []).map((tag) => (
                        <Badge key={tag} variant="outline" className="gap-1">
                          <Tag className="h-3 w-3" />#{tag}
                        </Badge>
                      ))}
                    </div>
                  </section>
                </div>

                <aside className="rounded-2xl border border-stone-200 bg-stone-50/80 p-5">
                  <h3 className="mb-4 text-base font-semibold text-slate-900">
                    Ficha técnica
                  </h3>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <User2 className="mt-0.5 h-4 w-4 text-slate-500" />
                      <div>
                        <p className="font-medium text-slate-600">Autor</p>
                        <p className="text-slate-900">
                          {livro.detalhes.autor ?? livro.autor}
                        </p>
                      </div>
                    </div>

                    <Separator className="bg-stone-200" />

                    <div className="flex items-start gap-3">
                      <Globe2 className="mt-0.5 h-4 w-4 text-slate-500" />
                      <div>
                        <p className="font-medium text-slate-600">Idioma</p>
                        <p className="text-slate-900">
                          {livro.idioma ?? "Não informado"}
                        </p>
                      </div>
                    </div>

                    <Separator className="bg-stone-200" />

                    <div className="flex items-start gap-3">
                      <BookOpen className="mt-0.5 h-4 w-4 text-slate-500" />
                      <div>
                        <p className="font-medium text-slate-600">Paginação</p>
                        <p className="text-slate-900">
                          {livro.detalhes.numeroPaginas
                            ? `${livro.detalhes.numeroPaginas} páginas`
                            : "Não informado"}
                        </p>
                      </div>
                    </div>

                    <Separator className="bg-stone-200" />

                    <div className="flex items-start gap-3">
                      <Hash className="mt-0.5 h-4 w-4 text-slate-500" />
                      <div>
                        <p className="font-medium text-slate-600">ISBN</p>
                        <p className="text-slate-900">
                          {livro.detalhes.isbn || "Não informado"}
                        </p>
                      </div>
                    </div>

                    <Separator className="bg-stone-200" />

                    <div className="flex items-start gap-3">
                      <CalendarDays className="mt-0.5 h-4 w-4 text-slate-500" />
                      <div>
                        <p className="font-medium text-slate-600">Publicação</p>
                        <p className="text-slate-900">
                          {livro.anoPublicacao ?? "Não informado"}
                        </p>
                      </div>
                    </div>

                    <Separator className="bg-stone-200" />

                    <div className="flex items-start gap-3">
                      <FileText className="mt-0.5 h-4 w-4 text-slate-500" />
                      <div>
                        <p className="font-medium text-slate-600">Editora</p>
                        <p className="text-slate-900">
                          {livro.detalhes.editora || "Não informado"}
                        </p>
                      </div>
                    </div>

                    <Separator className="bg-stone-200" />

                    <div className="flex items-start gap-3">
                      <CalendarDays className="mt-0.5 h-4 w-4 text-slate-500" />
                      <div>
                        <p className="font-medium text-slate-600">
                          Última atualização
                        </p>
                        <p className="text-slate-900">
                          {formatDate(livro.updatedAt)}
                        </p>
                      </div>
                    </div>

                    <Separator className="bg-stone-200" />

                    <div className="flex items-start gap-3">
                      <Layers3 className="mt-0.5 h-4 w-4 text-slate-500" />
                      <div>
                        <p className="font-medium text-slate-600">Macroáreas</p>
                        <p className="text-slate-900">
                          {macroAreas.length > 0
                            ? macroAreas.join(" • ")
                            : "Não informado"}
                        </p>
                      </div>
                    </div>
                  </div>
                </aside>
              </div>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
}
