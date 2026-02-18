import { NextResponse, NextRequest } from "next/server";
// Rotas que requerem admin
const adminRoutes = ["/admin"];

export default async function proxy(request: NextRequest) {
  const { nextUrl } = request;
  const { pathname } = request.nextUrl;
  const response = NextResponse.next({ request: { headers: request.headers } });

  // const supabase = createServerClient(
  //   process.env.NEXT_PUBLIC_SUPABASE_URL!,
  //   process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  //   {
  //     cookies: {
  //       getAll() {
  //         return request.cookies.getAll();
  //       },
  //       setAll(cookiesToSet) {
  //         cookiesToSet.forEach(({ name, value, options }) =>
  //           response.cookies.set(name, value, options),
  //         );
  //       },
  //     },
  //   },
  // );

  // Atualiza/refresca a sessão (getUser faz o refresh no Supabase)
  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  // Se é uma rota de admin e o usuário não é admin
  // if (adminRoutes.some((route) => pathname.startsWith(route))) {
  //   // Aqui você poderia verificar se o usuário é admin
  //   // Por enquanto, deixar passar e a página verificará
  // }

  // // Se é uma rota privada e não tem usuário, redirecionar para login
  // if (privateRoutes.some((route) => pathname.startsWith(route))) {
  //   if (!user) {
  //     return NextResponse.redirect(
  //       new URL(`/login?next=${encodeURIComponent(pathname)}`),
  //     );
  //   }
  // }
  // Se está logado e tenta acessar login/registro, redirecionar para home
  // if ((pathname === "/login" || pathname === "/registro") && user) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }

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

    console.log("Modo manutencao: ", modoManutencao);
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
