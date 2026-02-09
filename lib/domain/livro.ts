import { AreaLivro, MacroAreaLivro } from "./areas";
import { ContentBase } from "./content";

export interface DetalhesLivro {
  numeroPaginas: number;
  autor: string;
  sinopse?: string;
  editora?: string;
  isbn?: string | null;
}

export interface Livro extends ContentBase {
  tipo: "livro";

  autor: string;

  isbn?: string;
  anoPublicacao?: number;

  editora?: string;
  idioma?: string;

  numeroPaginas?: number;

  detalhes: DetalhesLivro;
  midia: MidiaLivro;

  areas: AreaLivro[];
  macroAreas?: MacroAreaLivro[];

  tags: string[];
}

export interface MidiaLivro {
  capa: string;
  pdf?: string;
  epub?: string;
  resumo?: string;
}
