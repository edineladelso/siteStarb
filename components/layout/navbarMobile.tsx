import { ChevronDown } from "lucide-react";
import Link from "next/link";
import React from "react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  booksCategories,
  documentationLinks,
  homeMenuItems,
  quickMenuItems,
  softwareCategories,
  themeOptions,
} from "@/lib/data";

export function NavbarMobile() {
  const [openHome, setOpenHome] = React.useState(false);
  const [openBooks, setOpenBooks] = React.useState(false);
  const [openSoftware, setOpenSoftware] = React.useState(false);
  const [openDocs, setOpenDocs] = React.useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="ring-offset-background hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring inline-flex h-10 w-10 items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50">
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
      <DropdownMenuContent
        align="end"
        className="max-h-96 w-72 overflow-y-auto p-3"
      >
        {/* Home Menu */}
        <Collapsible open={openHome} onOpenChange={setOpenHome}>
          <CollapsibleTrigger asChild>
            <div className="hover:bg-accent flex cursor-pointer items-center justify-between rounded-sm px-2 py-2">
              <span className="text-sm font-medium">Home</span>
              <ChevronDown className="h-4 w-4 transition-transform" />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1 rounded p-2 shadow">
            {homeMenuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:bg-accent flex flex-col gap-1 rounded-sm px-2 py-2 text-sm"
              >
                <div className="text-xs font-medium">{item.title}</div>
                <div className="text-muted-foreground text-xs">
                  {item.title === "Sobre nós" &&
                    "Saiba mais sobre a nossa missao e valores."}
                  {item.title === "Tipos de Manuais" &&
                    "Explore os diversos tipos de manuais disponiveis."}
                  {item.title === "Contato" &&
                    "Entre em contato conosco para suporte ou perguntas."}
                </div>
              </Link>
            ))}
          </CollapsibleContent>
        </Collapsible>

        {/* Books Menu */}
        <Collapsible open={openBooks} onOpenChange={setOpenBooks}>
          <CollapsibleTrigger asChild>
            <div className="hover:bg-accent flex cursor-pointer items-center justify-between rounded-sm px-2 py-2">
              <span className="text-sm font-medium">Livros</span>
              <ChevronDown className="h-4 w-4 transition-transform" />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1 rounded p-2 shadow">
            {booksCategories.map((book) => (
              <Link
                key={book.href}
                href={book.href}
                className="hover:bg-accent flex flex-col gap-1 rounded-sm px-2 py-2 text-sm"
              >
                <div className="text-xs font-medium">{book.title}</div>
                <div className="text-muted-foreground text-xs">
                  {book.description}
                </div>
              </Link>
            ))}
          </CollapsibleContent>
        </Collapsible>

        {/* Software Menu */}
        <Collapsible open={openSoftware} onOpenChange={setOpenSoftware}>
          <CollapsibleTrigger asChild>
            <div className="hover:bg-accent flex cursor-pointer items-center justify-between rounded-sm px-2 py-2">
              <span className="text-sm font-medium">Softwares</span>
              <ChevronDown className="h-4 w-4 transition-transform" />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1 rounded p-2 shadow">
            {softwareCategories.map((software) => (
              <Link
                key={software.href}
                href={software.href}
                className="hover:bg-accent flex flex-col gap-1 rounded-sm px-2 py-2 text-sm"
              >
                <div className="text-xs font-medium">{software.title}</div>
                <div className="text-muted-foreground text-xs">
                  {software.description}
                </div>
              </Link>
            ))}
          </CollapsibleContent>
        </Collapsible>

        {/* Documentation Links */}
        <Collapsible open={openDocs} onOpenChange={setOpenDocs}>
          <CollapsibleTrigger asChild>
            <div className="hover:bg-accent flex cursor-pointer items-center justify-between rounded-sm px-2 py-2">
              <span className="text-sm font-medium">Documetação</span>
              <ChevronDown className="h-4 w-4 transition-transform" />
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1 rounded p-2 shadow">
            {documentationLinks.map((doc) => (
              <Link
                href={doc.href}
                key={doc.href}
                className="hover:bg-accent flex flex-col gap-1 rounded-sm px-2 py-2 text-sm"
              >
                <div className="text-xs font-medium">{doc.title}</div>
                <div className="text-muted-foreground text-xs">
                  {doc.description}
                </div>
              </Link>
            ))}
          </CollapsibleContent>
        </Collapsible>
        <DropdownMenuSeparator />

        {/* Quick Menu */}
        <DropdownMenuLabel className="px-2 py-1.5 text-xs font-semibold">
          Menu Rápido
        </DropdownMenuLabel>
        <div className="grid grid-cols-2 rounded border px-3 py-1">
          {quickMenuItems.map((item) => (
            <DropdownMenuItem key={item.href} asChild>
              <Link href={item.href} className="text-xs">
                {item.title}
              </Link>
            </DropdownMenuItem>
          ))}
        </div>

        {/* Theme Options */}
        <DropdownMenuLabel className="mt-2 px-2 py-1.5 text-xs font-semibold">
          Tema
        </DropdownMenuLabel>
        <div className="flex px-4">
          {themeOptions.map((option) => (
            <DropdownMenuItem key={option.name} asChild>
              <Link href="#" className="flex items-center gap-2 text-xs">
                <span className="h-4 w-4 rounded-full border border-current" />
                {option.name}
              </Link>
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
