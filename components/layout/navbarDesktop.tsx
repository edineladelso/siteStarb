import logo from "@/public/img/logo.webp";
import { CircleCheckIcon, CircleIcon } from "lucide-react";
import Link from "next/link";
import * as React from "react";

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
  documentationLinks,
  homeMenuItems,
  quickMenuItems,
  softwareCategories,
  themeOptions,
} from "@/lib/data";
import Image from "next/image";

export function NavbarDesktop() {
  return (
    <NavigationMenu>
      <NavigationMenuList className="flex gap-0">
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-xs sm:text-sm md:text-sm">
            Home
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 p-2 md:w-100 md:p-3 lg:w-125 lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="from-muted/50 to-muted flex h-full w-full flex-col rounded-md bg-linear-to-b p-3 no-underline outline-hidden transition-all duration-200 select-none focus:shadow-md md:p-4 lg:p-6"
                    href="/"
                  >
                    <Image src={logo} alt="Logo" />
                    <div className="mb-2 text-sm font-medium sm:mt-4 md:text-lg">
                      Biblioteca Star B
                    </div>
                    <p className="text-muted-foreground text-xs leading-tight md:text-sm">
                      A biblioteca definitiva para estudantes e profissionais de
                      engenharia e tecnologia.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              {homeMenuItems.map((item) => (
                <ListItem
                  key={item.href}
                  href={item.href}
                  title={item.title}
                  className="text-xs md:text-sm"
                >
                  {item.title === "Informações" &&
                    "Saiba mais sobre a nossa missao e valores."}
                  {item.title === "Tipos de Manuais" &&
                    "Explore os diversos tipos de manuais disponiveis."}
                  {item.title === "Contato" &&
                    "Entre em contato conosco para suporte ou perguntas."}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-xs sm:text-sm md:text-sm">
            Livros
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 p-2 sm:w-87.5 md:w-125 md:grid-cols-2 md:p-4 lg:w-150">
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
          <NavigationMenuTrigger className="text-xs sm:text-sm md:text-sm">
            Softwares
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 p-2 sm:w-87.5 md:w-125 md:grid-cols-2 md:p-4 lg:w-150">
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
          <NavigationMenuTrigger className="text-xs sm:text-sm md:text-sm">
            Docs
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-70 gap-3 p-2 md:w-75 md:gap-4 md:p-4">
              <li>
                {documentationLinks.map((doc) => (
                  <React.Fragment key={doc.title}>
                    <NavigationMenuLink asChild>
                      <Link href={doc.href}>
                        <div className="text-xs font-medium md:text-sm">
                          {doc.title}
                        </div>
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
          <NavigationMenuTrigger className="text-xs sm:text-sm md:text-sm">
            Menu
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-45 gap-3 p-2 md:w-50 md:gap-4 md:p-2">
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
          <NavigationMenuTrigger className="text-xs sm:text-sm md:text-sm">
            Tema
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-45 gap-2 p-1 md:w-50 md:gap-4 md:p-1">
              <li>
                {themeOptions.map((option) => (
                  <NavigationMenuLink asChild key={option.name}>
                    <Link
                      href="#"
                      className="flex-row items-center gap-2 text-xs md:text-sm"
                    >
                      {option.icon === "circle" && (
                        <CircleIcon className="h-4 w-4" />
                      )}
                      {option.icon === "circle-check" && (
                        <CircleCheckIcon className="h-4 w-4" />
                      )}
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
          <div className="text-xs leading-none font-medium md:text-sm">
            {title}
          </div>
          <p className="text-muted-foreground line-clamp-2 text-xs leading-snug md:text-sm">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
