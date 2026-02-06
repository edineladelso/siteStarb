import { db } from "../drizzle/db";
import { artigos, livros, projetos, softwares } from "../drizzle/db/schema";
import { eq } from "drizzle-orm";

export function createSlug(text: string): string {
  return text
    .toString()
    .normalize("NFD") // Remove acentos
    .replace(/[\u0300-\u036f]/g, "") // Remove diacríticos
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Substitui espaços por hífens
    .replace(/[^\w-]+/g, "") // Remove caracteres não alfanuméricos
    .replace(/--+/g, "-"); // Remove hífens duplos
}

export type SlugTipo = "livro" | "artigo" | "projeto" | "software";

export async function gerarSlugUnico(titulo: string, tipo: SlugTipo) {
  const base = createSlug(titulo);
  let slug = base;
  let contador = 1;

  const tabela =
    tipo === "livro"
      ? livros
      : tipo === "artigo"
        ? artigos
        : tipo === "projeto"
          ? projetos
          : softwares;

  while (
    await db
      .select({ id: tabela.id })
      .from(tabela)
      .where(eq(tabela.slug, slug))
      .then((r) => r.length > 0)
  ) {
    slug = `${base}-${contador++}`;
  }

  return slug;
}
