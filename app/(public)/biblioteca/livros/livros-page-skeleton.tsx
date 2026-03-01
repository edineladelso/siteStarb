"use client";

import { Skeleton } from "@/components/ui/skeleton";

function LivroCardSkeleton({ compact = false }: { compact?: boolean }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-100 bg-white/20 shadow-sm">
      <Skeleton className={compact ? "h-45 w-full sm:h-50" : "h-50 w-full sm:h-56"} />
      <div className="space-y-3 px-4 py-4">
        <Skeleton className="h-4 w-24 rounded-full" />
        <Skeleton className="h-5 w-11/12" />
        <Skeleton className="h-4 w-8/12" />
        {!compact && (
          <>
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-10/12" />
          </>
        )}
      </div>
      <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3 shadow">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-4 w-12" />
      </div>
      <div className="border-t border-slate-100 bg-slate-50/70 px-4 py-3">
        <Skeleton className="h-8 w-full rounded-xl" />
      </div>
    </article>
  );
}

export default function LivrosPageSkeleton() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-linear-to-br from-slate-50 via-zinc-300/30 to-indigo-50/30">
      <section className="relative overflow-hidden border-b border-blue-100 bg-linear-to-br from-blue-600/10 via-indigo-600/5 to-purple-600/10 py-12 sm:py-16 lg:py-24">
        <div className="container relative z-10 mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-170 space-y-6 text-center sm:space-y-8">
            <Skeleton className="mx-auto h-9 w-44 rounded-full" />
            <div className="space-y-3 sm:space-y-4">
              <Skeleton className="mx-auto h-12 w-11/12 max-w-2xl sm:h-14" />
              <Skeleton className="mx-auto h-6 w-10/12 max-w-xl" />
            </div>

            <div className="mx-auto max-w-2xl">
              <Skeleton className="h-14 w-full rounded-2xl" />
            </div>

            <div className="flex flex-wrap justify-center gap-4 pt-4 sm:gap-6">
              <Skeleton className="h-12 w-36 rounded-xl" />
              <Skeleton className="h-12 w-40 rounded-xl" />
              <Skeleton className="h-12 w-48 rounded-xl" />
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto max-w-6xl space-y-10 px-4 py-8 sm:space-y-12 sm:px-6 sm:py-12 lg:w-5xl lg:space-y-16 lg:px-10 lg:py-16">
        <section className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Skeleton className="h-9 w-56" />
            <Skeleton className="h-8 w-24" />
          </div>
          <div className="grid max-h-60 grid-cols-2 gap-3 overflow-y-scroll p-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-6">
            {Array.from({ length: 12 }).map((_, idx) => (
              <div
                key={`categoria-skeleton-${idx}`}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <Skeleton className="mx-auto mb-3 h-8 w-8 rounded-full sm:h-10 sm:w-10" />
                <Skeleton className="mx-auto h-4 w-20" />
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-lg sm:p-5">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-4 w-28" />
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-24" />
          </div>
          <Skeleton className="h-4 w-24" />
        </section>

        <section className="space-y-3">
          <Skeleton className="h-9 w-52" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, idx) => (
              <LivroCardSkeleton key={`popular-skeleton-${idx}`} />
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <Skeleton className="h-9 w-44" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, idx) => (
              <LivroCardSkeleton key={`novo-skeleton-${idx}`} />
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <Skeleton className="h-9 w-56" />
          <div className="grid grid-cols-1 gap-1 min-[380px]:grid-cols-2 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-6 2xl:grid-cols-5">
            {Array.from({ length: 10 }).map((_, idx) => (
              <div key={`resultado-skeleton-${idx}`}>
                <LivroCardSkeleton compact />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
