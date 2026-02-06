import { createServerClient } from "@supabase/ssr";
import { NextResponse, NextRequest } from "next/server";

export default async function proxy(request: NextRequest) {
  const { nextUrl } = request;
  const response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Atualiza/refresca a sessão (getUser faz o refresh no Supabase)
  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  // Helper: redirect mantendo cookies de sessão (refresh do Supabase)
  const redirectWithCookies = (url: URL) => {
    const res = NextResponse.redirect(url);
    response.cookies.getAll().forEach((c) => res.cookies.set(c.name, c.value));
    return res;
  };

  // 1) Modo manutenção: redireciona tudo exceto /manutencao
  const modoManutencao = process.env.MODO_MANUTENCAO === "true";
  if (modoManutencao && nextUrl.pathname !== "/manutencao") {
    const redirectUrl = new URL("/manutencao", request.url);

    console.log("Modo manutencao: ", modoManutencao)
    return NextResponse.redirect(redirectUrl);
  }

  // 2) Rotas /admin: exige usuário autenticado
  // if (nextUrl.pathname.startsWith("/admin")) {
  //   if (!user) {
  //     const loginUrl = new URL("/login", request.url);
  //     loginUrl.searchParams.set("next", nextUrl.pathname);
  //     return redirectWithCookies(loginUrl);
  //   }
  // }

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
