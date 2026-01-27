// ==================== app/admin/softwares/[id]/editar/page.tsx ====================
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { SoftwareForm } from "@/components/admin/forms/SoftwareForm";
import { getSoftwareById, updateSoftware } from "@/actions/softwares";
import type { Software } from "@/lib/types";

export default function EditarSoftwarePage() {
  const router = useRouter();
  const params = useParams();
  const [software, setSoftware] = useState<Software | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSoftware();
  }, [params.id]);

  const loadSoftware = async () => {
    const data = await getSoftwareById(params.id as string);
    setSoftware(data);
    setLoading(false);
  };

  const handleSubmit = async (data: any) => {
    const result = await updateSoftware(params.id as string, data);
    if (result.success) {
      router.push("/admin/softwares");
    } else {
      alert("Erro ao atualizar software: " + result.error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!software) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600">Software não encontrado</p>
      </div>
    );
  }

  return (
    <SoftwareForm
      initialData={software}
      onSubmit={handleSubmit}
      onCancel={() => router.push("/admin/softwares")}
    />
  );
}
