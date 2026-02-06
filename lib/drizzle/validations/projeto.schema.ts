import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { projetos } from "../db/schema/projeto";

export const insertProjetoSchema = createInsertSchema(projetos, {
  titulo: z.string().min(3).max(100),
  slug: z.string().min(3),
  categoria: z.string().min(2),
  descricao: z.string().min(10),
  
  // Enums estritos para evitar erros de sobrecarga no Drizzle
  status: z.enum(["ativo", "rascunho", "arquivado", "pendente", "publicado"]),
  dificuldade: z.enum(["Iniciante", "Intermediário", "Avançado"]),

  autor: z.string().min(2),
  problemaResolvido: z.string().min(10),
  tecnologias: z.string().min(2),

  repositorioGithub: z.string().url().nullable().optional().or(z.literal("")),
  documentacaoUrl: z.string().url().nullable().optional().or(z.literal("")),

  imagensUrl: z.array(z.string().url()).default([]),
  
  duracao: z.string().nullable().optional(),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  views: true,
  downloads: true,
  avaliacao: true,
});

export const selectProjetoSchema = createSelectSchema(projetos);

export type InsertProjeto = z.infer<typeof insertProjetoSchema>;
export type SelectProjeto = z.infer<typeof selectProjetoSchema>;