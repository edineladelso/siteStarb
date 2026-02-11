import { createSlug } from "@/lib/utils/createSlug";
import type { ArtigoBiblioteca } from "../dadosArtigos";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { CSSProperties } from "react";

export default function ArtigoCard({ artigo }: { artigo: ArtigoBiblioteca }) {
  const slugPath = createSlug(artigo.slug || artigo.id || artigo.titulo);

  return (
    <Link
      href={`/biblioteca/artigos/${slugPath}`}
      className="group block h-full"
      aria-label={`Ler artigo ${artigo.titulo}`}
    >
      <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={artigo.capa}
            alt={artigo.titulo}
            fill
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/10 to-black/60" />
          <div className="absolute bottom-3 left-3 flex flex-wrap items-center gap-2 text-xs font-semibold text-white">
            <span className="rounded-full bg-white/20 px-3 py-1 backdrop-blur">
              {artigo.categoria}
            </span>
            <span className="rounded-full bg-white/20 px-3 py-1 backdrop-blur">
              {artigo.leituraMin} min de leitura
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3 p-5">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <FileText className="size-4 text-orange-500" />
            <span>
              {artigo.ano} • {artigo.autores.join(", ")}
            </span>
          </div>

          <h3 className="text-lg font-semibold text-slate-900 transition-colors group-hover:text-orange-600">
            {artigo.titulo}
          </h3>

          <p className="text-sm text-slate-600" style={clampStyle}>
            {artigo.resumo}
          </p>

          <div className="flex flex-wrap gap-2">
            {artigo.tags.slice(0, 3).map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-slate-100 text-slate-700"
              >
                #{tag}
              </Badge>
            ))}
          </div>

          <div className="mt-auto flex items-center justify-between pt-1 text-xs text-slate-500">
            <span>
              Atualizado em{" "}
              {new Intl.DateTimeFormat("pt-BR", {
                month: "short",
                day: "2-digit",
              }).format(new Date(artigo.updatedAt))}
            </span>
            <span className="inline-flex items-center gap-1 text-orange-600 group-hover:translate-x-1 group-hover:text-orange-700">
              Ler artigo <ChevronRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export const clampStyle: CSSProperties = {
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
};