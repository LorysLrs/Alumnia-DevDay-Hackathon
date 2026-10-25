import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { authenticatedUser, hasSupabaseConfig, userDatabaseRequest } from "@/lib/supabase-rest";

export async function GET() {
  if (!hasSupabaseConfig()) return NextResponse.json({ calls: [], demo: true });
  const user = await authenticatedUser();
  const token = (await cookies()).get("alumnia_access_token")?.value;
  if (!user || !token) return NextResponse.json({ error: "Connecte-toi pour voir les appels IA." }, { status: 401 });
  const response = await userDatabaseRequest("ai_calls?select=task,engine,model,latency_ms,created_at&order=created_at.desc&limit=100", token).catch(() => null);
  if (!response?.ok) return NextResponse.json({ error: "Les appels IA n'ont pas pu être chargés." }, { status: 503 });
  return NextResponse.json({ calls: await response.json() });
}