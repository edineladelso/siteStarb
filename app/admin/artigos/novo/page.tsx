// ==================== app/admin/artigos/novo/page.tsx ====================
"use client";

import { useRouter } from "next/navigation";
import { ArtigoForm } from "@/components/admin/forms/ArtigoForm";
import { createArtigo } from "@/actions/artigos";

export default function NovoArtigoPage() {
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    const result = await createArtigo(data);
    if (result.success) {
      router.push("/admin/artigos");
    } else {
      alert("Erro ao criar artigo: " + result.error);
    }
  };

  return (
    <ArtigoForm
      onSubmit={handleSubmit}
      onCancel={() => router.push("/admin/artigos")}
    />
  );
}