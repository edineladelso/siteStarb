import { getCurrentUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import { MinhaContaView } from "@/app/(private)/minha-conta/minha-conta-view";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Minha Conta",
  description: "Gerencie as suas informações de perfil.",
  robots: { index: false, follow: false },
};

export default async function MinhaContaPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login?next=/minha-conta");
  }

  return <MinhaContaView user={user} />;
}