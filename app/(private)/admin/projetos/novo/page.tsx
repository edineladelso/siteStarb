// ==================== app/admin/projetos/novo/page.tsx ====================
"use client";

import { useRouter } from "next/navigation";
import { ProjetoForm } from "@/components/admin/forms/ProjetoForm";
import { createProjeto } from "@/actions/projetos";

export default function NovoProjetoPage() {
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    const result = await createProjeto(data);
    if (result.success) {
      router.push("/admin/projetos");
    } else {
      alert("Erro ao criar projeto: " + result.error);
    }
  };

  return (
    <ProjetoForm
      onSubmit={handleSubmit}
      onCancel={() => router.push("/admin/projetos")}
    />
  );
}