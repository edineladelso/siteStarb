import * as React from "react";
import Link from "next/link";
import { CircleCheckIcon, CircleIcon } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  booksCategories,
  softwareCategories,
  homeMenuItems,
  quickMenuItems,
  documentationLinks,
  themeOptions,
} from "@/lib/data";

export function NavbarDesktop() {
  return (
    <NavigationMenu>
      <NavigationMenuList className="flex-wrap gap-1 sm:gap-2">
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-xs sm:text-sm md:text-sm">Home</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 md:w-100 lg:w-125 lg:grid-cols-[.75fr_1fr] p-2 md:p-4">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-3 md:p-4 lg:p-6 no-underline outline-hidden transition-all duration-200 select-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mb-2 text-sm md:text-lg font-medium sm:mt-4">
                      Biblioteca Star B
                    </div>
                    <p className="text-muted-foreground text-xs md:text-sm leading-tight">
                      A biblioteca definitiva para estudantes e profissionais de
                      engenharia e tecnologia.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              {homeMenuItems.map((item) => (
                <ListItem key={item.href} href={item.href} title={item.title} className="text-xs md:text-sm">
                  {item.title === "Informações" && "Saiba mais sobre a nossa missao e valores."}
                  {item.title === "Tipos de Manuais" && "Explore os diversos tipos de manuais disponiveis."}
                  {item.title === "Contato" && "Entre em contato conosco para suporte ou perguntas."}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-xs sm:text-sm md:text-sm">Livros</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 sm:w-87.5 md:w-125 md:grid-cols-2 lg:w-150 p-2 md:p-4">
              {booksCategories.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                  className="text-xs md:text-sm"
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-xs sm:text-sm md:text-sm">Softwares</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 sm:w-87.5 md:w-125 md:grid-cols-2 lg:w-150 p-2 md:p-4">
              {softwareCategories.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                  className="text-xs md:text-sm"
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuTrigger className="text-xs sm:text-sm md:text-sm">Docs</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-70 md:w-75 gap-3 md:gap-4 p-2 md:p-4">
              <li>
                {documentationLinks.map((doc) => (
                  <React.Fragment key={doc.title}>
                    <NavigationMenuLink asChild>
                      <Link href={doc.href}>
                        <div className="font-medium text-xs md:text-sm">{doc.title}</div>
                        <div className="text-muted-foreground text-xs">
                          {doc.description}
                        </div>
                      </Link>
                    </NavigationMenuLink>
                  </React.Fragment>
                ))}
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuTrigger className="text-xs sm:text-sm md:text-sm">Menu</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-45 md:w-50 gap-3 md:gap-4 p-2 md:p-4">
              <li>
                {quickMenuItems.map((item) => (
                  <NavigationMenuLink asChild key={item.href}>
                    <Link href={item.href} className="text-xs md:text-sm">
                      {item.title}
                    </Link>
                  </NavigationMenuLink>
                ))}
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuTrigger className="text-xs sm:text-sm md:text-sm">Tema</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-45 md:w-50 gap-3 md:gap-4 p-2 md:p-4">
              <li>
                {themeOptions.map((option) => (
                  <NavigationMenuLink asChild key={option.name}>
                    <Link href="#" className="flex-row items-center gap-2 text-xs md:text-sm">
                      {option.icon === "circle" && <CircleIcon className="w-4 h-4" />}
                      {option.icon === "circle-check" && <CircleCheckIcon className="w-4 h-4" />}
                      {option.name}
                    </Link>
                  </NavigationMenuLink>
                ))}
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-xs md:text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-xs md:text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
