import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { searchPublicContent } from "@/lib/search/public-search";

// ─── Validação com Zod ────────────────────────────────────────────────────────

const searchSchema = z.object({
  q: z
    .string()
    .trim()
    .min(2, "A consulta precisa de ao menos 2 caracteres.")
    .max(120, "Consulta muito longa."),
  limit: z.coerce
    .number()
    .int()
    .min(1)
    .max(30)
    .optional()
    .default(10),
});

type SearchParams = z.infer<typeof searchSchema>;

// ─── Cache headers ────────────────────────────────────────────────────────────
// Buscas públicas podem ser cacheadas brevemente na edge (30s)
// stale-while-revalidate permite servir cache enquanto revalida em background

const CACHE_HEADERS = {
  "Cache-Control": "public, s-maxage=30, stale-while-revalidate=120",
  "X-Content-Type-Options": "nosniff",
} as const;

// ─── Handlers ─────────────────────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  const rawQ = request.nextUrl.searchParams.get("q");
  const rawLimit = request.nextUrl.searchParams.get("limit");

  // Valida com Zod
  const parsed = searchSchema.safeParse({ q: rawQ ?? "", limit: rawLimit });

  if (!parsed.success) {
    return NextResponse.json(
      {
        query: rawQ ?? "",
        total: 0,
        items: [],
        byType: {},
        error: parsed.error.issues[0]?.message ?? "Parâmetros inválidos.",
      },
      { status: 400, headers: CACHE_HEADERS },
    );
  }

  const { q, limit } = parsed.data as SearchParams;

  try {
    const start = Date.now();
    const result = await searchPublicContent(q, { limit });
    const took = Date.now() - start;

    return NextResponse.json(
      { ...result, took },
      { headers: CACHE_HEADERS },
    );
  } catch (error) {
    console.error("[public-search] Falha na busca:", error);

    return NextResponse.json(
      {
        query: q,
        total: 0,
        items: [],
        byType: {},
        error: "Falha ao processar a pesquisa. Tente novamente.",
      },
      { status: 500 },
    );
  }
}