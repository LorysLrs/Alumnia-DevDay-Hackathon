import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";
import { authenticatedUser, hasSupabaseConfig, userDatabaseRequest } from "@/lib/supabase-rest";

const Id = z.string().uuid();
const Question = z.object({ text: z.string().trim().min(3).max(200), position: z.number().int().min(0).max(100).default(0) });
type Context = { params: Promise<{ id: string }> };

async function session() {
  const user = await authenticatedUser();
  const token = (await cookies()).get("alumnia_access_token")?.value;
  return user && token ? { user, token } : null;
}

export async function GET(_request: Request, { params }: Context) {
  const { id } = await params;
  if (!Id.safeParse(id).success) return NextResponse.json({ error: "Échange invalide." }, { status: 400 });
  if (!hasSupabaseConfig()) return NextResponse.json({ questions: [], demo: true });
  const auth = await session();
  if (!auth) return NextResponse.json({ error: "Connecte-toi pour voir ce brief." }, { status: 401 });
  const result = await userDatabaseRequest(`brief_questions?meeting_id=eq.${id}&select=id,text,source,status,edited,position&order=position.asc`, auth.token).catch(() => null);
  if (!result?.ok) return NextResponse.json({ error: "Le brief n'a pas pu être chargé." }, { status: 503 });
  return NextResponse.json({ questions: await result.json() });
}

export async function POST(request: Request, { params }: Context) {
  const { id } = await params;
  if (!Id.safeParse(id).success) return NextResponse.json({ error: "Échange invalide." }, { status: 400 });
  const parsed = Question.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Question invalide." }, { status: 400 });
  if (!hasSupabaseConfig()) return NextResponse.json({ saved: false, demo: true });
  const auth = await session();
  if (!auth) return NextResponse.json({ error: "Connecte-toi pour enregistrer ce brief." }, { status: 401 });
  const result = await userDatabaseRequest("brief_questions", auth.token, {
    method: "POST", headers: { Prefer: "return=representation" },
    body: JSON.stringify({ meeting_id: id, text: parsed.data.text, source: "eleve", status: "kept", position: parsed.data.position }),
  }).catch(() => null);
  if (!result?.ok) return NextResponse.json({ error: "La question n'a pas pu être enregistrée." }, { status: 503 });
  return NextResponse.json({ saved: true, question: (await result.json())[0] }, { status: 201 });
}