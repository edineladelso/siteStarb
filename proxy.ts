import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const adminRoutes = ["/admin"];

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── 1. Modo manutenção ────────────────────────────────────────────────────
  if (
    process.env.MODO_MANUTENCAO === "true" &&
    pathname !== "/manutencao"
  ) {
    return NextResponse.redirect(new URL("/manutencao", request.url));
  }

  // ── 2. Criar resposta base ────────────────────────────────────────────────
  let response = NextResponse.next({
    request: { headers: request.headers },
  });

  // ── 3. Supabase SSR — OBRIGATÓRIO para PKCE funcionar ────────────────────
  //
  // O createServerClient lê o code_verifier do cookie do request
  // e escreve os cookies actualizados na response.
  // SEM isto, o /auth/callback não consegue trocar o code pela sessão.
  //
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // Escrever nos cookies do request (para o servidor ler)
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          // Recriar response com os novos cookies do request
          response = NextResponse.next({
            request: { headers: request.headers },
          });
          // Escrever na response (para o browser receber)
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // IMPORTANTE: não colocar nenhum código entre createServerClient e getUser.
  // getUser() renova o token e escreve os cookies actualizados via setAll acima.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // ── 4. Protecção de rotas admin ───────────────────────────────────────────
  if (adminRoutes.some((route) => pathname.startsWith(route)) && !user) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // ── 5. Redirecionar utilizador autenticado fora do login/registro ─────────
  if ((pathname === "/login" || pathname === "/registro") && user) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|icon.png|sitemap.xml|robots.txt).*)",
    "/admin/:path*",
  ],
};