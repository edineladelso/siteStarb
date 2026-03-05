import type { HandleUploadBody } from "@vercel/blob/client";
import { handleUpload } from "@vercel/blob/client";
import { db } from "@/lib/drizzle/db";
import { profiles } from "@/lib/drizzle/db/schema/profile";
import {
  LIVRO_BLOB_ALLOWED_CONTENT_TYPES,
  LIVRO_BLOB_MAX_SIZE_BYTES,
  normalizeLivroBlobPathname,
} from "@/lib/blob/livros";
import { createSSClient } from "@/lib/supabase/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";

const UploadEventSchema = z.object({
  type: z.enum(["blob.generate-client-token", "blob.upload-completed"]),
  payload: z.record(z.string(), z.unknown()),
});

async function isAuthenticatedAdmin() {
  const supabase = await createSSClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return false;
  }

  const [profile] = await db
    .select({ role: profiles.role })
    .from(profiles)
    .where(eq(profiles.id, user.id))
    .limit(1);

  return profile?.role === "admin";
}

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json(
        { error: "BLOB_READ_WRITE_TOKEN não configurado no servidor." },
        { status: 500 },
      );
    }

    const json = await request.json();
    const parsed = UploadEventSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Payload inválido para upload Blob." },
        { status: 400 },
      );
    }

    if (parsed.data.type === "blob.generate-client-token") {
      const admin = await isAuthenticatedAdmin();

      if (!admin) {
        return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
      }
    }

    const result = await handleUpload({
      body: parsed.data as unknown as HandleUploadBody,
      request,
      onBeforeGenerateToken: async (pathname) => {
        normalizeLivroBlobPathname(pathname);

        return {
          allowedContentTypes: [...LIVRO_BLOB_ALLOWED_CONTENT_TYPES],
          addRandomSuffix: false,
          allowOverwrite: false,
          maximumSizeInBytes: LIVRO_BLOB_MAX_SIZE_BYTES,
        };
      },
      onUploadCompleted: async () => {
        // Sem efeito colateral por enquanto. A URL já é persistida no submit do formulário.
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Falha ao gerar token de upload Blob.";

    const status =
      message === "Não autorizado."
        ? 401
        : message.includes("inválido")
          ? 400
          : 500;

    console.error("[blob/upload]", error);
    return NextResponse.json({ error: message }, { status });
  }
}
