import z from "zod";


export const artigoSchema = z.object({
  titulo: z.string().min(3, "Título deve ter pelo menos 3 caracteres"),
  autores: z.string().min(2, "Nome dos autores é obrigatório"),
  categoria: z.string().min(1, "Categoria é obrigatória"),
  resumo: z.string().min(100, "Resumo deve ter pelo menos 100 caracteres"),
  palavrasChave: z.string().optional(),
  anoPublicacao: z.number().min(1900).max(new Date().getFullYear() + 1).optional(),
  instituicao: z.string().optional(),
  pdfUrl: z.string().url("URL do PDF inválida"),
});

export type ArtigoFormData = z.infer<typeof artigoSchema>;
