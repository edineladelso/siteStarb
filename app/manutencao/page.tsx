import { Construction } from "lucide-react";
import Image from "next/image";
import imgManutencao from "@/public/img/manutencao.webp";

export default function ManutencaoPage() {
  return (
    <div className="text-foreground font-body flex h-screen flex-col items-center justify-center gap-12">
      <h1 className="flex w-full items-center justify-center gap-3 text-4xl">
        <span>Website em</span>
        <span className="text- font-bold text-blue-700">manutencao</span>
        <Construction />
      </h1>

      <Image src={imgManutencao} alt="Estamos em manutencao" height={400} />

      <p className="text-xl">
        Estamos realizando manutenção no momento. Por favor, volte mais tarde!
      </p>
    </div>
  );
}
