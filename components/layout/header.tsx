import { HeaderOrder } from "@/components/layout/navbarMenu";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Header() {
  return (
    <div className="sticky top-0 z-50 flex w-full items-center gap-3 border-b bg-white/99 px-3 py-2 sm:gap-3 sm:px-4 md:gap-3 md:px-5">
      <SidebarTrigger />
      <HeaderOrder />
    </div>
  );
}
