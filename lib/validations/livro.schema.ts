// ==================== lib/validations.ts ====================

import { z } from "zod";

export const livroSchema = z.object({
  titulo: z.string().min(3, "Título deve ter pelo menos 3 caracteres"),
  autor: z.string().min(2, "Autor deve ter pelo menos 2 caracteres"),
  categoria: z.string().min(1, "Categoria é obrigatória"),
  descricao: z.string().min(50, "Descrição deve ter pelo menos 50 caracteres"),
  isbn: z.string().optional(),
  anoPublicacao: z.number().min(1900).max(new Date().getFullYear() + 1).optional(),
  editora: z.string().optional(),
  idioma: z.string().default("Português"),
  numeroPaginas: z.number().positive().optional(),
  capaUrl: z.string().url("URL da capa inválida"),
  pdfUrl: z.string().url("URL do PDF inválida"),
  tags: z.array(z.string()).default([]),
});


export type LivroFormData = z.infer<typeof livroSchema>;