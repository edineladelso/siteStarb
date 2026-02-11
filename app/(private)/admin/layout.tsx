import { AdminHeader } from "@/components/admin/navigation/AdminHeader";
import { AdminSidebar } from "@/components/admin/navigation/AdminSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

// ==================== ADMIN LAYOUT ====================
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="bg-sidebar-accent flex min-h-screen w-full">
        <AdminSidebar />
        <SidebarInset>
          <div className="flex min-h-screen flex-col">
            <AdminHeader />
            <main className="my-10 flex flex-1 justify-center px-6 sm:px-10">
              {children}
            </main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
