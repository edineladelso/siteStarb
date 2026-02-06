"use client";

import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  SquareTerminal,
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
} from "@/components/ui/sidebar";

// This is sample data.
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
  navMain: [
    {
      title: "Programação",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Básico",
          url: "#",
        },
        {
          title: "POO",
          url: "#",
        },
        {
          title: "MicroControladore",
          url: "#",
        },
        {
          title: "Frontend",
          url: "#",
        },
        {
          title: "Backend",
          url: "#",
        },
        {
          title: "Dados",
          url: "#",
        },
      ],
    },
    {
      title: "IA Modelos",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Modelos",
          url: "#",
        },
        {
          title: "Engenharia de Prompt",
          url: "#",
        },
        {
          title: "Ideias e Projetos",
          url: "#",
        },
      ],
    },
    {
      title: "Documentação",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Engenharia",
          url: "#",
        },
        {
          title: "Como começar?",
          url: "#",
        },
        {
          title: "Tutoriais",
          url: "#",
        },
        {
          title: "Carreira",
          url: "#",
        },
      ],
    },
  ],
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
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <ServiceSwitcher services={data.services} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
