import { randomUUID } from "node:crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { authenticatedUser, hasSupabaseConfig, userDatabaseRequest } from "@/lib/supabase-rest";

export const runtime = "nodejs";
const MAX_BYTES = 10 * 1024 * 1024;
const TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);
const safeName = (value: string) => value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/^-+|-+$/g, "").slice(-100) || "resume";

async function identity() {
  const user = await authenticatedUser();
  const token = (await cookies()).get("alumnia_access_token")?.value;
  return user && token ? { user, token } : null;
}

export async function GET() {
  if (!hasSupabaseConfig()) return NextResponse.json({ documents: [], demo: true });
  const auth = await identity();
  if (!auth) return NextResponse.json({ error: "Sign in to view your CVs." }, { status: 401 });
  const response = await userDatabaseRequest(
    `career_documents?user_id=eq.${encodeURIComponent(auth.user.id)}&select=id,original_name,content_type,size_bytes,created_at&order=created_at.desc`,
    auth.token,
  ).catch(() => null);
  if (!response?.ok) return NextResponse.json({ error: "Your CV library could not be loaded." }, { status: 503 });
  return NextResponse.json({ documents: await response.json() });
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return NextResponse.json({ error: "Request refused." }, { status: 403 });
  if (!hasSupabaseConfig()) return NextResponse.json({ error: "CV storage is not configured." }, { status: 503 });
  const auth = await identity();
  if (!auth) return NextResponse.json({ error: "Sign in to upload a CV." }, { status: 401 });
  const form = await request.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File) || file.size < 1 || file.size > MAX_BYTES || !TYPES.has(file.type)) {
    return NextResponse.json({ error: "Choose a PDF, DOC, or DOCX file up to 10 MB." }, { status: 400 });
  }

  const configUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  const apiKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!configUrl || !apiKey) return NextResponse.json({ error: "CV storage is not configured." }, { status: 503 });
  const id = randomUUID();
  const path = `${auth.user.id}/${id}-${safeName(file.name)}`;
  const headers = { apikey: apiKey, authorization: `Bearer ${auth.token}`, "content-type": file.type, "x-upsert": "false" };
  const uploaded = await fetch(`${configUrl}/storage/v1/object/career-documents/${path.split("/").map(encodeURIComponent).join("/")}`, {
    method: "POST", headers, body: await file.arrayBuffer(), cache: "no-store",
  }).catch(() => null);
  if (!uploaded?.ok) return NextResponse.json({ error: "The CV could not be uploaded." }, { status: 502 });

  const saved = await userDatabaseRequest("career_documents", auth.token, {
    method: "POST", headers: { Prefer: "return=representation" },
    body: JSON.stringify({ id, user_id: auth.user.id, storage_path: path, original_name: file.name.slice(0, 240), content_type: file.type, size_bytes: file.size }),
  }).catch(() => null);
  if (!saved?.ok) {
    await fetch(`${configUrl}/storage/v1/object/career-documents/${path.split("/").map(encodeURIComponent).join("/")}`, { method: "DELETE", headers: { apikey: apiKey, authorization: `Bearer ${auth.token}` }, cache: "no-store" }).catch(() => null);
    return NextResponse.json({ error: "The CV could not be added to your private library." }, { status: 503 });
  }
  const rows = await saved.json();
  return NextResponse.json({ document: rows[0] }, { status: 201 });
}

export async function DELETE(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return NextResponse.json({ error: "Request refused." }, { status: 403 });
  const auth = await identity();
  if (!auth) return NextResponse.json({ error: "Sign in to delete a CV." }, { status: 401 });
  const id = new URL(request.url).searchParams.get("id");
  if (!id || !/^[0-9a-f-]{36}$/i.test(id)) return NextResponse.json({ error: "CV not found." }, { status: 404 });
  const listed = await userDatabaseRequest(`career_documents?id=eq.${encodeURIComponent(id)}&select=id,storage_path&limit=1`, auth.token).catch(() => null);
  if (!listed?.ok) return NextResponse.json({ error: "The CV could not be found." }, { status: 404 });
  const rows = await listed.json();
  const doc = rows[0] as { id: string; storage_path: string } | undefined;
  if (!doc) return NextResponse.json({ error: "CV not found." }, { status: 404 });

  const configUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  const apiKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!configUrl || !apiKey) return NextResponse.json({ error: "CV storage is not configured." }, { status: 503 });
  const path = doc.storage_path.split("/").map(encodeURIComponent).join("/");
  const removed = await fetch(`${configUrl}/storage/v1/object/career-documents/${path}`, {
    method: "DELETE", headers: { apikey: apiKey, authorization: `Bearer ${auth.token}` }, cache: "no-store",
  }).catch(() => null);
  if (!removed?.ok) return NextResponse.json({ error: "The CV file could not be deleted." }, { status: 502 });
  const row = await userDatabaseRequest(`career_documents?id=eq.${encodeURIComponent(id)}`, auth.token, { method: "DELETE" }).catch(() => null);
  if (!row?.ok) return NextResponse.json({ error: "The CV file was deleted, but its library entry could not be removed." }, { status: 503 });
  return NextResponse.json({ deleted: true });
}
