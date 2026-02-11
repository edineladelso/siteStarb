"use client";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Search } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { Button } from "../../../components/ui/button";

export default function Pesquisa({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setOpen(true)}
        size="sm"
        className={`text-muted-foreground hover:text-foreground flex items-center justify-between gap-2 border-none bg-white shadow shadow-gray-400/55 transition-colors ${
          compact ? "w-10 justify-center px-2 sm:w-10" : "sm:w-64"
        }`}
        aria-label="Abrir pesquisa"
      >
        <div className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          {!compact && (
            <span className="hidden text-sm font-medium lg:inline-flex">
              Pesquisar...
            </span>
          )}
        </div>
        {!compact && (
          <kbd className="pointer-events-none hidden h-5 items-center gap-1 rounded bg-gray-700 px-2 font-mono text-[10px] font-medium text-white lg:inline-flex">
            <span className="text-xs">Ctrl+K</span>
          </kbd>
        )}
      </Button>
      <CommandDialog
        className="top-2 mt-10 translate-y-1 transform"
        open={open}
        onOpenChange={setOpen}
      >
        <CommandInput placeholder="Comando ou pesquisa..." />
        <CommandList>
          <CommandEmpty>Sem resultado encontrado.</CommandEmpty>
          <CommandGroup heading="Sugestões">
            <CommandItem>
              <Link href="/biblioteca/livros">Livros</Link>
            </CommandItem>
            <CommandItem>
              <Link href="/biblioteca/artigos">Artigos</Link>
            </CommandItem>
            <CommandItem>
              <Link href="/academia/softwares">Softwares</Link>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Definições">
            <CommandItem>
              Perfil
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              Notificações
              <CommandShortcut>⌘N</CommandShortcut>
            </CommandItem>
            <CommandItem>
              Definições
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
