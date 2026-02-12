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

  autores: z.array(z.string().min(2)).min(1),
  resumo: z.string().min(10),
  
  anoPublicacao: z.number().int().optional().nullable(),
  leituraMin: z.number().int().min(0).default(0),
  tags: z.array(z.string().min(1)).default([]),
  destaque: z.boolean().default(false),
  citacoes: z.number().int().min(0).default(0),
  html: z.string().min(3).optional(),
  
  // Arrays validados pelas constantes do domínio
  areas: z.array(z.enum(areaLivroValues)).min(1),
  macroAreas: z.array(z.enum(macroAreaLivroValues)),

  // Discriminated Union para Midia
  midia: z
    .discriminatedUnion("tipo", [
      z.object({
        tipo: z.literal("pdf"),
        pdfUrl: z.string().url(),
      }),
      z.object({
        tipo: z.literal("plataforma"),
        htmlUrl: z.string().url(),
      }),
    ])
    .optional()
    .nullable(),
})
  .superRefine((data, ctx) => {
    if (!data.midia && !data.html) {
      ctx.addIssue({
        path: ["html"],
        code: "custom",
        message: "Forneça o HTML do artigo ou anexe uma mídia.",
      });
    }
  })
  .omit({
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
