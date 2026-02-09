// components/ui/error-content.tsx
"use client";

import { Button } from "@/components/ui/button";
import { AlertCircle, XCircle, AlertTriangle, FileX } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import router from "next/router";

type ErrorVariant = "not-found" | "error" | "warning" | "forbidden";

interface ErrorContentProps {
  /**
   * Nome do conteúdo que não foi encontrado (ex: "artigo", "usuário", "produto")
   */
  conteudo: string;
  /**
   * Tipo de erro a ser exibido
   * @default "not-found"
   */
  variant?: ErrorVariant;
  /**
   * Título customizado (opcional)
   */
  title?: string;
  /**
   * Descrição customizada (opcional)
   */
  description?: string;
  /**
   * URL de retorno
   */
  backUrl?: string;
  /**
   * Texto do botão de retorno
   * @default "Voltar para a lista"
   */
  backButtonText?: string;
  /**
   * Ação customizada ao clicar no botão
   */
  onBack?: () => void;
  /**
   * Altura mínima do container
   * @default "50vh"
   */
  minHeight?: string;
  /**
   * Classes CSS adicionais
   */
  className?: string;
  /**
   * Exibir botão de ação secundária
   */
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
}

const variantConfig = {
  "not-found": {
    icon: FileX,
    iconBg: "bg-red-50 dark:bg-red-950/20",
    iconColor: "text-red-600 dark:text-red-400",
    shadowColor: "shadow-red-500/10 dark:shadow-red-500/20",
    titleColor: "text-slate-900 dark:text-slate-100",
  },
  error: {
    icon: XCircle,
    iconBg: "bg-red-50 dark:bg-red-950/20",
    iconColor: "text-red-600 dark:text-red-400",
    shadowColor: "shadow-red-500/10 dark:shadow-red-500/20",
    titleColor: "text-slate-900 dark:text-slate-100",
  },
  warning: {
    icon: AlertTriangle,
    iconBg: "bg-amber-50 dark:bg-amber-950/20",
    iconColor: "text-amber-600 dark:text-amber-400",
    shadowColor: "shadow-amber-500/10 dark:shadow-amber-500/20",
    titleColor: "text-slate-900 dark:text-slate-100",
  },
  forbidden: {
    icon: AlertCircle,
    iconBg: "bg-orange-50 dark:bg-orange-950/20",
    iconColor: "text-orange-600 dark:text-orange-400",
    shadowColor: "shadow-orange-500/10 dark:shadow-orange-500/20",
    titleColor: "text-slate-900 dark:text-slate-100",
  },
};

export function ErrorContent({
  conteudo,
  variant = "not-found",
  title,
  description,
  backUrl,
  backButtonText = "Voltar para a lista",
  onBack,
  minHeight = "50vh",
  className,
  secondaryAction,
}: ErrorContentProps) {
  const router = useRouter();
  const config = variantConfig[variant];
  const Icon = config.icon;

  const defaultTitle = title || `${conteudo} não encontrado`;
  const defaultDescription =
    description ||
    `O ${conteudo} que você tenta acessar não existe ou foi removido.`;

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (backUrl) {
      router.push(backUrl);
    } else {
      router.back();
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-6 px-4 text-center",
        className,
      )}
      style={{ minHeight }}
      role="alert"
      aria-live="polite"
      aria-atomic="true"
    >
      {/* Icon Container */}
      <div className="relative">
        {/* Glow effect */}
        <div
          className={cn(
            "absolute inset-0 rounded-full opacity-40 blur-2xl",
            config.iconBg,
          )}
          aria-hidden="true"
        />

        {/* Icon background */}
        <div
          className={cn(
            "relative rounded-full p-4 shadow-lg transition-transform hover:scale-105",
            config.iconBg,
            config.shadowColor,
          )}
        >
          <Icon
            className={cn("h-8 w-8 sm:h-10 sm:w-10", config.iconColor)}
            aria-hidden="true"
            strokeWidth={2}
          />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md space-y-2">
        <h2
          className={cn("text-xl font-semibold sm:text-2xl", config.titleColor)}
        >
          {defaultTitle}
        </h2>
        <p className="text-sm text-slate-600 sm:text-base dark:text-slate-400">
          {defaultDescription}
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
        <Button
          onClick={handleBack}
          variant="default"
          size="default"
          className="shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/30"
        >
          {backButtonText}
        </Button>

        {secondaryAction && (
          <Button
            onClick={secondaryAction.onClick}
            variant="outline"
            size="default"
            className="shadow-sm transition-all hover:shadow-md"
          >
            {secondaryAction.label}
          </Button>
        )}
      </div>

      {/* Screen reader only text */}
      <span className="sr-only">
        Erro: {defaultTitle}. {defaultDescription}
      </span>
    </div>
  );
}

// Variante especializada para 404
export function NotFoundContent({
  conteudo,
  backUrl,
  className,
}: {
  conteudo: string;
  backUrl?: string;
  className?: string;
}) {
  return (
    <ErrorContent
      conteudo={conteudo}
      variant="not-found"
      backUrl={backUrl}
      className={className}
    />
  );
}

// Variante especializada para erros gerais
export function GeneralErrorContent({
  title = "Algo deu errado",
  description = "Ocorreu um erro inesperado. Por favor, tente novamente.",
  onRetry,
  className,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}) {
  return (
    <ErrorContent
      conteudo=""
      variant="error"
      title={title}
      description={description}
      backButtonText="Voltar"
      secondaryAction={
        onRetry
          ? {
              label: "Tentar novamente",
              onClick: onRetry,
            }
          : undefined
      }
      className={className}
    />
  );
}

// Variante para acesso negado
export function ForbiddenContent({
  conteudo,
  className,
}: {
  conteudo: string;
  className?: string;
}) {
  return (
    <ErrorContent
      conteudo={conteudo}
      variant="forbidden"
      title="Acesso negado"
      description={`Você não tem permissão para acessar este ${conteudo}.`}
      backButtonText="Voltar ao início"
      backUrl="/"
      className={className}
    />
  );
}

export function ExemploUso() {
  return (
    <div>
      {/* // Exemplos de uso:

// Uso básico (substitui o código original) */}
      <ErrorContent conteudo="artigo" backUrl="/admin/artigos" />
      {/* // Com título e descrição customizados */}
      <ErrorContent
        conteudo="usuário"
        title="Usuário não localizado"
        description="Este usuário pode ter sido deletado ou você não tem permissão para vê-lo."
        backUrl="/admin/usuarios"
      />
      {/* // Com ação secundária */}
      <ErrorContent
        conteudo="produto"
        backUrl="/admin/produtos"
        secondaryAction={{
          label: "Criar novo produto",
          onClick: () => router.push("/admin/produtos/novo"),
        }}
      />
      {/* // Variante de erro geral */}
      <GeneralErrorContent onRetry={() => window.location.reload()} />
      {/* // Variante 404 */}
      <NotFoundContent conteudo="página" backUrl="/dashboard" />
      {/* // Variante de acesso negado */}
      <ForbiddenContent conteudo="recurso" />
      {/* // Diferentes variantes */}
      <ErrorContent conteudo="documento" variant="warning" />
      <ErrorContent conteudo="arquivo" variant="error" />
      <ErrorContent conteudo="sessão" variant="forbidden" />
    </div>
  );
}
