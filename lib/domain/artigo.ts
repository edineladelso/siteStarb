import { AreaLivro, MacroAreaLivro } from "./areas";
import { ContentBase } from "./content";

export interface Artigo extends ContentBase {
  tipo: "artigo";

  autores: string[];

  resumo: string;
  capa?: string | null;

  palavrasChave?: string;

  anoPublicacao?: number;
  instituicao?: string;

  areas: AreaLivro[];
  macroAreas?: MacroAreaLivro[];

  midia?: ArtigoMidia | null;
  html?: string;
  leituraMin?: number;
  tags?: string[];
  destaque?: boolean;
  citacoes?: number;
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
