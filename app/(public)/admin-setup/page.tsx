import { redirect } from "next/navigation";
import { createSSClient } from "@/lib/supabase/server";
import { db, profiles } from "@/lib/drizzle/db";
import { eq } from "drizzle-orm";
import { AdminSetupForm } from "./AdminSetupForm";

export default async function AdminSetupPage() {
  const supabase = await createSSClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/admin-setup");
  }

  const [perfil] = await db
    .select()
    .from(profiles)
    .where(eq(profiles.id, user.id));

  const conta = {
    email: user.email ?? "(sem email)",
    nome:
      perfil?.nome ??
      user.user_metadata?.full_name ??
      user.user_metadata?.name ??
      "(sem nome)",
  };

  return (
    <div className="container mx-auto max-w-md p-8">
      <h1 className="mb-2 text-center text-2xl font-bold text-slate-900">
        Configuração de administrador
      </h1>
      <p className="mb-6 text-center text-sm text-slate-600">
        Introduza o código de configuração para promover esta conta a
        administrador.
      </p>
      <AdminSetupForm conta={conta} />
    </div>
  );
}
