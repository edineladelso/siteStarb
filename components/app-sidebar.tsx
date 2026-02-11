"use client";

import {
  AudioWaveform,
  BookOpen,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Calculator,
  Atom,
  FlaskConical,
  Boxes,
  Cog,
  Zap,
  CircuitBoard,
  Gauge,
  Monitor,
  Shield,
  Radio,
  Network,
  Building,
  Brain,
  Code,
  Settings,
  HardHat,
} from "lucide-react";
import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { ServiceSwitcher } from "@/components/services-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  AreaLivroParaMacroArea,
  areaLivroValues,
  macroAreaLivroValues,
  type AreaLivro,
  type MacroAreaLivro,
} from "@/lib/domain/areas";
import { LABELS_CATEGORIAS } from "@/lib/domain/areasCategoriasPatern";
import { Separator } from "./ui/separator";
import { cn } from "@/lib/utils";

const macroAreaIcons: Record<MacroAreaLivro, React.ElementType> = {
  Matematica: Calculator,
  Fisica: Atom,
  Quimica: FlaskConical,
  Materiais: Boxes,
  Mecanica: Cog,
  Eletrica: Zap,
  Eletronica: CircuitBoard,
  Controle_automacao: Gauge,
  Computacao: Monitor,
  Cyber_seguranca: Shield,
  Telecom: Radio,
  Redes_de_computadores: Network,
  Civil: Building,
  IA: Brain,
  Programacao: Code,
  Mecatronica: Settings,
  Engenharia: HardHat,
};

const AREA_LABELS: Record<AreaLivro, string> = {
  matematica: "Matemática",
  algebra: "Álgebra",
  calculo: "Cálculo",
  geometria_analitica: "Geometria Analítica",
  estatistica: "Estatística",
  probabilidade: "Probabilidade",
  fisica: "Física",
  mecanica_classica: "Mecânica Clássica",
  termodinamica: "Termodinâmica",
  eletromagnetismo: "Eletromagnetismo",
  optica: "Óptica",
  fisica_moderna: "Física Moderna",
  quimica: "Química",
  quimica_geral: "Química Geral",
  quimica_organica: "Química Orgânica",
  quimica_analitica: "Química Analítica",
  materiais: "Materiais",
  ciencia_dos_materiais: "Ciência dos Materiais",
  resistencia_dos_materiais: "Resistência dos Materiais",
  mecanica_dos_solidos: "Mecânica dos Sólidos",
  mecanica_dos_fluidos: "Mecânica dos Fluidos",
  transferencia_de_calor: "Transferência de Calor",
  processos_de_fabricacao: "Processos de Fabricação",
  metrologia: "Metrologia",
  desenho_tecnico: "Desenho Técnico",
  projeto_mecanico: "Projeto Mecânico",
  maquinas_termicas: "Máquinas Térmicas",
  eletricidade: "Eletricidade",
  eletronica: "Eletrônica",
  eletronica_analogica: "Eletrônica Analógica",
  eletronica_digital: "Eletrônica Digital",
  circuitos_eletricos: "Circuitos Elétricos",
  sistemas_de_potencia: "Sistemas de Potência",
  maquinas_eletricas: "Máquinas Elétricas",
  instalacoes_eletricas: "Instalações Elétricas",
  modelacao_simulacao: "Modelação e Simulação",
  controle_automatico: "Controle Automático",
  sistemas_de_controle: "Sistemas de Controle",
  instrumentacao: "Instrumentação",
  automacao: "Automação",
  robotica: "Robótica",
  sistemas_embarcados: "Sistemas Embarcados",
  microcontroladores: "Microcontroladores",
  telecomunicacoes: "Telecomunicações",
  sinais_e_sistemas: "Sinais e Sistemas",
  processamento_de_sinais: "Processamento de Sinais",
  computacao: "Computação",
  algoritmos: "Algoritmos",
  estruturas_de_dados: "Estruturas de Dados",
  programacao: "Programação",
  web: "Web",
  nativa: "Aplicações Nativas",
  engenharia_de_software: "Engenharia de Software",
  banco_de_dados: "Banco de Dados",
  sistemas_operacionais: "Sistemas Operacionais",
  redes_de_computadores: "Redes de Computadores",
  arquitetura_de_computadores: "Arquitetura de Computadores",
  seguranca_da_informacao: "Segurança da Informação",
  inteligencia_artificial: "Inteligência Artificial",
  aprendizado_de_maquina: "Aprendizado de Máquina",
  engenharia_civil: "Engenharia Civil",
  mecanica_dos_solos: "Mecânica dos Solos",
  geotecnia: "Geotecnia",
  hidraulica: "Hidráulica",
  hidrologia: "Hidrologia",
  saneamento: "Saneamento",
  transportes: "Transportes",
  estruturas: "Estruturas",
  concreto_armado: "Concreto Armado",
  estruturas_metalicas: "Estruturas Metálicas",
  topografia: "Topografia",
  geologia_de_engenharia: "Geologia de Engenharia",
};

const navMain = macroAreaLivroValues.map((macroArea) => {
  const macro = macroArea as MacroAreaLivro;
  const children = areaLivroValues
    .filter((area) => AreaLivroParaMacroArea[area] === macro)
    .map((area) => ({
      title: AREA_LABELS[area],
      url: `/biblioteca/livros?macroArea=${encodeURIComponent(macro)}&area=${encodeURIComponent(area)}`,
    }));

  return {
    title: LABELS_CATEGORIAS[macro],
    url: `/biblioteca/livros?macroArea=${encodeURIComponent(macro)}`,
    icon: macroAreaIcons[macro] ?? BookOpen,
    items: children,
  };
});

const data = {
  user: {
    name: "Star B",
    email: "uccstarB@gmail.com",
    avatar: "/img/star.webp",
  },
  services: [
    {
      name: "Star B Avançado",
      logo: Command,
      plan: "Enterprise",
      href: "#",
    },
    {
      name: "Star B IA",
      logo: AudioWaveform,
      plan: "Pro",
      href: "#",
    },
    {
      name: "Star B Normal",
      logo: GalleryVerticalEnd,
      plan: "Free",
      href: "#",
    },
  ],
  navMain,
  projects: [
    {
      name: "Design de Engenharia",
      url: "#",
      icon: Frame,
    },
    {
      name: "Ideias & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "TCC && Dissertação",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <ServiceSwitcher services={data.services} />
      </SidebarHeader>
      <SidebarContent >
        <NavMain
          className1={cn(
            "overflow-y-scroll scroll",
            isCollapsed
              ? "h-[50vh] sm:mt-10"
              : "sm:max-h-[60vh]",
          )}
          className2="text-sidebar-foreground/70"
          colorIcon={cn(isCollapsed && "text-sidebar-foreground/70")}
          items={data.navMain}
        />
        <Separator className={cn(isCollapsed && "sm:hidden")} />
        <NavProjects
          className2="text-sidebar-foreground/70"
          projects={data.projects}
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
