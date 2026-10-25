# Alumnia : instructions pour Claude Code

Tu construis **Alumnia**, une application web d'orientation. Ton objectif n°1 : une application Next.js qui reproduit **exactement** le prototype (`docs/prototype/alumnia-prototype.html`), écran par écran, texte par texte, animation par animation, pour une démo devant un jury. Ton objectif n°2, seulement ensuite : la brancher sur une vraie base et de vrais comptes.

## Les sources de vérité, dans cet ordre

1. **`docs/prototype/alumnia-prototype.src.html`** : le code lisible du prototype (un seul fichier : CSS, données, vues, logique). C'est la référence pour **tout ce qui se voit et bouge** : textes, couleurs, tailles, ordre des cartes, animations, états vides, messages d'erreur, données de démo. Ouvre `docs/prototype/alumnia-prototype.html` dans un navigateur pour le voir tourner (bouton « Démo » en bas à gauche).
2. **`docs/SPEC.md`** : la spécification. La dernière section, **« v6 : le Hub, le copilote IA et l'humain qui décide »**, prime sur le reste. Elle donne le modèle de données, les routes, les règles de sécurité et les critères d'acceptation.
3. **`DESIGN.md`** : jetons de couleur, polices, personnages, mouvements.
4. **`docs/ecrans/ordinateur/*.jpg`** et **`docs/ecrans/telephone/*.jpg`** : captures de référence (1440 px et 390 px).

Si le prototype et la spec se contredisent sur ce qui se voit, le prototype gagne. Sur les données, la sécurité ou la vie privée, la spec gagne.

## Les règles qui ne se discutent pas

- **L'humain a le dernier mot.** Aucune sortie de l'IA n'est envoyée au pro ni ajoutée au chemin sans un clic de l'élève (Valider, Modifier, Refuser). Le journal garde le texte d'origine de l'IA et, à part, la version de l'élève.
- **La clé OpenAI reste sur le serveur** (`OPENAI_API_KEY`, `OPENAI_MODEL`, par défaut `gpt-4.1-mini`). Jamais dans le navigateur. Le champ de clé de l'écran « Moteur IA » du prototype n'existe pas dans l'app : à la place, l'écran affiche le moteur réellement utilisé côté serveur.
- **Toujours une version de secours** : si OpenAI ne répond pas (pas de clé, délai de 15 s, erreur), on renvoie le résultat calculé localement, exactement comme dans le prototype (`localProfile`, `localQuestions`, `localReport`, `localAlv`, `localPrep`, `chatQ`). Le site ne s'arrête jamais.
- **Les métiers viennent du calcul**, pas de l'IA (`score()` et `JOBS` du prototype, déjà portés dans `lib/questionnaire/`).
- **Données envoyées à l'IA** : jamais le prénom, l'e-mail ni le lycée (voir `anon()` du prototype).
- Pas de nouvelle bibliothèque d'interface. Déjà là : `sonner`, `thinking-orbs`, `zod`, `openai`, polices `@fontsource-variable`. Pas de Tailwind sauf s'il lit les jetons existants.
- All user-facing screens and AI responses are in English. Preserve French education names (Parcoursup, BTS, BUT, licence, master, alternance) and explain them briefly in English when helpful. Start career guidance from the student's own stated direction; RIASEC results are secondary clues.
- Accessibilité : focus visible, tout au clavier, `prefers-reduced-motion` respecté, contrastes du prototype.

## La méthode pour coller au prototype

1. **Le CSS d'abord, à l'identique.** Copie tout le bloc `<style>` du prototype dans `app/prototype.css` (importé par `app/layout.tsx`), sans renommer les classes. Les composants React produisent le même HTML (mêmes balises, mêmes classes, mêmes attributs ARIA) que les fonctions `V.*` du prototype. C'est le moyen le plus sûr d'avoir un rendu identique.
2. **Les données de démo à l'identique.** Porte `PERSONAS`, `COMPANIES`, `NIVEAUX`, `CONTEXT`, `RAW`/`ITEMS`, `JOBS`, `CAT`, `ALUMNI`, `DEMO_NOTES`, `DEMO_REPORT`, `opps()`, `seedDemo()` dans `lib/demo/*.ts`, typés. Ne réécris pas les textes.
3. **L'état côté client.** Un store React (contexte + `useReducer`) qui reprend l'objet `S0` du prototype et le sauvegarde dans `localStorage` (clé `alumnia-demo-v2`). En mode démo (`NEXT_PUBLIC_DEMO_MODE=1`), tout fonctionne sans base. Le panneau « Démo » (bas gauche) et le mode tournage (touche D) sont repris tels quels.
4. **Les appels IA par le serveur.** Une route par appel, mêmes consignes, mêmes formes JSON que le prototype : `POST /api/ai/followup` (relance du questionnaire), `/api/ai/profile` (synthèse et questions), `/api/ai/prechat` (copilote), `/api/ai/alv` (fiche pour le pro), `/api/ai/report` (compte rendu). Réponse : `{ data, engine: "openai" | "secours", model, ms }`. Le client affiche `engine` dans la pastille du moteur et dans « Voir ce que l'IA a reçu ».
5. **Les personnages.** Utilise `components/ui/Person.tsx` (`Person`, `Face`, `Crowd`, `GroupPhoto`) et les SVG de `public/people/`. La photo de l'accueil est `GroupPhoto` : 2 rangées, 5 devant et 6 derrière, mise à l'échelle de la largeur du panneau + 40 px (fonction `fitGroups` du prototype).
6. **L'orbe de l'IA** : `components/ui/AiOrb.tsx` (bibliothèque `thinking-orbs`, mêmes états que `data-orb` dans le prototype : `breathing`, `composing`, `weaving`).

## Les écrans et leurs adresses

| Vue du prototype (`#…`) | Route Next.js | Capture |
| --- | --- | --- |
| `login` | `/` | 01 |
| `questionnaire` | `/questionnaire` | 02 à 07 |
| `gen` | `/questionnaire/analyse` | 08 |
| `profil` | `/profil` | 09 |
| `hub` | `/hub` | 25 à 27 |
| `roadmap` | `/chemin` | 10, 18 |
| `metier` | `/metier` | 11 |
| `alumni` | `/pros` | 12 |
| `prep` | `/echanges/preparer` | 28 à 30 |
| `rdv` | `/echanges/rendez-vous` | 13, 15, 17, 31 |
| `echanges` | `/echanges` | 19 |
| `visio` | `/visio` | 16 |
| `alumni-vue` | `/pro` | 14 |
| `entreprise` | `/entreprises` | 20 |
| `partenaire` | `/partenaire` | 21 |
| `rapport` | `/partenaire/rapport` | 22 |
| `classe` | `/classe` | 23 |
| `comment` | `/comment-ca-marche` | 24 |
| `ia` | `/ia` | 32 |

(Les numéros renvoient à `docs/ecrans/ordinateur/NN-*.jpg` et `docs/ecrans/telephone/NN-*.jpg`, toutes refaites sur le prototype v6.)

## Vérifier que c'est identique

Écris `scripts/compare.mjs` (Playwright, déjà disponible dans l'environnement de Claude Code s'il est installé ; sinon `npm i -D playwright`) qui, pour chaque ligne du tableau, en 1440×900 puis 390×844 :
1. ouvre le prototype (`file://…/docs/prototype/alumnia-prototype.html`), prépare le même état (`fillDemo('yanis')`, `fillDemo('sami')`…) et va à la vue ;
2. ouvre la même route de l'app avec le même état ;
3. fait une capture pleine page des deux et calcule l'écart de pixels (`pixelmatch`) ;
4. écrit `compare/report.html` avec les deux images côte à côte et l'écart.

Un écran est fini quand l'écart est sous 2 % (hors animations : désactive-les avec `prefers-reduced-motion: reduce` pendant la comparaison) et que le parcours clavier fonctionne.

## Le parcours de démo qui doit marcher sans accroc

1. Accueil → « Je suis Paul, je me réoriente » → questionnaire (avec la question de relance de l'IA) → analyse → profil (« C'est moi »).
2. Hub → prochaine action → « Voir ses créneaux » → Lorys → demande envoyée.
3. Copilote : « Je stresse un peu » → question proposée → Garder → Envoyer à Lorys.
4. Panneau Démo : « Vue du pro (Lorys) » → fiche du jeune (Fiche juste) → Confirmer.
5. Visio → Terminer l'échange → Exemple de notes → Faire mon compte rendu → C'est fidèle → Ajouter à mon chemin.
6. Hub : l'étape est dans le chemin, la décision dans le journal.
7. Entreprise → tableau de bord Nexora → rapport RSE.

Ajoute ce parcours en test e2e (`npm run test:e2e`).

## Ordre de travail

**Phase A, la démo identique (priorité absolue)**
1. `app/prototype.css`, polices, `AppShell` (barre du haut, bouton Copilote IA, panneau Démo, toasts, mode tournage).
2. Données de démo et store.
3. Accueil, questionnaire, analyse, profil.
4. Hub, chemin, fiche métier.
5. Pros, copilote, rendez-vous, visio, compte rendu, échanges.
6. Vue du pro, entreprise, partenaire, rapport, classe, comment ça marche, moteur IA.
7. Routes `/api/ai/*` avec OpenAI et secours.
8. `scripts/compare.mjs` et e2e ; corriger jusqu'à < 2 % d'écart.

**Phase B, la vraie app (après la démo)**
9. Supabase : `supabase/migrations/0001_init.sql` (existe) + `0003_v6.sql` (dans la spec), RLS, `npm run test:db`.
10. Connexion par lien magique, rôles côté serveur.
11. Remplacer le store de démo par les routes de la spec (`/api/hub`, brief, décisions, réservations…), en gardant `NEXT_PUBLIC_DEMO_MODE` pour la démo hors ligne.
12. Modération des messages du copilote (endpoint de modération d'OpenAI, message fixe avec le 3114 en cas de détresse).

Une tâche est finie quand `npm run typecheck`, `npm run build`, `npm test` passent (et `npm run test:db`, `npm run test:e2e` quand ils existent).

## Ce qui existe déjà

| Fichier | Statut |
| --- | --- |
| `lib/questionnaire/*` | Items, calcul des goûts et des métiers, schémas. Testé (`npm test`). |
| `app/api/profile`, `app/api/questionnaire/followup`, `lib/openai.ts` | Appels OpenAI avec secours. À aligner sur les consignes et formes JSON du prototype. |
| `app/questionnaire/page.tsx` | Logique faite, style à remplacer par celui du prototype. |
| `app/globals.css` | Jetons de base (à garder ; `prototype.css` vient par-dessus). |
| `components/ui/*` | Personnages, orbe, logo, célébrations. |
| `public/people/`, `public/brand/` | Personnages et logo. |
| `supabase/migrations/0001_init.sql` | Schéma initial + RLS (phase B). |

## Commandes

```bash
npm install
cp .env.example .env.local      # OPENAI_API_KEY, OPENAI_MODEL ; NEXT_PUBLIC_DEMO_MODE=1 pour la démo
npm run dev                     # http://localhost:3000
npm run typecheck && npm run build && npm test
```
