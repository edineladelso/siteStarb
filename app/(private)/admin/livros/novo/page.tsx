// ==================== app/admin/livros/novo/page.tsx ====================
"use client";

import { LivroForm } from "@/components/admin/forms/LivroForm";
import { useRouter } from "next/navigation";

export default function NovoLivroPage() {
  const router = useRouter();

  return (
    <LivroForm
      onCancel={() => router.push("/admin/livros")}
    />
  );
}
