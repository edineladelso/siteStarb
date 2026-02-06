import {
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  numeric,
} from "drizzle-orm/pg-core";

import type { Status } from "@/lib/domain/enums";

export const softwares = pgTable("softwares", {
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

  // Software Specific Fields
  siteOficial: text("site_oficial").notNull(),
  funcionalidades: text("funcionalidades"),
  requisitos: text("requisitos"),
  
  preco: text("preco").notNull(), // Mantido como string conforme interface do domínio

  // JSONB para arrays
  plataformas: jsonb("plataformas").$type<string[]>().notNull(),
  screenshots: jsonb("screenshots").$type<string[]>().default([]).notNull(),

  tutorialUrl: text("tutorial_url"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});