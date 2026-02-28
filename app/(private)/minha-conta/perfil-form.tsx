"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserAvatar } from "@/components/layout/userAvatar";
import {
  atualizarPerfil,
  sincronizarAvatar,
} from "@/lib/actions/perfil.actions";
import {
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Save,
  Mail,
  Shield,
} from "lucide-react";
import type { CurrentUser } from "@/lib/actions/user.actions";
import { cn } from "@/lib/utils";

interface PerfilFormProps {
  user: CurrentUser;
}

type Feedback = { tipo: "success" | "error"; msg: string } | null;

export function PerfilForm({ user }: PerfilFormProps) {
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [feedbackSync, setFeedbackSync] = useState<Feedback>(null);
  const [isPending, startTransition] = useTransition();
  const [isSyncing, startSync] = useTransition();

  // ── Salvar perfil ──────────────────────────────────────────────────────────
  async function handleSalvar(formData: FormData) {
    startTransition(async () => {
      setFeedback(null);
      const result = await atualizarPerfil(formData);
      setFeedback(
        result.success
          ? { tipo: "success", msg: result.mensagem }
          : { tipo: "error", msg: result.erro },
      );
    });
  }

  // ── Sincronizar avatar ─────────────────────────────────────────────────────
  function handleSincronizar() {
    startSync(async () => {
      setFeedbackSync(null);
      const result = await sincronizarAvatar();
      setFeedbackSync(
        result.success
          ? { tipo: "success", msg: result.mensagem }
          : { tipo: "error", msg: result.erro },
      );
    });
  }

  const providerLabel: Record<string, string> = {
    email: "Email e senha",
    google: "Google",
    github: "GitHub",
  };

  return (
    <div className="space-y-6">
      {/* ── Avatar ── */}
      <section
        aria-labelledby="avatar-titulo"
        className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 sm:p-6"
      >
        <h2
          id="avatar-titulo"
          className="mb-4 text-[11px] font-semibold tracking-[0.18em] text-white/45 uppercase"
        >
          Avatar
        </h2>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
          <UserAvatar
            nome={user.nome}
            avatarUrl={user.avatarUrl}
            size="xl"
            className="ring-4 ring-violet-500/30"
          />

          <div className="flex-1 space-y-3">
            <p className="text-sm leading-relaxed text-white/65">
              {user.avatarUrl
                ? "Avatar da sua conta " +
                  (providerLabel[user.provider] ?? user.provider)
                : "Avatar gerado automaticamente com as suas iniciais"}
            </p>

            {user.provider !== "email" && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={isSyncing}
                onClick={handleSincronizar}
                className="h-9 gap-2 rounded-xl border-white/15 bg-[#0f0f15]/80 text-white/80 hover:bg-white/10 hover:text-white"
              >
                <RefreshCw
                  size={14}
                  aria-hidden="true"
                  className={cn(isSyncing && "animate-spin")}
                />
                {isSyncing
                  ? "Sincronizando…"
                  : "Sincronizar do " + (providerLabel[user.provider] ?? "")}
              </Button>
            )}

            {/* Feedback sincronização */}
            {feedbackSync && (
              <FeedbackBanner tipo={feedbackSync.tipo} msg={feedbackSync.msg} />
            )}
          </div>
        </div>
      </section>

      {/* ── Dados pessoais ── */}
      <section
        aria-labelledby="dados-titulo"
        className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 sm:p-6"
      >
        <h2
          id="dados-titulo"
          className="mb-4 text-[11px] font-semibold tracking-[0.18em] text-white/45 uppercase"
        >
          Dados Pessoais
        </h2>

        <form action={handleSalvar} className="space-y-4">
          {/* Nome */}
          <div>
            <label
              htmlFor="nome"
              className="mb-1.5 block text-xs font-semibold text-white/75"
            >
              Nome completo{" "}
              <span aria-hidden="true" className="text-red-400">
                *
              </span>
            </label>
            <Input
              id="nome"
              name="nome"
              defaultValue={user.nome}
              required
              minLength={2}
              maxLength={80}
              autoComplete="name"
              className="h-10 rounded-xl border-white/10 bg-[#0f0f15]/80 text-white placeholder:text-white/30 focus:border-violet-500"
            />
          </div>

          {/* Apelido */}
          <div>
            <label
              htmlFor="apelido"
              className="mb-1.5 block text-xs font-semibold text-white/75"
            >
              Apelido <span className="text-white/30">(opcional)</span>
            </label>
            <Input
              id="apelido"
              name="apelido"
              defaultValue={user.apelido ?? ""}
              maxLength={40}
              placeholder="Como prefere ser chamado"
              className="h-10 rounded-xl border-white/10 bg-[#0f0f15]/80 text-white placeholder:text-white/30 focus:border-violet-500"
            />
          </div>

          {/* Feedback */}
          {feedback && (
            <FeedbackBanner tipo={feedback.tipo} msg={feedback.msg} />
          )}

          <Button
            type="submit"
            disabled={isPending}
            className="h-10 gap-2 rounded-xl bg-violet-600 font-semibold text-white hover:bg-violet-700 focus-visible:ring-violet-400"
          >
            <Save size={15} aria-hidden="true" />
            {isPending ? "Salvando…" : "Salvar alterações"}
          </Button>
        </form>
      </section>

      {/* ── Informações da conta (só leitura) ── */}
      <section
        aria-labelledby="conta-titulo"
        className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 sm:p-6"
      >
        <h2
          id="conta-titulo"
          className="mb-4 text-[11px] font-semibold tracking-[0.18em] text-white/45 uppercase"
        >
          Informações da Conta
        </h2>

        <div className="space-y-3">
          <InfoRow icon={Mail} label="Email" valor={user.email} />
          <InfoRow
            icon={Shield}
            label="Acesso via"
            valor={providerLabel[user.provider] ?? user.provider}
          />
          <InfoRow
            icon={Shield}
            label="Função"
            valor={user.role === "admin" ? "Administrador" : "Utilizador"}
          />
        </div>
      </section>
    </div>
  );
}

// ── Subcomponentes internos ────────────────────────────────────────────────────

function FeedbackBanner({
  tipo,
  msg,
}: {
  tipo: "success" | "error";
  msg: string;
}) {
  return (
    <div
      role={tipo === "error" ? "alert" : "status"}
      aria-live={tipo === "error" ? "assertive" : "polite"}
      className={cn(
        "flex items-center gap-2 rounded-lg border p-3 text-sm",
        tipo === "success"
          ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
          : "border-red-500/40 bg-red-500/10 text-red-300",
      )}
    >
      {tipo === "success" ? (
        <CheckCircle2 size={15} aria-hidden="true" className="shrink-0" />
      ) : (
        <AlertCircle size={15} aria-hidden="true" className="shrink-0" />
      )}
      <span>{msg}</span>
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  valor,
}: {
  icon: React.ElementType;
  label: string;
  valor: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-[#0f0f15]/65 px-4 py-3">
      <Icon size={15} className="shrink-0 text-white/35" aria-hidden="true" />
      <span className="w-20 shrink-0 text-xs text-white/45">{label}</span>
      <span className="text-sm text-white/85">{valor}</span>
    </div>
  );
}
