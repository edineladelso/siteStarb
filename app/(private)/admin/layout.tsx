import { AdminHeader } from "@/components/admin/navigation/AdminHeader";
import { AdminSidebar } from "@/components/admin/navigation/AdminSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getDashboardStats } from "@/lib/actions/adminDashboard";
import { getCurrentUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

// ==================== ADMIN LAYOUT ====================
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Verificar se o usuário está autenticado e é admin
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login?next=/admin");
  }

  if (user.role !== "admin") {
    redirect("/");
  }

  const stats = await getDashboardStats();

  return (
    <SidebarProvider>
      <div className="bg-sidebar flex min-h-screen w-full">
        <AdminSidebar
          counts={{
            livros: stats.totalLivros,
            softwares: stats.totalSoftwares,
            projetos: stats.totalProjetos,
            artigos: stats.totalArtigos,
          }}
        />
        <SidebarInset>
          <div className="bg-sidebar flex min-h-screen flex-col">
            <AdminHeader />
            <main className="bg-sidebar my-10 flex flex-1 justify-center px-6 sm:px-10">
              {children}
            </main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
