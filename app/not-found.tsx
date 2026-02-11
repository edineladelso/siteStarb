import { BtnHome } from "@/components/layout/customComonents";
import Image from "next/image";

export default function NotFound() {
  return (
    <main className="font m-auto mb-0 flex min-h-screen max-w-5xl flex-col items-center justify-center gap-16 text-base max-sm:text-sm md:text-2xl">
      <div className="flex flex-row items-center justify-center space-x-2 font-sans font-bold md:gap-3">
        <p>Ops!</p>
        <p className="font-heading text-blue-700 md:py-3">Erro 404</p>
        <p className="border-r-2 border-l-2 border-[#4e433ad3] px-3 py-2 sm:px-10 md:py-3">
          Nada encontrado!
        </p>
        <BtnHome />
      </div>
      <div>
        <Image
          src="/img/astronaut404.png"
          alt="Not Found"
          width={350}
          height={350}
        />
      </div>
      <p className="text-sm font-light text-gray-600 md:text-2xl">
        Nao foi possivel encontrar a pagina solicitada
      </p>
    </main>
  );
}
