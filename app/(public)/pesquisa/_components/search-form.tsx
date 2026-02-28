"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import * as React from "react";

interface SearchFormProps {
  initialQuery?: string;
}

/**
 * Formulário de busca standalone para a página /pesquisa.
 * Permite re-buscar sem precisar abrir o dialog (Ctrl+K).
 * Usa progressive enhancement: funciona com e sem JS via GET.
 */
export function SearchForm({ initialQuery = "" }: SearchFormProps) {
  const router = useRouter();
  const [value, setValue] = React.useState(initialQuery);

  // Sincroniza quando a URL muda (ex: botão voltar)
  React.useEffect(() => {
    setValue(initialQuery);
  }, [initialQuery]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed || trimmed.length < 2) return;
    router.push(`/pesquisa?q=${encodeURIComponent(trimmed)}`);
  }

  return (
    <form
      role="search"
      aria-label="Formulário de pesquisa"
      onSubmit={handleSubmit}
      className="flex w-full max-w-lg items-center gap-2"
    >
      <Search
        size={16}
        className="pointer-events-none text-black/400"
        aria-hidden="true"
      />
      <div className="relative flex-1">
        <input
          type="search"
          name="q"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Pesquisar livros, artigos, projetos..."
          minLength={2}
          maxLength={120}
          autoComplete="off"
          className="w-full rounded-lg border-0 bg-zinc-100 px-4 py-2.5 text-sm text-zinc-900 shadow-sm outline-none ring-0 placeholder:text-zinc-400 transition-shadow focus:border-0 focus:shadow-lg focus:outline-none focus:ring-0 focus-visible:border-0 focus-visible:shadow-lg focus-visible:outline-none focus-visible:ring-0"
          aria-label="Termo de busca"
        />
      </div>
      <button
        type="submit"
        className="rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-700 focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:outline-none disabled:opacity-50"
        disabled={value.trim().length < 2}
        aria-label="Buscar"
      >
        Buscar
      </button>
    </form>
  );
}
