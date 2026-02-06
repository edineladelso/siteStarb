import { StatsData } from "@/lib/localDadosHome/stats";

export default function Stats() {
  return (
    <div className="grid grid-cols-3 gap-4 pt-4">
      {StatsData.map((Stat, index) => (
        <div
          key={index}
          className="rounded-xl border border-blue-100 bg-white/60 p-4 text-center shadow-sm backdrop-blur-sm"
        >
          <div className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-2xl font-bold text-transparent sm:text-3xl">
            {Stat.stat}
          </div>
          <div className="mt-1 text-xs text-slate-600 sm:text-sm">
            {Stat.categoria}
          </div>
        </div>
      ))}
    </div>
  );
}
