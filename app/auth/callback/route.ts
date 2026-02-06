import { db, profilesTable } from "@/lib/drizzle/db";
import { createClient } from "@/lib/supabase/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data.user) {
      // Criar perfil se não existir (para login social)
      const [perfilExistente] = await db
        .select()
        .from(profilesTable)
        .where(eq(profilesTable.id, data.user.id));

      if (!perfilExistente) {
        await db.insert(profilesTable).values({
          id: data.user.id,
          nome:
            data.user.user_metadata.full_name ||
            data.user.email?.split("@")[0] ||
            "Usuário",
          avatar_url: data.user.user_metadata.avatar_url,
        });
      }

      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth_failed`);
}
