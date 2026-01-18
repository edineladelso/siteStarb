import { updateSession } from "@/lib/supabase/proxy";
import { NextResponse, type NextRequest } from "next/server";

export default async function proxy(request: NextRequest) {
  const maintenanceMode =
    process.env.MAINTENANCE_MODE === "true" ? true : false;

  if (maintenanceMode && request.nextUrl.pathname !== "/manutencao") {
    const redirectUrl = new URL("/manutencao", request.url).toString();
    return NextResponse.redirect(redirectUrl);
  } else {
    return NextResponse.next();
  }

  return await updateSession(request);
}

export const config = {
  matcher:
    "/((?!api|_next/static|_next/image|favicon.icon|icon.png|sistemap.xml|robots.txt).*)",
};
