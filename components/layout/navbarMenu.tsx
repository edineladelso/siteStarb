"use client";

import * as React from "react";
import Link from "next/link";
import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from "lucide-react";

import { useIsMobile } from "@/hooks/use-mobile";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const componentsBooks: { title: string; href: string; description: string }[] =
  [
    {
      title: "Matematica",
      href: "/livros/matematica",
      description:
        "Livros e materiais sobre diversos ramos da matemática, desde álgebra, cálculo avançado até analise matemática.",
    },
    {
      title: "Física",
      href: "/livros/fisica",
      description:
        "Livros e materiais sobre diversos ramos da física, desde mecânica clássica até física quântica.",
    },
    {
      title: "Mecanica",
      href: "/livros/mecanica",
      description:
        "Livros e materiais sobre diversos ramos da mecânica, desde estática até dinâmica.",
    },
    {
      title: "Eletrotécnica",
      href: "/livros/eletrotecnica",
      description: "Livros e materiais sobre diversos ramos da eletrotécnica.",
    },
    {
      title: "Automação e controle",
      href: "/livros/automacaoecontrole",
      description:
        "Livros e materiais sobre diversos ramos da automação e controle.",
    },
    {
      title: "Programação",
      href: "/livros/programacao",
      description: "Livros e materiais sobre diversos ramos da programação.",
    },
    {
      title: "Engenharia",
      href: "/livros/engenharia",
      description: "Livros e materiais sobre diversos ramos da engenharia.",
    },
  ];

const componentsSoftware: {
  title: string;
  href: string;
  description: string;
}[] = [
  {
    title: "IDE e Editores de Código",
    href: "/softwares/ide-e-editores-de-codigo",
    description:
      "Ambientes de desenvolvimento integrados (IDEs) e editores de código populares para programadores.",
  },
  {
    title: "Modelação e Simulação",
    href: "/softwares/modelacao-e-simulacao",
    description: "Plataformas para criação de modelos matemáticos e simulações de sistemas complexos.",
  },
  {
    title: "Simulação de Circuitos Elétricos",
    href: "/softwares/engenharia-eletrica/circuitos",
    description: "Ferramentas de análise de circuitos (SPICE), design de PCBs e prototipagem eletrônica.",
  },
  {
    title: "Dinâmica de Fluidos Computacional (CFD)",
    href: "/softwares/simulacao-de-fluidos",
    description: "Software para análise de escoamento de fluidos, transferência de calor e forças aerodinâmicas.",
  },
  {
    title: "Engenharia Mecatrônica e Robótica",
    href: "/softwares/mecatronica",
    description: "Sistemas para integração de mecânica, eletrônica e controle, incluindo simulação de robôs.",
  },
  {
    title: "Cálculo Estrutural e Civil (BIM)",
    href: "/softwares/engenharia-civil",
    description: "Modelagem de Informação da Construção (BIM) e análise de resistência de estruturas.",
  },
  {
    title: "Softwares de Apoio à Medicina",
    href: "/softwares/tecnologia-medica",
    description: "Sistemas de diagnóstico por imagem, telemedicina e gestão de dados clínicos de pacientes.",
  },
  {
    title: "Bioinformática e Engenharia Biomédica",
    href: "/softwares/bioinformatica",
    description: "Análise de sequenciamento genético e modelagem de próteses e tecidos biológicos.",
  },
  {
    title: "Manufatura Auxiliada por Computador (CAM)",
    href: "/softwares/cam",
    description: "Programação de máquinas CNC e processos de fabricação automatizados.",
  }
];


export function NavigationMenuDemo() {
  const isMobile = useIsMobile();

  return (
    <NavigationMenu viewport={isMobile}>
      <NavigationMenuList className="flex-wrap">
        <NavigationMenuItem>
          <NavigationMenuTrigger>Home</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-4 no-underline outline-hidden transition-all duration-200 select-none focus:shadow-md md:p-6"
                    href="/"
                  >
                    <div className="mb-2 text-lg font-medium sm:mt-4">
                      Biblioteca Star B
                    </div>
                    <p className="text-muted-foreground text-sm leading-tight">
                      A biblioteca definitiva para estudantes e profissionais de
                      engenharia e tecnologia.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/sobre" title="Informaçoes">
                Saiba mais sobre a nossa missao e valores.
              </ListItem>
              <ListItem href="sobre/tiposmanuais" title="Tipos de Manuais">
                Explore os diversos tipos de manuais disponiveis.
              </ListItem>
              <ListItem href="/contato" title="Contato">
                Entre em contato conosco para suporte ou perguntas.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Livros</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {componentsBooks.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Softwares</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {componentsSoftware.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuTrigger>Docs</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[300px] gap-4">
              <li>
                <NavigationMenuLink asChild>
                  <Link href="https://docs.python.org/pt-br/3/">
                    <div className="font-medium">Python</div>
                    <div className="text-muted-foreground">
                      Documentação oficial do Python em portugues do brazil.
                    </div>
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="https://learn.microsoft.com/pt-pt/cpp/cpp/?view=msvc-170">
                    <div className="font-medium">c++</div>
                    <div className="text-muted-foreground">
                      Documentação de c++ em portugues de portugal pela
                      microsoft.
                    </div>
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="https://developer.mozilla.org/pt-BR/docs/Web/JavaScript">
                    <div className="font-medium">Javascript</div>
                    <div className="text-muted-foreground">
                      Documentação oficial do Javascript em portugues do brazil,
                      pela Mozilla.
                    </div>
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="https://docs.espressif.com/projects/esp-idf/en/latest/esp32/index.html">
                    <div className="font-medium">Esp32</div>
                    <div className="text-muted-foreground">
                      Documentação oficial do Esp32 em portugues do brazil, pela
                      Espressif.
                    </div>
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="https://developer.mozilla.org/pt-BR/docs/Web/CSS">
                    <div className="font-medium">css</div>
                    <div className="text-muted-foreground">
                      Documentação oficial do css em portugues do brazil, pela
                      Mozilla.
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-4">
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/biblioteca/livros">Livros</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="/softwares">Softwares</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="/livros/artigos">Artigos</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="/livros/artigos/cursos">Cursos</Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuTrigger>Tema</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px] gap-4">
              <li>
                <NavigationMenuLink asChild>
                  <Link href="#" className="flex-row items-center gap-2">
                    <CircleIcon />
                    Light
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="#" className="flex-row items-center gap-2">
                    <CircleCheckIcon />
                    Dark
                  </Link>
                </NavigationMenuLink>
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
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
