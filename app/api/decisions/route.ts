import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";
import { authenticatedUser, hasSupabaseConfig, userDatabaseRequest } from "@/lib/supabase-rest";

const DecisionSchema = z.object({
  kind: z.enum(["synth", "report", "step", "alv", "next_action", "brief", "support"]),
  refId: z.string().uuid().nullable().optional(),
  aiOutput: z.unknown(),
  decision: z.enum(["validé", "modifié", "refusé", "envoyé", "choisi", "répondu"]),
  finalValue: z.unknown().nullable().optional(),
});

export async function POST(request: Request) {
  const parsed = DecisionSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Décision invalide." }, { status: 400 });
  if (JSON.stringify(parsed.data).length > 12000) return NextResponse.json({ error: "Décision trop longue." }, { status: 413 });
  if (!hasSupabaseConfig()) return NextResponse.json({ stored: false, demo: true });

  const user = await authenticatedUser();
  const token = (await cookies()).get("alumnia_access_token")?.value;
  if (!user || !token) return NextResponse.json({ error: "Connecte-toi pour enregistrer ta décision." }, { status: 401 });

  const result = await userDatabaseRequest("ai_decisions", token, {
    method: "POST",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify({
      user_id: user.id,
      kind: parsed.data.kind,
      ref_id: parsed.data.refId ?? null,
      ai_output: parsed.data.aiOutput,
      decision: parsed.data.decision,
      final_value: parsed.data.finalValue ?? null,
    }),
  }).catch(() => null);
  if (!result?.ok) return NextResponse.json({ error: "La décision n'a pas pu être enregistrée." }, { status: 503 });
  return NextResponse.json({ stored: true });
}