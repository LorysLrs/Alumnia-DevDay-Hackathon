// Types partagés du questionnaire Alumnia.
// Le questionnaire suit le modèle des intérêts professionnels RIASEC de John Holland
// (Réaliste, Investigateur, Artistique, Social, Entreprenant, Conventionnel),
// avec des activités de travail notées sur une échelle de 1 à 5, comme les tests
// d'intérêts publics de type O*NET Interest Profiler.

export type RiasecType = "R" | "I" | "A" | "S" | "E" | "C";

export const RIASEC_TYPES: RiasecType[] = ["R", "I", "A", "S", "E", "C"];

export const RIASEC_LABELS: Record<RiasecType, { nom: string; description: string }> = {
  R: { nom: "Réaliste", description: "Tu aimes le concret : manipuler, réparer, construire, être sur le terrain." },
  I: { nom: "Investigateur", description: "Tu aimes comprendre : chercher pourquoi, analyser, tester des idées." },
  A: { nom: "Artistique", description: "Tu aimes créer : imaginer, dessiner, écrire, inventer." },
  S: { nom: "Social", description: "Tu aimes les autres : expliquer, aider, écouter, accompagner." },
  E: { nom: "Entreprenant", description: "Tu aimes faire bouger les choses : convaincre, lancer, diriger." },
  C: { nom: "Conventionnel", description: "Tu aimes l'ordre : organiser, vérifier, suivre une méthode." },
};

// Échelle de réponse aux activités (1 à 5). La valeur 3 est neutre.
export const LIKERT_OPTIONS = [
  { value: 1, label: "Pas du tout" },
  { value: 2, label: "Plutôt pas" },
  { value: 3, label: "Je ne sais pas" },
  { value: 4, label: "Plutôt oui" },
  { value: 5, label: "J'adorerais" },
] as const;

export type LikertValue = 1 | 2 | 3 | 4 | 5;

export type ChoiceOption = { value: string; label: string };

// Une question de contexte ou ouverte (une par écran).
export type ContextQuestion =
  | { id: string; kind: "single"; titre: string; aide?: string; options: ChoiceOption[] }
  | { id: string; kind: "multi"; titre: string; aide?: string; options: ChoiceOption[]; max?: number }
  | { id: string; kind: "text"; titre: string; aide?: string; placeholder?: string; optional: boolean };

// Une activité à noter (bloc RIASEC).
export type RiasecItem = { id: string; type: RiasecType; activite: string };

// Réponses brutes envoyées au serveur.
export type QuestionnaireAnswers = {
  context: Record<string, string | string[]>; // id de question -> valeur(s)
  riasec: Record<string, LikertValue>; // id d'activité -> note 1..5
  followups: { question: string; reponse: string }[]; // relances de l'IA
};

export type RiasecResult = {
  scores: Record<RiasecType, number>; // 0 à 100
  code: string; // code Holland à 3 lettres, ex. "RIS"
  dominant: RiasecType[]; // les 3 types dominants, dans l'ordre
  repondu: number; // nombre d'activités notées
};

// Profil produit par l'IA (et sa version de secours sans IA).
export type MetierPiste = { titre: string; pourquoi: string };

export type Profile = {
  niveau: string;
  specialites: string[];
  contraintes: { duree_etudes: string; alternance: string; mobilite: string };
  riasec: RiasecResult;
  interets: string[];
  idees: string[];
  domaines_proposes: string[];
  metiers_pistes: MetierPiste[];
  a_explorer: string[];
  questions_pour_alumni: string[];
  synthese: string;
  genere_par: "ia" | "secours";
};
