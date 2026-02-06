import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { softwares } from "../db/schema/software";

export const insertSoftwareSchema = createInsertSchema(softwares, {
  titulo: z.string().min(2).max(150),
  slug: z.string().min(2),
  categoria: z.string().min(2),
  descricao: z.string().min(10),
  
  status: z.enum(["ativo", "rascunho", "arquivado", "pendente", "publicado"]),

  siteOficial: z.string().url("URL do site oficial inválida"),
  
  funcionalidades: z.string().optional().nullable(),
  requisitos: z.string().optional().nullable(),
  
  preco: z.string().min(1, "Informe o preço ou 'Gratuito'"),

  plataformas: z.array(z.string()).min(1, "Selecione ao menos uma plataforma"),
  screenshots: z.array(z.string().url()).default([]),

  tutorialUrl: z.string().url().optional().nullable().or(z.literal("")),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  views: true,
  downloads: true,
  avaliacao: true,
});

export const selectSoftwareSchema = createSelectSchema(softwares);

export type InsertSoftware = z.infer<typeof insertSoftwareSchema>;
export type SelectSoftware = z.infer<typeof selectSoftwareSchema>;