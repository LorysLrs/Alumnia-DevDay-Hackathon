// Nom de travail de l'application : à changer ici uniquement si le projet est renommé.
export const APP_NAME = "Alumnia";

// Modèle OpenAI utilisé par les routes serveur. À fixer dans .env.local (OPENAI_MODEL).
export const OPENAI_MODEL = process.env.OPENAI_MODEL ?? "gpt-4.1-mini";

// Nombre maximum de questions de relance générées par l'IA dans le questionnaire.
export const MAX_FOLLOWUPS = 2;
