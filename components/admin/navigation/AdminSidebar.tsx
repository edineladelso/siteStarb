"use client";

import { ServiceSwitcher } from "@/components/services-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  AnalyticsIcon,
  ArticleIcon,
  BookIcon,
  ConfigIcon,
  ProjectIcon,
} from "@/lib/localDadosHome/IconesHome";
import {
  BadgeHelp,
  Command,
  Computer,
  Home,
  LayoutDashboard,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactElement } from "react";

// ==================== ADMIN SIDEBAR ====================
const menuItems: {
  title: string;
  href: string;
  icon: ReactElement;
  badge?: string;
}[] = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: <LayoutDashboard />,
  },
  {
    title: "Home",
    href: "/",
    icon: <Home />,
  },
  {
    title: "Livros",
    href: "/admin/livros",
    icon: <BookIcon />,
    badge: "45",
  },
  {
    title: "Softwares",
    href: "/admin/softwares",
    icon: <Computer />,
    badge: "12",
  },
  {
    title: "Projetos",
    href: "/admin/projetos",
    icon: <ProjectIcon />,
    badge: "8",
  },
  {
    title: "Artigos",
    href: "/admin/artigos",
    icon: <ArticleIcon />,
    badge: "23",
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: <AnalyticsIcon />,
  },
];

const settingsItems = [
  {
    title: "Configurações",
    href: "/admin/configuracoes",
    icon: <ConfigIcon />,
  },
  {
    title: "Ajuda",
    href: "/admin/ajuda",
    icon: <BadgeHelp />,
  },
];

const services = [
  {
    name: "Star B Admin",
    logo: Command,
    plan: "Admin",
    href: "#",
  },
];

export function AdminSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="border-slate-200">
        <Link
          href="/admin"
          className="flex items-center gap-3 rounded-lg px-2 py-1 transition hover:bg-slate-50"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-br from-blue-600 to-indigo-700 shadow-sm group-data-[collapsible=icon]:hidden">
            <span className="text-base font-bold text-white">S</span>
          </div>
          <div className="leading-tight group-data-[collapsible=icon]:hidden">
            <p className="text-sm font-semibold text-slate-900">Star B</p>
            <p className="text-[11px] text-slate-500">Admin Console</p>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="group-data-[collapsible=icon]:mt-10">
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarMenu>
            {menuItems.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    isActive={isActive}
                  >
                    <Link href={item.href}>
                      {item.icon}
                      <span className="flex-1">{item.title}</span>
                      {item.badge && (
                        <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup className="mt-4">
          <SidebarGroupLabel>Suporte</SidebarGroupLabel>
          <SidebarMenu>
            {settingsItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild tooltip={item.title}>
                  <Link href={item.href}>
                    {item.icon}
                    <span className="flex-1">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-4 pb-4">
        {!isCollapsed && <ServiceSwitcher services={services} />}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
