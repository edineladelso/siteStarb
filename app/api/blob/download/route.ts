import { head } from "@vercel/blob";
import { isLivroBlobUrl, normalizeLivroBlobPathname } from "@/lib/blob/livros";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json(
        { error: "BLOB_READ_WRITE_TOKEN não configurado no servidor." },
        { status: 500 },
      );
    }

    const { searchParams } = new URL(request.url);
    const url = (searchParams.get("url") || "").trim();
    const pathname = (searchParams.get("pathname") || "").trim();

    if (!url && !pathname) {
      return NextResponse.json(
        { error: "Informe uma url ou pathname para download." },
        { status: 400 },
      );
    }

    if (url && !isLivroBlobUrl(url)) {
      return NextResponse.json(
        { error: "URL inválida para download Blob." },
        { status: 400 },
      );
    }

    const target = url || pathname;
    const metadata = await head(target);

    // Garante que o arquivo acessado pertence ao escopo de livros.
    normalizeLivroBlobPathname(metadata.pathname);

    return NextResponse.redirect(metadata.downloadUrl, { status: 302 });
  } catch (error) {
    console.error("[blob/download]", error);
    return NextResponse.json(
      { error: "Falha ao iniciar download do arquivo." },
      { status: 500 },
    );
  }
}
