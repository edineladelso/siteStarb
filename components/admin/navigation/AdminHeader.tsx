"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { logout } from "@/lib/actions/user.actions";
import {
  Bell,
  BookOpen,
  Code2,
  FileText,
  LogOut,
  Search,
  Settings,
  ShieldAlert,
  UserCircle,
  Wrench,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FormEvent, useMemo, useState, useTransition } from "react";

type HeaderUser = {
  id: string;
  nome: string;
  email: string;
  avatarUrl: string | null;
};

type HeaderNotification = {
  id: string;
  tipo: "livro" | "software" | "projeto" | "artigo" | "sistema";
  titulo: string;
  descricao: string;
  createdAt: string;
  href: string;
};

type AdminHeaderProps = {
  currentUser: HeaderUser;
  notifications?: HeaderNotification[];
};

const adminSearchTargets = [
  { href: "/admin", terms: ["dashboard", "inicio", "home", "geral"] },
  { href: "/admin/livros", terms: ["livros", "livro", "biblioteca"] },
  { href: "/admin/artigos", terms: ["artigos", "artigo"] },
  { href: "/admin/softwares", terms: ["softwares", "software"] },
  { href: "/admin/projetos", terms: ["projetos", "projeto"] },
  { href: "/admin/analytics", terms: ["analytics", "metricas", "relatorios"] },
  { href: "/admin/configuracoes", terms: ["configuracoes", "ajustes"] },
];

function getInitials(name: string): string {
  return (
    name
      .trim()
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("") || "A"
  );
}

function formatRelativeTime(date: string): string {
  const time = new Date(date).getTime();
  if (!Number.isFinite(time)) return "agora";
  const diffMs = Date.now() - time;
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "agora";
  if (minutes < 60) return `${minutes} min atrás`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} h atrás`;
  const days = Math.floor(hours / 24);
  return `${days} d atrás`;
}

function resolveBreadcrumb(pathname: string): string {
  if (pathname === "/admin") return "Visão Geral";
  if (pathname.startsWith("/admin/livros")) return "Livros";
  if (pathname.startsWith("/admin/artigos")) return "Artigos";
  if (pathname.startsWith("/admin/softwares")) return "Softwares";
  if (pathname.startsWith("/admin/projetos")) return "Projetos";
  if (pathname.startsWith("/admin/analytics")) return "Analytics";
  if (pathname.startsWith("/admin/configuracoes")) return "Configurações";
  return "Admin";
}

function iconByNotificationType(tipo: HeaderNotification["tipo"]) {
  if (tipo === "livro") return <BookOpen className="h-4 w-4 text-blue-600" />;
  if (tipo === "software") return <Code2 className="h-4 w-4 text-purple-600" />;
  if (tipo === "projeto") return <Wrench className="h-4 w-4 text-green-600" />;
  if (tipo === "artigo") return <FileText className="h-4 w-4 text-orange-600" />;
  return <ShieldAlert className="h-4 w-4 text-red-600" />;
}

// ==================== ADMIN HEADER ====================
export function AdminHeader({ currentUser, notifications = [] }: AdminHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [lastReadAt, setLastReadAt] = useState<number>(() => {
    if (typeof window === "undefined") return 0;
    try {
      const stored = window.localStorage.getItem(
        `starb-admin-notifications-read:${currentUser.id}`,
      );
      return stored ? Number(stored) || 0 : 0;
    } catch {
      return 0;
    }
  });
  const [isPending, startTransition] = useTransition();

  const breadcrumb = useMemo(() => resolveBreadcrumb(pathname), [pathname]);
  const readStorageKey = `starb-admin-notifications-read:${currentUser.id}`;

  const unreadCount = useMemo(() => {
    return notifications.filter((notification) => {
      const createdAt = new Date(notification.createdAt).getTime();
      return Number.isFinite(createdAt) && createdAt > lastReadAt;
    }).length;
  }, [lastReadAt, notifications]);

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = searchQuery.trim().toLowerCase();
    if (!query) return;

    const match = adminSearchTargets.find((target) =>
      target.terms.some((term) => term.includes(query) || query.includes(term)),
    );

    router.push(match?.href ?? "/admin");
    setSearchQuery("");
  };

  const markNotificationsAsRead = () => {
    const now = Date.now();
    setLastReadAt(now);
    try {
      window.localStorage.setItem(readStorageKey, String(now));
    } catch {
      // ignorar falhas de storage no cliente
    }
  };

  const handleLogout = () => {
    startTransition(async () => {
      const result = await logout();
      if (result.success) {
        router.push("/login");
        router.refresh();
        return;
      }

      console.error("Erro ao sair da sessão:", result.error);
    });
  };

  return (
    <header className="bg-sidebar/95 sticky top-0 z-30 h-16 w-full border-b border-slate-200 backdrop-blur-sm">
      <div className="flex h-full items-center justify-between gap-3 px-4 sm:px-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-3 text-sm">
          <SidebarTrigger />
          <Link
            href="/admin"
            className="text-slate-600 transition-colors hover:text-blue-600"
          >
            Dashboard
          </Link>
          <svg
            className="h-4 w-4 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
          <span className="font-semibold text-slate-900">{breadcrumb}</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <form
            onSubmit={handleSearchSubmit}
            className="relative hidden lg:block"
          >
            <input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              type="text"
              placeholder="Buscar áreas do admin..."
              className="w-64 rounded-lg border-2 border-slate-200 py-2 pr-4 pl-10 text-sm outline-none focus:border-blue-500"
            />
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </form>

          {/* Notifications */}
          <DropdownMenu onOpenChange={(open) => open && markNotificationsAsRead()}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="p-4">
                <h3 className="mb-1 font-semibold text-slate-900">
                  Notificações
                </h3>
                <p className="mb-3 text-xs text-slate-500">
                  {unreadCount > 0
                    ? `${unreadCount} notificação(ões) não lida(s)`
                    : "Sem novas notificações"}
                </p>

                {notifications.length === 0 && (
                  <p className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
                    Nenhuma notificação interna disponível.
                  </p>
                )}

                <div className="max-h-80 space-y-2 overflow-y-auto pr-1">
                  {notifications.map((notification) => (
                    <Link
                      key={notification.id}
                      href={notification.href}
                      className="block rounded-lg border border-slate-200 p-3 transition-colors hover:bg-slate-50"
                    >
                      <div className="flex items-start gap-2">
                        <span className="mt-0.5">
                          {iconByNotificationType(notification.tipo)}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-slate-900">
                            {notification.titulo}
                          </p>
                          <p className="mt-1 text-xs text-slate-700">
                            {notification.descricao}
                          </p>
                          <p className="mt-2 text-xs text-slate-500">
                            {formatRelativeTime(notification.createdAt)}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-slate-50">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={currentUser.avatarUrl ?? undefined} alt={currentUser.nome} />
                  <AvatarFallback className="bg-linear-to-br from-blue-500 to-indigo-600 text-sm font-semibold text-white">
                    {getInitials(currentUser.nome)}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden text-left lg:block">
                  <p className="text-sm font-semibold text-slate-900">{currentUser.nome}</p>
                  <p className="text-xs text-slate-500">{currentUser.email}</p>
                </div>
                <svg
                  className="h-4 w-4 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="border-b border-slate-100 px-3 py-2">
                <p className="text-sm font-semibold text-slate-900">{currentUser.nome}</p>
                <p className="text-xs font-normal text-slate-500">{currentUser.email}</p>
              </DropdownMenuLabel>
              <DropdownMenuItem asChild className="gap-2">
                <Link href="/minha-conta">
                  <UserCircle className="h-4 w-4" />
                  Meu Perfil
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="gap-2">
                <Link href="/admin/configuracoes">
                  <Settings className="h-4 w-4" />
                  Configurações
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                disabled={isPending}
                className="gap-2 text-red-600 focus:text-red-600"
              >
                <LogOut className="h-4 w-4" />
                {isPending ? "Saindo..." : "Sair"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
