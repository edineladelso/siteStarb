
import { Livro } from "@/app/(marketing)/biblioteca/livros/dadosLivros";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useState } from "react";
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
} from "@/components/ui/dropdown-menu";

export default function LivroCard({
  livro,
  compact = false,
}: {
  livro: Livro;
  compact?: boolean;
}) {
  const [favorito, setFavorito] = useState(false);

  return (
    <Card className="group relative overflow-hidden bg-white transition-all duration-300 hover:-translate-y-2 hover:border-blue-300 hover:shadow-2xl hover:shadow-blue-500/10">
      {/* Badges */}
      <div className="absolute top-1 left-1 z-20 flex flex-wrap gap-1">
        {livro.novo && (
          <Badge className="border-0 bg-green-600 text-xs shadow-lg">
            <svg
              className="h-3 w-3"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                clipRule="evenodd"
              />
            </svg>
            Novo
          </Badge>
        )}
        {livro.popular && (
          <Badge
            variant="secondary"
            className="border-0 bg-orange-600 text-xs text-white shadow-lg"
          >
            <svg
              className="h-3 w-3"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
            </svg>
            Popular
          </Badge>
        )}
      </div>

      {/* Favorito */}
      <button
        onClick={() => setFavorito(!favorito)}
        className="absolute -top-1 -right-1 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-lg transition-all hover:scale-110"
      >
        <svg
          className={`h-4 w-4 mt-1 mr-1 transition-colors ${favorito ? "fill-current text-red-500" : "text-slate-400"}`}
          fill={favorito ? "currentColor" : "none"}
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>

      <CardHeader className="p-0">
        <div
          className={`relative ${compact ? "h-40 sm:h-48" : "h-48 sm:h-56"} overflow-hidden`}
        >
          <div
            className={`absolute inset-0 bg-linear-to-br ${
              livro.categoria === "IA"
                ? "from-blue-400 via-indigo-500 to-purple-600"
                : livro.categoria === "Programação"
                  ? "from-indigo-400 via-purple-500 to-pink-600"
                  : livro.categoria === "Eletrônica"
                    ? "from-yellow-400 via-orange-500mx-auto to-red-600"
                    : livro.categoria === "Mecatrônica"
                      ? "from-green-400 via-teal-500 to-cyan-600"
                      : livro.categoria === "Matemática"
                        ? "from-purple-400 via-pink-500 to-rose-600"
                        : "from-slate-400 via-gray-500 to-zinc-600"
            } flex items-center justify-center transition-transform duration-500 group-hover:scale-110`}
          >
            <div className="px-4 text-center text-white">
              {/* Aqui terei imagem de capa */}
              <svg
                className={`${compact ? "h-12 w-12" : "h-16 w-16"} mx-auto mb-2 opacity-90`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
              </svg>
              <div className="text-xs font-semibold opacity-75">
                {livro.categoria}
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      {/* estava aqui */}
      <CardContent className="px-3">
        <CardTitle
          className={`${compact ? "text-sm" : "text-base"} line-clamp-2 transition-colors group-hover:text-blue-700`}
        >
          {livro.titulo}
        </CardTitle>

        <p className="flex items-center gap-1 text-xs text-slate-600">
          <svg
            className="h-3 w-3 shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            />
          </svg>
          <span className="truncate">{livro.autor}</span>
        </p>

        {/* Avaliação e Downloads */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-1">
          <div className="flex items-center gap-1">
            <svg
              className="h-3.5 w-3.5 text-yellow-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-xs font-semibold text-slate-700">
              {livro.avaliacao}
            </span>
          </div>

          <div className="flex items-center gap-1 text-slate-500">
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            <span className="text-xs font-medium">
              {livro.downloads.toLocaleString()}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2 px-3 pt-2">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 text-xs hover:border-blue-500 hover:bg-blue-50"
            >
              <svg
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="max-w-lg w-11/12">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-xl font-bold text-slate-900">
                {livro.titulo}
              </AlertDialogTitle>
              <AlertDialogDescription className="pt-2 text-sm leading-relaxed">
                {livro.descricao}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="space-y-2 pt-4">
              <div className="flex items-center gap-2 text-sm">
                <svg
                  className="h-4 w-4 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-slate-700">
                  <strong>Autor:</strong> {livro.autor}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <svg
                  className="h-4 w-4 text-indigo-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-slate-700">
                  <strong>Categoria:</strong> {livro.categoria}
                </span>
              </div>
            </div>
            <AlertDialogFooter className="mt-6">
              <AlertDialogAction className="bg-blue-600 hover:bg-blue-700">
                Fechar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Button
          size="sm"
          className="flex-1 bg-blue-600 text-xs hover:bg-blue-700"
        >
          <svg
            className="h-3.5 w-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="sm"
              variant="secondary"
              className="px-2.5 hover:bg-slate-200"
            >
              <svg
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent  className="w-32 border py-3 shadow-2xl shadow-stone-700  absolute bottom-12 -right-5">
            <DropdownMenuItem className="gap-2 text-xs cursor-pointer">
              <svg
                className="h-3.5 w-3.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                  clipRule="evenodd"
                />
              </svg>
              PDF
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 text-xs cursor-pointer">
              <svg
                className="h-3.5 w-3.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
              </svg>
              EPUB
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 text-xs cursor-pointer">
              <svg
                className="h-3.5 w-3.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
                <path d="M3 8a2 2 0 012-2v10h8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
              </svg>
              Resumo
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
}
