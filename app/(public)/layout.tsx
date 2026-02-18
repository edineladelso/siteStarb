import Footer from "@/app/(public)/ui/layout/footer";
import Header from "@/app/(public)/ui/layout/header";
import { AppSidebar } from "@/components/layout/aside/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getCurrentUser } from "@/lib/actions/user.actions";

export const dynamic = "force-dynamic";

export default async function PublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Buscar usuário atual do servidor
  const user = await getCurrentUser();

  return (
    <>
      <SidebarProvider className="min-h-svh">
        <AppSidebar user={user} />
        <div className="bg-sidebar-primary-foreground flex min-h-svh w-full flex-col">
          <Header />
          <main className="flex flex-1">{children}</main>
          <Footer />
        </div>
      </SidebarProvider>
    </>
  );
}
