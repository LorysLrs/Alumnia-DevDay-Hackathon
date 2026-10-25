import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const token = (await cookies()).get("alumnia_access_token")?.value;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!token || !url || !key) return NextResponse.json({ authenticated: false });

  const response = await fetch(`${url}/auth/v1/user`, {
    headers: { apikey: key, authorization: `Bearer ${token}` },
    cache: "no-store",
  }).catch(() => null);
  if (!response?.ok) return NextResponse.json({ authenticated: false }, { status: 401 });

  const user = (await response.json()) as { id?: string; email?: string };
  return NextResponse.json({ authenticated: Boolean(user.id), user: { id: user.id, email: user.email } });
}