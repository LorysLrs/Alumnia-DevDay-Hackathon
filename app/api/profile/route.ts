import { NextResponse } from "next/server";
import { authenticatedUser, hasSupabaseConfig, persistQuestionnaire } from "@/lib/supabase-rest";
import { structuredResponse } from "@/lib/openai";
import { answersToText, buildBaseProfile, fallbackProfile, PROFILE_SYSTEM_PROMPT } from "@/lib/questionnaire/profile";
import { AnswersSchema, PROFILE_AI_JSON_SCHEMA, ProfileAiSchema } from "@/lib/questionnaire/schema";
import { scoreRiasec } from "@/lib/questionnaire/scoring";
import type { Profile, QuestionnaireAnswers } from "@/lib/questionnaire/types";

async function saveForSignedInUser(answers: QuestionnaireAnswers, profile: Profile) {
  if (!hasSupabaseConfig()) return;
  const cfgUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
  const cfgKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const { cookies } = await import("next/headers");
  const token = (await cookies()).get("alumnia_access_token")?.value;
  const user = await authenticatedUser();
  if (!user || !token || !cfgUrl || !cfgKey) throw new Error("Authentication required");
  await persistQuestionnaire(user.id, token, answers, profile, profile.riasec.code);
}

// The RIASEC score is always calculated on the server. AI only writes the narrative.
export async function POST(req: Request) {
  const parsed = AnswersSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Réponses invalides", details: parsed.error.flatten() }, { status: 400 });
  }
  const answers = parsed.data as QuestionnaireAnswers;
  const riasec = scoreRiasec(answers.riasec);
  let profile: Profile;

  try {
    const ai = ProfileAiSchema.parse(
      await structuredResponse({
        system: PROFILE_SYSTEM_PROMPT,
        user: `Réponses de l'élève :\n${answersToText(answers, riasec)}\n\nRédige son profil.`,
        schemaName: "profil_alumnia",
        schema: PROFILE_AI_JSON_SCHEMA,
      }),
    );
    profile = { ...buildBaseProfile(answers, riasec), ...ai, genere_par: "ia" };
  } catch {
    profile = fallbackProfile(answers, riasec);
  }

  try {
    await saveForSignedInUser(answers, profile);
  } catch {
    return NextResponse.json({ error: "Ton profil n'a pas pu être enregistré. Réessaie." }, { status: 503 });
  }
  return NextResponse.json({ profile });
}