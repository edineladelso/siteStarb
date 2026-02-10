import { AppSidebar } from "@/components/app-sidebar";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function PublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <SidebarProvider>
          <AppSidebar />
          <div className="flex min-h-screen w-full flex-col">
            <Header />
            <main className="flex flex-1">{children}</main>
            <Footer />
          </div>
        </SidebarProvider>
    </>
  );
}
