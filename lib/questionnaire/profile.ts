import { CONTEXT_QUESTIONS, DONT_KNOW, OPEN_QUESTIONS } from "./items";
import { RIASEC_LABELS, type Profile, type QuestionnaireAnswers, type RiasecResult, type RiasecType } from "./types";

// ---------------------------------------------------------------------------
// Prompts (règles du mentor, voir la spécification)
// ---------------------------------------------------------------------------
export const PROFILE_SYSTEM_PROMPT = `You are a supportive Alumnia career guide, not a decision-maker.
Help a young person aged 16–25 make sense of their interests and career ideas through conversation.
Rules:
- Write in clear, concise English. Keep French education terms such as Parcoursup, BTS, BUT, licence, master and alternance in French, with a short explanation when useful.
- Offer possibilities, never a verdict or personality label.
- Begin with the sector, career idea or study path the young person stated. Ask about the reasons, tasks, experiences and constraints behind it. Suggest several roles within that sector before adjacent options.
- Treat Holland RIASEC scores as secondary clues, not facts; they may refine the person's direction but must never replace or overrule their own words.
- Consider study length, work-study options and mobility.
- Never invent a qualification, employer, statistic or promise.
- When answers are limited, say what is still unknown and suggest what to explore next.
- Return only the requested JSON.`;

export const FOLLOWUP_SYSTEM_PROMPT = `You are a supportive Alumnia career guide. In clear, concise English, ask ONE follow-up question (20 words maximum) that helps the young person clarify an interest or concern by referring to a concrete detail in their answers. Do not ask about health, religion, ethnicity or family income. Preserve French education terms when they appear. Return only the requested JSON.`;

/** Transforme les réponses en texte lisible pour le modèle. */
export function answersToText(answers: QuestionnaireAnswers, riasec: RiasecResult): string {
  const lines: string[] = [];
  for (const q of [...CONTEXT_QUESTIONS, ...OPEN_QUESTIONS]) {
    const v = answers.context[q.id];
    if (v === undefined || v === "" || (Array.isArray(v) && v.length === 0)) continue;
    const label = (val: string) =>
      q.kind === "text" ? val : (q.options.find((o) => o.value === val)?.label ?? val);
    lines.push(`- ${q.titre} → ${Array.isArray(v) ? v.map(label).join(", ") : label(v)}`);
  }
  lines.push(
    `- Scores d'intérêts (0 à 100) : ${(Object.keys(riasec.scores) as RiasecType[])
      .map((t) => `${RIASEC_LABELS[t].nom} ${riasec.scores[t]}`)
      .join(", ")} ; code dominant ${riasec.code}.`,
  );
  for (const f of answers.followups) lines.push(`- Relance : ${f.question} → ${f.reponse}`);
  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// Profil de secours, sans IA (clé absente, erreur réseau ou démo hors ligne)
// ---------------------------------------------------------------------------
const PISTES_PAR_TYPE: Record<RiasecType, { domaine: string; metiers: string[] }> = {
  R: { domaine: "Technique, industrie et réseaux", metiers: ["Technicien support informatique", "Administrateur systèmes et réseaux", "Technicien de maintenance"] },
  I: { domaine: "Sciences, données et ingénierie", metiers: ["Analyste en cybersécurité", "Data analyst", "Ingénieur de recherche"] },
  A: { domaine: "Création, design et contenus", metiers: ["UX/UI designer", "Motion designer", "Game designer"] },
  S: { domaine: "Accompagnement, éducation et santé", metiers: ["Professeur", "Chargé de formation", "Éducateur spécialisé"] },
  E: { domaine: "Commerce, gestion de projet et entrepreneuriat", metiers: ["Chef de projet", "Business developer", "Chargé de communication"] },
  C: { domaine: "Gestion, finance et organisation", metiers: ["Contrôleur de gestion", "Gestionnaire de paie", "Assistant RH"] },
};

const asString = (v: string | string[] | undefined) => (Array.isArray(v) ? v.join(", ") : (v ?? ""));
const asArray = (v: string | string[] | undefined) => (Array.isArray(v) ? v : v ? [v] : []);

export function buildBaseProfile(answers: QuestionnaireAnswers, riasec: RiasecResult) {
  return {
    niveau: asString(answers.context.niveau) || DONT_KNOW,
    specialites: asArray(answers.context.specialites).filter((s) => s !== DONT_KNOW),
    contraintes: {
      duree_etudes: asString(answers.context.duree_etudes) || DONT_KNOW,
      alternance: asString(answers.context.alternance) || DONT_KNOW,
      mobilite: asString(answers.context.mobilite) || DONT_KNOW,
    },
    riasec,
  };
}

export function fallbackProfile(answers: QuestionnaireAnswers, riasec: RiasecResult): Profile {
  const [t1, t2] = riasec.dominant;
  const idees = asString(answers.context.idees)
    .split(/[,;\n]/)
    .map((s) => s.trim())
    .filter(Boolean);
  const direction = idees.join(" ").normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const sectorRules: Array<{ match: RegExp; domain: string; roles: string[] }> = [
    { match: /cyber|securite|security|ctf/, domain: "Cybersecurity & digital safety", roles: ["Analyste en cybersécurité", "Administrateur systèmes et réseaux", "Technicien support informatique"] },
    { match: /data|donnee|analytics/, domain: /finance|accounting|comptabilite|gestion/.test(direction) ? "Data & finance" : "Data & analytics", roles: ["Data analyst", "Ingénieur logiciel IA", "Contrôleur de gestion"] },
    { match: /software|programmation|coding|intelligence artificielle|\bai\b/, domain: "AI & software engineering", roles: ["Ingénieur logiciel IA", "Data analyst", "Analyste en cybersécurité"] },
    { match: /ux|ui|design|application|interface|game/, domain: "Digital product & design", roles: ["UX/UI designer", "Game designer", "Motion designer"] },
    { match: /finance|financial|accounting|comptabilite|controle de gestion/, domain: "Finance & business operations", roles: ["Contrôleur de gestion", "Gestionnaire de paie", "Data analyst"] },
    { match: /network|reseau|infrastructure|informatique|\bit\b/, domain: "Digital technology", roles: ["Administrateur systèmes et réseaux", "Technicien support informatique", "Analyste en cybersécurité"] },
  ];
  const statedSector = sectorRules.find((rule) => rule.match.test(direction));
  const fallbackRoles = [PISTES_PAR_TYPE[t1].metiers[0], PISTES_PAR_TYPE[t1].metiers[1], PISTES_PAR_TYPE[t2].metiers[0]];
  const metiers = [...new Set([...(statedSector?.roles ?? []), ...fallbackRoles])].slice(0, 3);
  const domains = statedSector
    ? [statedSector.domain, PISTES_PAR_TYPE[t1].domaine]
    : [PISTES_PAR_TYPE[t1].domaine, PISTES_PAR_TYPE[t2].domaine];
  return {
    ...buildBaseProfile(answers, riasec),
    interets: riasec.dominant.map((t) => RIASEC_LABELS[t].description),
    idees,
    domaines_proposes: domains,
    metiers_pistes: metiers.map((titre) => ({
      titre,
      pourquoi: statedSector
        ? `You mentioned ${idees[0]}. This role is one possible path in ${statedSector.domain}; your interest answers help refine what to explore.`
        : `Your interest answers suggest this as one possibility. It is a clue to explore, not a verdict.`,
    })),
    a_explorer: ["Ce que ces métiers donnent au quotidien", "Les études courtes ou en alternance qui y mènent"],
    questions_pour_alumni: [
      "À quoi ressemble ta journée type ?",
      "Qu'est-ce qui t'a fait choisir ce métier ?",
      asString(answers.context.question_alumni) || "Qu'est-ce que tu aurais aimé savoir à mon âge ?",
    ],
    synthese: statedSector
      ? `You said you are interested in ${idees[0]}. We start with ${statedSector.domain}; your interest answers are secondary clues for choosing which roles and next steps to explore.`
      : `Your answers suggest ${RIASEC_LABELS[t1].description.toLowerCase()} and ${RIASEC_LABELS[t2].description.toLowerCase()} as starting clues. They are possibilities, not a verdict.`,
    genere_par: "secours",
  };
}
