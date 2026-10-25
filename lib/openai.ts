import OpenAI from "openai";
import { OPENAI_MODEL } from "./config";

// Client OpenAI côté serveur uniquement. Ne jamais importer ce fichier dans un composant client.
export const openai = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;

/**
 * Appelle la Responses API avec une sortie structurée (JSON Schema strict)
 * et renvoie l'objet JSON parsé. Lève une erreur si l'IA est indisponible.
 */
export async function structuredResponse<T>(opts: {
  system: string;
  user: string;
  schemaName: string;
  schema: Record<string, unknown>;
  timeoutMs?: number;
}): Promise<T> {
  if (!openai) throw new Error("OPENAI_API_KEY manquante");
  const response = await openai.responses.create(
    {
      model: OPENAI_MODEL,
      input: [
        { role: "system", content: opts.system },
        { role: "user", content: opts.user },
      ],
      text: {
        format: { type: "json_schema", name: opts.schemaName, schema: opts.schema, strict: true },
      },
    },
    { timeout: opts.timeoutMs ?? 20000 },
  );
  return JSON.parse(response.output_text) as T;
}
