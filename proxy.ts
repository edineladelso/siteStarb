import { NextRequest, NextResponse } from "next/server";

export default function proxy(request: NextRequest) {
  const maintenanceMode =
    process.env.MAINTENANCE_MODE === "true" ? true : false;

  if (maintenanceMode && request.nextUrl.pathname !== "/manutencao") {
    const redirectUrl = new URL("/manutencao", request.url).toString();
    console.log("estamos em manutencao", redirectUrl);

    return NextResponse.redirect( redirectUrl)
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.icon|icon.png|sistemap.xml|robots.txt).*)",
};
