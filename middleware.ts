import { NextRequest, NextResponse } from "next/server";

function tokenIsFresh(token: string) {
  try {
    const part = token.split(".")[1]?.replace(/-/g, "+").replace(/_/g, "/");
    if (!part) return false;
    const payload = JSON.parse(atob(part)) as { exp?: number };
    return typeof payload.exp === "number" && payload.exp > Date.now() / 1000 + 60;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("alumnia_access_token")?.value;
  const refreshToken = request.cookies.get("alumnia_refresh_token")?.value;
  if (!refreshToken || (accessToken && tokenIsFresh(accessToken))) return NextResponse.next();

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return NextResponse.next();

  const refreshed = await fetch(`${url}/auth/v1/token?grant_type=refresh_token`, {
    method: "POST",
    headers: { apikey: key, "content-type": "application/json" },
    body: JSON.stringify({ refresh_token: refreshToken }),
    cache: "no-store",
  }).catch(() => null);

  if (!refreshed?.ok) {
    const response = NextResponse.next();
    for (const name of ["alumnia_access_token", "alumnia_refresh_token"]) {
      response.cookies.set(name, "", { httpOnly: true, secure: request.nextUrl.protocol === "https:", sameSite: "lax", path: "/", maxAge: 0 });
    }
    return response;
  }

  const session = (await refreshed.json()) as { access_token?: string; refresh_token?: string; expires_in?: number };
  if (!session.access_token || !session.refresh_token) return NextResponse.next();
  const response = NextResponse.next();
  const secure = request.nextUrl.protocol === "https:";
  response.cookies.set("alumnia_access_token", session.access_token, {
    httpOnly: true, secure, sameSite: "lax", path: "/", maxAge: Math.max(60, session.expires_in ?? 3600),
  });
  response.cookies.set("alumnia_refresh_token", session.refresh_token, {
    httpOnly: true, secure, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 30,
  });
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|html)$).*)"],
};