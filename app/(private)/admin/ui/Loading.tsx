// components/ui/loading-content.tsx
"use client";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface LoadingContentProps {
  /**
   * Conteúdo que está sendo carregado (ex: "usuário", "produtos", "dashboard")
   */
  conteudo: string;
  /**
   * Tamanho do spinner
   * @default "default"
   */
  size?: "sm" | "default" | "lg";
  /**
   * Classes CSS adicionais
   */
  className?: string;
  /**
   * Altura mínima do container
   * @default "50vh"
   */
  minHeight?: string;
}

export function LoadingContent({
  conteudo,
  size = "default",
  className,
  minHeight = "50vh",
}: LoadingContentProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    default: "h-16 w-16",
    lg: "h-24 w-24",
  };

  const textSizeClasses = {
    sm: "text-xs",
    default: "text-sm",
    lg: "text-base",
  };

  return (
    <div
      className={cn(
        "flex items-center justify-center",
        className
      )}
      style={{ minHeight }}
      role="status"
      aria-live="polite"
      aria-label={`Carregando dados do ${conteudo}`}
    >
      <div className="text-center space-y-4">
        {/* Container do spinner com shadow */}
        <div className="relative inline-flex items-center justify-center">
          {/* Background blur effect */}
          <div
            className={cn(
              "absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500/20 to-purple-500/20 blur-xl",
              sizeClasses[size]
            )}
            aria-hidden="true"
          />
          
          {/* Spinner principal */}
          <div
            className={cn(
              "relative rounded-full border-4 border-slate-200/50 dark:border-slate-800/50",
              "shadow-lg shadow-blue-500/20 dark:shadow-blue-500/30",
              sizeClasses[size]
            )}
            aria-hidden="true"
          >
            <div
              className={cn(
                "absolute inset-0 rounded-full border-4 border-transparent border-t-blue-600 dark:border-t-blue-400",
                "animate-spin"
              )}
            />
          </div>

          {/* Alternativa com ícone Lucide (comentado, pode descomentar se preferir) */}
          {/* <Loader2 
            className={cn(
              "animate-spin text-blue-600 dark:text-blue-400",
              sizeClasses[size]
            )}
            aria-hidden="true"
          /> */}
        </div>

        {/* Texto */}
        <div className="space-y-2">
          <p
            className={cn(
              "font-medium text-slate-700 dark:text-slate-300",
              "animate-pulse",
              textSizeClasses[size]
            )}
          >
            Carregando dados {conteudo && `do ${conteudo}`}...
          </p>
          
          {/* Dots animados para feedback visual adicional */}
          <div
            className="flex items-center justify-center gap-1.5"
            aria-hidden="true"
          >
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={cn(
                  "rounded-full bg-blue-600/60 dark:bg-blue-400/60",
                  size === "sm" ? "h-1.5 w-1.5" : "h-2 w-2",
                  "animate-bounce shadow-sm shadow-blue-500/50"
                )}
                style={{
                  animationDelay: `${i * 0.15}s`,
                  animationDuration: "1s",
                }}
              />
            ))}
          </div>
        </div>

        {/* Screen reader only text */}
        <span className="sr-only">
          Por favor aguarde, carregando dados do {conteudo}
        </span>
      </div>
    </div>
  );
}

// Variante alternativa mais minimalista
export function LoadingContentMinimal({
  conteudo,
  className,
}: {
  conteudo: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex min-h-[50vh] items-center justify-center",
        className
      )}
      role="status"
      aria-live="polite"
      aria-label={`Carregando ${conteudo}`}
    >
      <div className="flex flex-col items-center gap-3">
        <Loader2
          className="h-12 w-12 animate-spin text-blue-600 dark:text-blue-400 drop-shadow-lg"
          aria-hidden="true"
        />
        <p className="text-sm font-medium text-slate-600 dark:text-slate-400 animate-pulse">
          Carregando {conteudo}...
        </p>
        <span className="sr-only">Por favor aguarde</span>
      </div>
    </div>
  );
}

// Exemplo de uso
// Exemplo de uso:

export function Exemplo (){
  return (<div>
    {/* // Uso básico */}
    <LoadingContent conteudo="usuário" />
    
    {/* // Com tamanho customizado */}
    <LoadingContent conteudo="produtos" size="lg" />
    
    {/* // Com altura mínima diferente */}
    <LoadingContent conteudo="dashboard" minHeight="100vh" />
    
    {/* // Variante minimalista */}
    <LoadingContentMinimal conteudo="relatório" />
    
    {/* // Com classes adicionais */}
    <LoadingContent
    conteudo="pedidos"
    className="bg-slate-50 dark:bg-slate-900 rounded-lg"
    />
  </div>)}