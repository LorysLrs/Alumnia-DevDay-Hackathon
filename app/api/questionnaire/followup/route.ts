import { NextResponse } from "next/server";
import { MAX_FOLLOWUPS } from "@/lib/config";
import { structuredResponse } from "@/lib/openai";
import { answersToText, FOLLOWUP_SYSTEM_PROMPT } from "@/lib/questionnaire/profile";
import { AnswersSchema, FOLLOWUP_AI_JSON_SCHEMA, FollowupAiSchema } from "@/lib/questionnaire/schema";
import { scoreRiasec } from "@/lib/questionnaire/scoring";
import type { QuestionnaireAnswers } from "@/lib/questionnaire/types";

// POST /api/questionnaire/followup
// Corps : QuestionnaireAnswers (partielles). Réponse : { question: string | null }.
// Renvoie null si le quota de relances est atteint ou si l'IA est indisponible :
// le questionnaire continue alors sans relance.
export async function POST(req: Request) {
  const parsed = AnswersSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ question: null }, { status: 400 });
  const answers = parsed.data as QuestionnaireAnswers;
  if (answers.followups.length >= MAX_FOLLOWUPS) return NextResponse.json({ question: null });

  try {
    const riasec = scoreRiasec(answers.riasec);
    const out = FollowupAiSchema.parse(
      await structuredResponse({
        system: FOLLOWUP_SYSTEM_PROMPT,
        user: `Réponses jusqu'ici :\n${answersToText(answers, riasec)}\n\nQuestion de relance :`,
        schemaName: "relance_alumnia",
        schema: FOLLOWUP_AI_JSON_SCHEMA,
        timeoutMs: 8000,
      }),
    );
    return NextResponse.json({ question: out.question });
  } catch {
    return NextResponse.json({ question: null });
  }
}
