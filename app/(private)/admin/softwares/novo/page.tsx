// ==================== app/admin/softwares/novo/page.tsx ====================
"use client";

import { SoftwareForm } from "@/components/admin/forms/SoftwareForm";
import { useRouter } from "next/navigation";

export default function NovoSoftwarePage() {
  const router = useRouter();

  return (
    <SoftwareForm
      onCancel={() => router.push("/admin/softwares")}
    />
  );
}
