import { localGetBySlug } from "@/lib/actions/local/localArtigo.action";
import type { ArtigoMidia } from "@/lib/domain/artigo";
import {
  ArrowLeft,
  Building2,
  Calendar,
  Clock,
  Download,
  FileText,
  Share2,
  Tag,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { ErrorContent } from "@/app/error/ErrorComponent";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getArtigoBySlug } from "@/lib/actions";

interface PageProps {
  params: { slug: string };
}

function MetaCard({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
      <span className="rounded-lg bg-white p-2 text-slate-700 shadow-sm">
        {icon}
      </span>
      <div className="flex flex-col">
        <span className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
          {label}
        </span>
        <span className="text-sm font-medium text-slate-900">{value}</span>
      </div>
    </div>
  );
}

export default async function PropertPage({ params }: PageProps) {
  const { slug } = await params;
  // const servidorArtigo = await getArtigoBySlug(slug);
  const localArtigo = await localGetBySlug(slug);
  const servidorArtigo = await getArtigoBySlug(slug);

  const artigo = servidorArtigo ? servidorArtigo : localArtigo;
  if (!artigo) {
    return <ErrorContent conteudo="Artigo" backUrl="/biblioteca/artigos" />;
  }

  const midia = artigo.midia as ArtigoMidia | null;
  const htmlContent = artigo.html ?? "";
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 lg:py-14">
      <Link
        href="/biblioteca/artigos"
        className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-orange-600"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar para artigos
      </Link>

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
        <div className="relative h-72 w-full">
          <Image
            src={artigo.capa ?? "https://placehold.co/1200x720?text=Artigo"}
            alt={artigo.titulo}
            fill
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/10 via-black/25 to-black/60" />
          <div className="absolute right-0 bottom-0 left-0 flex items-center justify-between px-6 py-5 text-white">
            <div className="flex flex-wrap items-center gap-3">
              <Badge className="bg-orange-500 text-white">
                {artigo.categoria}
              </Badge>
              <Badge className="bg-white/20 text-white backdrop-blur">
                {artigo.leituraMin} min de leitura
              </Badge>
              <Badge className="bg-white/20 text-white backdrop-blur">
                Atualizado em{" "}
                {new Intl.DateTimeFormat("pt-BR", {
                  dateStyle: "long",
                }).format(new Date(artigo.updatedAt))}
              </Badge>
            </div>
            <div className="hidden items-center gap-2 text-sm font-semibold md:flex">
              <FileText className="h-4 w-4" />
              HTML otimizado para web
            </div>
          </div>
        </div>

        <div className="space-y-6 p-6 md:p-10">
          <div className="space-y-3">
            <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
              {artigo.titulo}
            </h1>
            <p className="text-lg text-slate-700">{artigo.resumo}</p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <MetaCard
              icon={<Clock className="h-4 w-4" />}
              label="Tempo estimado"
              value={`${artigo.leituraMin} minutos`}
            />
            <MetaCard
              icon={<Calendar className="h-4 w-4" />}
              label="Ano"
              value={String(artigo.anoPublicacao ?? "")}
            />
            <MetaCard
              icon={<Building2 className="h-4 w-4" />}
              label="Autores / Instituição"
              value={`${artigo.autores.join(", ")}${
                artigo.instituicao ? ` • ${artigo.instituicao}` : ""
              }`}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {(artigo.tags ?? []).map((tag) => (
              <Badge key={tag} variant="secondary">
                #{tag}
              </Badge>
            ))}
          </div>

          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6 md:p-8">
            <div className="space-y-5 text-slate-800 [&_blockquote]:border-l-4 [&_blockquote]:border-orange-400 [&_blockquote]:pl-4 [&_blockquote]:text-slate-700 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-slate-900 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-slate-900 [&_li]:ml-4 [&_li]:list-disc [&_p]:leading-relaxed [&_p]:text-slate-700 [&_strong]:text-slate-900 [&_ul]:space-y-2">
              {/* Conteúdo HTML fornecido pelo autor */}
              <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {midia?.tipo === "pdf" && midia.pdfUrl && (
              <Button asChild>
                <a
                  href={midia.pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="gap-2"
                >
                  <Download className="h-4 w-4" />
                  Baixar PDF
                </a>
              </Button>
            )}
            <Button variant="outline" asChild>
              <a
                href={`/biblioteca/artigos/${artigo.slug}`}
                target="_blank"
                rel="noreferrer"
                className="gap-2"
              >
                <Share2 className="h-4 w-4" />
                Abrir em nova guia
              </a>
            </Button>
            <Badge className="flex items-center gap-1 bg-slate-100 text-slate-700">
              <Tag className="h-3.5 w-3.5" />
              HTML pronto para leitura responsiva
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
