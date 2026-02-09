import { Status, TipoConteudo } from "./enums";

// ===================== BASE DO DOMÍNIO =====================

export interface ContentBase {
  id: string;

  tipo: TipoConteudo;

  titulo: string;
  slug?: string;
  categoria: string;
  descricao: string;

  status: Status;

  views: number;
  downloads: number;
  avaliacao: number;

  createdAt: Date;
  updatedAt: Date;
  novo: boolean;
  popular: boolean;
}
