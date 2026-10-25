import { RIASEC_ITEMS } from "./items";
import { RIASEC_TYPES, type LikertValue, type RiasecResult, type RiasecType } from "./types";

// Ordre de départage en cas d'égalité : ordre classique du modèle (R, I, A, S, E, C).
const TIE_ORDER: Record<RiasecType, number> = { R: 0, I: 1, A: 2, S: 3, E: 4, C: 5 };

/**
 * Calcule les scores RIASEC à partir des notes 1..5.
 * Score d'un type = moyenne de ses notes, ramenée sur 0..100 ((moyenne - 1) / 4 * 100).
 * Une activité non notée compte comme neutre (3), pour ne pas pénaliser un oubli.
 */
export function scoreRiasec(answers: Record<string, LikertValue | undefined>): RiasecResult {
  const sums: Record<RiasecType, number> = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
  const counts: Record<RiasecType, number> = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
  let repondu = 0;

  for (const item of RIASEC_ITEMS) {
    const raw = answers[item.id];
    const value = raw !== undefined && raw >= 1 && raw <= 5 ? raw : 3;
    if (raw !== undefined) repondu++;
    sums[item.type] += value;
    counts[item.type] += 1;
  }

  const scores = {} as Record<RiasecType, number>;
  for (const type of RIASEC_TYPES) {
    const mean = counts[type] ? sums[type] / counts[type] : 3;
    scores[type] = Math.round(((mean - 1) / 4) * 100);
  }

  const dominant = [...RIASEC_TYPES]
    .sort((a, b) => scores[b] - scores[a] || TIE_ORDER[a] - TIE_ORDER[b])
    .slice(0, 3);

  return { scores, code: dominant.join(""), dominant, repondu };
}

/** Indique si le profil est « plat » (tous les scores proches) : utile pour adapter le discours. */
export function isFlatProfile(result: RiasecResult, spread = 15): boolean {
  const values = Object.values(result.scores);
  return Math.max(...values) - Math.min(...values) < spread;
}
