import { AdminHeader } from "@/components/admin/navigation/AdminHeader";
import { AdminSidebar } from "@/components/admin/navigation/AdminSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getDashboardStats } from "@/lib/actions/adminDashboard";

// ==================== ADMIN LAYOUT ====================
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
          <div className="flex min-h-screen flex-col bg-sidebar">
            <AdminHeader />
            <main className="my-10 flex flex-1 justify-center bg-sidebar px-6 sm:px-10">
              {children}
            </main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
