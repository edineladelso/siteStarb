import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"

export default function NotFound(){


  return (
    <main className="flex flex-col min-h-screen max-w-5xl m-auto items-center 
     gap-8 text-2xl mt-10 mb-0 ">
      <div className="flex flex-row items-center justify-center gap-3 font-sans font-bold">
        <p>Ops!</p>
        <p  className="border-r-2 border-r-[#4e433ad3] py-3 px-4 font-heading text-blue-700" >Erro 404</p>
        <p  className="border-r-2 border-r-[#4e433ad3] py-3 px-4" >Nada encontrado!</p>
        <a href="/" className={cn( buttonVariants({ variant: "default"}), "text-lg py-6 px-5",)}>Voltar à Home</a>
      </div>
      <div>
        <Image 
        src='/img/astronaut404.png' 
        alt="Not Found"
        width={350}
        height={350} />
      </div>
      <p className="text-2xl font-light text-gray-600">Nao foi possivel encontrar a pagina solicitada</p>
    </main>
  )
}