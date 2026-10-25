import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";
import { authenticatedUser, hasSupabaseConfig, userDatabaseRequest } from "@/lib/supabase-rest";

const SupportSchema = z.object({ source: z.enum(["copilote", "profil", "autre"]).default("copilote") });

export async function POST(request: Request) {
  const parsed = SupportSchema.safeParse(await request.json().catch(() => ({})));
  if (!parsed.success) return NextResponse.json({ error: "Demande invalide." }, { status: 400 });
  if (!hasSupabaseConfig()) return NextResponse.json({ created: false, demo: true });
  const user = await authenticatedUser();
  const token = (await cookies()).get("alumnia_access_token")?.value;
  if (!user || !token) return NextResponse.json({ error: "Connecte-toi pour contacter l'équipe." }, { status: 401 });
  const result = await userDatabaseRequest("support_requests", token, {
    method: "POST", headers: { Prefer: "return=minimal" },
    body: JSON.stringify({ user_id: user.id, source: parsed.data.source }),
  }).catch(() => null);
  if (!result?.ok) return NextResponse.json({ error: "La demande n'a pas pu être transmise." }, { status: 503 });
  return NextResponse.json({ created: true });
}