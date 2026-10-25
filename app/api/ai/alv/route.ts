import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";
import { OPENAI_MODEL } from "@/lib/config";
import { openai } from "@/lib/openai";
import { authenticatedUser, hasSupabaseConfig, userDatabaseRequest } from "@/lib/supabase-rest";

const Input = z.object({
  niveau: z.string().max(80).nullable().optional(),
  formation_quittee: z.string().max(160).nullable().optional(),
  ce_qui_n_a_pas_plu: z.string().max(500).nullable().optional(),
  matieres_preferees: z.array(z.string().max(80)).max(12).default([]),
  etudes_envisagees: z.string().max(100).nullable().optional(),
  alternance: z.string().max(80).nullable().optional(),
  gouts_principaux: z.array(z.object({ gout: z.string().max(60), ce_que_ca_veut_dire: z.string().max(240), score_sur_100: z.number().min(0).max(100) })).max(3),
  activites_adorees: z.array(z.string().max(180)).max(5).default([]),
  activites_rejetees: z.array(z.string().max(180)).max(3).default([]),
  idees_de_metiers: z.string().max(500).nullable().optional(),
  metiers_proposes: z.array(z.string().max(120)).max(3).default([]),
});
const Output = z.object({ resume: z.string().min(1).max(600), doutes: z.array(z.string().min(1).max(240)).length(2), eclaircir: z.array(z.string().min(1).max(240)).length(2) });
const schema = {
  type: "object", additionalProperties: false, required: ["resume", "doutes", "eclaircir"],
  properties: { resume: { type: "string" }, doutes: { type: "array", items: { type: "string" } }, eclaircir: { type: "array", items: { type: "string" } } },
} as const;

export async function POST(request: Request) {
  const parsed = Input.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Données de profil invalides." }, { status: 400 });
  if (!hasSupabaseConfig()) return NextResponse.json({ profile: null, engine: "secours", model: null });
  const user = await authenticatedUser();
  const token = (await cookies()).get("alumnia_access_token")?.value;
  if (!user || !token) return NextResponse.json({ error: "Connecte-toi pour ouvrir cette fiche." }, { status: 401 });
  if (!openai) return NextResponse.json({ profile: null, engine: "secours", model: null });

  const started = Date.now();
  try {
    const response = await openai.responses.create({
      model: OPENAI_MODEL,
      input: [
        { role: "system", content: "Prepare a concise profile for a professional before a career event. Write in clear English and in the third person. Summarize the young person's interests and career ideas without copying their wording, naming their school or revealing contact details. Preserve French education terms such as BTS, BUT, licence, master and alternance. Do not invent concerns; when information is missing, say what could be explored. Return only the requested JSON." },
        { role: "user", content: JSON.stringify(parsed.data) },
      ],
      text: { format: { type: "json_schema", name: "fiche_pro_alumnia", strict: true, schema } },
    }, { timeout: 15000 });
    const profile = Output.parse(JSON.parse(response.output_text));
    const ms = Date.now() - started;
    await userDatabaseRequest("ai_calls", token, {
      method: "POST", headers: { Prefer: "return=minimal" },
      body: JSON.stringify({ user_id: user.id, task: "alv", engine: "openai", model: OPENAI_MODEL, latency_ms: ms }),
    }).catch(() => null);
    return NextResponse.json({ profile, engine: "openai", model: OPENAI_MODEL, ms });
  } catch {
    return NextResponse.json({ profile: null, engine: "secours", model: null, ms: Date.now() - started });
  }
}
