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
        buttonVariants({ variant: "outline" }),
        "border-gray-600 border p-3 text-xs max-sm:text-base md:py-5 md:text-lg",
      )}
    >
      <span className="hidden sm:block sm:px-7 font-bold">Voltar à Home</span>{" "}
      <Home className="sm:hidden" />
    </Link>
  );
}
