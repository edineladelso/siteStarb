import Footer from "@/app/(public)/ui/footer";
import Header from "@/app/(public)/ui/header";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function PublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <div className="bg-sidebar-primary-foreground flex min-h-screen w-full flex-col">
          <Header />
          <main className="flex flex-1">{children}</main>
          <Footer />
        </div>
      </SidebarProvider>
    </>
  );
}
