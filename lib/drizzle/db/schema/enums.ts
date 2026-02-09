import { pgEnum } from "drizzle-orm/pg-core";

// ==================== ENUMS ====================
export const statusEnum = [
  "ativo",
  "rascunho",
  "arquivado",
  "pendente",
  "publicado",
] as const;
export const dificuldadeEnum = [
  "Iniciante",
  "Intermediário",
  "Avançado",
] as const;
export const tipoContentEnum = pgEnum("tipo", [
  "livro",
  "software",
  "projeto",
  "artigo",
]);

export const tabelasSql = pgEnum("tabela", [
  "artigos", 'livros', "projetos", "softwares", "profiles"
])

export type StatusType = (typeof statusEnum)[number];
export type DificuldadeType = (typeof dificuldadeEnum)[number];
export type TipoContentType = typeof tipoContentEnum;
export type TabelasSql = typeof tabelasSql