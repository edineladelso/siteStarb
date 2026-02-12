"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import logo from "@/public/img/logo.webp";
import Image from "next/image";
import Link from "next/link";
import { NavbarDesktop } from "./navbarDesktop";
import { NavbarMobile } from "./navbarMobile";
import Pesquisa from "./pesquisa";

export function NavigationMenuDemo({ isMobile }: { isMobile?: boolean }) {
  const detectedMobile = useIsMobile();
  const mobile = isMobile ?? detectedMobile;
  return mobile ? <NavbarMobile /> : <NavbarDesktop />;
}

export function HeaderOrder() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <header className="flex w-full items-center justify-between bg-linear-to-br sm:px-4 md:px-5">
        <Link href="/" className="mr-2 shrink-0 sm:mr-3 md:mr-4">
          <Image src={logo} alt="Logo" width={120} />
        </Link>
        <nav className="flex items-center gap-2">
          <Pesquisa compact />
          <NavigationMenuDemo isMobile />
        </nav>
      </header>
    );
  }

  return (
    <header className="flex w-full items-center justify-between rounded-lg px-3 sm:px-4 md:px-5">
      <div className="flex shrink-0 items-center gap-3">
        <Link href="/" className="mr-2 shrink-0 sm:mr-3 md:mr-4">
          <Image src={logo} alt="Logo" width={140} />
        </Link>
        <NavigationMenuDemo isMobile={false} />
      </div>
      <nav>
        <Pesquisa />
      </nav>
    </header>
  );
}
