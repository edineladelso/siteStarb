import { createSlug } from "./createSlug";

export type SlugTipo = "livro" | "artigo" | "projeto" | "software";

export async function gerarSlugUnico(titulo: string, tipo: SlugTipo) {
  const [{ db }, { artigos, livros, projetos, softwares }] = await Promise.all([
    import("../drizzle/db"),
    import("../drizzle/db/schema"),
  ]);
  const { eq } = await import("drizzle-orm");

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
