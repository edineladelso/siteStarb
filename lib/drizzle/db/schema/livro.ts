import {
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  numeric,
  boolean,
} from "drizzle-orm/pg-core";

import type {
  DetalhesLivro,
  MidiaLivro
} from "@/lib/domain/livro";
import type { AreaLivro, MacroAreaLivro } from "@/lib/domain/areas";
import type { Status } from "@/lib/domain/enums";

export const livros = pgTable("livros", {
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

  // Livro Specific Fields
  autor: text("autor").notNull(),
  anoPublicacao: integer("ano_publicacao"),
  idioma: text("idioma"),

  // JSONB complexos
  detalhes: jsonb("detalhes").$type<DetalhesLivro>().notNull(),
  midia: jsonb("midia").$type<MidiaLivro>().notNull(),
  
  // Arrays
  areas: jsonb("areas").$type<AreaLivro[]>().notNull(),
  macroAreas: jsonb("macro_areas").$type<MacroAreaLivro[]>().notNull(),
  tags: jsonb("tags").$type<string[]>().default([]).notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  novo: boolean("novo").default(true),
  popular: boolean("popular").default(false)
});