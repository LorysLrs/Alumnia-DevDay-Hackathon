---
name: Alumnia
description: Cahier d'élève sur papier blanc. Un vert qui veut dire « tu avances », un jaune qui veut dire « bravo », des gens dessinés qui sourient, un cartouche vert d'école pour logo et une orbe pour l'IA. Arrondi, gros boutons qui s'enfoncent, des paillettes seulement quand on a vraiment avancé.
version: 4
---

# Alumnia — DESIGN.md

Ce fichier fait foi pour tout ce qui se voit et tout ce qui bouge. La spec (section « Les écrans, un par un ») dit **quoi** afficher ; ce fichier dit **comment**. En cas de conflit sur l'apparence ou le mouvement, ce fichier gagne.

Les maquettes de tous les écrans sont dans `docs/ecrans/` (01 à 16). La vidéo `docs/alumnia-motion-design.mp4` montre les quatre mouvements principaux. La page `/kit` affiche les composants de référence en vrai.

## 1. L'idée

Alumnia, c'est un cahier qu'on remplit avec quelqu'un qui est passé avant nous. Quatre signes le portent sur chaque écran :

1. **Des gens, pas des icônes.** Des personnages Open Peeps qui sourient.
2. **Un chemin qu'on avance.** Vert = fait, gros points clairs = à faire, étoile jaune = l'objectif.
3. **Qui parle.** L'IA (bleu, avec une orbe), un alumni (corail), une entreprise (sarcelle).
4. **Un cartouche d'école.** Le logo : le sérieux d'une grande école, avec un coin jaune.

## 2. Logo

**Idée en une phrase :** le nom dans un cartouche vert arrondi, avec une paillette jaune au coin. Le cartouche garde le sérieux d'une école ; l'écriture ronde et la paillette le rendent accueillant. La paillette est le même signe que celui qui jaillit à chaque réussite dans l'app.

- Logo principal :
  - cartouche vert `#1C8247`, 160 de haut, coins arrondis à 44 ;
  - « Alumnia » en blanc, Bricolage Grotesque 800 (la police des titres), vectorisée, interlettrage −1,2 % ;
  - paillette à quatre branches jaune `#FFC93C` posée sur le coin en haut à droite, détourée par un liseré de la couleur du fond (blanc sur fond clair, `#0F1714` sur fond sombre).
- Symbole (favicon, icône d'app) : carré vert aux coins très arrondis (64 sur 216), « a » minuscule blanc, paillette jaune au coin.
- Fichiers dans `public/brand/` : `alumnia-logo.svg`, `alumnia-logo-fond-sombre.svg`, `alumnia-logo-noir.svg`, `alumnia-logo-blanc.svg`, `alumnia-symbole.svg`, `alumnia-symbole-noir.svg`, `alumnia-symbole-blanc.svg`, `icone-app.svg`. Planche : `docs/alumnia-logo-planche.png`.
- Composant : `components/ui/Logo.tsx`.
- Règles :
  - hauteur minimale : 24 px à l'écran ;
  - zone de protection : la hauteur de la paillette tout autour ;
  - le cartouche ne s'étire pas et ne change pas de couleur (vert, ou noir et blanc en une couleur) ;
  - pas d'ombre, pas de contour, pas d'inclinaison.
- Une recherche d'antériorité de marque reste à faire avant un lancement réel.

## 3. Couleurs

| Rôle | Jeton | Valeur | Usage |
| --- | --- | --- | --- |
| Fond | `--paper` | `#FFFFFF` | Fond de page. Pas de crème. |
| Surface | `--wash` | `#F3F6F1` | Un cran de ton pour séparer, à la place d'une ombre |
| Bord | `--line` | `#E3E8E2` | Bords de 2 px des cartes, boutons secondaires, champs |
| Encre | `--ink` | `#15201B` | Tout le texte courant |
| Encre 2 | `--ink-2` | `#4A5650` | Notes, sous-titres (7,7:1 sur blanc) |
| Vert | `--green` | `#1C8247` | Action principale, progression, « fait » (blanc dessus : 4,85:1) |
| Vert bord | `--green-edge` | `#16683A` | Bord bas des boutons verts, texte sur `--green-wash` (6:1) |
| Vert lavis | `--green-wash` | `#E3F5E9` | Onglet actif, choix sélectionné, bandeau roadmap |
| Soleil | `--sun` | `#FFC93C` | Récompenses uniquement : objectif, médaille, compteur d'étapes, paillettes, point du logo |
| Soleil bord | `--sun-edge` | `#E0A800` | Bord bas des pastilles jaunes |
| Soleil lavis | `--sun-wash` | `#FFF4D1` | Bandeau « Ton profil est prêt » |
| IA | `--ai` / `--ai-wash` / `--ai-dot` | `#1D63B8` / `#E6F0FB` / `#4C8FE0` | Tout texte écrit par l'IA (5,2:1) |
| Humain | `--human` / `--human-wash` / `--human-dot` | `#B83E0C` / `#FFEDE3` / `#F07A3E` | Tout ce qui vient d'un alumni (5:1) |
| Partenaire | `--partner` / `--partner-wash` | `#0F766E` / `#DFF3F0` | Contenu fourni par une entreprise (4,75:1) |

Règles : un fond, une encre, un vert pour agir. Le jaune ne sert qu'à féliciter. Pas de violet, pas d'indigo, pas de dégradé (texte, bouton ou fond).

**Espace partenaire, thème sombre** (`[data-theme="partner-dark"]`) : fond `#0F1714`, surface `#18231F`, bord `#2A3A34`, texte `#EEF3F0`, texte 2 `#A7B5AE`, vert `#5FD08F` (bord `#3E9E68`), soleil inchangé.

Tous les jetons sont déjà dans `app/globals.css`.

## 4. Typographie

- **Titres : Bricolage Grotesque** (variable, axe `opsz`), 700, interlettrage −0,005 em, interligne 1,04–1,1, `text-wrap: balance`.
- **Tout le reste : Figtree** (variable), 400 à 700. Corps 17 px, interligne 1,5. Chiffres alignés avec `font-variant-numeric: tabular-nums`.
- Polices auto-hébergées avec `next/font/local` à partir des paquets `@fontsource-variable/*` (déjà branché dans `app/layout.tsx`).
- Tailles :
  - 58 px : connexion ;
  - 46–52 px : titre d'écran ;
  - 38–40 px : en-tête de rendez-vous, conversation ;
  - 26 px : titre de bloc ;
  - 17–19 px : texte ;
  - 14–15 px : notes.
- Mobile : titres 28–34 px, texte 15–17 px. Cinq tailles au plus par écran.
- Un titre tient en deux lignes au plus.
- **Jamais de petit libellé en capitales au-dessus d'un titre** (« eyebrow »).

## 5. Formes, profondeur, contrôles

- Rayons : cartes 24 px, bandeaux 32 px ; boutons, onglets, puces et créneaux 999 px ; choix du questionnaire 20 px.
- **Pas d'ombre au repos.** On sépare par un cran de ton (`--wash`) ou un bord de 2 px (`--line`). Seuls le toast et les menus ont une ombre douce (`0 12px 32px rgba(21,32,27,.22)`).
- **Bouton principal** `.btn` : pilule verte, bord bas de 4 px `--green-edge`. **Bouton secondaire** `.btn--alt` : blanc, bord 2 px, bord bas 4 px.
- **Choix** `.choice` (réponses, créneaux, classe) : blanc, bord 2 px et bord bas 4 px. Avec `aria-checked="true"` ou `aria-pressed="true"`, il passe en vert clair avec un bord vert et grossit à 1,03.
- **Puces « qui parle »** `.who` + `--ai`, `--human`, `--partner` ou `--done`. La puce IA contient une mini-orbe (`<AiBadge />`).
- **Le chemin (écran « Mon chemin »)** est une route, pas une liste. Voir la section 8 bis.
- Interdits :
  - pas de carte « icône dans un rond + titre + texte » ;
  - pas de numéros 01 / 02 / 03 dans l'interface ;
  - pas de verre dépoli ;
  - pas d'émoji ;
  - pas de bordure gauche colorée.

## 6. Les gens (Open Peeps)

- 12 personnages recolorés dans la palette (dessins Open Peeps, CC0, Pablo Stanley). Tous sourient.
  - `public/people/pN.svg` : le personnage à mi-corps. **Tous ont le même cadre (900 × 1266) et la même échelle.** Le bas du cadre est la ligne où le dessin est coupé, à la taille.
  - `public/people/pN-buste.svg` : tête et épaules, cadre carré centré sur le visage, pour les avatars.
- Qui est qui (un personnage reste le même partout) : Yanis = 0, Sarah = 1, Lorys = 2, Léa = 3, élève sans persona = 4, Inès = 5, Karim = 6, Nadia = 7, Paul = 8, Tom = 9, Mehdi = 10, Julie = 11.
- Composants `components/ui/Person.tsx` : `<Person>`, `<Face>` (avatar), `<Crowd>` (rangée), `<GroupPhoto>` (accueil), `PEOPLE_SETS`.

### Règles de cadrage (à respecter partout)

1. **Toujours posé sur un bord.** Un personnage est collé au bas de son conteneur (`bottom: 0`, conteneur en `overflow: hidden`). Comme les dessins sont coupés à la taille, un personnage qui flotte montre sa coupe : interdit.
2. **Jamais de tête coupée.** Le conteneur est plus haut que le personnage (hauteur = largeur × 1,407).
3. **Profondeur naturelle dans une rangée.** La personne du centre passe devant, les voisins un cran derrière (`z-index` décroissant vers les côtés). Jamais un chevauchement « en dominos » où chacun recouvre son voisin de gauche. Chevauchement d'environ 20 % de la largeur.
4. **Photo de groupe (accueil).** Deux rangs. Le rang du fond est à 80 % de la taille, placé dans les espaces entre les têtes du devant, et monté de 36 % de la hauteur du premier rang. Sa ligne de coupe est ainsi cachée derrière les corps du premier rang. Composant `<GroupPhoto>`, mis à l'échelle par `transform: scale()` (1,24 sur grand écran, 0,66 sur téléphone).
5. **Le mouvement ne décolle pas les personnages.** Au repos, ils penchent très légèrement (rotation de 0,8° autour du bas, 3,6 s). Seuls le saut de célébration et le salut au survol les soulèvent, brièvement.

### Où ils apparaissent

| Écran | Composition |
| --- | --- |
| Accueil | `<GroupPhoto>` sur l'aplat vert clair, la carte « Disponible jeudi » en haut à gauche du panneau |
| Questionnaire, génération | frise en bas de l'écran, personnages de 100 px, opacité 0,8, défilement très lent |
| Bandeaux profil, chemin, fiche métier | 3 personnages de 138 px, posés au bas du bandeau, à 28 px du bord droit |
| Cartes des pros | un personnage de 128 px posé au bas d'un aplat `--wash` de 184 px, logo de l'entreprise en haut à gauche |
| Visio | le pro en grand (290 px), posé au bas de la tuile |
| États vides, encarts | 3 personnages de 104 à 130 px en bas à droite ; sur téléphone, réduits à 78 % et le texte garde 150 px de marge basse |
| Avatars | `<Face>` (buste) dans la barre du haut, les conversations, les rendez-vous |

## 7. L'IA a un visage : l'orbe

L'IA d'Alumnia ne s'affiche jamais en robot, en étincelle ou en icône « magie ». Elle a une **orbe** : `thinking-orbs` (Jakub Antalik, MIT), toile 2D en points, teintée en bleu IA (`color="#1D63B8"`). Une seule orbe animée par écran : les anciennes bulles du chat gardent un cercle pointillé fixe (moins de calcul). Composant : `components/ui/AiOrb.tsx`.

| Où | Orbe | Taille | État |
| --- | --- | --- | --- |
| Avatar de l'IA dans la conversation du questionnaire (relances) | à gauche de chaque bulle de l'IA | 64 | `composing` pendant qu'elle écrit, puis `breathing` |
| Pendant que l'élève tape sa réponse | sous le dernier message | 64 | `listening` |
| Écran « Je lis tes réponses » | au centre d'un disque `--ai-wash` de 150 px, taille native (jamais agrandie par `scale`, elle deviendrait floue) | 64 | `composing` |
| Liste d'étapes de cet écran | à la place de la coche de l'étape en cours | 20 | `working` |
| Génération de la roadmap | dans le bandeau, à la place des personnages | 64 | `weaving` |
| Recherche des alumni (« Pourquoi lui parler ») | en haut de la grille pendant le calcul | 64 | `searching` |
| Fiche de préparation et compte rendu en cours | dans le bloc, avec « L'IA prépare… » | 64 | `weaving` / `composing` |
| Puce « Écrit par l'IA », « Préparé par l'IA », « Résumé par l'IA » | dans la puce | 20 | `breathing` |

Règles :
- l'orbe a toujours un texte à côté, qui dit ce qui se passe (« Je lis tes réponses… ») ;
- on n'affiche jamais une fausse progression ;
- si l'IA met plus de 12 s, le texte devient « C'est plus long que prévu, encore un instant » ;
- au bout de 20 s, on bascule sur le contenu de secours ;
- avec `prefers-reduced-motion`, l'orbe s'affiche figée (le paquet le gère).

## 8. Mouvement

Principes, tirés des skills d'Emil Kowalski, de taste-skill et d'impeccable :
- `ease-out` fort pour ce qui entre (`--ease-out: cubic-bezier(.23,1,.32,1)`), `ease-in-out` (`cubic-bezier(.77,0,.175,1)`) pour ce qui se déplace à l'écran, jamais `ease-in` ;
- l'interface reste entre 150 et 250 ms ;
- on n'anime que `transform` et `opacity` ;
- on ne part jamais de `scale(0)` (partir de 0,95) ;
- une animation peut toujours être interrompue (transitions CSS plutôt que keyframes pour l'interface) ;
- avec `prefers-reduced-motion` : plus de déplacement, plus de paillettes, mais le contenu et les toasts restent.

Pas de chorégraphie au chargement des pages : une app se charge pour qu'on s'en serve.

### Catalogue complet

| # | Moment | Élément | Ce qui change | Durée | Courbe | Mouvement réduit |
| --- | --- | --- | --- | --- | --- | --- |
| M1 | Appui sur un bouton, un choix, une pastille | `.btn`, `.choice`, pastille | `translateY(2px) scale(.98)`, bord bas 4 → 2 px | 160 ms | ease-out | Inchangé (pas de déplacement notable) |
| M2 | Survol (souris seulement, `@media (hover:hover)`) | boutons, cartes cliquables | fond un cran plus foncé ; carte : bord `--line` → `--green` | 150 ms | ease | Inchangé |
| M3 | Choix d'une réponse au questionnaire | `.choice` choisi | fond vert clair, bord vert, `scale(1.03)` ; la coche apparaît en `scale(.9 → 1)` + opacité | 150 ms | ease-out | Couleur seule |
| M4 | Passage à la question suivante (250 ms après le choix) | carte de question | sortie : `translateX(0 → -40px)`, opacité 1 → 0 ; entrée : `translateX(40px → 0)`, opacité 0 → 1 | 250 + 250 ms | ease-out | Fondu enchaîné de 150 ms |
| M5 | Retour à la question précédente | carte de question | même chose dans l'autre sens | 250 + 250 ms | ease-out | Fondu |
| M6 | Barre de progression | remplissage | `width` vers la nouvelle valeur (`transform: scaleX` si possible) | 450 ms | ease-out | Saut direct |
| M7 | Nouveau message de l'IA dans la conversation | bulle + orbe | la bulle entre en `translateY(12px → 0)`, opacité 0 → 1 ; l'orbe passe de `composing` à `breathing` quand le texte est là | 200 ms | ease-out | Apparition simple |
| M8 | Message de l'élève envoyé | bulle verte | `translateY(12px → 0)`, opacité 0 → 1 | 200 ms | ease-out | Apparition simple |
| M9 | Attente de l'IA | orbe | animation propre au paquet ; texte qui change à 12 s | continue | — | Orbe figée |
| M10 | Profil prêt (arrivée sur Mon profil après le questionnaire) | médaille | `<Celebrate size="lg">` + médaille `scale(.95 → 1)` | 900 ms | voir Celebrate | Pas de paillettes, toast seul |
| M11 | Étape cochée sur le chemin | pastille, tracé, avatar | voir section 8 bis : le tracé et l'avatar avancent ensemble, puis pop et `<Celebrate size="md">` sur la pastille ; toast « Étape validée · +1 étape » ; compteur du menu +1 (M14) | 800 ms + 900 ms | ease-in-out puis ease-out | Couleur + toast |
| M12 | Échange demandé | bouton de la carte alumni | le bouton devient « Demande envoyée » ; `<Celebrate size="sm">` ; toast « C'est demandé ! {prénom} te répond sous 48 h · +1 étape » | 900 ms | ease-out | Texte + toast |
| M13 | Compte rendu généré | pilule « Ajouté à ta roadmap » | entre en `translateY(12px → 0)` ; `<Celebrate size="sm">` sur la coche | 900 ms | ease-out | Apparition + toast |
| M14 | Compteur « N étapes validées » et chiffres de l'espace partenaire | nombre | le chiffre roule vers sa valeur (Skiper UI « Animated number », `skiper37`, ou compteur maison) | 600 ms | ease-out | Valeur directe |
| M15 | Première ouverture du chemin | route, pastilles, cartes, avatar | voir section 8 bis | 1,1 s + 0,9 s | ease-in-out | Tout déjà en place |
| M16 | Toast (Sonner) | toast | entre par le haut, sort vers le haut, reste 4 s ; un seul `<Toaster position="top-center">` | réglage Sonner | — | Sonner gère |
| M17 | Ouverture d'un panneau ou d'un menu | panneau | `scale(.97 → 1)` + opacité depuis le bord d'où il s'ouvre (`transform-origin` du déclencheur) | 200 ms | ease-out | Opacité seule |
| M18 | Chargement d'une liste | blocs gris arrondis `--wash` | pulsation d'opacité .6 ↔ 1 | 1,2 s en boucle | ease-in-out | Blocs fixes |

**`<Celebrate>`** (`components/ui/Celebrate.tsx`) :
- 16 éléments (étoiles à 4 branches de 24 px et points de 11 px) partent du centre ;
- couleurs : jaune `#FFC93C`, corail `#F07A3E`, vert `#1C8247`, bleu `#4C8FE0` ;
- rayons 34/46 (sm), 48/66 (md), 66/88 (lg) ;
- chaque élément : 0 → 25 % apparaît ; à 70 % il est à sa distance, à `scale(1.1)`, tourné ; à 100 % il est à 1,2 fois sa distance, à `scale(.7)`, transparent ;
- durée 900 ms, `cubic-bezier(.2,.8,.3,1)`, décalage de 0 à 75 ms par groupe de 4 ;
- anneau jaune de 4 px qui passe de `scale(.8)` à `scale(2.3)` en 800 ms ;
- le toast part 150 ms après.

Les paillettes restent rares : quatre moments seulement (M10 à M13). On ne les ajoute nulle part ailleurs.

## 8 bis. Le chemin animé

Référence exacte : `docs/prototype/alumnia-prototype.src.html`, fonctions `V.roadmap`, `journeyLayout`, `jWalk`, `journeyToggle`, et les classes `.journey`, `.j*`.

**Ce qu'on voit**
- Un grand panneau vert profond `#103A24`, coins de 32 px, avec une trame de points blancs à 7 % tous les 22 px.
- En haut : « Ton chemin vers », le métier en grand titre blanc, une ligne (durée, formation, salaire de départ) ; à droite, le compteur « 1 sur 2 étapes faites » en jaune, une barre jaune et les années « 2026 → 2030 ».
- Une **route** qui serpente de haut en bas : bande blanche à 9 % de 30 px de large, ligne pointillée au centre qui défile lentement vers l'avant (1,4 s par motif), et par-dessus le **tracé vert** `#5FD08F` de 9 px jusqu'à la dernière étape faite.
- Sur ordinateur, les étapes alternent à gauche et à droite de la route (écart de 15 % de la largeur, 170 px au plus) ; chaque étape a sa pastille ronde sur la route et sa carte blanche du côté de la pastille. Sur téléphone, la route longe le bord gauche et toutes les cartes sont à droite.
- Chaque carte : une puce d'année (« Derrière toi », « Aujourd'hui », « Rentrée 2027 », « 2027 – 2030 », « 2030 »), le titre, une ligne d'explication, puis le bouton « Marquer comme fait » (ou « Tu es ici », « Objectif »). Une étape ajoutée après un échange a un liseré jaune.
- Pastilles : blanches avec une icône (chapeau, livre, mallette, paillette) ; vertes avec une coche quand c'est fait ; vert sombre pour une formation arrêtée ; l'objectif est une médaille jaune de 78 px avec un halo qui pulse (2,6 s).
- L'avatar du jeune (42 px, liseré blanc, étiquette jaune avec son prénom) se tient sur la route, au niveau de la dernière étape faite.

**Ce qui bouge**
| Moment | Mouvement | Durée |
| --- | --- | --- |
| Première ouverture du chemin d'un métier | la route se dessine du haut vers le bas (masque SVG, `stroke-dashoffset`) ; chaque pastille apparaît (`scale 0 → 1`, ressort) au moment où la route l'atteint ; sa carte monte de 14 px en fondu 80 ms après | 1,1 s pour la route |
| Juste après | le tracé vert avance jusqu'à la position du jeune, et l'avatar marche le long de la courbe (il se balance de ±5° à chaque pas) | 0,9 s, ease-in-out |
| « Marquer comme fait » | le bouton passe au vert avec une coche ; le tracé vert et l'avatar avancent ensemble jusqu'à la nouvelle dernière étape faite ; à l'arrivée, la pastille fait un « pop » et lance des paillettes ; toast « Étape validée · +1 étape » ; le compteur jaune se met à jour | 0,8 s |
| Retour d'un compte rendu (« Voir » sur « Ajouté à ton chemin ») | la carte ajoutée défile au centre de l'écran et grossit brièvement | 1,4 s |
| Visites suivantes | tout est déjà en place, sans animation d'entrée | — |
| Mouvement réduit | tout est en place directement, aucun déplacement ; seul le halo de l'objectif reste, figé | — |

## 9. États

- **Chargement** : orbe et phrase humaine (« Je lis tes réponses… ») pour l'IA ; blocs gris arrondis (M18) pour une liste ; jamais de spinner au milieu.
- **Erreur** : ce qui s'est passé et quoi faire, en une phrase, avec un bouton « Réessayer ». Exemple : « On n'a pas pu enregistrer ta réponse. Vérifie ta connexion et réessaie. »
- **IA indisponible** : contenu de secours avec la puce « Écrit sans IA ». L'écran ne bloque jamais.
- **Vide** : dit quoi faire ensuite, avec 3 personnages et un bouton (voir `docs/ecrans/ordinateur/19-mes-echanges.jpg`).
- **Désactivé** : opacité .5, pas de mouvement au clic.
- **Focus clavier** : anneau vert de 3 px, décalé de 3 px, sur tout ce qui se clique.

## 10. Mobile

Tout passe en une colonne à 390 px, marges de 16 px :
- questionnaire : les 5 réponses deviennent une liste verticale de choix pleine largeur ;
- roadmap : le chemin devient une ligne verticale à gauche avec les pastilles de 44 px, et le bouton « Parler à un alumni » est en bas, pleine largeur ;
- barre du haut : logo symbole, compteur d'étapes, avatar ; les onglets passent en barre en bas de l'écran (3 onglets, 64 px de haut).

Captures : `docs/ecrans/telephone/*.jpg` (les 24 écrans en 390 px).

## 11. Écrire

- Tutoiement côté élève, vouvoiement côté entreprise. Phrases courtes.
- Les boutons disent ce qu'ils font (« Demander l'échange », pas « Valider »).
- Les toasts félicitent ce qui vient de se passer, précisément (« Ta formation est choisie »), pas « Bravo ! ».
- Aucune citation, note ou chiffre inventé présenté comme réel : les données de démo sont signalées « Données d'exemple ».

## 12. Sources

- Skills appliqués : taste-skill (Leonxlnx), impeccable (pbakaus), skills d'Emil Kowalski (animation, Sonner), logo-design-skill (kaankiziltug).
- Composants : thinking-orbs (Jakub Antalik), Sonner (Emil Kowalski), Skiper UI (gratuits : Canvas crowd, Animated number), Open Peeps (Pablo Stanley, CC0).
- Référence de style : Refero Styles, fiche Duolingo.


## 13. v6 : Hub, copilote IA, décisions humaines

- **Copilote IA** : couleur `--ai` (#1D63B8). Bouton flottant bleu « Copilote IA » en bas à droite sur les écrans élève (icône seule sous 700 px). Carte « Ton copilote IA » en tête du Hub, fond `--ai-wash`.
- **Décision humaine** (`.hitl`) : sous chaque sortie de l'IA, une ligne séparée par un trait pointillé bleu clair, « Tu décides : » puis trois boutons (vert plein, blanc bordé, transparent bordé). Après décision : pastille `.dec` (vert validé, jaune modifié, gris refusé, orange choisi) + lien « Changer d'avis ».
- **Brief** : fond `--human-wash` (c'est ce que verra un humain). Question proposée = bordure pointillée bleue ; gardée = bordure verte.
- **Hub** : deux colonnes 7/12 et 5/12, puis grille de 12 ; cartes blanches bordées 2 px, rayon 24 px.
- **Photo de groupe de l'accueil** : 2 rangées qui remplissent le panneau d'un bord à l'autre (5 devant, 6 derrière, même taille, visages du fond entiers), mise à l'échelle de la largeur du panneau avec 20 px de débord de chaque côté.
