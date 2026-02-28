export type PublicSearchType =
  | "livro"
  | "artigo"
  | "software"
  | "projeto"
  | "pagina";

export interface PublicSearchItem {
  id: string;
  type: PublicSearchType;
  title: string;
  description: string;
  href: string;
  subtitle?: string;
  keywords?: string[];
  /** Score interno usado para ranking — não exposto ao cliente */
  score?: number;
  /** Fragmentos destacados com o termo buscado */
  highlights?: {
    title?: string;
    description?: string;
    subtitle?: string;
  };
}

export interface PublicSearchResponse {
  query: string;
  total: number;
  items: PublicSearchItem[];
  byType: Partial<Record<PublicSearchType, number>>;
  /** Tempo de execução da busca em ms (opcional, para debug) */
  took?: number;
}

export interface PublicSearchHistoryItem {
  query: string;
  at: number; // timestamp
}