import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { artigos } from "../db/schema/artigo";
import { areaLivroValues, macroAreaLivroValues } from "@/lib/domain/areas";

export const insertArtigoSchema = createInsertSchema(artigos, {
  titulo: z.string().min(3).max(200),
  slug: z.string().min(3),
  categoria: z.string().min(2),
  descricao: z.string().min(10),
  
  // Enum estrito para Status (ContentBase)
  status: z.enum(["ativo", "rascunho", "arquivado", "pendente", "publicado"]),

  autores: z.string().min(2),
  resumo: z.string().min(10),
  
  anoPublicacao: z.number().int().optional().nullable(),
  
  // Arrays validados pelas constantes do domínio
  areas: z.array(z.enum(areaLivroValues)).min(1),
  macroAreas: z.array(z.enum(macroAreaLivroValues)),

  // Discriminated Union para Midia
  midia: z.discriminatedUnion("tipo", [
    z.object({
      tipo: z.literal("pdf"),
      pdfUrl: z.string().url(),
    }),
    z.object({
      tipo: z.literal("plataforma"),
      htmlUrl: z.string().url(),
    }),
  ]),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  views: true,
  downloads: true,
  avaliacao: true,
});

export const selectArtigoSchema = createSelectSchema(artigos);

export type InsertArtigo = z.infer<typeof insertArtigoSchema>;
export type SelectArtigo = z.infer<typeof selectArtigoSchema>;