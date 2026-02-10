"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import {
  Heart,
  Download,
  Eye,
  Info,
  Star,
  User,
  Tag,
  FileText,
  BookOpen,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import type { Livro } from "@/lib/types";
import {
  getCategoriaNome,
  getCategoriaIcon,
} from "@/lib/domain/areasCategoriasPatern";
import type { MacroAreaLivro } from "@/lib/domain/areas";

// Mapeamento de cores por MacroArea para gradientes
const CATEGORIA_GRADIENTS: Record<MacroAreaLivro, string> = {
  Matematica: "from-purple-400 via-pink-500 to-rose-600",
  Fisica: "from-blue-400 via-cyan-500 to-teal-600",
  Quimica: "from-green-400 via-emerald-500 to-teal-600",
  Materiais: "from-slate-400 via-gray-500 to-zinc-600",
  Mecanica: "from-orange-400 via-amber-500 to-yellow-600",
  Eletrica: "from-yellow-400 via-orange-500 to-red-600",
  Eletronica: "from-red-400 via-pink-500 to-purple-600",
  Controle_automacao: "from-cyan-400 via-blue-500 to-indigo-600",
  Computacao: "from-indigo-400 via-purple-500 to-pink-600",
  Cyber_seguranca: "from-red-500 via-rose-600 to-pink-700",
  Telecom: "from-blue-400 via-indigo-500 to-purple-600",
  Redes_de_computadores: "from-teal-400 via-cyan-500 to-blue-600",
  Civil: "from-amber-400 via-orange-500 to-red-600",
  IA: "from-blue-400 via-indigo-500 to-purple-600",
  Programacao: "from-indigo-400 via-purple-500 to-pink-600",
  Mecatronica: "from-green-400 via-teal-500 to-cyan-600",
  Engenharia: "from-slate-500 via-gray-600 to-zinc-700",
};

interface LivroCardProps {
  livro: Livro;
  compact?: boolean;
}

export default function LivroCard({ livro, compact = false }: LivroCardProps) {
  const [favorito, setFavorito] = useState(false);

  // Pega a primeira MacroArea como categoria principal
  const categoriaPrincipal = livro.macroAreas[0];
  const categoriaLabel = getCategoriaNome(categoriaPrincipal);
  const gradientClasses = CATEGORIA_GRADIENTS[categoriaPrincipal];

  // Formata avaliação para número
  const avaliacaoNumero = parseFloat(livro.avaliacao ?? "0");

  // Determina quais formatos estão disponíveis
  const formatosDisponiveis = useMemo(() => {
    const formatos = [];
    if (livro.midia.pdf) formatos.push({ tipo: "PDF", url: livro.midia.pdf });
    if (livro.midia.epub)
      formatos.push({ tipo: "EPUB", url: livro.midia.epub });
    if (livro.midia.resumo)
      formatos.push({ tipo: "Resumo", url: livro.midia.resumo });
    return formatos;
  }, [livro.midia]);

  const handleFavoritoToggle = () => {
    setFavorito((prev) => !prev);
    // TODO: Implementar lógica de favoritos (API/localStorage)
  };

  const handleDownload = (url: string, tipo: string) => {
    // TODO: Implementar download real
    console.log(`Baixando ${tipo}:`, url);
  };

  return (
    <Card className="group relative overflow-hidden bg-white shadow-lg transition-all duration-300 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20">
      {/* Badges de Status */}
      <div
        className="absolute top-2 left-2 z-20 flex flex-wrap gap-1.5"
        role="group"
        aria-label="Status do livro"
      >
        {livro.novo && (
          <Badge
            className="flex items-center gap-1 border-0 bg-green-600 text-xs font-semibold shadow-md"
            aria-label="Livro novo"
          >
            <Sparkles className="h-3 w-3" aria-hidden="true" />
            Novo
          </Badge>
        )}
        {livro.popular && (
          <Badge
            className="flex items-center gap-1 border-0 bg-orange-600 text-xs font-semibold text-white shadow-md"
            aria-label="Livro popular"
          >
            <TrendingUp className="h-3 w-3" aria-hidden="true" />
            Popular
          </Badge>
        )}
      </div>

      {/* Botão de Favorito */}
      <button
        onClick={handleFavoritoToggle}
        className="absolute top-2 right-2 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-lg transition-all hover:scale-110 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
        aria-label={
          favorito ? "Remover dos favoritos" : "Adicionar aos favoritos"
        }
        aria-pressed={favorito}
      >
        <Heart
          className={`h-4 w-4 transition-colors ${
            favorito ? "fill-red-500 text-red-500" : "text-slate-400"
          }`}
          aria-hidden="true"
        />
      </button>

      {/* Capa do Livro */}
      <CardHeader className="p-0">
        <div
          className={`relative ${compact ? "h-45 sm:h-55" : "h-50 sm:h-56"} overflow-hidden bg-slate-100`}
        >
          {livro.midia.capa ? (
            <>
              <Image
                src={livro.midia.capa}
                alt={`Capa do livro ${livro.titulo}`}
                fill
                sizes={
                  compact
                    ? "(max-width: 640px) 50vw, 33vw"
                    : "(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                }
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                priority={Boolean(livro.popular || livro.novo)}
              />
              {/* Overlay com gradiente para melhor legibilidade */}
              <div
                className={`absolute inset-0 bg-linear-to-t ${gradientClasses} opacity-0 transition-opacity duration-300 group-hover:opacity-30`}
                aria-hidden="true"
              />
            </>
          ) : (
            // Fallback caso não tenha imagem
            <div
              className={`flex h-full items-center justify-center bg-linear-to-br ${gradientClasses} transition-transform duration-500 group-hover:scale-110`}
              role="img"
              aria-label={`Capa genérica de ${categoriaLabel}`}
            >
              <div className="px-4 text-center text-white">
                <BookOpen
                  className={`${compact ? "h-12 w-12" : "h-16 w-16"} mx-auto mb-2 opacity-90`}
                  aria-hidden="true"
                />
                <div className="text-xs font-semibold opacity-75">
                  {categoriaLabel}
                </div>
              </div>
            </div>
          )}

          {/* Badge de Categoria sobre a imagem */}
          <div className="absolute bottom-2 left-2">
            <Badge
              variant="secondary"
              className="flex items-center gap-1 border border-white/20 bg-white/90 text-xs font-semibold text-slate-800 shadow-md backdrop-blur-sm"
            >
              <span
                className="flex h-4 w-4 items-center justify-center"
                aria-hidden="true"
              >
                {getCategoriaIcon(categoriaPrincipal)}
              </span>
              {categoriaLabel}
            </Badge>
          </div>
        </div>
      </CardHeader>

      {/* Conteúdo do Card */}
      <CardContent className="space-y-1 px-4">
        <div className="space-y-2">
          <CardTitle
            className={`${compact ? "text-sm" : "text-base"} line-clamp-2 leading-tight font-bold text-slate-900 transition-colors group-hover:text-blue-700`}
          >
            {livro.titulo}
          </CardTitle>

          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <User className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span className="truncate" title={livro.autor}>
              {livro.autor}
            </span>
          </div>

          {!compact && (
            <p className="line-clamp-2 text-xs leading-relaxed text-slate-500">
              {livro.descricao}
            </p>
          )}
        </div>

        {/* Estatísticas */}
        <div className="flex items-center justify-between border-t border-slate-100 p-2">
          <div
            className="flex items-center gap-1"
            title={`Avaliação: ${livro.avaliacao}`}
          >
            <Star
              className="h-4 w-4 fill-yellow-400 text-yellow-400"
              aria-hidden="true"
            />
            <span className="text-sm font-semibold text-slate-700">
              {avaliacaoNumero.toFixed(1)}
            </span>
          </div>

          <div
            className="flex items-center gap-1 text-slate-500"
            title={`${livro.downloads.toLocaleString("pt-BR")} downloads`}
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            <span className="text-sm font-medium">
              {livro.downloads > 1000
                ? `${(livro.downloads / 1000).toFixed(1)}k`
                : livro.downloads}
            </span>
          </div>

          <div
            className="flex items-center gap-1 text-slate-500"
            title={`${livro.views.toLocaleString("pt-BR")} visualizações`}
          >
            <Eye className="h-4 w-4" aria-hidden="true" />
            <span className="text-sm font-medium">
              {livro.views > 1000
                ? `${(livro.views / 1000).toFixed(1)}k`
                : livro.views}
            </span>
          </div>
        </div>
      </CardContent>

      {/* Ações */}
      <CardFooter className="flex gap-2 border-t border-slate-100 bg-slate-50/50 px-4">
        {/* Botão Info/Detalhes */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 gap-1.5 text-xs transition-all hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label={`Ver detalhes de ${livro.titulo}`}
            >
              <Info className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">Info</span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="max-h-[90vh] w-11/12 max-w-2xl overflow-y-auto">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-xl font-bold text-slate-900">
                {livro.titulo}
              </AlertDialogTitle>
              <AlertDialogDescription asChild>
                <div className="space-y-4 pt-4 text-sm leading-relaxed text-slate-700">
                  <p>{livro.descricao}</p>

                  <div className="grid gap-2 pt-2">
                    <div className="flex items-start gap-3">
                      <User
                        className="mt-0.5 h-5 w-5 shrink-0 text-blue-950"
                        aria-hidden="true"
                      />
                      <div>
                        <strong className="text-slate-900">Autor:</strong>
                        <p className="text-slate-700">{livro.autor}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Tag
                        className="mt-0.5 h-5 w-5 shrink-0 text-blue-950"
                        aria-hidden="true"
                      />
                      <div>
                        <strong className="text-slate-900">Categorias:</strong>
                        <p className="text-slate-700">
                          {livro.macroAreas
                            .map((area) => getCategoriaNome(area))
                            .join(", ")}
                        </p>
                      </div>
                    </div>

                    {livro.detalhes?.numeroPaginas && (
                      <div className="flex items-start gap-3">
                        <FileText
                          className="mt-0.5 h-5 w-5 shrink-0 text-blue-950"
                          aria-hidden="true"
                        />
                        <div>
                          <strong className="text-slate-900">Páginas:</strong>
                          <p className="text-slate-700">
                            {livro.detalhes.numeroPaginas}
                          </p>
                        </div>
                      </div>
                    )}

                    {livro.anoPublicacao && (
                      <div className="flex items-start gap-3">
                        <BookOpen
                          className="mt-0.5 h-5 w-5 shrink-0 text-blue-950"
                          aria-hidden="true"
                        />
                        <div>
                          <strong className="text-slate-900">Ano:</strong>
                          <p className="text-slate-700">
                            {livro.anoPublicacao}
                          </p>
                        </div>
                      </div>
                    )}

                    {livro.idioma && (
                      <div className="flex items-start gap-3">
                        <span
                          className="mt-0.5 text-lg text-blue-950"
                          aria-hidden="true"
                        >
                          🌐
                        </span>
                        <div>
                          <strong className="text-slate-900">Idioma:</strong>
                          <p className="text-slate-700">{livro.idioma}</p>
                        </div>
                      </div>
                    )}

                    {livro.tags && livro.tags.length > 0 && (
                      <div className="flex items-start gap-3">
                        <Tag
                          className="mt-0.5 h-5 w-5 shrink-0 text-blue-950"
                          aria-hidden="true"
                        />
                        <div>
                          <strong className="text-slate-900">Tags:</strong>
                          <div className="mt-1 flex flex-wrap gap-1">
                            {livro.tags.map((tag) => (
                              <Badge
                                key={tag}
                                variant="secondary"
                                className="text-xs"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="mt-6">
              <AlertDialogAction className="bg-blue-600 shadow-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                Fechar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Botão Ver/Ler */}
        <Button
          size="sm"
          className="flex-1 gap-1.5 bg-slate-700 text-xs shadow-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label={`Ler ${livro.titulo}`}
        >
          <Eye className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="hidden sm:inline">Ler</span>
        </Button>

        {/* Menu de Download */}
        {formatosDisponiveis.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="sm"
                variant="outline"
                className="gap-1.5 px-3 flex-1 hover:bg-slate-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Opções de download"
              >
                <Download className="h-3.5 w-3.5" aria-hidden="true" />
                {!compact && <span className="hidden sm:inline">Baixar</span>}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              side="top"
              sideOffset={8}
              className="w-48 border-slate-200 shadow-xl"
            >
              <div className="px-2 py-1.5 text-xs font-semibold text-slate-500">
                Formatos Disponíveis
              </div>
              <DropdownMenuSeparator />
              {formatosDisponiveis.map((formato) => (
                <DropdownMenuItem
                  key={formato.tipo}
                  onClick={() => handleDownload(formato.url, formato.tipo)}
                  className="cursor-pointer top-0 gap-2 text-sm focus:bg-blue-50 focus:text-blue-700"
                >
                  <FileText className="h-4 w-4" aria-hidden="true" />
                  {formato.tipo}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </CardFooter>
    </Card>
  );
}
