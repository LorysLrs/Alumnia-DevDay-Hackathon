# Pour Codex : construire Alumnia de zéro

Tu construis Alumnia, une application web d'orientation. Les lycéens et les étudiants répondent à un questionnaire, reçoivent 3 pistes de métiers et un chemin, retrouvent tout dans leur **Hub**, préparent leur échange avec un **copilote IA**, puis parlent 30 minutes avec un salarié d'une entreprise partenaire. L'IA propose, l'élève décide : chaque sortie de l'IA a Valider / Modifier / Refuser, et chaque décision est journalisée. L'entreprise paie et voit des chiffres agrégés.

**Depuis la v6, la section « v6 : le Hub, le copilote IA et l'humain qui décide » de la spec fait foi en cas de conflit.**

## Lis dans cet ordre

1. **La spécification** (document partagé par Lorys), en particulier la section **« Les écrans, un par un »** : ce que chaque écran affiche, ses données, ses critères d'acceptation. Elle contient aussi le modèle de données, les routes d'API, les contrats et la liste des tâches.
2. **`DESIGN.md`** : couleurs, polices, formes, personnages, orbe de l'IA, et le catalogue complet des mouvements (M1 à M18). Il fait foi pour tout ce qui se voit et bouge.
3. **`docs/prototype/alumnia-prototype.html`** : le prototype complet et cliquable (ouvre-le dans un navigateur, bouton « Démo » en bas à gauche). C'est la référence visuelle et de comportement : chaque écran, chaque texte, chaque animation. Le code lisible est dans `docs/prototype/alumnia-prototype.src.html`. Si le prototype contredit la spec sur les données ou la sécurité, la spec gagne ; sur ce qui se voit, le prototype gagne.
4. **`docs/ecrans/*.jpg`** : captures du prototype, écran par écran, ordinateur et téléphone (25 à 32 : Hub, copilote, brief, décisions, moteur IA).
5. **`docs/alumnia-motion-design.mp4`** : les mouvements principaux en vidéo.
6. **Le business plan** est dans l'onglet « Business plan et pricing » de la spec (prix, acteurs, offres). Les écrans entreprise (`#entreprise`, `#partenaire`, `#rapport`) en reprennent les chiffres.

## Ce qui existe déjà

| Fichier | Statut |
| --- | --- |
| `lib/questionnaire/*`, `app/api/profile`, `app/api/questionnaire/followup` | Questionnaire fonctionnel (RIASEC, IA, secours), testé. À brancher sur la base et à styler. |
| `app/questionnaire/page.tsx` | Logique faite, **sans style**. Passer à une activité par carte (`RIASEC_PAGE_SIZE = 1`) et appliquer les maquettes 02 à 05. |
| `supabase/migrations/0001_init.sql` | Schéma complet + RLS, testé avec `npm run test:db`. |
| `app/globals.css` | Tous les jetons et les classes de base (`.btn`, `.btn--alt`, `.choice`, `.card`, `.soft`, `.who--*`). |
| `app/layout.tsx` | Polices auto-hébergées (Bricolage Grotesque, Figtree), un seul `<Toaster>` Sonner. |
| `components/ui/AiOrb.tsx` | Orbe de l'IA (`thinking-orbs`) et puce `<AiBadge />`. |
| `components/ui/Celebrate.tsx` | Paillettes + toast. Quatre moments seulement. |
| `components/ui/Person.tsx` | Personnages Open Peeps au cadre commun (`public/people/pN.svg`, `pN-buste.svg`), `<Face>`, `<Crowd>`, `<GroupPhoto>`. Lis les règles de cadrage de DESIGN.md § 6 avant de placer un personnage. |
| `components/ui/Logo.tsx`, `public/brand/*` | Logo et icônes. |
| `app/kit/page.tsx` | Page de vérification des composants. À garder pendant le développement. |

## Règles de travail

- Une tâche à la fois, dans l'ordre de la spec. Une tâche est finie quand `npm run typecheck`, `npm run build`, `npm test` et `npm run test:db` passent, et que l'écran ressemble à sa maquette.
- N'ajoute pas de bibliothèque d'interface (pas de MUI, Chakra, etc.). Tailwind est autorisé s'il lit les jetons de `globals.css`. Bibliothèques déjà choisies : `sonner`, `thinking-orbs`.
- Toujours un contenu de secours quand l'IA ne répond pas (`DEMO_MODE`, pas de clé, délai dépassé).
- Aucune sortie de l'IA n'est envoyée au pro ni ajoutée au chemin sans un clic de l'élève. La clé OpenAI reste côté serveur.
- Pas de données personnelles dans les journaux. Le rôle d'un utilisateur ne se change que côté serveur.
- Accessibilité : contrastes déjà vérifiés, focus visible, tout au clavier, `prefers-reduced-motion` respecté.
- Every user-facing screen and AI response is in English. Preserve French education names (Parcoursup, BTS, BUT, licence, master, alternance) and explain them briefly in English when helpful. Start career guidance from the student's own stated direction; RIASEC results are secondary clues.

## Commandes

```bash
npm install
cp .env.example .env.local   # OPENAI_API_KEY, OPENAI_MODEL, clés Supabase
npm run dev                  # http://localhost:3000/questionnaire et /kit
npm run typecheck && npm run build && npm test && npm run test:db
```
