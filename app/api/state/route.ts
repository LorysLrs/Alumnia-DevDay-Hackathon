import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";
import { authenticatedUser, hasSupabaseConfig, userDatabaseRequest } from "@/lib/supabase-rest";

const StateSchema = z.object({
  persona: z.string().max(40).optional(),
  ctx: z.record(z.string(), z.unknown()).optional(),
  ans: z.record(z.string(), z.unknown()).optional(),
  profile: z.unknown().nullable().optional(),
  steps: z.record(z.string(), z.unknown()).optional(),
  past: z.array(z.unknown()).max(100).optional(),
  extras: z.array(z.unknown()).max(100).optional(),
  jobIx: z.number().int().min(0).max(20).optional(),
  alFilter: z.string().max(80).nullable().optional(),
  pick: z.string().max(100).nullable().optional(),
  slot: z.number().int().min(0).max(100).optional(),
  rdv: z.unknown().nullable().optional(),
  checked: z.record(z.string(), z.unknown()).optional(),
  notes: z.string().max(12000).optional(),
  report: z.unknown().nullable().optional(),
  celebrated: z.record(z.string(), z.unknown()).optional(),
  ai: z.record(z.string(), z.unknown()).optional(),
  alv: z.unknown().nullable().optional(),
  aiCount: z.number().int().min(0).max(100000).optional(),
  log: z.array(z.unknown()).max(40).optional(),
  dec: z.record(z.string(), z.unknown()).optional(),
  brief: z.array(z.unknown()).max(80).nullable().optional(),
  briefFor: z.string().max(100).nullable().optional(),
  briefSent: z.union([z.number(), z.string()]).nullable().optional(),
});

export async function GET() {
  if (!hasSupabaseConfig()) return NextResponse.json({ authenticated: false, demo: true });
  const user = await authenticatedUser();
  const token = (await cookies()).get("alumnia_access_token")?.value;
  if (!user || !token) return NextResponse.json({ authenticated: false });
  const result = await userDatabaseRequest(`student_workspaces?user_id=eq.${encodeURIComponent(user.id)}&select=state,updated_at&limit=1`, token).catch(() => null);
  if (!result?.ok) return NextResponse.json({ error: "Ton espace n'a pas pu être chargé." }, { status: 503 });
  const rows = await result.json();
  return NextResponse.json({ authenticated: true, userId: user.id, state: rows[0]?.state ?? null, updatedAt: rows[0]?.updated_at ?? null });
}

export async function PUT(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return NextResponse.json({ error: "Requête refusée." }, { status: 403 });
  if (!hasSupabaseConfig()) return NextResponse.json({ stored: false, demo: true });
  const user = await authenticatedUser();
  const token = (await cookies()).get("alumnia_access_token")?.value;
  if (!user || !token) return NextResponse.json({ error: "Connecte-toi pour enregistrer ton espace." }, { status: 401 });
  const parsed = StateSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success || JSON.stringify(parsed.data).length > 32000) return NextResponse.json({ error: "Espace invalide ou trop volumineux." }, { status: 400 });
  const result = await userDatabaseRequest("student_workspaces?on_conflict=user_id", token, {
    method: "POST",
    headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
    body: JSON.stringify({ user_id: user.id, state: parsed.data, updated_at: new Date().toISOString() }),
  }).catch(() => null);
  if (!result?.ok) return NextResponse.json({ error: "Ton espace n'a pas pu être enregistré." }, { status: 503 });
  return NextResponse.json({ stored: true });
}
