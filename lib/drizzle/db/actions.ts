"use server";

import { title } from "process";
import { db } from "./index";
import { usersTable, postsTable } from "./schema";
import { revalidatePath } from "next/cache";
import { success, z } from "zod";

const userSchema = z.object({
  nome: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  idade: z.number().min(0, "Idade deve ser um número positivo"),
  email: z.string().email("Email inválido"),
});

const postSchema = z.object({
  title: z.string().min(1, "Título deve no minimo 1 caracteres"),
  content: z.string().min(10, "Conteúdo deve no minimo 10 caracteres"),
  userId: z.number(),
});

export async function criarUsuario(formData: FormData) {
  try {
    const rawData = {
      nome: formData.get("nome") as string,
      idade: Number(formData.get("idade")),
      email: formData.get("email") as string,
    };
    const validatedData = userSchema.parse(rawData);

    const [novoUsuario] = await db
      .insert(usersTable)
      .values(validatedData)
      .returning();

    revalidatePath("/usuarios");
    return { success: true, data: novoUsuario };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.issues[0].message,
      };
    }
    return { success: false, error: "Erro ao criar usuario" };
  }
}

//ver Action para criar post
export async function createPostAction(formData: FormData) {
  try {
    const rawData = {
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      userId: Number(formData.get('userId')),
    };

    const validatedData = postSchema.parse(rawData);

    const [newPost] = await db
      .insert(postsTable)
      .values(validatedData)
      .returning();

    revalidatePath('/posts');

    return { success: true, data: newPost };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0].message };
    }
    return { success: false, error: 'Erro ao criar post' };
  }
}
