import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";
import { OPENAI_MODEL } from "@/lib/config";
import { openai } from "@/lib/openai";
import { authenticatedUser, hasSupabaseConfig, userDatabaseRequest } from "@/lib/supabase-rest";

const Input = z.object({ job: z.string().trim().min(1).max(120), notes: z.string().trim().min(1).max(5000) });
const Output = z.object({
  retiens: z.array(z.string().trim().min(1).max(300)).length(3),
  etape: z.object({ titre: z.string().trim().min(1).max(80), quand: z.string().trim().min(1).max(100) }),
  merci: z.string().trim().min(1).max(400),
});
const schema = {
  type: "object", additionalProperties: false, required: ["retiens", "etape", "merci"],
  properties: {
    retiens: { type: "array", items: { type: "string" } },
    etape: { type: "object", additionalProperties: false, required: ["titre", "quand"], properties: { titre: { type: "string" }, quand: { type: "string" } } },
    merci: { type: "string" },
  },
} as const;

export async function POST(request: Request) {
  const parsed = Input.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Notes invalides." }, { status: 400 });
  const configured = hasSupabaseConfig();
  const user = configured ? await authenticatedUser() : null;
  const token = configured ? (await cookies()).get("alumnia_access_token")?.value : undefined;
  if (configured && (!user || !token)) return NextResponse.json({ error: "Connecte-toi pour préparer ton compte rendu." }, { status: 401 });
  if (!openai || !user || !token) return NextResponse.json({ report: null, engine: "secours", model: null });

  const notes = parsed.data.notes
    .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, "[adresse masquée]")
    .replace(/(?:\+?33|0)[1-9](?:[ .-]?\d{2}){4}/g, "[numéro masqué]");
  const started = Date.now();
  let report: z.infer<typeof Output>;
  try {
    const response = await openai.responses.create({
      model: OPENAI_MODEL,
      input: [
        { role: "system", content: "Help a young person reflect on a career event. Write in clear English and preserve French education terms. Summarize three useful takeaways without copying the notes. Suggest one concrete next step in eight words or fewer and a reasonable timeframe. Write a thank-you note of no more than two sentences in the first person. Do not invent facts or figures. Do not add anything to the career plan; the student decides separately." },
        { role: "user", content: JSON.stringify({ metier: parsed.data.job, notes }) },
      ],
      text: { format: { type: "json_schema", name: "compte_rendu_alumnia", strict: true, schema } },
    }, { timeout: 15000 });
    report = Output.parse(JSON.parse(response.output_text));
  } catch {
    return NextResponse.json({ report: null, engine: "secours", model: null, ms: Date.now() - started });
  }

  const ms = Date.now() - started;
  await userDatabaseRequest("ai_calls", token, {
    method: "POST", headers: { Prefer: "return=minimal" },
    body: JSON.stringify({ user_id: user.id, task: "report", engine: "openai", model: OPENAI_MODEL, latency_ms: ms }),
  }).catch(() => null);
  return NextResponse.json({ report, engine: "openai", model: OPENAI_MODEL, ms });
}
