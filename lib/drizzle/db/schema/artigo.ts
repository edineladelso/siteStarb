import {
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  numeric,
} from "drizzle-orm/pg-core";

import type { AreaLivro, MacroAreaLivro } from "@/lib/domain/areas";
import type { ArtigoMidia } from "@/lib/domain/artigo";
import type { Status } from "@/lib/domain/enums";

export const artigos = pgTable("artigos", {
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

  // Artigo Specific Fields
  autores: text("autores").notNull(),
  resumo: text("resumo").notNull(),
  
  palavrasChave: text("palavras_chave"),
  anoPublicacao: integer("ano_publicacao"),
  instituicao: text("instituicao"),

  // Arrays e Union (JSONB)
  areas: jsonb("areas").$type<AreaLivro[]>().notNull(),
  macroAreas: jsonb("macro_areas").$type<MacroAreaLivro[]>().notNull(),
  midia: jsonb("midia").$type<ArtigoMidia>().notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});