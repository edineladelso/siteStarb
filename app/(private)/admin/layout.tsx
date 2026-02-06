import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { db, profilesTable } from "@/lib/drizzle/db";
import { eq } from "drizzle-orm";

export default async function LayoutAdmin({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // const supabase = await createClient();
  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  // // Se não estiver logado, manda para login
  // if (!user) {
  //   redirect("/login");
  // }

  // // Busca perfil no banco para checar role
  // const [perfil] = await db
  //   .select()
  //   .from(profilesTable)
  //   .where(eq(profilesTable.id, user.id));

  // // Se não tiver perfil ou não for admin, bloqueia acesso
  // if (!perfil || perfil.role) {
  //   redirect("/");
  // }

  return <div className="mx-auto flex justify-center p-5">{children}</div>;
}
