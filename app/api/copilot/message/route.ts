import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";
import { OPENAI_MODEL } from "@/lib/config";
import { openai } from "@/lib/openai";
import { authenticatedUser, hasSupabaseConfig, userDatabaseRequest } from "@/lib/supabase-rest";

const MessageSchema = z.object({
  text: z.string().trim().min(1).max(1200),
  existingQuestions: z.array(z.string().max(200)).max(30).default([]),
});
const ReplySchema = z.object({ reply: z.string().trim().min(1).max(500), question: z.string().trim().max(200), needsHuman: z.boolean() });
const responseFormat = {
  type: "object",
  additionalProperties: false,
  required: ["reply", "question", "needsHuman"],
  properties: { reply: { type: "string" }, question: { type: "string" }, needsHuman: { type: "boolean" } },
} as const;
const humanMessage = "I can help you prepare a question, and the Alumnia team can also talk with you. I’ll pass your request to them.";
const distressMessage = "I'm sorry you're going through this. Please speak with a trusted adult now or call 3114, France's national suicide prevention line. You can also ask to speak with the Alumnia team.";

function fallback(text: string): z.infer<typeof ReplySchema> {
  const value = text.toLocaleLowerCase("fr");
  if (/suicid|me faire du mal|ne plus vivre|plus envie de vivre/.test(value)) return { reply: distressMessage, question: "", needsHuman: true };
  if (/\b(humain|personne|équipe|quelqu'un)\b/.test(value)) return { reply: humanMessage, question: "", needsHuman: true };
  if (/stress|stresse|peur|angoiss/.test(value)) return { reply: "It's normal to feel unsure before meeting someone. You can start by sharing what's on your mind; you don't need to prepare everything.", question: "What surprised you most when you started this career?", needsHuman: false };
  if (/alternance|apprenti/.test(value)) return { reply: "Ask the professional how a typical week is split between classes and the workplace.", question: "What does a typical week in alternance look like?", needsHuman: false };
  if (/salaire|rémunér|salary|pay/.test(value)) return { reply: "The professional can share their experience and explain how pay varies by role.", question: "What affects pay in this field?", needsHuman: false };
  if (/math|calcul/.test(value)) return { reply: "Different careers use maths in different ways. The professional can give you a real example.", question: "When do you use maths in your work?", needsHuman: false };
  if (/question|demander|poser|ask/.test(value)) return { reply: "Start with something about their day-to-day work that you would like to understand better.", question: "What do you wish you had known before starting this career?", needsHuman: false };
  return { reply: "We can prepare this together. Pick one thing you are curious about and ask the professional for a concrete example.", question: "What does an ordinary day in this career look like?", needsHuman: false };
}

export async function POST(request: Request) {
  const parsed = MessageSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Message invalide." }, { status: 400 });
  const { text, existingQuestions } = parsed.data;
  const started = Date.now();
  const configured = hasSupabaseConfig();
  const user = configured ? await authenticatedUser() : null;
  const token = configured ? (await cookies()).get("alumnia_access_token")?.value : undefined;
  if (configured && (!user || !token)) return NextResponse.json({ error: "Connecte-toi pour utiliser le copilote." }, { status: 401 });

  const respond = async (reply: z.infer<typeof ReplySchema>, engine: "openai" | "secours") => {
    const ms = Date.now() - started;
    if (user && token) {
      await userDatabaseRequest("ai_calls", token, {
        method: "POST", headers: { Prefer: "return=minimal" },
        body: JSON.stringify({ user_id: user.id, task: "prechat", engine, model: engine === "openai" ? OPENAI_MODEL : null, latency_ms: ms }),
      }).catch(() => null);
    }
    return NextResponse.json({ ...reply, engine, model: engine === "openai" ? OPENAI_MODEL : null, ms });
  };

if (/\b(humain|personne|équipe|quelqu'un)\b/i.test(text)) {
    return respond({ reply: humanMessage, question: "", needsHuman: true }, "secours");
  }

  // A configured model is never exposed to an anonymous public endpoint.
  if (!openai || !user || !token) return respond(fallback(text), "secours");
  try {
    const moderation = await openai.moderations.create({ input: text }, { timeout: 4000 });
    const categories = moderation.results[0]?.categories as unknown as Record<string, boolean> | undefined;
    if (categories?.self_harm || categories?.self_harm_intent) return respond({ reply: distressMessage, question: "", needsHuman: true }, "secours");
    if (categories?.harassment || categories?.harassment_threatening) return respond({ reply: humanMessage, question: "", needsHuman: true }, "secours");

    const result = await openai.responses.create({
      model: OPENAI_MODEL,
      input: [
        { role: "system", content: "You are Alumnia's AI career coach for young people aged 16–25. Answer in clear, reassuring English, in two sentences maximum. Preserve French education terms such as Parcoursup, BTS, BUT and alternance. Never answer on behalf of the professional about their job or career path; help the student ask a question instead. Suggest at most one short question, different from those already in the brief. If the student asks for a person, set needsHuman=true and leave question empty." },
        { role: "user", content: JSON.stringify({ message: text, questionsDejaDansLeBrief: existingQuestions }) },
      ],
      text: { format: { type: "json_schema", name: "reponse_copilote", strict: true, schema: responseFormat } },
    }, { timeout: 15000 });
    return respond(ReplySchema.parse(JSON.parse(result.output_text)), "openai");
  } catch {
    return respond(fallback(text), "secours");
  }
}
