import Image from "next/image";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import Pesquisa from "@/components/layout/pesquisa";
import { NavigationMenuDemo } from "@/components/layout/navbarMenu";
import Link from "next/link";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Header() {
  return (
    <div className="flex py-3 px3 gap-5 items-center w-full z-50 sticky top-0 bg-white/99 border-b">
      <SidebarTrigger />
      <header className="flex w-full items-center justify-between rounded-lg px-5">
        <Link href={"/"} className="mr-4">
          <Image
            src="/img/starbPerfection.webp"
            alt="Logo da Star B"
            width={130}
            height={80}
          />
        </Link>
        <nav className="flex flex-row justify-end gap-10">
          <div>
            <Pesquisa />
          </div>
          <NavigationMenuDemo />
        </nav>
      </header>
    </div>
  );
}
