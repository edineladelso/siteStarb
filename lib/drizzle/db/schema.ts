// ==================== db/schema.ts ====================
import {  InferSelectModel, InferInsertModel } from "drizzle-orm";

import {
  integer,
  pgTable,
  serial,
  text,
  decimal,
  index,
  check,
  uuid,
  timestamp,
} from "drizzle-orm/pg-core";

// ==================== drizzle/schema.ts (CORRIGIDO) ====================


export const usersTable = pgTable("users_table", {
  id: serial("id").primaryKey(),
  nome: text("nome").notNull(),
  idade: integer("idade").notNull(),
  email: text("email").notNull().unique(),
});

export const postsTable = pgTable("posts_table", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});

export const profilesTable = pgTable("profiles", {
  id: uuid("id").primaryKey().defaultRandom(),
  nome: text("nome").notNull(),
  idade: integer("idade"),
  avatar_url: text("avatar_url"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updateAt: timestamp("updated_at").notNull().defaultNow(),
});

export const loginTable = pgTable("login_table", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  userId: uuid("user_id") // ← UUID agora
    .notNull()
    .references(() => profilesTable.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
});
export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

export type InsertPost = typeof postsTable.$inferInsert;
export type SelectPost = typeof postsTable.$inferSelect;

export type InsertProfile = typeof profilesTable.$inferInsert;
export type SelectProfile = typeof profilesTable.$inferSelect;

export type InsertLogin = typeof loginTable.$inferInsert;
export type SelectLogin = typeof loginTable.$inferSelect;



// ==================== ENUMS ====================
export const statusEnum = ["ativo", "rascunho", "arquivado", "pendente", "publicado"] as const;
export const dificuldadeEnum = ["Iniciante", "Intermediário", "Avançado"] as const;
export const tipoContentEnum = ["livro", "software", "projeto", "artigo"] as const;

// Tipos para os enums
export type StatusType = typeof statusEnum[number];
export type DificuldadeType = typeof dificuldadeEnum[number];
export type TipoContentType = typeof tipoContentEnum[number];

// ==================== TABELA: LIVROS ====================
export const livros = pgTable(
  "livros",
  {
    id: text("id").primaryKey(),
    tipo: text("tipo").$type<"livro">().notNull().default("livro"),
    titulo: text("titulo").notNull(),
    autor: text("autor").notNull(),
    categoria: text("categoria").notNull(),
    descricao: text("descricao").notNull(),
    isbn: text("isbn"),
    anoPublicacao: integer("ano_publicacao"),
    editora: text("editora"),
    idioma: text("idioma").default("Português"),
    numeroPaginas: integer("numero_paginas"),
    capaUrl: text("capa_url").notNull(),
    pdfUrl: text("pdf_url").notNull(),
    tags: text("tags").array().$type<string[]>().default([]),
    status: text("status").$type<StatusType>().notNull().default("rascunho"),
    views: integer("views").default(0).notNull(),
    downloads: integer("downloads").default(0).notNull(),
    avaliacao: decimal("avaliacao", { precision: 2, scale: 1 }).default("0").notNull(),
    dataCriacao: timestamp("data_criacao", { withTimezone: true, mode: "string" }).defaultNow().notNull(),
    dataAtualizacao: timestamp("data_atualizacao", { withTimezone: true, mode: "string" }),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" }).defaultNow().notNull(),
  },
  (table) => ({
    categoriaIdx: index("idx_livros_categoria").on(table.categoria),
    statusIdx: index("idx_livros_status").on(table.status),
    dataCriacaoIdx: index("idx_livros_data_criacao").on(table.dataCriacao),
    viewsIdx: index("idx_livros_views").on(table.views),
  })
);

export type Livro = InferSelectModel<typeof livros>;
export type NewLivro = InferInsertModel<typeof livros>;

// ==================== TABELA: SOFTWARES ====================
export const softwares = pgTable(
  "softwares",
  {
    id: text("id").primaryKey(),
    tipo: text("tipo").$type<"software">().notNull().default("software"),
    titulo: text("titulo").notNull(),
    categoria: text("categoria").notNull(),
    descricao: text("descricao").notNull(),
    siteOficial: text("site_oficial").notNull(),
    funcionalidades: text("funcionalidades"),
    requisitos: text("requisitos"),
    preco: text("preco").default("Gratuito"),
    plataformas: text("plataformas").array().$type<string[]>().default([]),
    screenshots: text("screenshots").array().$type<string[]>().default([]),
    status: text("status").$type<StatusType>().notNull().default("rascunho"),
    views: integer("views").default(0).notNull(),
    downloads: integer("downloads").default(0).notNull(),
    avaliacao: decimal("avaliacao", { precision: 2, scale: 1 }).default("0").notNull(),
    dataCriacao: timestamp("data_criacao", { withTimezone: true, mode: "string" }).defaultNow().notNull(),
    dataAtualizacao: timestamp("data_atualizacao", { withTimezone: true, mode: "string" }),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" }).defaultNow().notNull(),
  },
  (table) => ({
    categoriaIdx: index("idx_softwares_categoria").on(table.categoria),
    statusIdx: index("idx_softwares_status").on(table.status),
    dataCriacaoIdx: index("idx_softwares_data_criacao").on(table.dataCriacao),
  })
);

export type Software = InferSelectModel<typeof softwares>;
export type NewSoftware = InferInsertModel<typeof softwares>;

// ==================== TABELA: PROJETOS ====================
export const projetos = pgTable(
  "projetos",
  {
    id: text("id").primaryKey(),
    tipo: text("tipo").$type<"projeto">().notNull().default("projeto"),
    titulo: text("titulo").notNull(),
    autor: text("autor").notNull(),
    categoria: text("categoria").notNull(),
    descricao: text("descricao").notNull(),
    problemaResolvido: text("problema_resolvido").notNull(),
    tecnologias: text("tecnologias").notNull(),
    repositorioGithub: text("repositorio_github"),
    documentacaoUrl: text("documentacao_url"),
    imagensUrl: text("imagens_url").array().$type<string[]>().default([]),
    dificuldade: text("dificuldade").$type<DificuldadeType>().notNull().default("Intermediário"),
    duracao: text("duracao"),
    status: text("status").$type<StatusType>().notNull().default("rascunho"),
    views: integer("views").default(0).notNull(),
    downloads: integer("downloads").default(0).notNull(),
    avaliacao: decimal("avaliacao", { precision: 2, scale: 1 }).default("0").notNull(),
    dataCriacao: timestamp("data_criacao", { withTimezone: true, mode: "string" }).defaultNow().notNull(),
    dataAtualizacao: timestamp("data_atualizacao", { withTimezone: true, mode: "string" }),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" }).defaultNow().notNull(),
  },
  (table) => ({
    categoriaIdx: index("idx_projetos_categoria").on(table.categoria),
    statusIdx: index("idx_projetos_status").on(table.status),
    dificuldadeIdx: index("idx_projetos_dificuldade").on(table.dificuldade),
    dataCriacaoIdx: index("idx_projetos_data_criacao").on(table.dataCriacao),
  })
);

export type Projeto = InferSelectModel<typeof projetos>;
export type NewProjeto = InferInsertModel<typeof projetos>;

// ==================== TABELA: ARTIGOS ====================
export const artigos = pgTable(
  "artigos",
  {
    id: text("id").primaryKey(),
    tipo: text("tipo").$type<"artigo">().notNull().default("artigo"),
    titulo: text("titulo").notNull(),
    autores: text("autores").notNull(),
    categoria: text("categoria").notNull(),
    descricao: text("descricao").notNull(),
    resumo: text("resumo").notNull(),
    palavrasChave: text("palavras_chave"),
    anoPublicacao: integer("ano_publicacao"),
    instituicao: text("instituicao"),
    pdfUrl: text("pdf_url").notNull(),
    status: text("status").$type<StatusType>().notNull().default("rascunho"),
    views: integer("views").default(0).notNull(),
    downloads: integer("downloads").default(0).notNull(),
    avaliacao: decimal("avaliacao", { precision: 2, scale: 1 }).default("0").notNull(),
    dataCriacao: timestamp("data_criacao", { withTimezone: true, mode: "string" }).defaultNow().notNull(),
    dataAtualizacao: timestamp("data_atualizacao", { withTimezone: true, mode: "string" }),
    createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" }).defaultNow().notNull(),
  },
  (table) => ({
    categoriaIdx: index("idx_artigos_categoria").on(table.categoria),
    statusIdx: index("idx_artigos_status").on(table.status),
    dataCriacaoIdx: index("idx_artigos_data_criacao").on(table.dataCriacao),
    anoPublicacaoIdx: index("idx_artigos_ano_publicacao").on(table.anoPublicacao),
  })
);

export type Artigo = InferSelectModel<typeof artigos>;
export type NewArtigo = InferInsertModel<typeof artigos>;
