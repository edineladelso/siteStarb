/**
 * Gera um fragmento de texto com o termo buscado destacado via marcação HTML segura.
 * Usado tanto no server (public-search.ts) quanto no cliente (componente).
 */

const MAX_SNIPPET_LENGTH = 160;

/**
 * Escapa caracteres especiais de regex.
 */
function escapeRegex(term: string): string {
  return term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Retorna um snippet do texto com o termo encontrado ao centro,
 * limitado a `maxLength` caracteres.
 */
export function buildSnippet(text: string, term: string): string {
  if (!text || !term) return text?.slice(0, MAX_SNIPPET_LENGTH) ?? "";

  const idx = text.toLowerCase().indexOf(term.toLowerCase());
  if (idx === -1) return text.slice(0, MAX_SNIPPET_LENGTH);

  const half = Math.floor(MAX_SNIPPET_LENGTH / 2);
  const start = Math.max(0, idx - half);
  const end = Math.min(text.length, start + MAX_SNIPPET_LENGTH);
  const snippet = text.slice(start, end);

  const prefix = start > 0 ? "…" : "";
  const suffix = end < text.length ? "…" : "";

  return `${prefix}${snippet}${suffix}`;
}

/**
 * Marca o termo encontrado no texto com `<mark>`.
 * Retorna o texto original se o termo não for encontrado.
 * Seguro: escapa o termo antes de usar em regex.
 */
export function highlightTerm(text: string, term: string): string {
  if (!text || !term || term.length < 2) return text;

  const escaped = escapeRegex(term);
  const regex = new RegExp(`(${escaped})`, "gi");

  return text.replace(regex, "<mark>$1</mark>");
}

/**
 * Gera os highlights para um item de busca.
 * Retorna um objeto com os campos marcados.
 */
export function buildHighlights(
  fields: { title: string; description: string; subtitle?: string },
  query: string,
): { title: string; description: string; subtitle?: string } {
  const snippet = buildSnippet(fields.description, query);

  return {
    title: highlightTerm(fields.title, query),
    description: highlightTerm(snippet, query),
    subtitle: fields.subtitle
      ? highlightTerm(fields.subtitle, query)
      : undefined,
  };
}