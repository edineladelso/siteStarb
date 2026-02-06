import { ContentBase } from "./content";
import { AreaLivro, MacroAreaLivro } from "./areas";

export interface DetalhesLivro {
  sinopse: string;
  numeroPaginas: number;
  autor: string;
  editora: string;
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
  pdf: string;
  epub: string;
  resumo: string;
}
