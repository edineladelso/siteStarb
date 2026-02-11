import { HeaderOrder } from "@/app/(public)/ui/navbarMenu";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function Header() {
  return (
    <div className="bg-sidebar sticky top-0 z-50 flex w-full items-center gap-3 border-b px-3 py-2 sm:gap-3 sm:px-4 sm:py-2.5 md:gap-3 md:px-5">
      <SidebarTrigger />
      <HeaderOrder />
    </div>
  );
}
