import { BadgesFeaturesArray } from "@/lib/localDadosHome/BadgesFeaturesHome";

export default function BadgesFeatures() {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {BadgesFeaturesArray.map((Badge, index) => (
        <div
          key={index}
          className="flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm"
        >
          {/* Aqui ficarão os icones  */}
          {Badge.icon}
          <span className="text-sm font-semibold text-slate-700">
            {/* Aqui ficará o conteudo do span */}
            {Badge.conteudo}
          </span>
        </div>
      ))}
    </div>
  );
}
