import { NextRequest, NextResponse } from "next/server";

// Rotas públicas
// Rotas privadas que requerem autenticação
const privateRoutes = ["/admin", "/perfil", "/dashboard"];
// Rotas que requerem admin
const adminRoutes = ["/admin"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Criar cliente Supabase para verificar sessão
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
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

  // Verificar se o usuário está autenticado
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Se é uma rota privada e não tem usuário, redirecionar para login
  if (privateRoutes.some((route) => pathname.startsWith(route))) {
    if (!user) {
      return NextResponse.redirect(
        new URL(`/login?next=${encodeURIComponent(pathname)}`, request.url),
      );
    }

    // Se é uma rota de admin e o usuário não é admin
    if (adminRoutes.some((route) => pathname.startsWith(route))) {
      // Aqui você poderia verificar se o usuário é admin
      // Por enquanto, deixar passar e a página verificará
    }
  }

  // Se está logado e tenta acessar login/registro, redirecionar para home
  if ((pathname === "/login" || pathname === "/registro") && user) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Aplica o middleware a todos os caminhos EXCETO:
     * - .next/static (arquivos estáticos)
     * - _next/image (otimização de imagem)
     * - favicon.ico (arquivo favicon)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.gif|.*\\.webp).*)",
  ],
};
