import Image from "next/image";
import Pesquisa from "@/components/layout/pesquisa";
import { NavigationMenuDemo } from "@/components/layout/navbarMenu";
import Link from "next/link";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Header() {
  return (
    <div className="flex py-2 px-3 sm:px-4 md:px-5 gap-3 sm:gap-3 md:gap-3 items-center w-full z-50 sticky top-0 bg-white/99 border-b">
      <SidebarTrigger />
      <header className="flex w-full items-center justify-between rounded-lg px-3 sm:px-4 md:px-5">
        <Link href={"/"} className="mr-2 sm:mr-3 md:mr-4 flex-shrink-0">
          <Image
            src="/img/starbPerfection.webp"
            alt="Logo da Star B"
            width={130}
            height={80}
            className="w-24 sm:w-28 md:w-32 h-auto"
          />
        </Link>
        <nav className="flex flex-row justify-end gap-3 sm:gap-4 md:gap-3 items-center w-full">
          <Pesquisa />
          <NavigationMenuDemo />
        </nav>
      </header>
    </div>
  );
}
