import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";
import { authenticatedUser, hasSupabaseConfig, userDatabaseRequest } from "@/lib/supabase-rest";

const Input = z.object({ actionId: z.string().min(1).max(100), decision: z.enum(["accepted", "other", "not_now"]), text: z.string().trim().max(300).optional() }).refine((v) => v.decision !== "other" || Boolean(v.text));

export async function POST(request: Request) {
  const parsed = Input.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Décision invalide." }, { status: 400 });
  if (!hasSupabaseConfig()) return NextResponse.json({ saved: false, demo: true });
  const user = await authenticatedUser();
  const token = (await cookies()).get("alumnia_access_token")?.value;
  if (!user || !token) return NextResponse.json({ error: "Connecte-toi pour enregistrer cette décision." }, { status: 401 });
  const decision = parsed.data.decision === "accepted" ? "validé" : parsed.data.decision === "other" ? "modifié" : "refusé";
  const response = await userDatabaseRequest("ai_decisions", token, {
    method: "POST", headers: { Prefer: "return=minimal" },
    body: JSON.stringify({ user_id: user.id, kind: "next_action", ai_output: { actionId: parsed.data.actionId }, decision, final_value: parsed.data.text ? { text: parsed.data.text } : null }),
  }).catch(() => null);
  if (!response?.ok) return NextResponse.json({ error: "La décision n'a pas pu être enregistrée." }, { status: 503 });
  return NextResponse.json({ saved: true });
}