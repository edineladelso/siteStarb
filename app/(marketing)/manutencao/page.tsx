import { Construction } from "lucide-react";
import Image from "next/image";
import edinelRobot from "@/public/image/edinelrobot.png";

export default function ManutencaoPage() {
  return (
    <div className="flex h-screen text-foreground font-body text-gray-600 flex-col items-center gap-12">
      <h1 className="flex w-full items-center justify-center gap-3 text-4xl">
        <span>Website em</span>
        <span className="text- font-bold text-blue-700">manutencao</span>
        <Construction />
      </h1>

      <Image src={edinelRobot} alt="Estamos em manutencao" height={400} />

      <p className="text-xl">
        Estamos realizando manutenção no momento. Por favor, volte mais tarde!
      </p>
    </div>
  );
}
