"use server";

import { createClient } from "../server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { db } from "@/lib/drizzle/db/index";
import { profilesTable } from "@/lib/drizzle/db/schema";


const registroSchema = z.object({
  email: z.string().email('Email inválido'),
  senha: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
  nome: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  idade: z.number().min(1).optional(),
});

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  senha: z.string().min(1, 'Senha é obrigatória'),
});

//GISTRO com Email/Senha
export async function registrarComEmail(formData: FormData) {
  try {
    const rawData = {
      email: formData.get('email') as string,
      senha: formData.get('senha') as string,
      nome: formData.get('nome') as string,
      idade: Number(formData.get('idade')) || undefined,
    };

    const validatedData = registroSchema.parse(rawData);
    const supabase = await createClient();

    // Criar usuário no Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email: validatedData.email,
      password: validatedData.senha,
      options: {
        data: {
          nome: validatedData.nome,
        },
      },
    });

    if (error) {
      return { success: false, error: error.message };
    }

    // Criar perfil no banco
    if (data.user) {
      await db.insert(profilesTable).values({
        id: data.user.id,
        nome: validatedData.nome,
        idade: validatedData.idade,
      });
    }

    return { success: true, message: 'Verifique seu email para confirmar!' };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0].message };
    }
    return { success: false, error: 'Erro ao registrar' };
  }
}

// 🔑 LOGIN com Email/Senha
export async function fazerLoginComEmail(formData: FormData) {
  try {
    const rawData = {
      email: formData.get('email') as string,
      senha: formData.get('senha') as string,
    };

    const validatedData = loginSchema.parse(rawData);
    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email: validatedData.email,
      password: validatedData.senha,
    });

    if (error) {
      return { success: false, error: 'Email ou senha incorretos' };
    }

    redirect('/dashboard');
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0].message };
    }
    return { success: false, error: 'Erro ao fazer login' };
  }
}

// 🔗 LOGIN com Google
export async function loginComGoogle() {
  const supabase = await createClient();
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  if (error) {
    return { success: false, error: error.message };
  }

  if (data.url) {
    redirect(data.url);
  }
}

// 🔗 LOGIN com GitHub
export async function loginComGithub() {
  const supabase = await createClient();
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  if (error) {
    return { success: false, error: error.message };
  }

  if (data.url) {
    redirect(data.url);
  }
}

// 🚪 LOGOUT
export async function fazerLogout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/login');
}

// 👤 OBTER USUÁRIO LOGADO
export async function obterUsuarioLogado() {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return null;

  // Buscar perfil completo
  const [perfil] = await db
    .select()
    .from(profilesTable)
    .where(eq(profilesTable.id, user.id));

  return {
    ...user,
    perfil,
  };
}