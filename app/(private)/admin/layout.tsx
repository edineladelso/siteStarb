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
      <div className="flex min-h-screen w-full ">
        <AdminSidebar />
        <SidebarInset>
          <div className="flex min-h-screen  flex-col">
            <AdminHeader />
            <main className="flex justify-center my-10 flex-1">{children}</main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}