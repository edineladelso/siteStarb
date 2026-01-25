
import { z } from "zod";


export const projetoSchema = z.object({
  titulo: z.string().min(3, "Título deve ter pelo menos 3 caracteres"),
  autor: z.string().min(2, "Autor deve ter pelo menos 2 caracteres"),
  categoria: z.string().min(1, "Categoria é obrigatória"),
  descricaoGeral: z.string().min(50, "Descrição deve ter pelo menos 50 caracteres"),
  problemaResolvido: z.string().min(20, "Descreva o problema com mais detalhes"),
  tecnologias: z.string().min(2, "Liste as tecnologias utilizadas"),
  repositorioGithub: z.string().url().optional().or(z.literal("")),
  documentacaoUrl: z.string().url().optional(),
  imagensUrl: z.array(z.string().url()).default([]),
  dificuldade: z.enum(["Iniciante", "Intermediário", "Avançado"]).default("Intermediário"),
  duracao: z.string().optional(),
});

export type ProjetoFormData = z.infer<typeof projetoSchema>;