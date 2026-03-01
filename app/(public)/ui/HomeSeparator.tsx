import { Star } from "lucide-react";

export default function HomeSeparator() {
  return (
    <div className="relative py-8">
      <div className="absolute inset-0 flex items-center">
        <div className="border-gradient-to-r w-full border-t from-transparent via-blue-200 to-transparent"></div>
      </div>
      <div className="relative flex justify-center">
        <span className="bg-linear-to-br from-zinc-50 via-blue-50 to-indigo-50 text-sm text-slate-500">
          <Star size={10}/>
        </span>
      </div>
    </div>
  );
}
