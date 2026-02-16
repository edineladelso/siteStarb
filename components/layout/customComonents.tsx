"use client";

import { cn } from "@/lib";
import { Home } from "lucide-react";
import { buttonVariants } from "../ui/button";
import Link from "next/link";

export function BtnHome() {
  return (
    <Link
      href="/"
      className={cn(
        buttonVariants({ variant: "default" }),
        "bg-linear-to-br from-[#0c0516] to-[#0f083b] p-3 px-8 text-xs font-semibold hover:via-[#5416b5]/60 max-sm:text-base md:py-5 md:text-lg text-white/70",
      )}
    >
      <span className="hidden font-bold sm:block sm:px-7">Voltar à Home</span>{" "}
      <Home className="sm:hidden text-white font-black" />
    </Link>
  );
}
