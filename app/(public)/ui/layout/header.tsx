import { HeaderOrder } from "@/app/(public)/ui/layout/navbarMenu";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Header() {
  return (
    <div className="bg-sidebar sticky top-0 z-50 flex w-full items-center gap-2 border-b px-3 py-2 sm:gap- sm:px-4 md:px-5">
      <SidebarTrigger />
      <HeaderOrder />
    </div>
  );
}
