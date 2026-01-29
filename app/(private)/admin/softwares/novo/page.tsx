// ==================== app/admin/softwares/novo/page.tsx ====================
"use client";

import { useRouter } from "next/navigation";
import { SoftwareForm } from "@/components/admin/forms/SoftwareForm";
import { createSoftware } from "@/actions/softwares";

export default function NovoSoftwarePage() {
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    const result = await createSoftware(data);
    if (result.success) {
      router.push("/admin/softwares");
    } else {
      alert("Erro ao criar software: " + result.error);
    }
  };

  return (
    <SoftwareForm
      onSubmit={handleSubmit}
      onCancel={() => router.push("/admin/softwares")}
    />
  );
}