// src/lib/validators/auth.ts
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { profiles } from "../db/schema/profile";

// Validação para Login manual
export const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

// Validação para Registro manual
export const registerSchema = loginSchema.extend({
  nome: z.string().min(2, "Nome é obrigatório"),
});

// Schema de Inserção de Perfil (usado internamente após Auth)
export const insertProfileSchema = createInsertSchema(profiles);

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;