import { createSSClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { syncUserProfile } from "@/lib/actions/auth-sync.actions";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    const supabase = await createSSClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error) {
      // Sincroniza os dados do Google/GitHub com o Drizzle imediatamente
      await syncUserProfile();
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Em caso de erro, redireciona para página de erro de login
  return NextResponse.redirect(`${origin}/auth/auth-error`);
}