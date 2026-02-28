"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { UserAvatar } from "@/components/layout/userAvatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  atualizarPerfil,
  sincronizarAvatar,
} from "@/lib/actions/perfil.actions";
import type { CurrentUser } from "@/lib/actions/user.actions";
import { cn } from "@/lib/utils";
import {
  AlertCircle,
  ArrowLeft,
  AtSign,
  BadgeCheck,
  Calendar,
  CheckCircle2,
  LogOut,
  Mail,
  Pencil,
  RefreshCw,
  Save,
  Shield,
  User,
  X,
} from "lucide-react";
import { fazerLogout } from "@/lib/supabase/auth/auth-actions";
import Link from "next/link";

type Feedback = { tipo: "success" | "error"; msg: string } | null;

interface MinhaContaViewProps {
  user: CurrentUser;
}

const providerLabel: Record<string, string> = {
  email: "Email e senha",
  google: "Google",
  github: "GitHub",
};

const roleLabel: Record<string, string> = {
  admin: "Administrador",
  user: "Utilizador",
};

export function MinhaContaView({ user }: MinhaContaViewProps) {
  const [modoEdicao, setModoEdicao] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [feedbackSync, setFeedbackSync] = useState<Feedback>(null);
  const [isPending, startTransition] = useTransition();
  const [isSyncing, startSync] = useTransition();
  const [isLoggingOut, startLogout] = useTransition();
  const closeEditTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (closeEditTimerRef.current) {
        clearTimeout(closeEditTimerRef.current);
      }
    };
  }, []);

  function closeEditModeWithDelay() {
    if (closeEditTimerRef.current) {
      clearTimeout(closeEditTimerRef.current);
    }

    closeEditTimerRef.current = setTimeout(() => {
      setModoEdicao(false);
      closeEditTimerRef.current = null;
    }, 1200);
  }

  function handleSalvar(formData: FormData) {
    startTransition(async () => {
      setFeedback(null);
      const result = await atualizarPerfil(formData);

      if (result.success) {
        setFeedback({ tipo: "success", msg: result.mensagem });
        closeEditModeWithDelay();
        return;
      }

      setFeedback({ tipo: "error", msg: result.erro });
    });
  }

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

  function handleLogout() {
    startLogout(async () => {
      await fazerLogout();
    });
  }

  function enterEditMode() {
    setFeedback(null);
    setModoEdicao(true);
  }

  function cancelEditMode() {
    setFeedback(null);
    setModoEdicao(false);
  }

  return (
    <div className="relative min-h-screen bg-zinc-200">
      <Button
        asChild
        variant="outline"
        size="sm"
        className="absolute top-4 left-4 z-10 h-9  rounded-xl border-zinc-300 bg-white/95 text-zinc-700 shadow-sm backdrop-blur-sm hover:bg-zinc-100 hover:text-zinc-900 sm:top-6 sm:left-6"
      >
        <Link href="/" aria-label="Voltar para a página inicial">
          <ArrowLeft size={14} aria-hidden="true" />
          Voltar à Home
        </Link>
      </Button>
      <div
        aria-hidden="true"
        className="h-36 w-full bg-linear-to-br from-zinc-200 via-zinc-300 to-zinc-200"
      />

      <div className="mx-auto max-w-3xl px-4 pb-24 sm:px-6">
        <div className="-mt-14 mb-5 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
          <div className="flex items-end gap-4">
            <div className="relative">
              <UserAvatar
                nome={user.nome}
                avatarUrl={user.avatarUrl}
                size="xl"
                className="shadow-xl ring-4 ring-zinc-200"
              />
              {user.role === "admin" && (
                <span
                  aria-label="Administrador"
                  className="absolute right-1 -bottom-1 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500 ring-2 ring-white"
                >
                  <BadgeCheck
                    size={13}
                    className="text-white"
                    aria-hidden="true"
                  />
                </span>
              )}
            </div>

            <div className="pb-1">
              <h1 className="text-xl leading-tight font-black text-zinc-900">
                {user.apelido ?? user.nome}
              </h1>
              {user.apelido && (
                <p className="text-sm text-zinc-500">{user.nome}</p>
              )}
              <p className="text-sm text-zinc-600">{user.email}</p>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full border border-zinc-300 bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-600">
                  <Shield size={10} aria-hidden="true" />
                  {roleLabel[user.role] ?? user.role}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full border border-zinc-300 bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-600">
                  {providerLabel[user.provider] ?? user.provider}
                </span>
              </div>
            </div>
          </div>

          <div className="flex w-full items-center gap-2 sm:w-auto">
            {!modoEdicao ? (
              <Button
                onClick={enterEditMode}
                size="sm"
                className="h-9 gap-2 rounded-xl bg-zinc-900 text-white hover:bg-zinc-700"
              >
                <Pencil size={14} aria-hidden="true" />
                Editar perfil
              </Button>
            ) : (
              <Button
                onClick={cancelEditMode}
                variant="ghost"
                size="sm"
                className="h-9 gap-2 rounded-xl text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
              >
                <X size={14} aria-hidden="true" />
                Cancelar
              </Button>
            )}

            <Button
              variant="outline"
              size="sm"
              disabled={isLoggingOut}
              onClick={handleLogout}
              className="h-9 gap-2 rounded-xl border-red-300 bg-red-50 text-red-700 hover:bg-red-100 hover:text-red-800"
            >
              <LogOut size={13} aria-hidden="true" />
              {isLoggingOut ? "A sair..." : "Sair"}
            </Button>
          </div>
        </div>

        <div className="mb-8 h-px w-full bg-linear-to-r from-zinc-500/40 via-zinc-300 to-transparent" />

        <div className="space-y-5">
          {!modoEdicao && (
            <>
              <SectionCard titulo="Informações pessoais">
                <InfoGrid>
                  <InfoItem
                    icon={User}
                    label="Nome completo"
                    valor={user.nome}
                  />
                  <InfoItem
                    icon={AtSign}
                    label="Apelido"
                    valor={user.apelido || "Não definido"}
                    vazio={!user.apelido}
                  />
                  <InfoItem icon={Mail} label="Email" valor={user.email} />
                  <InfoItem
                    icon={Shield}
                    label="Autenticação"
                    valor={providerLabel[user.provider] ?? user.provider}
                  />
                </InfoGrid>
              </SectionCard>

              <SectionCard titulo="Avatar">
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                  <div className="flex items-center gap-4">
                    <UserAvatar
                      nome={user.nome}
                      avatarUrl={user.avatarUrl}
                      size="lg"
                      className="ring-2 ring-zinc-300"
                    />
                    <div>
                      <p className="text-sm font-medium text-zinc-800">
                        {user.avatarUrl
                          ? `Avatar da conta ${providerLabel[user.provider] ?? user.provider}`
                          : "Avatar gerado com as suas iniciais"}
                      </p>
                      <p className="mt-0.5 text-xs text-zinc-500">
                        {user.avatarUrl
                          ? "Pode sincronizar para buscar a foto mais recente"
                          : "Faça login com Google ou GitHub para usar foto de perfil"}
                      </p>
                    </div>
                  </div>

                  {user.provider !== "email" && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={isSyncing}
                      onClick={handleSincronizar}
                      className="h-9 gap-2 rounded-xl border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900"
                    >
                      <RefreshCw
                        size={13}
                        aria-hidden="true"
                        className={cn(isSyncing && "animate-spin")}
                      />
                      {isSyncing ? "A sincronizar..." : "Sincronizar avatar"}
                    </Button>
                  )}
                </div>

                {feedbackSync && (
                  <div className="mt-4">
                    <FeedbackBanner
                      tipo={feedbackSync.tipo}
                      msg={feedbackSync.msg}
                    />
                  </div>
                )}
              </SectionCard>

              <SectionCard titulo="Segurança e conta">
                <div className="space-y-3">
                  <SettingsRow
                    icon={Mail}
                    titulo="Endereço de email"
                    descricao={user.email}
                  />
                  <SettingsRow
                    icon={Shield}
                    titulo="Método de acesso"
                    descricao={`Conta vinculada via ${providerLabel[user.provider] ?? user.provider}`}
                  />
                  <SettingsRow
                    icon={Calendar}
                    titulo="ID da conta"
                    descricao={user.id}
                    mono
                  />
                </div>
              </SectionCard>
            </>
          )}

          {modoEdicao && (
            <SectionCard titulo="Editar perfil">
              <form action={handleSalvar} className="space-y-5" noValidate>
                <div>
                  <label
                    htmlFor="nome"
                    className="mb-1.5 block text-xs font-semibold tracking-widest text-zinc-500 uppercase"
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
                    autoFocus
                    className="h-10 rounded-xl border-zinc-300 bg-white text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="apelido"
                    className="mb-1.5 block text-xs font-semibold tracking-widest text-zinc-500 uppercase"
                  >
                    Apelido{" "}
                    <span className="font-normal tracking-normal text-zinc-400 normal-case">
                      (opcional)
                    </span>
                  </label>
                  <Input
                    id="apelido"
                    name="apelido"
                    defaultValue={user.apelido ?? ""}
                    maxLength={40}
                    placeholder="Como prefere ser chamado"
                    className="h-10 rounded-xl border-zinc-300 bg-white text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-500"
                  />
                  <p className="mt-1 text-xs text-zinc-500">
                    Será exibido no lugar do nome completo quando disponível.
                  </p>
                </div>

                {feedback && (
                  <FeedbackBanner tipo={feedback.tipo} msg={feedback.msg} />
                )}

                <div className="flex items-center gap-3 pt-1">
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="h-10 gap-2 rounded-xl bg-zinc-900 text-white hover:bg-zinc-700"
                  >
                    <Save size={14} aria-hidden="true" />
                    {isPending ? "A guardar..." : "Guardar alterações"}
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    disabled={isPending}
                    onClick={cancelEditMode}
                    className="text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </SectionCard>
          )}
        </div>
        <div aria-hidden="true" className="h-3" />
      </div>
    </div>
  );
}

function SectionCard({
  titulo,
  children,
}: {
  titulo: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-zinc-300 bg-linear-to-br from-zinc-200 via-zinc-400/80 to-zinc-300 shadow-sm">
      <div className="border-b border-zinc-300 px-5 py-3.5 sm:px-6">
        <h2 className="text-[11px] font-semibold tracking-[0.18em] text-zinc-500 uppercase">
          {titulo}
        </h2>
      </div>
      <div className="p-5 sm:p-6">{children}</div>
    </section>
  );
}

function InfoGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">{children}</div>
  );
}

function InfoItem({
  icon: Icon,
  label,
  valor,
  vazio = false,
}: {
  icon: React.ElementType;
  label: string;
  valor: string;
  vazio?: boolean;
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-zinc-300 bg-zinc-100 px-4 py-3">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white">
        <Icon size={14} className="text-zinc-500" aria-hidden="true" />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-medium text-zinc-500">{label}</p>
        <p
          className={cn(
            "mt-0.5 truncate text-sm font-medium",
            vazio ? "text-zinc-400 italic" : "text-zinc-800",
          )}
        >
          {valor}
        </p>
      </div>
    </div>
  );
}

function SettingsRow({
  icon: Icon,
  titulo,
  descricao,
  mono = false,
}: {
  icon: React.ElementType;
  titulo: string;
  descricao: string;
  mono?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-zinc-300 bg-zinc-100 px-4 py-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white">
        <Icon size={14} className="text-zinc-500" aria-hidden="true" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-zinc-800">{titulo}</p>
        <p
          className={cn(
            "mt-0.5 truncate text-xs text-zinc-500",
            mono && "font-mono text-[11px]",
          )}
        >
          {descricao}
        </p>
      </div>
    </div>
  );
}

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
        "flex items-center gap-2.5 rounded-xl border px-4 py-3 text-sm",
        tipo === "success"
          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
          : "border-red-200 bg-red-50 text-red-700",
      )}
    >
      {tipo === "success" ? (
        <CheckCircle2 size={15} className="shrink-0" aria-hidden="true" />
      ) : (
        <AlertCircle size={15} className="shrink-0" aria-hidden="true" />
      )}
      <span>{msg}</span>
    </div>
  );
}
