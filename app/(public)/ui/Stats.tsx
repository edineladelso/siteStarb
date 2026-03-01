import { StatsData } from "@/lib/localDadosHome/stats";

export default function Stats() {
  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4">
      {StatsData.map((Stat, index) => (
        <div
          key={index}
          className="rounded-xl  bg-white/60 p-2 sm:p-3 text-center shadow shadow-zinc-300 backdrop-blur-sm flex gap-2 items-center justify-evenly"
        >
          <div className="[&_svg]:size-6 inset-1 shadow-2xl shadow-zinc-300 rounded-xl sm:p-2 text-slate-900">
            {Stat.icon}
          </div>
          <div>
            <div className="text-xl font-bold sm:text-2xl ">
              {Stat.stat}
            </div>
            <div className="mt-1 text-xs text-slate-600 sm:text-sm">
              {Stat.categoria}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
