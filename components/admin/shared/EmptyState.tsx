// ==================== EMPTY STATE ====================

import { Button } from "@/components/ui/button";

export function EmptyState({
  icon,
  title,
  description,
  action,
  actionLabel,
}: {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: () => void;
  actionLabel?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-16">
      <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
        {icon || (
          <svg
            className="h-10 w-10 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
        )}
      </div>
      <h3 className="mb-2 text-xl font-semibold text-slate-900">{title}</h3>
      {description && (
        <p className="mb-6 max-w-md text-center text-slate-600">
          {description}
        </p>
      )}
      {action && actionLabel && (
        <Button
          onClick={action}
          className="bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
