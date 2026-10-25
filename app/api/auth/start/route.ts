import { NextResponse } from "next/server";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return NextResponse.json({ error: "Requête refusée." }, { status: 403 });
  }

  const body = (await request.json().catch(() => null)) as { email?: unknown } | null;
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!emailPattern.test(email) || email.length > 254) {
    return NextResponse.json({ error: "Saisis une adresse e-mail valide." }, { status: 400 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    if (process.env.NEXT_PUBLIC_DEMO_MODE === "1") return NextResponse.json({ demo: true });
    return NextResponse.json({ error: "La connexion n'est pas configurée." }, { status: 503 });
  }

  const result = await fetch(`${url}/auth/v1/otp?redirect_to=${encodeURIComponent(`${new URL(request.url).origin}/auth/callback`)}`, {
    method: "POST",
    headers: { apikey: key, "content-type": "application/json" },
    body: JSON.stringify({ email, create_user: true }),
    cache: "no-store",
  }).catch(() => null);

  if (!result?.ok) {
    return NextResponse.json({ error: "Le lien n'a pas pu être envoyé. Réessaie dans un instant." }, { status: 502 });
  }
  return NextResponse.json({ sent: true });
}