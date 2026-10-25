import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { authenticatedUser, hasSupabaseConfig, userDatabaseRequest } from "@/lib/supabase-rest";

export async function GET() {
  if (!hasSupabaseConfig()) return NextResponse.json({ demo: true, profile: null, roadmaps: [], meetings: [], decisions: [], opportunities: [], aiCalls: [] });
  const user = await authenticatedUser();
  const token = (await cookies()).get("alumnia_access_token")?.value;
  if (!user || !token) return NextResponse.json({ error: "Connecte-toi pour ouvrir ton hub." }, { status: 401 });
  const id = encodeURIComponent(user.id);
  const paths = [
    `profiles?user_id=eq.${id}&select=profile,riasec_code&limit=1`,
    `roadmaps?user_id=eq.${id}&select=id,domain,job_ids,content,steps_done,created_at&order=created_at.desc`,
    `meetings?or=(student_id.eq.${id},alumni_id.eq.${id})&select=id,student_id,alumni_id,slot,status,brief_sent_at,created_at&order=created_at.desc`,
    `ai_decisions?select=id,kind,ref_id,ai_output,decision,final_value,created_at&order=created_at.desc&limit=6`,
    "opportunities?published=eq.true&select=id,kind,title,date_label,why,stages,job_titles,company_id",
    "ai_calls?select=task,engine,model,latency_ms,created_at&order=created_at.desc&limit=100",
  ];
  const responses = await Promise.all(paths.map((path) => userDatabaseRequest(path, token).catch(() => null)));
  if (responses.some((response) => !response?.ok)) return NextResponse.json({ error: "Le hub n'a pas pu être chargé." }, { status: 503 });
  const [profiles, roadmaps, meetings, decisions, opportunities, aiCalls] = await Promise.all(responses.map((response) => response!.json()));
  return NextResponse.json({ profile: profiles[0]?.profile ?? null, roadmaps, meetings, decisions, opportunities, aiCalls });
}