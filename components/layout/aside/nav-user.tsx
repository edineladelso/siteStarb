"use client";

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react";
import { useTransition } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { logout } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";

export function NavUser({
  user,
  role,
  classNameSideBarMenu,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  role?: "admin" | "user";
  classNameSideBarMenu?: string;
}) {
  const { isMobile } = useSidebar();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLogout = async () => {
    startTransition(async () => {
      const result = await logout();
      if (result.success) {
        router.push("/login");
        router.refresh();
      } else {
        console.error("Erro ao fazer logout:", result.error);
      }
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .slice(0, 2)
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <SidebarMenu className={cn(classNameSideBarMenu)}>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg bg-blue-600 text-white font-semibold">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg bg-blue-600 text-white font-semibold">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
                {role === "admin" && (
                  <span className="ml-auto text-xs bg-red-500/20 text-red-300 px-2 py-0.5 rounded">
                    Admin {user.name}
                  </span>
                )}
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            
            {role === "admin" && (
              <>
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <Link href="/admin">
                      <BadgeCheck className="mr-2" size={16} />
                      Dashboard Admin
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
              </>
            )}

            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href="/perfil">
                  <Sparkles className="mr-2" size={16} />
                  Meu Perfil
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                <CreditCard className="mr-2" size={16} />
                Minhas Compras
              </DropdownMenuItem>
              <DropdownMenuItem disabled>
                <Bell className="mr-2" size={16} />
                Notificações
              </DropdownMenuItem>
            </DropdownMenuGroup>
            
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              disabled={isPending}
              className="cursor-pointer"
            >
              <LogOut className="mr-2" size={16} />
              {isPending ? "Saindo..." : "Sair"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
