import { db } from "@/lib/drizzle/db";
import { profiles } from "@/lib/drizzle/db/schema/profile";
import cloudinary from "@/lib/cloudinary";
import { createSSClient } from "@/lib/supabase/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";

const DeleteBodySchema = z.object({
  publicId: z.string().min(1),
  resourceType: z.enum(["image", "raw", "video", "auto"]).optional(),
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

export async function POST(request: Request) {
  try {
    const admin = await isAuthenticatedAdmin();

    if (!admin) {
      return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
    }

    const json = await request.json();
    const parsed = DeleteBodySchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Payload inválido para remoção." },
        { status: 400 },
      );
    }

    const result = await cloudinary.uploader.destroy(parsed.data.publicId, {
      resource_type: parsed.data.resourceType ?? "image",
      invalidate: true,
    });

    const ok = result.result === "ok" || result.result === "not found";

    if (!ok) {
      return NextResponse.json(
        { error: "Falha ao remover asset do Cloudinary." },
        { status: 400 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[cloudinary/delete]", error);
    return NextResponse.json(
      { error: "Erro interno ao remover arquivo." },
      { status: 500 },
    );
  }
}
