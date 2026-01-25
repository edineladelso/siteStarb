
// ==================== app/admin/livros/novo/page.tsx ====================
"use client";

import { useRouter } from "next/navigation";
import { LivroForm } from "@/components/admin/forms/LivroForm";
import { createLivro } from "@/actions/livros";


export default function NovoLivroPage() {
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    const result = await createLivro(data);
    if (result.success) {
      router.push("/admin/livros");
    } else {
      alert("Erro ao criar livro: " + result.error);
    }
  };

  return (
    <LivroForm
      onSubmit={handleSubmit}
      onCancel={() => router.push("/admin/livros")}
    />
  );
}
