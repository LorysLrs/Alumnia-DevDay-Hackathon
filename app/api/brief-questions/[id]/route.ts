import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";
import { authenticatedUser, hasSupabaseConfig, userDatabaseRequest } from "@/lib/supabase-rest";

const Id = z.string().uuid();
const Update = z.object({
  status: z.enum(["proposed", "kept", "removed"]).optional(),
  text: z.string().trim().min(3).max(200).optional(),
}).refine((value) => value.status !== undefined || value.text !== undefined);

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!Id.safeParse(id).success) return NextResponse.json({ error: "Question invalide." }, { status: 400 });
  const parsed = Update.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Modification invalide." }, { status: 400 });
  if (!hasSupabaseConfig()) return NextResponse.json({ saved: false, demo: true });
  const user = await authenticatedUser();
  const token = (await cookies()).get("alumnia_access_token")?.value;
  if (!user || !token) return NextResponse.json({ error: "Connecte-toi pour modifier ce brief." }, { status: 401 });
  const result = await userDatabaseRequest(`brief_questions?id=eq.${id}`, token, {
    method: "PATCH", headers: { Prefer: "return=minimal" }, body: JSON.stringify({ ...parsed.data, edited: parsed.data.text !== undefined }),
  }).catch(() => null);
  if (!result?.ok) return NextResponse.json({ error: "La question n'a pas pu être modifiée." }, { status: 503 });
  return NextResponse.json({ saved: true });
}