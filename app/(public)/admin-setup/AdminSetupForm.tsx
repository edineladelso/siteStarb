"use client";

import { useActionState } from "react";
import { promoverParaAdmin } from "@/lib/actions/admin-setup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Conta = { email: string; nome: string };

export function AdminSetupForm({ conta }: { conta: Conta }) {
  const [state, formAction] = useActionState(
    promoverParaAdmin,
    null as { error?: string } | null,
  );

  return (
    <form action={formAction} className="space-y-4">
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
        <p className="mb-1 text-xs font-medium tracking-wide text-slate-500 uppercase">
          Conta que receberá o role de administrador
        </p>
        <p className="font-semibold text-slate-900">{conta.nome}</p>
        <p className="text-sm text-slate-600">{conta.email}</p>
      </div>
      <div>
        <label
          htmlFor="codigo"
          className="mb-1 block text-sm font-medium text-slate-700"
        >
          Código de configuração
        </label>
        <Input
          id="codigo"
          name="codigo"
          type="password"
          placeholder="Código definido em ADMIN_SETUP_SECRET"
          autoComplete="one-time-code"
          required
          className="w-full"
        />
      </div>
      {state?.error && (
        <p
          className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700"
          role="alert"
        >
          {state.error}
        </p>
      )}
      <Button type="submit" className="w-full">
        Promover a administrador
      </Button>
      <p className="text-center text-xs text-slate-500">
        Defina a variável{" "}
        <code className="rounded bg-slate-100 px-1">ADMIN_SETUP_SECRET</code> no
        seu <code className="rounded bg-slate-100 px-1">.env.local</code> e use
        o mesmo valor aqui.
      </p>
    </form>
  );
}
