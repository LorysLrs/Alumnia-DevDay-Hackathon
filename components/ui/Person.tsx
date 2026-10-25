// Les gens d'Alumnia : 28 personnages Open Peeps (dessins CC0, Pablo Stanley), recolorés dans la palette.
// Fichiers : public/people/pN.svg (personnage à mi-corps) et public/people/pN-buste.svg (tête et épaules, pour les avatars).
//
// Règles de cadrage (voir DESIGN.md § 6) :
// - tous les fichiers pN.svg ont le même cadre (900 × 1266) et la même échelle ; le bas du cadre est la ligne de coupe du dessin ;
// - un personnage est TOUJOURS posé sur le bord bas de son conteneur (bottom: 0), jamais flottant ;
// - dans une rangée, la personne du centre passe devant, les côtés derrière (z-index) ;
// - dans une photo de groupe, le rang du fond se place dans les espaces entre les têtes du devant et sa ligne de coupe est cachée derrière le premier rang.
//
// Qui est qui dans la démo : Yanis = 0 · Lorys (pro, admin réseau) = 2 · Sarah = 1 · Léa = 3 · élève sans persona = 4 · Inès = 5 ·
// Karim = 6 · Nadia = 7 · Paul = 8 · Tom = 9 · Mehdi = 10 · Julie = 11.

import type { CSSProperties } from "react";

export type PersonId = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25 | 26 | 27;

/** Hauteur / largeur du cadre commun. */
export const PERSON_RATIO = 1266 / 900;

export const DEMO_PEOPLE = { yanis: 0, sarah: 1, lorys: 2, lea: 3, moi: 4, ines: 5, karim: 6, nadia: 7, paul: 8, tom: 9, mehdi: 10, julie: 11 } as const satisfies Record<string, PersonId>;

export const PEOPLE_SETS = {
  profil: [11, 0, 1],
  roadmap: [2, 8, 10],
  fiche: [2, 9, 6],
  vide: [1, 11, 4],
} as const satisfies Record<string, readonly PersonId[]>;

/** Un personnage à mi-corps, posé sur le bas de son cadre. */
export function Person({ id, width = 160, style, className }: { id: PersonId; width?: number; style?: CSSProperties; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={className} src={`/people/p${id}.svg`} alt="" width={width} height={Math.round(width * PERSON_RATIO)} style={{ display: "block", ...style }} />
  );
}

/** Avatar rond : tête et épaules, centré sur le visage. */
export function Face({ id, size = 44, background = "var(--ai-wash)" }: { id: PersonId; size?: number; background?: string }) {
  return (
    <span aria-hidden style={{ display: "inline-block", width: size, height: size, borderRadius: "50%", overflow: "hidden", background, flex: "none" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/people/p${id}-buste.svg`} alt="" style={{ width: "100%", height: "100%", display: "block" }} />
    </span>
  );
}

/** Rangée posée sur le bas du conteneur parent (position: relative ; overflow: hidden). La personne du centre passe devant. */
export function Crowd({ ids, width = 138, overlap = 30, style }: { ids: readonly PersonId[]; width?: number; overlap?: number; style?: CSSProperties }) {
  const c = (ids.length - 1) / 2;
  return (
    <div aria-hidden style={{ position: "absolute", bottom: 0, display: "flex", alignItems: "flex-end", ...style }}>
      {ids.map((id, i) => (
        <Person key={i} id={id} width={width} style={{ marginLeft: i ? -overlap : 0, position: "relative", zIndex: ids.length > 5 ? (i % 2 ? 2 : 1) : 10 - Math.round(Math.abs(i - c) * 2) }} />
      ))}
    </div>
  );
}

/** Photo de groupe de la page d'accueil : 2 rangées qui remplissent le panneau d'un bord à l'autre.
 *  Devant 5 personnes, derrière 6 (plus serrées, visages entiers au-dessus du rang de devant). Même taille pour tous.
 *  Le groupe mesure `span` px de large : le parent le met à l'échelle de sa largeur + 40 px (20 px de débord de chaque côté). */
export const GROUP_ROWS: readonly (readonly PersonId[])[] = [[0, 8, 2, 27, 14], [12, 5, 22, 3, 17, 7]];
export function groupSize(fw = 170) {
  const fh = fw * PERSON_RATIO, rise = Math.round(fh * 0.4), n = GROUP_ROWS[0].length;
  return { span: Math.round(fw * 0.66 * (n - 1) + fw), height: Math.ceil(rise * (GROUP_ROWS.length - 1) + fh), rise };
}
export function GroupPhoto({ rows = GROUP_ROWS, fw = 170, scale = 1 }: { rows?: readonly (readonly PersonId[])[]; fw?: number; scale?: number }) {
  const { span, height, rise } = groupSize(fw);
  return (
    <div aria-hidden style={{ position: "absolute", left: "50%", bottom: 0, width: span, height, transform: `translateX(-50%) scale(${scale})`, transformOrigin: "50% 100%" }}>
      {rows.map((ids, r) => {
        const st = ids.length > 1 ? (span - fw) / (ids.length - 1) : 0;
        return ids.map((id, i) => (
          <Person key={`${r}-${i}`} id={id} width={fw} style={{ position: "absolute", left: Math.round(st * i), bottom: rise * r, zIndex: (rows.length - r) * 10 + (i % 2) }} />
        ));
      })}
    </div>
  );
}
