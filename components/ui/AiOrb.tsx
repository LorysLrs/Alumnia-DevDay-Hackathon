"use client";

// L'orbe = le visage de l'IA dans Alumnia. Partout où l'IA parle ou travaille, on voit une orbe
// (paquet thinking-orbs, Jakub Antalik, licence MIT). Jamais de robot, jamais d'étincelle.
//
// États utilisés :
//   composing  → l'IA écrit (profil, relance, compte rendu)
//   searching  → elle cherche (alumni à proposer)
//   weaving    → elle assemble (roadmap, fiche de préparation)
//   listening  → elle attend la réponse de l'élève dans la conversation
//   breathing  → au repos (avatar à côté d'un message déjà écrit, puce « Écrit par l'IA »)
//
// Tailles : 64 (avatar de conversation, écran d'attente) ou 20 (dans une puce, dans une ligne de texte).
// Pour un écran d'attente plein écran, mettre l'orbe 64 dans un conteneur `transform: scale(2.4)`.

import { ThinkingOrb } from "thinking-orbs";

export type OrbState = "composing" | "searching" | "weaving" | "listening" | "breathing";

const LABELS: Record<OrbState, string> = {
  composing: "L'IA écrit…",
  searching: "L'IA cherche…",
  weaving: "L'IA prépare…",
  listening: "L'IA attend ta réponse",
  breathing: "IA",
};

export function AiOrb({ state, size = 64, label }: { state: OrbState; size?: 20 | 64; label?: string }) {
  return <ThinkingOrb state={state} size={size} theme="light" aria-label={label ?? LABELS[state]} />;
}

/** Puce « qui parle » pour un texte écrit par l'IA : mini-orbe au repos + libellé. */
export function AiBadge({ children = "Écrit par l'IA" }: { children?: string }) {
  return (
    <span className="who who--ai">
      <span style={{ display: "inline-flex", width: 20, height: 20, margin: "-3px 0 -3px -4px" }}>
        <AiOrb state="breathing" size={20} label="" />
      </span>
      {children}
    </span>
  );
}
