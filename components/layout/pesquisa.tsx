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
import * as React from "react";
import { Button } from "../ui/button";

export default function Pesquisa() {
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
        variant={"outline"}
        onClick={() => setOpen(true)}
        size={"sm"}
        className="bg-white border-none text-muted-foreground hover:text-foreground flex items-center justify-between gap-2 shadow shadow-gray-400/55 transition-colors sm:w-70"
      >
        <div className="flex items-center gap-2">
          <Search className="h-6 w-6" />
          <span className="hidden text-sm font-medium lg:inline-flex">
            Pesquisar...
          </span>
        </div>
        <kbd className="pointer-events-none hidden h-5 items-center gap-1 rounded bg-gray-700 p-2 font-mono text-[10px] font-medium text-white opacity-100 select-none lg:inline-flex">
          <span className="text-xs">Ctrl+K</span>
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Comando ou pesquisa..." />
        <CommandList>
          <CommandEmpty>Sem resultado encontrado.</CommandEmpty>
          <CommandGroup heading="Sugestões">
            <CommandItem>Matematica</CommandItem>
            <CommandItem>Engenharia</CommandItem>
            <CommandItem>Software</CommandItem>
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
