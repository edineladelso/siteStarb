"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { ChevronRight, ChevronUp, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function NavMain({
  items,
  className1,
  className2,
  classNameSideBarMenu,
  colorIcon,
}: {
  items: {
    title: string;
    url: string;
    icon?: React.ElementType;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
  className1?: string;
  className2?: string;
  colorIcon?: string;
  classNameSideBarMenu?: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const LimitItens = 7;
  const visibleItems = isExpanded ? items : items.slice(0, LimitItens);
  const hasMore = items.length > LimitItens;

  return (
    <SidebarGroup className={cn(className1)}>
      <SidebarGroupLabel>Material</SidebarGroupLabel>
      <SidebarMenu className={cn(classNameSideBarMenu)}>
        {visibleItems.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible flex "
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  tooltip={item.title}
                  className={cn("", className2)}
                >
                  {item.icon && <item.icon className={cn(colorIcon)} />}
                  <span className="text-sm">{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map(
                    (subItem: { title: string; url: string }) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <Link href={subItem.url}>
                            <span>{subItem.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ),
                  )}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
        {hasMore && (
          <SidebarMenuItem>
            <SidebarMenuButton
              type="button"
              aria-expanded={isExpanded}
              onClick={() => setIsExpanded((prev) => !prev)}
              className="text-sidebar-foreground/70"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="size-4" />
                  <span>Ver menos</span>
                </>
              ) : (
                <>
                  <MoreHorizontal className="text-sidebar-foreground/70" />
                  <span>Ver mais</span>
                </>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}
