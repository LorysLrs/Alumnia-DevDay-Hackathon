import { cookies } from "next/headers";

export type AuthenticatedUser = { id: string; email?: string };

export function hasSupabaseConfig() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

function config() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return { url, key };
}

export async function authenticatedUser(): Promise<AuthenticatedUser | null> {
  const cfg = config();
  const token = (await cookies()).get("alumnia_access_token")?.value;
  if (!cfg || !token) return null;
  const response = await fetch(`${cfg.url}/auth/v1/user`, {
    headers: { apikey: cfg.key, authorization: `Bearer ${token}` },
    cache: "no-store",
  }).catch(() => null);
  if (!response?.ok) return null;
  const user = (await response.json()) as AuthenticatedUser;
  return user.id ? user : null;
}

export async function userDatabaseRequest(path: string, token: string, init: RequestInit = {}) {
  const cfg = config();
  if (!cfg) throw new Error("Supabase is not configured");
  const headers = new Headers(init.headers);
  headers.set("apikey", cfg.key);
  headers.set("authorization", `Bearer ${token}`);
  if (init.body) headers.set("content-type", "application/json");
  return fetch(`${cfg.url}/rest/v1/${path}`, { ...init, headers, cache: "no-store" });
}

export async function persistQuestionnaire(userId: string, token: string, answers: unknown, profile: unknown, riasecCode: string) {
  const answerResult = await userDatabaseRequest("questionnaire_answers", token, {
    method: "POST",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify({ user_id: userId, answers }),
  });
  if (!answerResult.ok) throw new Error("Questionnaire save failed");

  const profileResult = await userDatabaseRequest("profiles?on_conflict=user_id", token, {
    method: "POST",
    headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
    body: JSON.stringify({ user_id: userId, profile, riasec_code: riasecCode }),
  });
  if (!profileResult.ok) throw new Error("Profile save failed");
}