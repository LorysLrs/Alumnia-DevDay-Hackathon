import { z } from "zod";
import { CONTEXT_QUESTIONS, OPEN_QUESTIONS, RIASEC_ITEMS } from "./items";

// Validation des réponses reçues par l'API (ne jamais faire confiance au navigateur).
const contextIds = [...CONTEXT_QUESTIONS, ...OPEN_QUESTIONS].map((q) => q.id);
const riasecIds = RIASEC_ITEMS.map((i) => i.id);

export const AnswersSchema = z.object({
  context: z
    .record(z.string(), z.union([z.string().max(500), z.array(z.string().max(100)).max(5)]))
    .refine((obj) => Object.keys(obj).every((k) => contextIds.includes(k)), "Question inconnue"),
  riasec: z
    .record(z.string(), z.number().int().min(1).max(5))
    .refine((obj) => Object.keys(obj).every((k) => riasecIds.includes(k)), "Activité inconnue"),
  followups: z
    .array(z.object({ question: z.string().max(300), reponse: z.string().max(500) }))
    .max(2)
    .default([]),
});

// Schéma JSON strict passé à l'API OpenAI (sorties structurées).
// Tous les champs sont obligatoires et aucun champ supplémentaire n'est autorisé.
export const PROFILE_AI_JSON_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: [
    "interets",
    "idees",
    "domaines_proposes",
    "metiers_pistes",
    "a_explorer",
    "questions_pour_alumni",
    "synthese",
  ],
  properties: {
    interets: { type: "array", items: { type: "string" }, description: "3 à 5 centres d'intérêt, dans les mots de l'élève" },
    idees: { type: "array", items: { type: "string" }, description: "Idées de métiers ou domaines déjà citées par l'élève" },
    domaines_proposes: { type: "array", items: { type: "string" }, description: "1 à 3 grands domaines à explorer" },
    metiers_pistes: {
      type: "array",
      description: "Exactement 3 pistes de métiers",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["titre", "pourquoi"],
        properties: {
          titre: { type: "string" },
          pourquoi: { type: "string", description: "Une phrase, au tutoiement, qui relie la piste aux réponses" },
        },
      },
    },
    a_explorer: { type: "array", items: { type: "string" }, description: "2 à 3 questions encore ouvertes" },
    questions_pour_alumni: { type: "array", items: { type: "string" }, description: "3 questions à poser à un alumni" },
    synthese: { type: "string", description: "3 phrases maximum, au tutoiement, sans étiquette de personnalité" },
  },
} as const;

export const ProfileAiSchema = z.object({
  interets: z.array(z.string()),
  idees: z.array(z.string()),
  domaines_proposes: z.array(z.string()),
  metiers_pistes: z.array(z.object({ titre: z.string(), pourquoi: z.string() })),
  a_explorer: z.array(z.string()),
  questions_pour_alumni: z.array(z.string()),
  synthese: z.string(),
});

export const FollowupAiSchema = z.object({ question: z.string() });

export const FOLLOWUP_AI_JSON_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["question"],
  properties: { question: { type: "string", description: "Une seule question courte, au tutoiement" } },
} as const;
