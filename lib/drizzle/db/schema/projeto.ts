import {
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  numeric,
} from "drizzle-orm/pg-core";

import type { Status, Dificuldade } from "@/lib/domain/enums";

export const projetos = pgTable("projetos", {
  id: serial("id").primaryKey(),

  // ContentBase Fields
  titulo: text("titulo").notNull(),
  slug: text("slug").notNull().unique(),
  categoria: text("categoria").notNull(),
  descricao: text("descricao").notNull(),
  status: text("status").$type<Status>().default("rascunho").notNull(),

  views: integer("views").default(0).notNull(),
  downloads: integer("downloads").default(0).notNull(),
  avaliacao: numeric("avaliacao").default("0").notNull(),

  // Projeto Specific Fields
  autor: text("autor").notNull(),
  problemaResolvido: text("problema_resolvido").notNull(),
  tecnologias: text("tecnologias").notNull(), // String (ex: "React, Node, Postgres")

  repositorioGithub: text("repositorio_github"),
  documentacaoUrl: text("documentacao_url"),
  
  // JSONB para array de strings
  imagensUrl: jsonb("imagens_url").$type<string[]>().default([]).notNull(),

  dificuldade: text("dificuldade").$type<Dificuldade>().notNull(),
  duracao: text("duracao"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});