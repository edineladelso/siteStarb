import logo from "@/public/img/logo.webp";
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
  conteudoBiblioteca,
  documentationLinks,
  homeMenuItems,
  quickMenuItems,
} from "@/lib/localDadosHome/data";
import Image from "next/image";

export function NavbarDesktop() {
  const styleMenuTriger: string =
    "bg-transparent hover:border-b-1 hover:shadow-xs text-xs sm:text-sm";

  return (
    <NavigationMenu>
      <NavigationMenuList className="flex gap-2">
        <NavigationMenuItem>
          <NavigationMenuTrigger className={styleMenuTriger}>
            <span>Home</span>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 p-2 md:w-120 md:grid-cols-[.85fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full flex-col rounded-md p-1 no-underline outline-hidden transition-all duration-200 select-none focus:shadow-md"
                    href="/"
                  >
                    <Image src={logo} alt="Logo" className="w-[80%]" />
                    <div className="mb-2 text-sm font-medium sm:mt-4 md:text-lg">
                      Site Star B
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
                  {item.title === "Sobre nós" &&
                    "Saiba mais sobre a nossa missao e valores."}
                  {item.title === "Contato" &&
                    "Entre em contato conosco para suporte ou perguntas."}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className={styleMenuTriger}>
            Biblioteca
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="gap-2 p-2 sm:w-75">
              {conteudoBiblioteca.map((component) => (
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
          <NavigationMenuTrigger className={styleMenuTriger}>
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
          <NavigationMenuTrigger className={styleMenuTriger}>
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
