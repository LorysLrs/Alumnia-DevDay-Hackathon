import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { authenticatedUser, hasSupabaseConfig } from "@/lib/supabase-rest";

export async function DELETE(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return NextResponse.json({ error: "Requête refusée." }, { status: 403 });
  if (!hasSupabaseConfig()) {
    if (process.env.NEXT_PUBLIC_DEMO_MODE === "1") return NextResponse.json({ deleted: false, demo: true });
    return NextResponse.json({ error: "La suppression n'est pas configurée." }, { status: 503 });
  }

  const user = await authenticatedUser();
  const token = (await cookies()).get("alumnia_access_token")?.value;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  if (!user || !token) return NextResponse.json({ error: "Connecte-toi pour supprimer tes données." }, { status: 401 });
  if (!serviceKey || !url) return NextResponse.json({ error: "La suppression du compte n'est pas encore configurée." }, { status: 503 });

  const deleted = await fetch(`${url}/auth/v1/admin/users/${encodeURIComponent(user.id)}`, {
    method: "DELETE",
    headers: { apikey: serviceKey, authorization: `Bearer ${serviceKey}` },
    cache: "no-store",
  }).catch(() => null);
  if (!deleted?.ok) return NextResponse.json({ error: "Le compte n'a pas pu être supprimé. Réessaie." }, { status: 502 });
  const response = NextResponse.json({ deleted: true });
  for (const name of ["alumnia_access_token", "alumnia_refresh_token"]) {
    response.cookies.set(name, "", { httpOnly: true, secure: new URL(request.url).protocol === "https:", sameSite: "lax", path: "/", maxAge: 0 });
  }
  return response;
}