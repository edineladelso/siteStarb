import { updateSession } from "@/lib/supabase/proxy";
import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

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






export async function middleware(request: NextRequest) {
  const { nextUrl, cookies } = request;

  // Proteger apenas as rotas de admin
  if (!nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const response = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookies.get(name)?.value;
        },
        set(name: string, value: string, options) {
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options) {
          response.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Se não estiver autenticado, redireciona para login com retorno
  if (!user) {
    const redirectUrl = new URL("/login", request.url);
    redirectUrl.searchParams.set("next", nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // Usuário autenticado -> deixa seguir. Checagem de role será feita no layout/server.
  return response;
}

export const config = {
  matcher: [
    /*
     * Corresponde a todos os caminhos de rota exceto os que começam com:
     * - api (rotas de API)
     * - _next/static (ficheiros estáticos)
     * - _next/image (otimização de imagem)
     * - favicon.ico, icon.png, sitemap.xml, robots.txt (ficheiros de metadados)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|icon.png|sitemap.xml|robots.txt).*)",
    /*
     * Garante que a rota admin e as sub-rotas sejam sempre processadas
     */
    "/admin/:path*",
  ],
};
