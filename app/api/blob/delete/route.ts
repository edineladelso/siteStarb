import { del } from "@vercel/blob";
import { db } from "@/lib/drizzle/db";
import { profiles } from "@/lib/drizzle/db/schema/profile";
import {
  getLivroBlobPathnameFromUrl,
  normalizeLivroBlobPathname,
} from "@/lib/blob/livros";
import { createSSClient } from "@/lib/supabase/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";

const DeleteBodySchema = z
  .object({
    url: z.string().url().optional(),
    pathname: z.string().min(1).optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.url && !data.pathname) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Informe a url ou pathname do arquivo.",
      });
    }
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

    const admin = await isAuthenticatedAdmin();

    if (!admin) {
      return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
    }

    const json = await request.json();
    const parsed = DeleteBodySchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Payload inválido para remoção Blob." },
        { status: 400 },
      );
    }

    const pathname = parsed.data.pathname
      ? normalizeLivroBlobPathname(parsed.data.pathname)
      : getLivroBlobPathnameFromUrl(parsed.data.url || "");

    await del(pathname);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[blob/delete]", error);
    return NextResponse.json(
      { error: "Erro interno ao remover arquivo Blob." },
      { status: 500 },
    );
  }
}
