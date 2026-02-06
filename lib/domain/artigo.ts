import { ContentBase } from "./content";
import { AreaLivro, MacroAreaLivro } from "./areas";

export interface Artigo extends ContentBase {
  tipo: "artigo";

  autores: string;

  resumo: string;

  palavrasChave?: string;

  anoPublicacao?: number;
  instituicao?: string;

  areas: AreaLivro[];
  macroAreas?: MacroAreaLivro[];

  midia: ArtigoMidia;
}

export type ArtigoMidia =
  | {
      tipo: "pdf";
      pdfUrl: string;
    }
  | {
      tipo: "plataforma";
      htmlUrl: string;
    };
