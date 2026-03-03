import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";
import { z } from "zod";

const QuerySchema = z.object({
  publicId: z.string().min(1),
  resourceType: z.enum(["raw", "image"]).default("raw"),
  format: z.string().min(1).default("pdf"),
  attachment: z
    .enum(["0", "1", "true", "false"])
    .optional()
    .transform((value) => value === "1" || value === "true"),
});

function isAllowedPublicId(publicId: string): boolean {
  const normalized = publicId.replace(/^\/+|\/+$/g, "");
  return (
    normalized.startsWith("starb/livros/") ||
    normalized.startsWith("legacy/livros/")
  );
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const parsed = QuerySchema.safeParse({
      publicId: searchParams.get("publicId") ?? "",
      resourceType: searchParams.get("resourceType") ?? "raw",
      format: searchParams.get("format") ?? "pdf",
      attachment: searchParams.get("attachment") ?? undefined,
    });

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Parâmetros inválidos para download." },
        { status: 400 },
      );
    }

    if (!isAllowedPublicId(parsed.data.publicId)) {
      return NextResponse.json({ error: "Arquivo não permitido." }, { status: 403 });
    }

    if (!process.env.CLOUDINARY_API_SECRET || !process.env.CLOUDINARY_API_KEY) {
      return NextResponse.json(
        { error: "Cloudinary não está configurado no servidor." },
        { status: 500 },
      );
    }

    const expiresAt = Math.floor(Date.now() / 1000) + 60 * 10;

    const signedDownloadUrl = cloudinary.utils.private_download_url(
      parsed.data.publicId,
      parsed.data.format,
      {
        resource_type: parsed.data.resourceType,
        type: "upload",
        expires_at: expiresAt,
        attachment: parsed.data.attachment ?? false,
      },
    );

    return NextResponse.redirect(signedDownloadUrl);
  } catch (error) {
    console.error("[cloudinary/download]", error);
    return NextResponse.json(
      { error: "Falha ao gerar link de download." },
      { status: 500 },
    );
  }
}
