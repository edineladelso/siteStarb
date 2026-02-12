import { artigosBiblioteca } from "@/lib/localDadosHome/dadosArtigos";
import type { Artigo } from "@/lib/types";

export async function localGetBySlug(slug: string): Promise<Artigo | null> {
  if (!slug) return null;

  try {
    const resultado = artigosBiblioteca.find(
      (article) => article.slug === slug,
    );
    return resultado || null;
  } catch (error) {
    console.error("Erro ao burcar artipo pelo slug: ", error);
    throw new Error("Falha na consulta aos dados locais");
  }
}
