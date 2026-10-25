// Tests du calcul RIASEC et du profil de secours. Lancer : npm test
import assert from "node:assert/strict";
import { RIASEC_ITEMS } from "../lib/questionnaire/items";
import { fallbackProfile } from "../lib/questionnaire/profile";
import { AnswersSchema } from "../lib/questionnaire/schema";
import { isFlatProfile, scoreRiasec } from "../lib/questionnaire/scoring";
import type { LikertValue, QuestionnaireAnswers } from "../lib/questionnaire/types";

const allWith = (fn: (type: string) => LikertValue) =>
  Object.fromEntries(RIASEC_ITEMS.map((i) => [i.id, fn(i.type)])) as Record<string, LikertValue>;

// 1. 24 activités, 4 par type
assert.equal(RIASEC_ITEMS.length, 24);
for (const t of ["R", "I", "A", "S", "E", "C"]) assert.equal(RIASEC_ITEMS.filter((i) => i.type === t).length, 4);

// 2. Profil type « Yanis » : concret + comprendre + aider
const yanis = scoreRiasec(allWith((t) => (t === "R" ? 5 : t === "I" ? 4 : t === "S" ? 4 : 2)));
assert.equal(yanis.scores.R, 100);
assert.equal(yanis.scores.I, 75);
assert.equal(yanis.scores.A, 25);
assert.equal(yanis.code, "RIS"); // égalité I/S départagée par l'ordre R, I, A, S, E, C
assert.equal(yanis.repondu, 24);

// 3. Tout « je ne sais pas » → profil plat, scores à 50
const neutre = scoreRiasec(allWith(() => 3));
assert.ok(isFlatProfile(neutre));
assert.equal(neutre.scores.E, 50);

// 4. Réponses manquantes comptées comme neutres
const partiel = scoreRiasec({ R1: 5 });
assert.equal(partiel.repondu, 1);
assert.equal(partiel.scores.R, 63); // (5+3+3+3)/4 = 3.5 → 62.5 → 63

// 5. Validation : une activité inconnue est refusée
assert.equal(AnswersSchema.safeParse({ context: {}, riasec: { X9: 3 }, followups: [] }).success, false);
assert.equal(AnswersSchema.safeParse({ context: { niveau: "terminale" }, riasec: { R1: 4 } }).success, true);

// 6. Profil de secours complet
const answers: QuestionnaireAnswers = {
  context: { niveau: "terminale", specialites: ["maths", "nsi_informatique"], idees: "informatique, commerce" },
  riasec: allWith((t) => (t === "R" ? 5 : t === "I" ? 4 : 2)),
  followups: [],
};
const p = fallbackProfile(answers, scoreRiasec(answers.riasec));
assert.equal(p.metiers_pistes.length, 3);
assert.deepEqual(p.idees, ["informatique", "commerce"]);
assert.equal(p.genere_par, "secours");

console.log("OK — tous les tests passent. Exemple :", yanis.code, yanis.scores);
console.log("Pistes de secours :", p.metiers_pistes.map((m) => m.titre).join(" | "));
