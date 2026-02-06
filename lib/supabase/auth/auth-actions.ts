"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function registrarComEmail(formData: FormData) {
  const email = String(formData.get("email") || "");
  const senha = String(formData.get("senha") || "");

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({ email, password: senha });

  if (error) {
    throw new Error(error.message);
  }

  redirect("/login");
}

export async function fazerLoginComEmail(formData: FormData) {
  const email = String(formData.get("email") || "");
  const senha = String(formData.get("senha") || "");

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password: senha,
  });

  if (error) {
    throw new Error(error.message);
  }

  redirect("/admin");
}

export async function loginComGoogle() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback` },
  });

  if (error) {
    throw new Error(error.message);
  }

  if (data?.url) {
    redirect(data.url);
  }
}

export async function loginComGithub() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: { redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback` },
  });

  if (error) {
    throw new Error(error.message);
  }

  if (data?.url) {
    redirect(data.url);
  }
}
