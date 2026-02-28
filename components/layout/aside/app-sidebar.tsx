"use client";

import {
  Atom,
  BookOpen,
  Boxes,
  Brain,
  Building,
  Calculator,
  CircuitBoard,
  Code,
  Cog,
  Command,
  FlaskConical,
  Frame,
  Gauge,
  HardHat,
  LogIn,
  Map,
  Monitor,
  Network,
  PieChart,
  Radio,
  Settings,
  Shield,
  Zap,
} from "lucide-react";
import Link from "next/link";
import * as React from "react";

import { NavMain } from "@/components/layout/aside/nav-main";
import { NavProjects } from "@/components/layout/aside/nav-projects";
import { NavUser } from "@/components/layout/aside/nav-user";
import { UserAvatar } from "@/components/layout/userAvatar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import type { CurrentUser } from "@/lib/actions/user.actions";
import {
  AreaLivroParaMacroArea,
  areaLivroValues,
  macroAreaLivroValues,
  type AreaLivro,
  type MacroAreaLivro,
} from "@/lib/domain/areas";
import { LABELS_CATEGORIAS } from "@/lib/domain/areasCategoriasPatern";
import { cn } from "@/lib/utils";
import { Separator } from "../../ui/separator";

// ─── Ícones por macro área ────────────────────────────────────────────────────
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

// ─── Nav items com links funcionais ──────────────────────────────────────────
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

// ─── Projetos ────────────────────────────────────────────────────────────────
const projects = [
  { name: "Design de Engenharia", url: "#", icon: Frame },
  { name: "Ideias & Marketing", url: "#", icon: PieChart },
  { name: "TCC && Dissertação", url: "#", icon: Map },
];

// ─── Props ────────────────────────────────────────────────────────────────────
interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user?: CurrentUser | null;
}

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  const { state, isMobile } = useSidebar();
  const isCollapsedDesktop = state === "collapsed" && !isMobile;
  const showCollapsedFooter = isCollapsedDesktop;

  const displayUser = user
    ? {
        name: user.nome,
        email: user.email,
        avatar: user.avatarUrl ?? null,
      }
    : null;

  return (
    <Sidebar collapsible="icon" {...props}>
      {/* ── Header ── */}
      <SidebarHeader className={cn(isCollapsedDesktop && "hidden")}>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="pointer-events-none">
              <div className="text-sidebar-primary ml-1 flex aspect-square size-8 items-center justify-center rounded-lg border">
                <Command className="size-5.5" />
              </div>
              <div className="grid flex-1 text-left text-xl leading-tight">
                <span className="truncate font-bold">Star B</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* ── Conteúdo ── */}
      <SidebarContent>
        <NavMain
          classNameSideBarMenu={cn(isCollapsedDesktop && "gap-3")}
          className1={cn(
            "overflow-y-scroll text-sidebar-foreground/70",
            isCollapsedDesktop
              ? "h-[55vh] sm:mt-15 sm:overflow-x-hidden"
              : "sm:max-h-[60vh]",
          )}
          className2={cn(isCollapsedDesktop && "[&>svg]:size-5.5")}
          colorIcon={cn(isCollapsedDesktop && "text-sidebar-foreground/95")}
          items={navMain}
        />
        <Separator className={cn(isCollapsedDesktop && "sm:hidden")} />
        <NavProjects
          className2="text-sidebar-foreground/70"
          projects={projects}
        />
      </SidebarContent>

      {/* ── Footer / Avatar colapsado ── */}
      {showCollapsedFooter ? (
        <div className="mb-8 flex justify-center">
          {user ? (
            // Utilizador autenticado — avatar clicável para o perfil
            <Link
              href="/minha-conta"
              aria-label="Ver meu perfil"
              className="group relative"
            >
              <UserAvatar
                nome={user.nome}
                avatarUrl={user.avatarUrl}
                size="sm"
                className="ring-2 ring-transparent transition-all group-hover:ring-violet-500"
              />
              {/* Indicador online */}
              <span
                aria-hidden="true"
                className="ring-sidebar absolute right-0 bottom-0 h-2 w-2 rounded-full bg-emerald-400 ring-2"
              />
            </Link>
          ) : (
            // Visitante — link para login
            <Link
              href="/login"
              aria-label="Fazer login"
              className="text-sidebar-foreground/90 flex items-center justify-center rounded-full p-1 transition-colors hover:text-blue-700"
            >
              <LogIn size={22} aria-hidden="true" />
            </Link>
          )}
        </div>
      ) : (
        <SidebarFooter>
          {displayUser ? (
            <NavUser
              user={displayUser}
              role={user?.role}
              classNameSideBarMenu={cn(showCollapsedFooter && "hidden")}
            />
          ) : (
            // Sidebar expandida sem utilizador — botão de login
            <Link
              href="/login"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5",
                "text-sidebar-foreground/60 text-sm font-medium",
                "hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors",
              )}
            >
              <LogIn size={18} aria-hidden="true" />
              <span>Entrar na conta</span>
            </Link>
          )}
        </SidebarFooter>
      )}

      <SidebarRail />
    </Sidebar>
  );
}
