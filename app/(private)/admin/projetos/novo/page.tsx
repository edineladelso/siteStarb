// ==================== app/admin/projetos/novo/page.tsx ====================
"use client";

import { ProjetoForm } from "@/components/admin/forms/ProjetoForm";
import { useRouter } from "next/navigation";

export default function NovoProjetoPage() {
  const router = useRouter();

  return (
    <ProjetoForm
      onCancel={() => router.push("/admin/projetos")}
    />
  );
}
