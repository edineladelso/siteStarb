
import { z } from "zod";

export const softwareSchema = z.object({
  nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  siteOficial: z.string().url("URL inválida"),
  categoria: z.string().min(1, "Categoria é obrigatória"),
  descricao: z.string().min(50, "Descrição deve ter pelo menos 50 caracteres"),
  funcionalidades: z.string().optional(),
  requisitos: z.string().optional(),
  preco: z.string().default("Gratuito"),
  plataformas: z.array(z.string()).default([]),
  screenshots: z.array(z.string().url()).default([]),
});



export type SoftwareFormData = z.infer<typeof softwareSchema>;