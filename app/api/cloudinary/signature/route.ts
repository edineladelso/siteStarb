import { db } from "@/lib/drizzle/db";
import { profiles } from "@/lib/drizzle/db/schema/profile";
import cloudinary from "@/lib/cloudinary";
import { createSSClient } from "@/lib/supabase/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";

const SignatureBodySchema = z.object({
  folder: z.string().min(1).max(180).optional(),
  resourceType: z.enum(["image", "raw", "auto"]).optional(),
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

function normalizeFolder(folder?: string): string {
  const base = (folder ?? "starb/livros").trim().replace(/^\/+|\/+$/g, "");

  if (!base.startsWith("starb/")) {
    throw new Error("Pasta inválida para upload.");
  }

  if (base.includes("..")) {
    throw new Error("Pasta inválida para upload.");
  }

  return base;
}

export async function POST(request: Request) {
  try {
    const cloudName =
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
      process.env.NEXT_PUBLIC_CLOUDINARY_NAME;

    const admin = await isAuthenticatedAdmin();

    if (!admin) {
      return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
    }

    const json = await request.json();
    const parsed = SignatureBodySchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Payload inválido para assinatura." },
        { status: 400 },
      );
    }

    if (
      !cloudName ||
      !process.env.CLOUDINARY_API_SECRET ||
      !process.env.CLOUDINARY_API_KEY
    ) {
      return NextResponse.json(
        { error: "Cloudinary não está configurado no servidor." },
        { status: 500 },
      );
    }

    const folder = normalizeFolder(parsed.data.folder);
    const timestamp = Math.floor(Date.now() / 1000);

    const signature = cloudinary.utils.api_sign_request(
      {
        folder,
        timestamp,
      },
      process.env.CLOUDINARY_API_SECRET,
    );

    return NextResponse.json({
      signature,
      timestamp,
      apiKey: process.env.CLOUDINARY_API_KEY,
      cloudName,
      folder,
      resourceType: parsed.data.resourceType ?? "auto",
    });
  } catch (error) {
    console.error("[cloudinary/signature]", error);
    return NextResponse.json(
      { error: "Não foi possível gerar assinatura de upload." },
      { status: 500 },
    );
  }
}
