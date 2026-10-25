import type { ContextQuestion, RiasecItem, RiasecType } from "./types";

// ---------------------------------------------------------------------------
// 1. Questions de contexte (une par écran, avant le bloc d'activités)
// ---------------------------------------------------------------------------
export const CONTEXT_QUESTIONS: ContextQuestion[] = [
  {
    id: "niveau",
    kind: "single",
    titre: "Tu en es où dans tes études ?",
    options: [
      { value: "seconde", label: "Seconde" },
      { value: "premiere", label: "Première" },
      { value: "terminale", label: "Terminale" },
      { value: "bac+1", label: "Bac +1" },
      { value: "bac+2", label: "Bac +2" },
      { value: "bac+3_ou_plus", label: "Bac +3 ou plus" },
      { value: "autre", label: "Autre situation" },
    ],
  },
  {
    id: "specialites",
    kind: "multi",
    titre: "Quelles matières ou spécialités te plaisent le plus ?",
    aide: "Choisis jusqu'à 3 réponses.",
    max: 3,
    options: [
      { value: "maths", label: "Maths" },
      { value: "nsi_informatique", label: "NSI / informatique" },
      { value: "physique_chimie", label: "Physique-chimie" },
      { value: "svt", label: "SVT / biologie" },
      { value: "ses", label: "SES / économie" },
      { value: "hggsp", label: "Histoire-géo, géopolitique" },
      { value: "langues", label: "Langues" },
      { value: "lettres_philo", label: "Lettres, philosophie" },
      { value: "arts", label: "Arts" },
      { value: "sport", label: "Sport" },
      { value: "techno_pro", label: "Enseignement technologique ou professionnel" },
      { value: "ne_sait_pas", label: "Je ne sais pas encore" },
    ],
  },
  {
    id: "duree_etudes",
    kind: "single",
    titre: "Tu te vois faire des études plutôt…",
    options: [
      { value: "courtes", label: "Courtes (2 à 3 ans)" },
      { value: "longues", label: "Longues (5 ans ou plus)" },
      { value: "indifferent", label: "Ça dépendra du métier" },
      { value: "ne_sait_pas", label: "Je ne sais pas encore" },
    ],
  },
  {
    id: "alternance",
    kind: "single",
    titre: "L'alternance (études + entreprise, avec un salaire), ça t'intéresse ?",
    options: [
      { value: "oui", label: "Oui" },
      { value: "peut_etre", label: "Peut-être" },
      { value: "non", label: "Non" },
      { value: "ne_sait_pas", label: "Je ne sais pas ce que c'est" },
    ],
  },
  {
    id: "mobilite",
    kind: "single",
    titre: "Tu es prêt à bouger pour tes études ?",
    options: [
      { value: "pres_de_chez_moi", label: "Je préfère rester près de chez moi" },
      { value: "region", label: "Dans ma région, oui" },
      { value: "france", label: "Partout en France" },
      { value: "etranger", label: "Même à l'étranger" },
      { value: "ne_sait_pas", label: "Je ne sais pas encore" },
    ],
  },
];

// ---------------------------------------------------------------------------
// 2. Bloc d'activités RIASEC : 4 activités par type, 24 au total.
// Formulées par nous (pas de reprise d'un test existant), sur le principe
// des tests d'intérêts professionnels : « Est-ce que tu aimerais… ».
// ---------------------------------------------------------------------------
const RAW_ITEMS: Record<RiasecType, string[]> = {
  R: [
    "Réparer un ordinateur, un téléphone ou un appareil en panne",
    "Monter ou installer un équipement (réseau, électricité, meuble)",
    "Travailler en extérieur, sur un chantier ou sur le terrain",
    "Utiliser des outils ou des machines pour fabriquer quelque chose",
  ],
  I: [
    "Comprendre pourquoi un programme ou une machine ne marche pas",
    "Faire des tests ou des expériences pour vérifier une idée",
    "Analyser des chiffres ou des données pour trouver une explication",
    "Lire ou regarder des contenus scientifiques pour comprendre le monde",
  ],
  A: [
    "Créer un visuel, une vidéo ou un design",
    "Écrire des textes, des histoires ou des scripts",
    "Imaginer un nouveau jeu, une appli ou un objet",
    "Faire de la musique, du théâtre ou de la photo",
  ],
  S: [
    "Expliquer quelque chose à quelqu'un qui bloque",
    "Aider un ami à régler un problème, personnel ou technique",
    "Animer un groupe ou une activité avec des plus jeunes",
    "Écouter et conseiller quelqu'un qui hésite",
  ],
  E: [
    "Convaincre un groupe d'adopter ton idée",
    "Lancer un projet et en prendre la tête",
    "Négocier un prix ou un accord",
    "Vendre ou faire la promotion d'un produit ou d'un événement",
  ],
  C: [
    "Organiser un planning ou un budget",
    "Vérifier des informations pour qu'il n'y ait aucune erreur",
    "Suivre une méthode précise, étape par étape",
    "Tenir un tableau de suivi bien à jour",
  ],
};

// Ordre de présentation : on alterne les types (R, I, A, S, E, C, R, I, …)
// pour éviter que l'étudiant devine ce qui est mesuré.
export const RIASEC_ITEMS: RiasecItem[] = (() => {
  const items: RiasecItem[] = [];
  const types = Object.keys(RAW_ITEMS) as RiasecType[];
  for (let i = 0; i < 4; i++) {
    for (const type of types) {
      items.push({ id: `${type}${i + 1}`, type, activite: RAW_ITEMS[type][i] });
    }
  }
  return items;
})();

// Les 24 activités sont présentées par pages de 6 (4 pages).
export const RIASEC_PAGE_SIZE = 6;

// ---------------------------------------------------------------------------
// 3. Questions ouvertes (après le bloc d'activités)
// ---------------------------------------------------------------------------
export const OPEN_QUESTIONS: ContextQuestion[] = [
  {
    id: "idees",
    kind: "text",
    titre: "Des métiers ou des domaines te trottent déjà dans la tête ?",
    aide: "Même vague, même si tu n'es pas sûr. Tu peux laisser vide.",
    placeholder: "Ex. : l'informatique, quelque chose avec les jeux vidéo, commerce comme mon cousin…",
    optional: true,
  },
  {
    id: "blocage",
    kind: "text",
    titre: "Qu'est-ce qui te fait peur ou te bloque quand tu penses à ton orientation ?",
    aide: "Tu peux laisser vide.",
    placeholder: "Ex. : je ne connais personne dans ce domaine, j'ai peur de me tromper…",
    optional: true,
  },
  {
    id: "question_alumni",
    kind: "text",
    titre: "Si tu pouvais poser une question à quelqu'un qui fait un métier qui t'attire, ce serait quoi ?",
    placeholder: "Ex. : à quoi ressemble ta journée ? Est-ce qu'il faut être fort en maths ?",
    optional: true,
  },
];

export const DONT_KNOW = "ne_sait_pas";
