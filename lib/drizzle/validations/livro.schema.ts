import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { livros } from "../db/schema/livro";
import { areaLivroValues, macroAreaLivroValues } from "@/lib/domain/areas";

export const insertLivroSchema = createInsertSchema(livros, {
  titulo: z.string().min(2).max(255),
  slug: z.string().min(2),
  categoria: z.string().min(2),
  descricao: z.string().min(10),
  status: z.enum(["rascunho", "publicado"]),
  
  autor: z.string().min(2),
  isbn: z.string().optional().nullable(),
  
  // JSONB: Detalhes
  detalhes: z.object({
    sinopse: z.string().min(10),
    numeroPaginas: z.number().int().positive(),
    autor: z.string().min(2),
    editora: z.string().min(2),
  }),

  // JSONB: Midia
  midia: z.object({
    capa: z.string().url(),
    pdf: z.string().url(),
    epub: z.string().url().or(z.literal("")), // Pode ser vazio se não houver epub
    resumo: z.string().url(),
  }),

  // Arrays com Enums do Domínio
  areas: z.array(z.enum(areaLivroValues)).min(1),
  macroAreas: z.array(z.enum(macroAreaLivroValues)),
  tags: z.array(z.string()).default([]),
  
  anoPublicacao: z.number().int().optional().nullable(),
  numeroPaginas: z.number().int().positive().optional().nullable(),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  views: true,
  downloads: true,
  avaliacao: true,
});

export const selectLivroSchema = createSelectSchema(livros);

export type InsertLivro = z.infer<typeof insertLivroSchema>;
export type SelectLivro = z.infer<typeof selectLivroSchema>;