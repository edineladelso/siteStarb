"use client";

/**
 * Wrapper de carregamento dinâmico do componente Pesquisa.
 *
 * Por que ssr: false?
 * O CommandDialog (Radix UI) injeta aria-hidden nos elementos irmãos
 * quando um portal está montado. Durante SSR, o servidor pode gerar
 * esses atributos em estado diferente do cliente, causando hydration mismatch.
 *
 * Como o componente de busca é puramente interativo (não há conteúdo
 * indexável ou crítico para o primeiro render), desabilitar SSR é seguro
 * e elimina o mismatch por completo.
 */

import dynamic from "next/dynamic";
import { Search } from "lucide-react";

// Skeleton mostrado enquanto o componente carrega no cliente
function PesquisaSkeleton({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`flex animate-pulse items-center gap-2 rounded-lg bg-white shadow shadow-gray-400/55 ${
        compact ? "h-9 w-10 justify-center px-2" : "h-9 w-64 px-3 xl:w-72"
      }`}
      aria-hidden="true"
    >
      <Search className="h-4 w-4 text-gray-300" />
      {!compact && (
        <span className="h-3 w-24 rounded bg-gray-200" />
      )}
    </div>
  );
}

const PesquisaClient = dynamic(
  () => import("./pesquisa"), // caminho para o componente original
  {
    ssr: false,
    loading: ({ isLoading }) =>
      isLoading ? <PesquisaSkeleton /> : null,
  },
);

export default function Pesquisa({ compact = false }: { compact?: boolean }) {
  return <PesquisaClient compact={compact} />;
}