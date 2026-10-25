import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";
import { authenticatedUser, hasSupabaseConfig, userDatabaseRequest } from "@/lib/supabase-rest";

export async function POST(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!z.string().uuid().safeParse(id).success) return NextResponse.json({ error: "Échange invalide." }, { status: 400 });
  if (!hasSupabaseConfig()) return NextResponse.json({ sent: false, demo: true });
  const user = await authenticatedUser();
  const token = (await cookies()).get("alumnia_access_token")?.value;
  if (!user || !token) return NextResponse.json({ error: "Connecte-toi pour envoyer ce brief." }, { status: 401 });
  const questions = await userDatabaseRequest(`brief_questions?meeting_id=eq.${id}&status=eq.kept&select=id`, token).catch(() => null);
  if (!questions?.ok) return NextResponse.json({ error: "Les questions gardées n'ont pas pu être chargées." }, { status: 503 });
  const kept = (await questions.json()) as unknown[];
  if (!kept.length) return NextResponse.json({ error: "Garde au moins une question avant l'envoi." }, { status: 409 });
  const update = await userDatabaseRequest(`meetings?id=eq.${id}`, token, {
    method: "PATCH", headers: { Prefer: "return=minimal" }, body: JSON.stringify({ brief_sent_at: new Date().toISOString() }),
  }).catch(() => null);
  if (!update?.ok) return NextResponse.json({ error: "Le brief n'a pas pu être envoyé." }, { status: 503 });
  return NextResponse.json({ sent: true, count: kept.length });
}