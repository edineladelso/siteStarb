// ==================== LOADING SKELETON ====================
export function LoadingSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="flex items-center gap-4 rounded-lg bg-slate-100 p-4">
            <div className="h-12 w-12 rounded-lg bg-slate-200"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/4 rounded bg-slate-200"></div>
              <div className="h-3 w-1/2 rounded bg-slate-200"></div>
            </div>
            <div className="h-6 w-20 rounded bg-slate-200"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
