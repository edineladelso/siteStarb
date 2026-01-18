"use client";

import { cn } from "@/lib";
import { Home } from "lucide-react";
import { buttonVariants } from "../ui/button";

export function BtnHome() {
  return (
    <a
      href="/"
      className={cn(
        buttonVariants({ variant: "outline" }),
        "border-gray-600 border p-3 text-xs max-sm:text-base md:py-5 md:text-lg",
      )}
    >
      <span className="hidden sm:block sm:px-7 font-bold">Voltar à Home</span>{" "}
      <Home className="sm:hidden" />
    </a>
  );
}
