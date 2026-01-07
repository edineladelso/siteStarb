import Image from "next/image";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";

export default function Navbar() {
  return (
    <nav className="flex max-w-full m-auto justify-between items-center px-10 py-5">
      <Image
        src="/img/logoblack.png"
        alt="Logo da Star B"
        width={100}
        height={80}
        className="m-0 p-0"
      />
      <ul className="flex flex-row justify-end gap-10">
        <a href="/" className={cn(buttonVariants({ variant: "link" }))}>
          Home
        </a>
        <a href="/sobre" className={cn(buttonVariants({ variant: "link" }))}>
          Sobre
        </a>
        <a href="/vagas" className={cn(buttonVariants({ variant: "link" }))}>
          Vagas
        </a>
        <a
          href="/vagas/cadastro"
          className={cn(buttonVariants({ variant: "link" }))}
        >
          Cadastrar Vagas
        </a>
      </ul>
    </nav>
  );
}
