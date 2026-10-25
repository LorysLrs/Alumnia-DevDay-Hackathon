# Les prompts à donner à Claude Code

Ouvre le dossier `alumnia` dans Claude Code. Il lit `CLAUDE.md` tout seul. Colle les prompts un par un, dans l'ordre, et attends que chaque étape soit finie (typecheck et build verts) avant la suivante.

## 1. Démarrage

> Lis CLAUDE.md, puis docs/prototype/alumnia-prototype.src.html en entier, puis la dernière section de docs/SPEC.md. Ne code rien encore. Fais-moi un plan de la phase A : la liste des composants React et des fichiers que tu vas créer, et pour chaque écran du prototype la fonction `V.*` qu'il reproduit. Signale tout ce qui te semble ambigu.

## 2. Les fondations

> Fais les tâches 1 et 2 de la phase A de CLAUDE.md : prototype.css à l'identique, AppShell (barre du haut, bouton Copilote IA, panneau Démo, toasts, mode tournage), données de démo typées dans lib/demo et store client avec sauvegarde localStorage. Lance npm run dev et montre-moi l'accueil.

## 3. Les écrans élève

> Fais les tâches 3 à 5 de la phase A. Reprends le HTML et les textes des fonctions V.* du prototype mot pour mot. Après chaque écran, compare-le visuellement au prototype en 1440 et 390 px et corrige les écarts.

## 4. Les autres rôles et l'IA

> Fais les tâches 6 et 7 de la phase A. Les routes /api/ai/* appellent OpenAI côté serveur avec les mêmes consignes et formes JSON que la fonction ai() du prototype, avec un délai de 15 s et la version de secours locale. Aucune clé dans le navigateur.

## 5. La vérification

> Fais la tâche 8 : scripts/compare.mjs et le test e2e du parcours de démo de CLAUDE.md. Corrige jusqu'à moins de 2 % d'écart sur chaque écran, puis donne-moi le rapport compare/report.html.

## 6. Plus tard : la vraie app

> Passe à la phase B de CLAUDE.md, tâche par tâche, en gardant NEXT_PUBLIC_DEMO_MODE=1 fonctionnel pour la démo.

## Si quelque chose ne colle pas

> Sur l'écran X, l'app ne ressemble pas au prototype : [décris ce que tu vois]. Ouvre le prototype à la vue #X avec fillDemo('yanis'), compare le HTML produit et corrige.
