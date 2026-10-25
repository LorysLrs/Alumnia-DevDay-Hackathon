import { NextResponse } from "next/server";
import { z } from "zod";

const Tokens = z.object({ access_token: z.string().min(20).max(8192), refresh_token: z.string().min(20).max(8192) });

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return NextResponse.json({ error: "Requête refusée." }, { status: 403 });
  const parsed = Tokens.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Session invalide." }, { status: 400 });
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return NextResponse.json({ error: "La connexion n'est pas configurée." }, { status: 503 });
  const verified = await fetch(`${url}/auth/v1/user`, { headers: { apikey: key, authorization: `Bearer ${parsed.data.access_token}` }, cache: "no-store" }).catch(() => null);
  if (!verified?.ok) return NextResponse.json({ error: "Session expirée." }, { status: 401 });
  const secure = new URL(request.url).protocol === "https:";
  const response = NextResponse.json({ authenticated: true });
  response.cookies.set("alumnia_access_token", parsed.data.access_token, { httpOnly: true, secure, sameSite: "lax", path: "/", maxAge: 3600 });
  response.cookies.set("alumnia_refresh_token", parsed.data.refresh_token, { httpOnly: true, secure, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 30 });
  return response;
}