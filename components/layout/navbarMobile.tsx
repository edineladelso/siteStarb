import React from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  booksCategories,
  softwareCategories,
  homeMenuItems,
  quickMenuItems,
  documentationLinks,
  themeOptions,
} from "@/lib/data";

export function NavbarMobile() {
  const [openHome, setOpenHome] = React.useState(false);
  const [openBooks, setOpenBooks] = React.useState(false);
  const [openSoftware, setOpenSoftware] = React.useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 w-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="20" y2="18" />
          </svg>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72 max-h-96 overflow-y-auto">
        {/* Home Menu */}
        <Collapsible open={openHome} onOpenChange={setOpenHome}>
          <CollapsibleTrigger asChild>
            <div className="flex items-center justify-between px-2 py-2 hover:bg-accent cursor-pointer rounded-sm">
              <span className="text-sm font-medium">Home</span>
              <ChevronDown className="h-4 w-4 transition-transform" />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1 px-2">
            {homeMenuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col gap-1 rounded-sm px-2 py-2 text-sm hover:bg-accent"
              >
                <div className="font-medium text-xs">{item.title}</div>
                <div className="text-muted-foreground text-xs">
                  {item.title === "Informações" && "Saiba mais sobre a nossa missao e valores."}
                  {item.title === "Tipos de Manuais" && "Explore os diversos tipos de manuais disponiveis."}
                  {item.title === "Contato" && "Entre em contato conosco para suporte ou perguntas."}
                </div>
              </Link>
            ))}
          </CollapsibleContent>
        </Collapsible>

        <DropdownMenuSeparator />

        {/* Books Menu */}
        <Collapsible open={openBooks} onOpenChange={setOpenBooks}>
          <CollapsibleTrigger asChild>
            <div className="flex items-center justify-between px-2 py-2 hover:bg-accent cursor-pointer rounded-sm">
              <span className="text-sm font-medium">Livros</span>
              <ChevronDown className="h-4 w-4 transition-transform" />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1 px-2">
            {booksCategories.map((book) => (
              <Link
                key={book.href}
                href={book.href}
                className="flex flex-col gap-1 rounded-sm px-2 py-2 text-sm hover:bg-accent"
              >
                <div className="font-medium text-xs">{book.title}</div>
                <div className="text-muted-foreground text-xs">{book.description}</div>
              </Link>
            ))}
          </CollapsibleContent>
        </Collapsible>

        <DropdownMenuSeparator />

        {/* Software Menu */}
        <Collapsible open={openSoftware} onOpenChange={setOpenSoftware}>
          <CollapsibleTrigger asChild>
            <div className="flex items-center justify-between px-2 py-2 hover:bg-accent cursor-pointer rounded-sm">
              <span className="text-sm font-medium">Softwares</span>
              <ChevronDown className="h-4 w-4 transition-transform" />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1 px-2">
            {softwareCategories.map((software) => (
              <Link
                key={software.href}
                href={software.href}
                className="flex flex-col gap-1 rounded-sm px-2 py-2 text-sm hover:bg-accent"
              >
                <div className="font-medium text-xs">{software.title}</div>
                <div className="text-muted-foreground text-xs">{software.description}</div>
              </Link>
            ))}
          </CollapsibleContent>
        </Collapsible>

        <DropdownMenuSeparator />

        {/* Documentation Links */}
        <DropdownMenuLabel className="px-2 py-1.5 text-xs font-medium">Documentação</DropdownMenuLabel>
        {documentationLinks.map((doc) => (
          <DropdownMenuItem key={doc.href} asChild>
            <Link href={doc.href} className="flex flex-col gap-1">
              <div className="text-xs font-medium">{doc.title}</div>
              <div className="text-muted-foreground text-xs">{doc.description}</div>
            </Link>
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />

        {/* Quick Menu */}
        <DropdownMenuLabel className="px-2 py-1.5 text-xs font-medium">Menu Rápido</DropdownMenuLabel>
        {quickMenuItems.map((item) => (
          <DropdownMenuItem key={item.href} asChild>
            <Link href={item.href} className="text-xs">
              {item.title}
            </Link>
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />

        {/* Theme Options */}
        <DropdownMenuLabel className="px-2 py-1.5 text-xs font-medium">Tema</DropdownMenuLabel>
        {themeOptions.map((option) => (
          <DropdownMenuItem key={option.name} asChild>
            <Link href="#" className="flex items-center gap-2 text-xs">
              <span className="w-4 h-4 rounded-full border border-current" />
              {option.name}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
