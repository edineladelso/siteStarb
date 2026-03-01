import { BadgesFeaturesArray } from "@/lib/localDadosHome/BadgesFeaturesHome";

export default function BadgesFeatures() {
  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
      {BadgesFeaturesArray.map((Badge, index) => (
        <div
          key={index}
          className="flex items-center justify-around rounded-full border border-zinc-200 bg-white/80 px-2 py-1 shadow-sm backdrop-blur-sm max-sm:gap-2 sm:gap-1"
        >
          {/* Aqui ficarão os icones  */}
          {Badge.icon}
          <span className="text-xs font-semibold text-slate-700">
            {/* Aqui ficará o conteudo do span */}
            {Badge.conteudo}
          </span>
        </div>
      ))}
    </div>
  );
}
