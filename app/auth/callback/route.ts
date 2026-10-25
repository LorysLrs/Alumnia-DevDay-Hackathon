import { NextResponse } from "next/server";

const fragmentLanding = `<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Connexion à Alumnia</title></head><body><main><p id="message">Connexion en cours…</p></main><script>
(async()=>{const message=document.getElementById('message');const values=new URLSearchParams(location.hash.slice(1));const access_token=values.get('access_token');const refresh_token=values.get('refresh_token');history.replaceState(null,'',location.pathname);if(!access_token||!refresh_token){message.textContent='Ce lien n’est plus valide. Demande-en un nouveau.';return}try{const response=await fetch('/api/auth/session',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({access_token,refresh_token})});if(!response.ok)throw new Error();location.replace('/hub')}catch{message.textContent='La connexion a échoué. Demande un nouveau lien et réessaie.'}})();
</script></body></html>`;

export async function GET(request: Request) {
  const incoming = new URL(request.url);
  const tokenHash = incoming.searchParams.get("token_hash");
  const type = incoming.searchParams.get("type") ?? "magiclink";
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!tokenHash) return new Response(fragmentLanding, { headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store", "content-security-policy": "default-src 'none'; script-src 'unsafe-inline'; connect-src 'self'; style-src 'unsafe-inline'" } });
  if (!url || !key || !["magiclink", "email", "signup"].includes(type)) {
    return NextResponse.redirect(new URL("/?connexion=expiree", incoming));
  }

  const verified = await fetch(`${url}/auth/v1/verify`, {
    method: "POST",
    headers: { apikey: key, "content-type": "application/json" },
    body: JSON.stringify({ token_hash: tokenHash, type }),
    cache: "no-store",
  }).catch(() => null);
  if (!verified?.ok) return NextResponse.redirect(new URL("/?connexion=expiree", incoming));

  const session = (await verified.json()) as { access_token?: string; refresh_token?: string; expires_in?: number };
  if (!session.access_token || !session.refresh_token) return NextResponse.redirect(new URL("/?connexion=expiree", incoming));
  const secure = incoming.protocol === "https:";
  const response = NextResponse.redirect(new URL("/hub", incoming));
  response.cookies.set("alumnia_access_token", session.access_token, { httpOnly: true, secure, sameSite: "lax", path: "/", maxAge: Math.max(60, session.expires_in ?? 3600) });
  response.cookies.set("alumnia_refresh_token", session.refresh_token, { httpOnly: true, secure, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 30 });
  return response;
}