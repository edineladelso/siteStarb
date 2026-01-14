"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { NavbarDesktop } from "./navbarDesktop";
import { NavbarMobile } from "./navbarMobile";

export function NavigationMenuDemo() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <NavbarMobile />;
  }

  return <NavbarDesktop />;
}
