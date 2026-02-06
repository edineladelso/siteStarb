// ==================== app/admin/softwares/[id]/editar/page.tsx ====================
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { SoftwareForm } from "@/components/admin/forms/SoftwareForm";
import { getSoftwareById } from "@/lib/actions";
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
    const id = Number(params.id);
    if (Number.isNaN(id)) {
      setSoftware(null);
      setLoading(false);
      return;
    }
    const data = await getSoftwareById(id);
    setSoftware(data);
    setLoading(false);
  };


  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-purple-600 border-t-transparent"></div>
          <p className="text-slate-600">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!software) {
    return (
      <div className="py-12 text-center">
        <p className="text-slate-600">Software não encontrado</p>
      </div>
    );
  }

  return (
    <SoftwareForm
      initialData={software}
      onCancel={() => router.push("/admin/softwares")}
    />
  );
}
