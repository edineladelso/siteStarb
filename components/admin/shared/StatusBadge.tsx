// ==================== STATUS BADGE ====================

import { Badge } from "@/components/ui/badge";

export function StatusBadge({
  status,
  size = "default",
}: {
  status: "ativo" | "rascunho" | "arquivado" | "pendente" | "publicado";
  size?: "default" | "sm" | "lg";
}) {
  const statusConfig = {
    ativo: {
      label: "Ativo",
      className: "bg-green-100 text-green-800 hover:bg-green-200",
      icon: (
        <svg className="mr-1 h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    rascunho: {
      label: "Rascunho",
      className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
      icon: (
        <svg className="mr-1 h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
        </svg>
      ),
    },
    arquivado: {
      label: "Arquivado",
      className: "bg-slate-100 text-slate-800 hover:bg-slate-200",
      icon: (
        <svg className="mr-1 h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
          <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
          <path
            fillRule="evenodd"
            d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    pendente: {
      label: "Pendente",
      className: "bg-orange-100 text-orange-800 hover:bg-orange-200",
      icon: (
        <svg className="mr-1 h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    publicado: {
      label: "Publicado",
      className: "bg-blue-100 text-blue-800 hover:bg-blue-200",
      icon: (
        <svg className="mr-1 h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  };

  const config = statusConfig[status];
  const sizeClasses =
    size === "sm"
      ? "text-xs px-2 py-0.5"
      : size === "lg"
        ? "text-sm px-3 py-1.5"
        : "text-xs px-2.5 py-1";

  return (
    <Badge
      className={`${config.className} ${sizeClasses} inline-flex items-center font-semibold`}
    >
      {config.icon}
      {config.label}
    </Badge>
  );
}
