// ==================== app/admin/artigos/novo/page.tsx ====================
"use client";

import { ArtigoForm } from "@/components/admin/forms/ArtigoForm";
import { useRouter } from "next/navigation";

export default function NovoArtigoPage() {
  const router = useRouter();

  return (
    <ArtigoForm
      onCancel={() => router.push("/admin/artigos")}
    />
  );
}
