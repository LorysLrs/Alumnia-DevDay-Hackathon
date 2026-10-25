# Spécification Alumnia — produit et implémentation

Oct 24, 2026 · @Lorys

> **À jour au 25 octobre 2026.** Le prototype v4 (`docs/prototype/alumnia-prototype.html` dans le dépôt) et la section « Les écrans, un par un (v4, fait foi) » font foi. Nouveautés depuis la première version : le vocabulaire « pro » et « Mon chemin », le parcours de réorientation (Paul), trois entreprises partenaires, le chemin animé, la visio intégrée, le compte rendu qui ajoute une étape au chemin, la note et le merci, l'offre entreprise, le rapport RSE, la vue prof, le nouveau logo. Le modèle économique est dans l'onglet « Business plan et pricing ».

## Nouvelle approche : chaque défaut et sa correction

**Le projet devient une plateforme où les entreprises aux nombreux métiers ouvrent leurs parcours aux jeunes.** Leurs collaborateurs deviennent des « alumni » mentors, l'étudiant ne paie rien, et l'IA prépare chaque échange. Le MVP tient en trois briques faisables seul : questionnaire, roadmap avec fiche métier, rendez-vous avec un alumni.

**Nom :** Alumnia reste le nom de travail du projet. Un produit d'IA pour enseignants utilise déjà alumnia.fr : le nom sera changé si le projet se concrétise (piste de repli : Cap Mentor, capmentor.fr libre au 24 octobre 2026).

| Défaut | Correction |
| --- | --- |
| 1. L'humain n'apparaît pas dans la démo | Lorys joue l'alumni mentor (il a vécu les mêmes doutes d'orientation) et Paul, qui existe, joue l'étudiant. Un extrait de 10 secondes de leur échange en visio est dans la vidéo |
| 2. Projet trop large | Trois briques seulement : questionnaire, roadmap + fiche métier, rendez-vous avec un alumni. Chatbot des lives, CV, simulation d'entretien IA et offres passent en vision |
| 3. Le modèle économique contredit la mission | Un seul client : les entreprises. Gratuit pour tous les étudiants, sans forfait familles ni licence d'établissement dans le MVP |
| 4. L'acheteur ne voit rien | Un écran partenaire, côté entreprise : jeunes qui explorent ses métiers, échanges réalisés, part de boursiers, métiers les plus consultés. Données agrégées uniquement |
| 5. Pas de mentors | Les mentors sont les salariés des entreprises clientes, sur leur temps de travail (engagement RSE, mécénat de compétences). L'entreprise les recrute et les coordonne |
| 6. Mineurs et cadre légal | Public 16–25 ans ; échanges uniquement dans l'app (pas de coordonnées personnelles), charte du mentor, accord parental pour les mineurs. L'IA aide à explorer et ne note ni ne sélectionne personne |
| 7. Impact difficile à prouver | On mesure ce qui est mesurable tout de suite : clarté du projet avant / après, échanges réalisés, part de boursiers et de lycées REP |
| 8. Contenu coûteux à étendre | Chaque entreprise cliente fournit ses fiches métiers et parcours ; le reste vient des données ouvertes de l'Onisep |
| 9. Crédibilité de Paul | Paul existe : il témoigne en personne dans la vidéo |

**Concurrent le plus proche à assumer :** My Job Glasses, gratuit pour les jeunes et financé par les entreprises. La différence à dire : My Job Glasses organise une rencontre ; ici, chaque échange est préparé par l'IA à partir du profil, relié à une roadmap, et suivi ensuite.

## Objectif et périmètre

Tu es seul : on construit **quatre écrans qui marchent**, et rien d'autre. Tout ce qui n'apparaît pas dans la vidéo de 2 minutes est coupé.

- **Produit :** SaaS B2B. Client : l'entreprise. Utilisateur gratuit : l'étudiant de 16 à 25 ans.
- **Base :** PostgreSQL, isolation classique entre utilisateurs.
- **Rendu :** vidéo de 2 minutes avant dimanche 22h (limite officielle : minuit), lien et repo en option.

| Écran | Ce qui est construit | Niveau |
| --- | --- | --- |
| 1. Questionnaire | 8 questions, la suite s'adapte, synthèse du profil | Réel, avec l'IA |
| 2. Roadmap + fiche métier | Chemins vers 3 métiers d'un domaine (informatique), fiche métier détaillée avec le parcours chez une entreprise partenaire | Réel, avec l'IA sur un catalogue vérifié |
| 3. Rendez-vous alumni | Choisir un alumni, fiche de préparation générée par l'IA, compte rendu après l'échange | Réel pour la préparation et le compte rendu ; la visio est filmée à part |
| 4. Écran partenaire | Statistiques agrégées pour l'entreprise | Simulé avec des données de démo |

**Coupé (cité comme vision en une phrase) :** chatbot des lives, simulation d'entretien par l'IA, CV et LinkedIn, offres de stage, tableau de bord établissement, paiement, application mobile.

## Le client : les entreprises aux nombreux métiers

**Le client type est un grand groupe ou une ETI qui compte des dizaines de métiers et peine à les faire connaître aux jeunes**, par exemple dans l'ingénierie, le conseil, le numérique, la défense ou l'industrie (Thales ou Capgemini sont des exemples du profil visé, pas des partenaires). L'étudiant n'achète rien.

### Ce que l'entreprise achète

| Besoin de l'entreprise | Ce qu'Alumnia lui apporte | Budget concerné |
| --- | --- | --- |
| Faire connaître des métiers mal connus ou en tension | Ses métiers et parcours dans les roadmaps des jeunes qui correspondent | Marque employeur, relations écoles |
| Trouver des stagiaires et alternants plus divers | Accès aux profils des jeunes qui l'ont choisi, après un échange | Recrutement campus |
| Engager ses salariés | Des collaborateurs mentors, 1 heure par mois, sur leur temps de travail | RSE, mécénat de compétences, fondation d'entreprise |
| Rendre compte de son action pour l'égalité des chances | Indicateurs agrégés : jeunes accompagnés, part de boursiers et de lycées REP | Rapport RSE |

### Combien la facturer (hypothèses à tester)

- **Abonnement annuel** selon le nombre de métiers présentés et de mentors : de l'ordre de quelques milliers d'euros pour une ETI à quelques dizaines de milliers pour un grand groupe. Aucun repère de prix public vérifié : à valider en parlant à 3 entreprises.
- **Premiers clients :** un ou deux « partenaires fondateurs » à prix réduit contre le droit de citer leur nom et des retours réguliers.

### Pourquoi c'est plus réaliste que l'État

- Une entreprise décide vite et a déjà un budget pour la marque employeur et l'égalité des chances.
- Elle fournit elle-même les mentors et le contenu métier : ça règle l'offre de mentors et le coût du contenu.
- Les établissements deviennent des partenaires gratuits qui envoient leurs élèves, pas des clients à convaincre.

### Le risque à dire au jury

Une entreprise pourrait pousser ses propres métiers plutôt que l'intérêt du jeune. Règle : la roadmap présente toujours plusieurs chemins et plusieurs employeurs, et le contenu sponsorisé est signalé.

## Le parcours de démo, avec l'humain à l'écran

**L'idée de mise en scène : « Si Paul avait eu ça à 17 ans ».** Paul raconte son histoire face caméra, puis on rejoue son parcours dans l'app. Toi, tu apparais comme l'alumni mentor. Deux vrais humains à l'écran, et l'IA qui prépare entre les deux.

| Moment de la vidéo | Ce qu'on voit | Durée |
| --- | --- | --- |
| 0:00–0:15 | Paul face caméra : trois débuts d'études, ce que ça lui a coûté | 15 s |
| 0:15–0:50 | Le problème en deux chiffres, puis la promesse (voix off) | 35 s |
| 0:50–1:00 | Questionnaire : Paul répond, la question suivante rebondit, la synthèse apparaît | 10 s |
| 1:00–1:12 | Roadmap informatique, puis la fiche métier « administrateur réseau » avec le parcours chez une entreprise partenaire | 12 s |
| 1:12–1:20 | Paul choisit un alumni : toi. La fiche de préparation générée par l'IA s'affiche | 8 s |
| 1:20–1:30 | Extrait de votre visio : tu racontes ton propre doute d'orientation, Paul pose une question | 10 s |
| 1:30–1:35 | Compte rendu de l'IA : ce qui a été dit, la prochaine étape ajoutée à la roadmap | 5 s |
| 1:35–1:45 | Écran partenaire : ce que voit l'entreprise (données agrégées) | 10 s |
| 1:45–2:00 | Qui paie, l'impact, la phrase de fin | 15 s |

**À filmer :** Paul face caméra (lumière naturelle, 3 prises), et une visio de 3 minutes entre vous deux, dont on garde 10 secondes. Demande à Paul son accord écrit pour la diffusion.

**Plan B :** enregistre chaque écran dès qu'il marche ; la vidéo peut être montée avec des captures si l'app casse dimanche.

## Comment marche Alumnia, pour tout le monde

Le parcours complet en 8 étapes, sans un mot d'informatique : à montrer à un jury, à une entreprise ou à un parent. Fichier : `docs/alumnia-schema-fonctionnement.jpg`.

&#91;image: Comment marche Alumnia, en 8 étapes\]

## Les écrans, un par un (v4, fait foi)

**Pour Codex : cette section et le prototype font foi sur tout ce qui se voit.** Le prototype cliquable est dans le dépôt : `docs/prototype/alumnia-prototype.html` (bouton « Démo » en bas à gauche pour sauter d'un écran à l'autre), son code lisible dans `docs/prototype/alumnia-prototype.src.html`. Les captures de chaque écran sont dans `docs/ecrans/ordinateur/` et `docs/ecrans/telephone/`. Les règles visuelles et le catalogue des mouvements sont dans `DESIGN.md`. Si un ancien passage plus bas dans ce document contredit cette section, **cette section gagne**.

| # | Écran | Route Next.js | Qui le voit |
| --- | --- | --- | --- |
| 1 | Accueil | `/` | tout le monde |
| 2–7 | Questionnaire (prénom, niveau, réorientation, matières, études, alternance, lycée, 24 activités, question de l'IA, idées) | `/questionnaire` | élève |
| 8 | L'IA écrit le profil | `/questionnaire/fin` | élève |
| 9 | Mon profil | `/profil` | élève |
| 10, 18 | Mon chemin (route animée) | `/chemin` | élève |
| 11 | Fiche métier | `/metiers/[slug]` | élève |
| 12 | Parler à un pro | `/pros` | élève |
| 13, 15, 17 | Mon rendez-vous (en attente, confirmé, terminé + compte rendu) | `/echanges/[id]` | élève |
| 16 | Visio | `/echanges/[id]/visio` | élève et pro |
| 19 | Mes échanges | `/echanges` | élève |
| 14 | Vue du pro | `/pro/echanges/[id]` | salarié mentor |
| 20 | Offre entreprise | `/entreprises` | public |
| 21 | Tableau de bord | `/partenaire` | admin entreprise |
| 22 | Rapport RSE imprimable | `/partenaire/rapport` | admin entreprise |
| 23 | Vue prof (code classe) | `/prof` | enseignant |
| 24 | Comment ça marche | `/comment-ca-marche` | public |

### Règles communes à tous les écrans

- **Vocabulaire côté élève** : « un pro » (jamais « alumni »), « Mon chemin » (jamais « roadmap »), « Mes échanges ». Tutoiement. Vouvoiement côté entreprise.
- **Barre du haut élève** : logo (retour à l'accueil), onglets « Mon profil », « Mon chemin », « Mes échanges », compteur jaune « N étapes validées » (il fait un « pop » à chaque nouvelle étape), avatar. Sur téléphone, les onglets passent sous le logo et le compteur ne garde que le chiffre.
- **Compteur d'étapes** = profil fait + étapes cochées du chemin + par échange (demandé, terminé, compte rendu).
- **Toasts** en bas au centre, 2,8 s (5,2 s en mode tournage), au plus deux à la fois. Étoile jaune pour une réussite, rond gris « i » pour une information ou un refus.
- **Paillettes** seulement à quatre moments : profil prêt, demande d'échange envoyée, compte rendu prêt, note de 4 ou 5 étoiles. Pas de paillettes sur le chemin.
- **Personnages** : règles de cadrage de `DESIGN.md` § 6 (toujours posés sur un bord, jamais de tête coupée, la personne du centre devant).
- **L'IA** a toujours son orbe bleue et une puce « Écrit par l'IA », « Préparé par l'IA » ou « Résumé par l'IA ». Chaque bloc écrit par l'IA a un lien « Voir ce que l'IA a reçu » qui montre le JSON envoyé (sans prénom, e-mail ni lycée) et dit si la réponse vient de l'IA ou du secours.
- **Accessibilité** : focus visible, flèches dans les groupes de réponses, après chaque changement d'écran le focus va sur le titre, espaces fines insécables avant `? ! : ;`, `prefers-reduced-motion` respecté.
- **Données de démo** signalées « Données d'exemple » côté entreprise ; trois entreprises fictives : Nexora (numérique), Vectra Rail (ferroviaire), Helio Énergie (énergie).

### Écran 1 · Accueil (`/`)

&#91;image: Accueil\]

**But :** comprendre en 5 secondes ce que fait Alumnia et commencer.

**Ce qu'on voit :**

1. Barre : logo (cartouche « Alumnia » + paillette), boutons « Comment ça marche » et « Entreprises ».
2. Titre « Ton avenir ne se devine pas. Il se discute. », une phrase d'explication, puis « Pour celles et ceux qui ne savent pas encore quoi chercher. »
3. Gros bouton vert « Commencer (5 min) » + « Gratuit · 5 minutes · sans mot de passe ». Sur téléphone, ce bouton est visible sans faire défiler.
4. Encart « Essayer la démo » (seulement si `DEMO_MODE=true`) : Yanis (terminale), Paul (réorientation), Lorys (pro), entreprise, prof.
5. « Déjà commencé ? Reçois ton lien de connexion » (lien magique Supabase, replié).
6. À droite, panneau vert clair : la foule de personnages (photo de groupe sur 4 rangs, voir `DESIGN.md` § 6) et la carte « Disponible jeudi, 18 h · Lorys, administrateur réseau chez Nexora ». Sur téléphone, le panneau passe sous le texte et la carte disparaît.
7. En bas, 3 étapes numérotées : questions, métiers et chemin, 30 minutes avec un pro.

**Ce qui bouge :** les personnages entrent en fondu montant (420 ms, décalés de 80 ms) puis penchent très légèrement en continu ; au survol, un personnage salue.

- [ ] Le bouton « Commencer » ouvre le questionnaire sans compte ; le compte est créé par lien magique à la fin du profil.
- [ ] Aucun personnage coupé sur les côtés, à 1440, 1024 et 390 px.

### Écrans 2 à 7 · Le questionnaire (`/questionnaire`)

**But :** en 5 minutes environ, connaître ce que le jeune aime faire, sans jargon. Une question par écran.

**En-tête de chaque question :** symbole du logo, barre de progression pleine largeur (`transform: scaleX`), texte « Encore 4 min environ » → « Plus qu'1 minute » → « Dernière ligne droite ! » (8 s par question restante), bouton rond « Reprendre plus tard » (icône pause). En bas de l'écran, une frise de personnages (100 px, opacité 0,8) qui défile très lentement ; quand on répond « J'adorerais », un personnage proche du centre fait un petit saut, sur « Pas du tout » il penche la tête.

**L'ordre des questions :**

| Étape | Question | Type | Quand |
| --- | --- | --- | --- |
| Prénom | « Comment tu t'appelles ? » | champ texte, obligatoire | seulement si le jeune n'a pas de compte ni de persona démo |
| Niveau | « Tu en es où dans tes études ? » | 1 choix : Seconde, Première, Terminale, Bac +1 ou +2, Bac +3 ou plus, Je me réoriente | toujours |
| Réorientation | « Qu'est-ce qui ne t'a pas plu dans ta formation ? » | 2 champs : formation quittée, ce qui n'a pas plu | si « Je me réoriente » |
| Matières | « Quelles matières te plaisent le plus ? » | jusqu'à 3 choix parmi 9 | toujours |
| Études | « Tu te vois faire des études plutôt… » | 1 choix parmi 4 | toujours |
| Alternance | « L'alternance, ça t'intéresse ? » | 1 choix parmi 4 | toujours |
| Lycée | « Ton lycée ou ta formation » | autocomplétion (facultatif) + code de classe (facultatif) ; si Seconde, message sur l'accord parental | toujours, avec « Passer » |
| Activités 1 à 12 | « Est-ce que tu aimerais… » + une activité | 5 réponses : Pas du tout → J'adorerais | toujours |
| Question de l'IA | voir écran 7 | conversation | après l'activité 12 |
| Activités 13 à 24 | idem |  | toujours |
| Idées | « Des métiers te trottent déjà dans la tête ? » | texte libre facultatif | toujours |

&#91;image: Prénom\]

&#91;image: Niveau d'études\]

&#91;image: Réorientation\]

&#91;image: Lycée et code de classe\]

&#91;image: Une activité\]

**Répondre :** un clic sur un choix unique coche (140 ms), puis la carte sort vers la gauche (150 ms) et la suivante entre par la droite (220 ms). Seule la carte de la question change : la frise et la barre ne sont jamais redessinées. Un verrou empêche un double clic de répondre à la question suivante pendant la transition. Touches 1 à 5 sur ordinateur (l'astuce ne s'affiche qu'avec une souris). À 8 et 16 activités répondues : toast « 8 de faites, tu gères ! ».

### Écran 7 · La question de l'IA

&#91;image: Question de l'IA\]

Titre « L'IA a une question pour toi ». La première bulle cite une activité que le jeune adorerait (« Tu as dit que tu adorerais « réparer un ordinateur… » ») puis pose une question selon son goût dominant. Le jeune répond (champ pleine largeur, boutons Retour, Envoyer, Passer). L'IA reprend ses mots, relie à un vrai métier et relance une fois ; après la 2ᵉ réponse elle conclut. Pendant qu'elle écrit : bulle « L'IA lit ta réponse… » avec l'orbe en `composing` (au moins 0,9 s). Seule la dernière bulle de l'IA a une orbe animée ; les anciennes ont un cercle pointillé fixe. Appel IA n° 1 (voir la section sur l'IA).

### Écran 8 · L'IA écrit le profil

&#91;image: Génération du profil\]

Orbe `composing` dans un disque bleu clair, « Je lis tes réponses », « Le calcul choisit tes métiers. L'IA les explique avec tes mots. » Trois coches qui s'allument dans l'ordre : goûts calculés (0,5 s), trois métiers trouvés (1,2 s), synthèse et questions (quand l'IA a répondu, jamais avant 1,9 s). Passage automatique au profil. Si l'IA tarde plus de 9 s : bouton « Voir mon profil sans attendre » (version de secours).

- [ ] Le calcul RIASEC ne dépend jamais de l'IA ; l'IA n'écrit que les textes.
- [ ] Retour navigateur depuis le profil : on ne retombe jamais sur cet écran.

### Écran 9 · Mon profil (`/profil`)

&#91;image: Mon profil\]

**But :** montrer au jeune ce qui lui ressemble et 3 métiers à explorer, sans verdict.

**Ce qu'on voit :**

1. Bandeau jaune pâle : médaille jaune à étoile, « Ton profil est prêt, {prénom} », « 3 métiers à explorer. Ce sont des pistes, pas un verdict. », 3 personnages à droite.
2. « Ce qui te ressemble » (puce « Écrit par l'IA ») : la synthèse en 3 phrases, puis les 6 goûts en barres avec un niveau en mots (Très fort, Fort, Moyen, Moins), jamais un chiffre ; sous les 3 premiers, une phrase simple (« Tu aimes le concret : manipuler, réparer, voir le résultat. »). Noms des goûts : Concret, Curieux, Créatif, Aidant, Meneur, Organisé (jamais « investigateur » ni « RIASEC »). Mention : « Calcul basé sur le modèle d'intérêts de Holland, utilisé par de nombreux tests d'orientation. L'IA n'intervient pas dans le choix des métiers. »
3. « Trois métiers à explorer » : pour chacun, le nom, une phrase concrète tirée du catalogue (« Il fait parler les chiffres d'une entreprise pour l'aider à décider. ») et une phrase en bleu de l'IA qui relie le métier à ses réponses. Boutons « Voir mon chemin », « Refaire le questionnaire », et « Effacer toutes mes données » (deux clics pour confirmer).
4. « Tes questions pour un pro » (bleu, « Préparé par l'IA ») : une phrase qui explique ce qu'est un pro, puis 5 questions.
5. « Encore à éclaircir » : 2 conseils.

**Ce qui bouge à la première arrivée :** à 250 ms la médaille fait `scale(.9 → 1.08 → 1)` avec des paillettes ; à 380 ms les personnages du bandeau sautent en cascade (70 ms d'écart) ; à 650 ms le toast « Ton profil est prêt · 3 métiers à explorer » et le compteur fait « pop ». Les barres se remplissent en `scaleX` (600 ms). Une seule fois par profil.

### Écran 10 · Mon chemin (`/chemin`)

&#91;image: Mon chemin\]

**But :** montrer, très simplement, les étapes jusqu'au premier poste et ce qu'il faut faire maintenant. Pensé pour un élève qui a du mal à se concentrer : une seule étape mise en avant.

**Ce qu'on voit :**

1. Puces des 3 métiers pour changer de chemin.
2. Grand panneau jaune très pâle `#FFF8E3`, bord `#F2E4B8`, coins de 32 px. En haut : « Ton chemin vers », le métier en grand, une ligne (durée, formation, salaire de départ) ; à droite, le compteur vert « 1 sur 2 étapes faites », une barre verte et les années « 2026 → 2030 ».
3. Une route blanche bordée de beige qui serpente de haut en bas, avec des pointillés fixes au centre ; par-dessus, le tracé vert jusqu'à la dernière étape faite.
4. Les étapes, en cartes blanches de part et d'autre de la route (sur téléphone, toutes à droite) :
   - le point de départ : « Bac général, Maths et NSI · Aujourd'hui · Tu es ici », ou pour une réorientation « Licence de biologie, 1ʳᵉ année : arrêtée · Derrière toi · Ce n'est pas un échec : tu sais maintenant ce que tu ne veux pas. » (pastille grise) ;
   - les étapes ajoutées après un échange (liseré jaune, « Ajouté après ton échange ») ;
   - « Étape 1 · Rentrée 2027 · Choisir ma formation : BUT Réseaux et télécoms » ;
   - « Étape 2 · 2027 – 2030 · Trouver une alternance » (ou un stage si pas d'alternance), avec « 2 pros ont pris ce chemin » ;
   - l'objectif « 2030 · Premier poste », carte jaune et médaille jaune à étoile.
5. La première étape pas encore faite est **la seule mise en avant** : bord vert, puce verte « Étape N · … », « À faire maintenant », bouton vert plein « C'est fait ». Les autres boutons sont gris. Une étape faite a sa pastille verte avec une coche et le bouton « ✓ Fait ».
6. L'avatar du jeune (42 px, étiquette « Paul, ici ») est posé sur la route, à la dernière étape faite.
7. Sous le panneau : la fiche métier courte, le pro disponible (un autre que celui déjà rencontré), « Pourquoi ce chemin » et « À demander à un pro ».

**Ce qui bouge (sobre, pas de paillettes) :**

- Première ouverture du chemin d'un métier : la route se dessine de haut en bas (900 ms), chaque pastille et sa carte apparaissent en fondu quand la route les atteint, puis le tracé vert avance et l'avatar glisse jusqu'à sa place (800 ms, ease-in-out).
- « C'est fait » : le tracé vert et l'avatar glissent ensemble jusqu'à la nouvelle dernière étape faite (800 ms) ; l'étape suivante devient « À faire maintenant » ; toast « Étape faite · +1 étape ».
- Visites suivantes : tout est en place, sans animation.

Le placement est calculé à l'exécution (fonction `journeyLayout` du prototype) : on mesure la hauteur de chaque carte, on place les pastilles au centre vertical de leur carte, on trace des courbes de Bézier entre elles, on mesure la longueur de la route jusqu'à chaque pastille avec `getTotalLength`, et on anime `stroke-dashoffset`. L'avatar suit la route avec `getPointAtLength`. Recalcul au redimensionnement.

&#91;image: Le chemin après un échange : une étape a été ajoutée\]

- [ ] Une seule carte « À faire maintenant » à la fois.
- [ ] Les étapes cochées sont propres à chaque métier.
- [ ] Aucune carte ne chevauche une autre, à 1440, 1024 et 390 px.

### Écran 11 · Fiche métier (`/metiers/[slug]`)

&#91;image: Fiche métier\]

Bandeau vert clair : logo de l'entreprise partenaire s'il y en a une, nom du métier, phrase concrète, 3 personnages. Puis : « Une journée type » (4 heures et ce qu'on fait, « Exemple simplifié, pour la démo »), « Comment y arriver » (formation, durée, où, puce « Ton chemin », salaire au début, source Onisep), « Ce qu'il faut aimer » (pastilles vert clair, non cliquables), l'encart de l'entreprise (« Contenu fourni par l'entreprise partenaire. Il n'influence pas les métiers qu'on te propose. ») et « Ils font ce métier » ou, s'il n'y a personne, « Ils travaillent juste à côté » (pros d'un métier du même goût dominant).

- [ ] Les 18 métiers du catalogue ont une fiche complète (voir `CAT` dans le prototype : phrase, formation, lieux, durée, salaire, journée type, ce qu'il faut aimer, question à poser, entreprise).

### Écran 12 · Parler à un pro (`/pros`)

&#91;image: Parler à un pro\]

**But :** choisir quelqu'un qui fait un de ses métiers et demander 30 minutes.

**Ce qu'on voit :**

1. « Parle à un pro », « Un pro, c'est quelqu'un qui est passé par là avant toi et qui fait ce métier aujourd'hui. 30 minutes en visio, gratuit, caméra pas obligatoire. », puis « Les métiers te sont proposés selon tes réponses, jamais selon l'entreprise qui finance Alumnia. »
2. Filtres : ses 3 métiers + « Tous les métiers ». Si personne ne fait ce métier : « Pas encore de pro pour ce métier. Ceux-là travaillent juste à côté… »
3. Cartes (3 par ligne) : personnage posé au bas d'un aplat gris clair de 184 px, logo de l'entreprise en haut à gauche, prénom, poste et entreprise, parcours, bloc bleu « Pourquoi lui parler » (texte adapté au persona : Lorys « Lui aussi a changé de voie après une 1ʳᵉ année » pour Paul), créneaux, bouton « Demander l'échange ».
4. En bas : « Ton échange est protégé » (visio dans Alumnia, charte et formation de 15 min, accord parental avant 15 ans, bouton Signaler) et « Ce que le pro voit de toi » (prénom, classe, 3 métiers, questions ; rien d'autre).

**Interactions :** choisir un créneau surligne la carte et le personnage salue. « Demander l'échange » sans créneau : toast info « Choisis d'abord un créneau chez {prénom} ». Avec un créneau : le bouton devient vert plein « ✓ Demande envoyée », paillettes, toast « Demande envoyée à {prénom} · +1 étape », puis ouverture du rendez-vous 1,2 s après (seulement si on est encore sur cet écran). Un double clic n'envoie qu'une demande. Une seule demande en cours à la fois : sinon toast « Tu as déjà une demande en cours avec {prénom} ».

**Pros de la démo (9, dans 3 entreprises) :** Lorys (admin réseau, Nexora), Nadia (analyste cyber, Vectra Rail), Inès (ingénieure réseau, Helio Énergie), Sarah (data analyst, Helio), Karim (support, Nexora), Tom (maintenance, Vectra), Mehdi (chef de projet, Vectra), Léa (UX, Nexora), Julie (contrôle de gestion, Helio).

### Écrans 13 et 15 · Mon rendez-vous (`/echanges/[id]`), avant l'échange

&#91;image: Rendez-vous en attente\]

Le rendez-vous a **3 statuts**, toujours affichés en puce dans le bandeau orange pâle :

| Statut | Puce | Texte | Bouton |
| --- | --- | --- | --- |
| `requested` | jaune « En attente » | « {prénom} a 48 h pour accepter. On te prévient par mail. » | (démo) « Voir côté {prénom} » |
| `confirmed` | verte « Confirmé » | date, heure, durée | « Rejoindre la visio » |
| `done` | jaune « Échange terminé » |  |  |

En dessous : « Ta préparation » (bleu, « Préparé par l'IA », 5 questions à cocher pendant l'échange), « Ce que {prénom} voit de toi », et, tant que l'échange n'a pas eu lieu, « Après l'échange » (texte d'attente) et « Ton échange est protégé ».

&#91;image: Rendez-vous confirmé\]

### Écran 16 · La visio (`/echanges/[id]/visio`)

&#91;image: Visio\]

Fond sombre `#0F1714`. Grande tuile orange pâle avec le pro posé en bas et son nom ; vignette « Toi · Caméra coupée » (en haut à droite sur ordinateur, en bas à droite sur téléphone pour ne pas cacher le visage). Chronomètre « 00:12 / 30:00 ». Boutons : Micro, Allumer ma caméra, Signaler (rouge sombre), « Terminer l'échange » (vert). À droite, « Tes questions » à cocher. Mention : « Visio dans Alumnia : ni numéro, ni e-mail échangés. Ta caméra n'est pas obligatoire. »

En production : visio intégrée par un fournisseur WebRTC (Daily, Whereby ou LiveKit), salle créée par le serveur, lien valable 10 minutes avant le créneau. « Terminer » passe le rendez-vous en `done` et ramène au rendez-vous.

### Écran 17 · Après l'échange : le compte rendu

&#91;image: Compte rendu\]

Quand le statut est `done`, le bloc **« Raconte ton échange » vient en premier** (avant la préparation, surtout sur téléphone) : un champ libre « Après l'appel, écris ici ce que tu as retenu… » (sauvegardé à chaque frappe), bouton « Faire mon compte rendu », et en démo « Exemple de notes ». Notes vides : toast « Écris d'abord quelques notes ».

Pendant l'appel IA : orbe `composing` et « L'IA lit tes notes… ». Si on quitte l'écran, le résultat est gardé et s'affiche au retour.

Le compte rendu (appel IA n° 3) :

- « Ce que tu retiens » : 3 phrases reformulées ;
- « Ajouté à ton chemin » : une action concrète et une échéance, ajoutée comme étape sur le chemin (bouton « Voir » qui ouvre le chemin et fait défiler jusqu'à l'étape) ;
- « Un merci pour {prénom} » : 2 phrases, bouton jaune « Envoyer le merci ».

Puis « Cet échange t'a aidé ? » : 5 étoiles (note anonyme ; 4 ou 5 étoiles = paillettes) et « Signaler un problème ».

### Écran 19 · Mes échanges (`/echanges`)

&#91;image: Mes échanges\]

« À venir » (l'échange en attente ou confirmé) et « Passés » (tous les échanges terminés, du plus récent au plus ancien, avec « compte rendu prêt »). À droite : si aucun échange n'est en cours, « Le bon moment pour un 2ᵉ échange » + « Choisir un autre pro » ; sinon « Un échange à la fois ». État vide : « Pas encore d'échange », bouton « Trouver un pro », 3 personnages en bas à droite.

- [ ] Une nouvelle demande après un échange terminé garde l'ancien échange, son compte rendu et l'étape ajoutée au chemin.

### Écran 14 · Vue du pro (`/pro/echanges/[id]`)

&#91;image: Vue du pro\]

**But :** le salarié accepte la demande et arrive préparé en 2 minutes de lecture, sans jamais voir les réponses du jeune.

**Ce qu'on voit :**

1. Barre : logo, onglets « Mes échanges », « Mon profil de pro », logo de son entreprise, son avatar.
2. Bandeau : avatar du jeune, statut, « Échange avec Paul, en réorientation », « Demandé pour jeu. 29 oct, 18 h · 30 minutes », boutons « Confirmer » et « Proposer un autre créneau » (puis « Rejoindre la visio » une fois confirmé).
3. « Qui est Paul » (bleu, « Préparé par l'IA ») : 2 ou 3 phrases **à la 3ᵉ personne**, ses doutes, à éclaircir. Appel IA n° 4. L'IA ne recopie jamais une phrase du jeune et n'invente aucun doute.
4. « Ce qu'il va te demander » : ses 5 questions, puis « Tu ne vois pas ses réponses au questionnaire, seulement ce résumé. »
5. « Ton impact » (jaune pâle) : jeunes aidés, heures données ce trimestre, dernier merci reçu.
6. « Tu es dans le cadre » : charte signée et formation faite, visio dans Alumnia seulement, bouton Signaler avec réponse sous 24 h.

- [ ] « Confirmer » passe le rendez-vous en `confirmed` et envoie un e-mail au jeune ; toast « Échange confirmé. {prénom} est prévenu. »
- [ ] La table `meeting_preps.alumni_view` est la seule donnée du jeune lisible par le pro.

### Écran 20 · Offre entreprise (`/entreprises`)

&#91;image: Offre entreprise\]

Fond sombre. Titre « Vos salariés racontent leur métier. Des jeunes trouvent leur voie. » Trois blocs : vos salariés mentorent, vous mesurez l'impact, vous construisez votre vivier. Encart « Offre pilote » : « 6 mois · 1 à 2 sites · jusqu'à 30 mentors », 9 900 € HT déduits si l'entreprise continue, puis les 4 paliers (Atelier 3 900 €, Essentiel 12 000 €, Croissance 29 000 €, Groupe dès 54 000 €, HT par an), 4 engagements (activation des mentors, charte et formation, rapport mensuel avec méthode, neutralité), boutons « Voir un tableau de bord d'exemple » et « Demander un pilote » (formulaire de contact). Les prix viennent de l'onglet « Business plan et pricing ».

### Écran 21 · Tableau de bord (`/partenaire`)

&#91;image: Tableau de bord\]

Fond sombre, puce « Données d'exemple » en démo. Titre « En octobre, vos salariés ont parlé avec 48 jeunes ». Quatre chiffres animés : échanges, note des jeunes (4,7 sur 5), heures de mentorat offertes par N salariés, mentors actifs sur inscrits. « Échanges par mois » (barres, objectif de l'année), « Votre vivier » (entonnoir 312 → 48 → 37 → 9, « Vous ne voyez le nom d'un jeune que s'il candidate »), « Égalité des chances » (41 % en 100 points, méthode sous le graphique), « Vos métiers les plus regardés » (un chiffre sous 5 est masqué : « moins de 5 »), 2 verbatims anonymes (seulement de vos propres salariés), « Rapport d'impact d'octobre » + « Exporter le rapport RSE », et « Vos 12 mentors font partie d'une communauté de 140 pros issus de 9 entreprises ».

- [ ] Toutes les données viennent de `get_partner_stats` (agrégées, seuil de 5).

### Écran 22 · Rapport RSE (`/partenaire/rapport`)

&#91;image: Rapport RSE\]

Une page blanche imprimable (format A4, bouton « Imprimer ou enregistrer en PDF » qui appelle `window.print()`, CSS `@media print` qui cache les boutons) : logo, « Rapport d'impact · Nexora × Alumnia · Octobre 2026 », tableau des 6 chiffres, puis la méthode : définition d'un échange (20 minutes au moins, confirmé par les deux), lycée prioritaire ou rural (base publique de l'Éducation nationale, à partir du lycée indiqué par le jeune), seuil de masquage de 5, aucune donnée nominative, hébergement dans l'UE.

### Écran 23 · Vue prof (`/prof`)

&#91;image: Vue prof\]

« Inscris ta classe » : un code de classe (`ALU-7K2Q`, bouton « Copier le code ») que les élèves saisissent à l'étape Lycée ; l'avancée de la classe en barres (questionnaire fini, ont parlé à un pro, compte rendu fait), chiffres sous 5 masqués, jamais une réponse individuelle ; un encart pour les Cordées de la réussite (« Un atelier d'une heure suffit »). C'est le canal d'acquisition des lycées prioritaires.

### Écran 24 · Comment ça marche (`/comment-ca-marche`)

&#91;image: Comment ça marche\]

Huit cartes de couleur (questionnaire, calcul, l'IA explique, ton chemin, tu choisis un pro, 30 minutes en visio, le compte rendu, l'impact), chacune avec un personnage ou une orbe. Puis « Pourquoi Alumnia » (Onisep, My Job Glasses, JobTeaser, puis « Ici, chaque échange fait avancer ton chemin d'une étape »), « Ton échange est protégé » et « Tes données » (UE, l'IA ne reçoit ni prénom ni e-mail ni lycée, pas d'entraînement, tout effacer en un clic, et « En production, l'IA passe par l'API d'OpenAI, avec des réponses en JSON structuré »).

### Panneau Démo et mode tournage (seulement si `DEMO_MODE=true`)

Bouton noir « Démo » en bas à gauche (en bas à droite sur téléphone). Le panneau permet d'aller à chaque écran, de changer de rôle, de remplir le questionnaire comme Yanis (terminale) ou Paul (réorientation), de passer l'échange en « confirmé » ou « terminé », et d'activer le **mode tournage** : le bouton Démo et les boutons « Démo : … » disparaissent, le texte grossit légèrement, les toasts restent 5,2 s ; la touche D le fait revenir. Remplir comme Paul remet tout à zéro avant. Un clic en dehors ferme le panneau.

### Sur téléphone (390 px)

Les 24 écrans sont capturés dans `docs/ecrans/telephone/`. Trois exemples :

&#91;image: Une activité sur téléphone\]

&#91;image: Le chemin sur téléphone\]

&#91;image: Le rendez-vous sur téléphone\]

- Toutes les grilles passent sur une colonne sous 900 px (aucune grille en style inline).
- Questionnaire : les 5 réponses en liste verticale pleine largeur ; la barre de progression passe sur sa propre ligne.
- Chemin : la route longe le bord gauche, toutes les cartes à droite.
- Rendez-vous terminé : « Raconte ton échange » en premier.
- Aucun défilement horizontal sur aucun écran.

* [ ] Vérifié à 390 × 844, 1024 × 768 et 1440 × 900.

### L'IA : les 4 appels

Toutes les réponses passent par l'API d'OpenAI avec des **sorties JSON structurées** (`response_format` de type `json_schema`, modèle dans `OPENAI_MODEL`). Le serveur valide la réponse avec zod ; si l'appel échoue, dépasse 12 s ou ne valide pas, il renvoie la **version de secours** calculée sans IA (le prototype contient chaque secours). L'IA ne reçoit jamais le prénom, l'e-mail ni le lycée. Le JSON envoyé est gardé et montré dans « Voir ce que l'IA a reçu ».

**Consigne commune (message système)** : « Tu es l'IA d'orientation d'Alumnia. Tu parles à un jeune de 15 à 22 ans : tutoiement, phrases courtes, mots simples, aucun jargon (jamais « RIASEC », jamais « profil investigateur »). Tu ne décides jamais à sa place : tu proposes des pistes. Tu n'inventes aucun fait absent des données. Tu réponds en français, uniquement avec le JSON demandé. »

**Données anonymes envoyées** (fonction `anon()` du prototype) : niveau, formation quittée et ce qui n'a pas plu (si réorientation), matières, études envisagées, alternance, 3 goûts principaux (nom simple, phrase, score sur 100), activités adorées (5 au plus), activités rejetées (3 au plus), idées de métiers, réponses au chat.

| # | Moment | Route | Tâche donnée à l'IA | Sortie JSON | Secours |
| --- | --- | --- | --- | --- | --- |
| 1 | Question de l'IA (écran 7) | `POST /api/questionnaire/followup` | reprendre les mots du jeune en 1 ou 2 phrases, relier à un vrai métier, poser une relance courte (au 2ᵉ message : conclure sans question) ; s'il répond hors sujet, rester bienveillant et le ramener vers ce qu'il aime | `{ "reponse": string, "relance": string }` | citation de sa réponse + relance selon son 2ᵉ goût |
| 2 | Profil (écran 8) | `POST /api/profile` | écrire la synthèse et expliquer les 3 métiers **déjà choisis par le calcul** (ne pas les changer) | `{ "synthese": string, "pourquoi": string[3], "questions": string[5], "eclaircir": string[2] }` | phrases du catalogue et questions déduites des réponses |
| 3 | Compte rendu (écran 17) | `POST /api/meetings/[id]/report` | à partir des notes en vrac du jeune et du métier visé : 3 phrases reformulées (pas recopiées), une action concrète de 8 mots au plus avec une échéance courte, un merci de 2 phrases sans signature | `{ "retiens": string[3], "etape": { "titre": string, "quand": string }, "merci": string }` | lignes des notes nettoyées ; la ligne qui contient « conseil » devient l'étape |
| 4 | Vue du pro (écran 14) | `POST /api/meetings/[id]/prep` | fiche pour le pro : qui est ce jeune en 2 ou 3 phrases à la 3ᵉ personne, ses doutes, à éclaircir ; ne jamais recopier ses phrases, n'inventer aucun doute | `{ "resume": string, "doutes": string[2], "eclaircir": string[2] }` | phrases construites à partir des goûts, de la durée d'études et de l'alternance |

- [ ] Chaque appel a son test avec l'IA simulée (réponse valide, réponse invalide, délai dépassé → secours).
- [ ] Le calcul des métiers ne passe jamais par l'IA.
- [ ] Aucune donnée nominative dans les journaux ni dans les appels.

Dans le prototype publié sur claude.ai, ces appels passent par la capacité « sample » de la page (modèle Claude, rapide) avec exactement les mêmes consignes et formats : c'est seulement pour la démo. L'application de Codex utilise OpenAI.

### Ajouts au modèle de données et aux routes (v4)

Ces ajouts complètent la migration `0001_init.sql` (section « Migration » plus bas). Ils vont dans une nouvelle migration `supabase/migrations/0002_v4.sql`, avec les mêmes règles RLS : chacun ne lit que ses lignes, le pro ne lit que `meeting_preps.alumni_view`, l'entreprise ne lit que des agrégats.

```sql
-- Plusieurs entreprises
create table companies (
  id uuid primary key default gen_random_uuid(),
  name text not null, sector text, brand_color text, created_at timestamptz default now()
);
alter table alumni_profiles add column company_id uuid references companies(id);

-- Le jeune : prénom, réorientation, lycée, classe, accord parental
alter table profiles add column first_name text;
alter table profiles add column reorientation_from text;
alter table profiles add column reorientation_why text;
alter table profiles add column school_uai text;          -- code établissement, jamais transmis à l'IA ni à l'entreprise
alter table profiles add column priority_school boolean;  -- déduit de la base publique (REP, REP+, rural)
alter table profiles add column class_code text;
alter table profiles add column parent_consent_at timestamptz; -- obligatoire avant le premier échange si moins de 15 ans

create table classes (
  code text primary key, teacher_id uuid references auth.users(id), name text, school_uai text, created_at timestamptz default now()
);

-- Le chemin : étapes cochées par métier, et étapes ajoutées après un échange
create table roadmap_progress (
  user_id uuid references auth.users(id), job_slug text, step_key text, done_at timestamptz default now(),
  primary key (user_id, job_slug, step_key)
);
create table roadmap_extras (
  id uuid primary key default gen_random_uuid(), user_id uuid references auth.users(id),
  title text not null, due_label text, source_meeting_id uuid references meetings(id), created_at timestamptz default now()
);

-- Les rendez-vous : statuts, visio, note, merci
alter type meeting_status add value if not exists 'confirmed';
alter type meeting_status add value if not exists 'done';
alter type meeting_status add value if not exists 'cancelled';
alter table meetings add column video_room_url text;
alter table meetings add column rating smallint check (rating between 1 and 5);
alter table meetings add column thanked_at timestamptz;

-- Signalements
create table safety_reports (
  id uuid primary key default gen_random_uuid(), meeting_id uuid references meetings(id),
  reporter_id uuid references auth.users(id), reason text, created_at timestamptz default now(), handled_at timestamptz
);

-- Ce que l'IA a reçu (pour « Voir ce que l'IA a reçu »)
alter table profiles add column ai_input jsonb, add column ai_mode text;          -- 'ia' ou 'secours'
alter table meeting_reports add column ai_input jsonb, add column ai_mode text;
alter table meeting_preps add column ai_input jsonb, add column ai_mode text;
```

Si le type `meeting_status` n'existe pas dans `0001_init.sql`, utilise une colonne `text` avec `check (status in ('requested','confirmed','done','cancelled'))`.

**Routes à ajouter** (mêmes conventions que « Contrats d'API » : JSON, erreurs `{ "error": "…" }`, rôle vérifié côté serveur) :

| Route | Qui | Ce qu'elle fait |
| --- | --- | --- |
| `POST /api/meetings` | élève | demande d'échange (pro, créneau) ; refuse s'il y a déjà une demande en cours ; crée la préparation (appel IA n° 4) |
| `POST /api/meetings/[id]/confirm` | pro | passe en `confirmed`, e-mail au jeune |
| `POST /api/meetings/[id]/room` | élève ou pro | crée ou renvoie la salle de visio, 10 min avant le créneau |
| `POST /api/meetings/[id]/complete` | élève ou pro | passe en `done` |
| `POST /api/meetings/[id]/report` | élève | compte rendu (appel IA n° 3), ajoute l'étape dans `roadmap_extras` |
| `POST /api/meetings/[id]/rating` | élève | note de 1 à 5 |
| `POST /api/meetings/[id]/thanks` | élève | envoie le merci au pro |
| `POST /api/safety-reports` | élève ou pro | signalement, e-mail à l'équipe |
| `PUT /api/roadmap/progress` | élève | coche ou décoche une étape (`job_slug`, `step_key`, `done`) |
| `POST /api/classes` | prof | crée un code de classe |
| `GET /api/classes/[code]/stats` | prof | avancée agrégée, seuil de 5 |
| `GET /api/partner/report` | admin entreprise | données du rapport imprimable (agrégées) |
| `DELETE /api/me` | élève | efface toutes ses données et son compte |

### Ordre de travail pour Codex

Une tâche à la fois, dans cet ordre. Une tâche est finie quand `npm run typecheck`, `npm run build`, `npm test` et `npm run test:db` passent et que l'écran ressemble à sa capture à 1440 et 390 px.

1. Migration `0002_v4.sql` et ses tests RLS (section précédente).
2. Jetons, polices, composants de base : `Logo`, `Person`, `Face`, `Crowd`, `GroupPhoto`, `AiOrb`, `Celebrate`, toasts Sonner en bas au centre (déjà dans le dépôt, à vérifier sur `/kit`).
3. Écran 1, Accueil.
4. Écrans 2 à 8, questionnaire complet, avec les appels IA n° 1 et n° 2 et leurs secours.
5. Écran 9, Mon profil, et l'effacement des données.
6. Écran 10, Mon chemin animé (la plus grosse tâche d'interface : reprends `journeyLayout`, `jWalk` et `journeyToggle` du prototype en composant React), puis écran 11, fiche métier, avec le catalogue des 18 métiers.
7. Écran 12, Parler à un pro, et `POST /api/meetings` avec l'appel IA n° 4.
8. Écran 14, vue du pro et confirmation.
9. Écrans 13, 15, 16 (visio), 17 (compte rendu, appel IA n° 3, note, merci, signalement), 19.
10. Écrans 20 à 22, espace entreprise.
11. Écran 23, vue prof, et écran 24, Comment ça marche.
12. Panneau Démo et mode tournage, données de démo (Yanis, Paul, 9 pros, 3 entreprises).
13. Passe finale : accessibilité, `prefers-reduced-motion`, téléphone, aucune erreur console.

**Prompt à donner à Codex pour chaque tâche :**

```text
Tu travailles sur le dépôt Alumnia. Lis CODEX.md, puis DESIGN.md, puis la section « Les écrans, un par un (v4, fait foi) » de la spec.
Ouvre docs/prototype/alumnia-prototype.html et la capture docs/ecrans/ordinateur/<numéro>-*.jpg de l'écran visé.
Tâche : <numéro et nom de la tâche>.
Reproduis exactement ce que montre le prototype (textes, couleurs, mouvements), en Next.js App Router, sans nouvelle bibliothèque d'interface.
Branche les données sur Supabase et les appels IA sur OpenAI avec leurs secours, comme décrit dans la spec.
Ajoute les tests. Termine quand typecheck, build, test et test:db passent. Donne la liste des fichiers modifiés.
```

## Brique 1 : le questionnaire (implémenté)

**Statut : codé et testé** (archive `alumnia-questionnaire.zip`, sans style). Le questionnaire suit le modèle des intérêts professionnels **RIASEC de John Holland**, utilisé par les tests d'intérêts publics comme l'O\*NET Interest Profiler : l'élève note des activités de travail, et on en tire six scores d'intérêts. Les activités sont rédigées pour Alumnia ; aucune n'est reprise d'un test existant.

### Déroulé (environ 5 minutes)

| Étape | Contenu | Format |
| --- | --- | --- |
| Intro | Durée, « pas de bonne réponse », ce que l'élève obtient | 1 écran |
| Contexte | Niveau, matières (3 max), durée d'études, alternance, mobilité | 5 écrans, une question chacun |
| Activités RIASEC | 24 activités, 4 par type (Réaliste, Investigateur, Artistique, Social, Entreprenant, Conventionnel), types alternés | 4 pages de 6, échelle de 1 à 5 |
| Relance IA n°1 | Une question qui rebondit sur les réponses ; passée automatiquement si l'IA ne répond pas | 1 écran, réponse libre ou « Passer » |
| Questions ouvertes | Métiers en tête, blocages, question pour un alumni | 3 écrans, facultatifs |
| Relance IA n°2 | Comme la n°1 | 1 écran |
| Résultat | Synthèse, scores et code à 3 lettres, 3 pistes de métiers, domaines, questions pour un alumni | 1 écran |

**Échelle :** Pas du tout (1), Plutôt pas (2), Je ne sais pas (3), Plutôt oui (4), J'adorerais (5).

### Calcul (côté serveur, jamais côté navigateur)

- Score d'un type = moyenne de ses 4 notes ramenée sur 0–100 : `(moyenne − 1) / 4 × 100`, arrondi.
- Une activité non notée compte comme neutre (3).
- Code dominant = les 3 types les plus élevés ; égalité départagée dans l'ordre R, I, A, S, E, C.
- Profil « plat » si l'écart entre le score le plus haut et le plus bas est inférieur à 15 : le texte invite alors à explorer.

### Profil produit

Le serveur assemble deux parties. La première est calculée : niveau, spécialités, contraintes, scores RIASEC. La seconde est rédigée par l'IA (Responses API, sortie JSON stricte) : intérêts, idées, domaines proposés, 3 pistes de métiers avec « pourquoi », points à explorer, 3 questions pour un alumni, synthèse. Si l'IA est indisponible, un **profil de secours** est construit à partir des types dominants : la démo marche toujours.

### Règles

- Tutoiement ; « je ne sais pas encore » possible partout ; aucune donnée sensible demandée.
- Pas d'étiquette de personnalité : les scores sont présentés comme des indices, pas un verdict.
- Toutes les réponses sont validées par zod côté serveur (identifiants de questions connus, notes de 1 à 5, textes limités à 500 caractères, 2 relances maximum).

### Fichiers

| Fichier | Rôle |
| --- | --- |
| `lib/questionnaire/items.ts` | Questions de contexte, 24 activités, questions ouvertes |
| `lib/questionnaire/scoring.ts` | Scores RIASEC et code dominant |
| `lib/questionnaire/schema.ts` | Validation zod, schémas JSON stricts pour l'IA |
| `lib/questionnaire/profile.ts` | Prompts, mise en texte des réponses, profil de secours |
| `app/questionnaire/page.tsx` | Écrans et résultat |
| `app/api/profile/route.ts`, `app/api/questionnaire/followup/route.ts` | Routes serveur |

- [x] 24 activités, 4 par type ; calcul testé (`npm test`).
- [x] Fonctionne sans clé OpenAI (profil de secours).
- [ ] Enregistrement des réponses et du profil en base (tâche 3 de la liste Codex).

## Brique 2 : la roadmap et la fiche métier

La roadmap montre les chemins possibles vers 3 métiers d'un domaine (l'informatique pour la démo), classés selon les contraintes du profil. Un clic sur un métier ouvre sa fiche. L'IA choisit et explique, mais ne crée aucune formation ni aucun métier : tout vient d'un catalogue vérifié à la main sur l'Onisep.

### La roadmap

- **En haut :** le domaine et les 3 métiers pistes, chacun avec une phrase « pourquoi pour toi ».
- **Au centre :** les chemins de la terminale au premier poste, dessinés comme des lignes (BUT, BTS, licence, école d'ingénieurs, alternance), avec durée, alternance possible, sélectivité.
- **Prochaine étape :** une action concrète (« parle à un alumni administrateur réseau »), qui mène à la brique 3.

### La fiche métier

| Bloc | Contenu | Source |
| --- | --- | --- |
| En une phrase | Ce que fait la personne, concrètement | Catalogue |
| Une journée type | 4 ou 5 moments de la journée | Catalogue (témoignage) |
| Compétences et qualités | 5 à 6 points | Catalogue |
| Comment y arriver | Les chemins de la roadmap, résumés | Catalogue + IA |
| Chez une entreprise partenaire | Le parcours réel d'un collaborateur, les équipes qui recrutent, alternance possible | Fourni par l'entreprise (fictive pour la démo), signalé comme partenaire |
| Parler à un alumni | Les alumni qui font ce métier, bouton « prendre rendez-vous » | Données de démo |

- [ ] 3 métiers, 2 chemins minimum par métier.
- [ ] Une fiche métier complète pour « administrateur systèmes et réseaux ».
- [ ] Le contenu partenaire porte une mention visible « partenaire ».

## Brique 3 : le rendez-vous avec un alumni

C'est la brique qui rend l'humain visible : l'étudiant choisit un alumni, l'IA prépare l'échange pour les deux, l'échange a lieu en visio, puis l'IA en fait le compte rendu et met à jour la roadmap.

1. **Choisir un alumni :** cartes avec photo, métier, parcours en une ligne, entreprise, et « pourquoi lui parler » (rapproché du profil par l'IA).
2. **Demander un créneau :** 3 créneaux proposés ; dans le MVP, la demande est enregistrée et le créneau confirmé à la main.
3. **Fiche de préparation (IA) :**
   - pour l'étudiant : 5 questions à poser, adaptées à son profil et à la question 8 du questionnaire ;
   - pour l'alumni : qui est l'étudiant en 3 lignes, ses doutes, ce qu'il faut éclaircir.
4. **L'échange :** visio de 20 à 30 minutes. Dans le MVP, un lien de visio externe ; le lien intégré est hors périmètre.
5. **Compte rendu (IA) :** l'étudiant ou l'alumni colle quelques notes ; l'IA en tire 3 enseignements et une prochaine étape, ajoutée à la roadmap.

**Règles de sécurité :** pas d'échange de coordonnées personnelles dans l'app, charte acceptée par chaque alumni, accord parental pour les mineurs, bouton de signalement.

- [ ] La fiche de préparation est générée en moins de 5 secondes.
- [ ] Le compte rendu ajoute une étape visible dans la roadmap.

## L'écran partenaire

C'est l'écran qui montre au jury ce que l'entreprise achète. Dans le MVP, il est **simulé avec des données de démo** (page en lecture seule, chiffres fictifs clairement marqués comme tels dans la vidéo). L'entreprise ne voit **que des données agrégées**, jamais un profil individuel, sauf si l'étudiant a choisi de le partager.

| Bloc | Contenu |
| --- | --- |
| En-tête | Nom de l'entreprise partenaire (fictive), période |
| Chiffres clés | Jeunes ayant exploré ses métiers, échanges réalisés avec ses alumni, note moyenne des échanges |
| Égalité des chances | Part des jeunes boursiers ou en lycée REP ou rural parmi ceux accompagnés |
| Métiers les plus consultés | Top 5 de ses métiers dans les roadmaps |
| Ses alumni | Nombre de mentors actifs, heures données ce mois-ci |
| Vivier | Nombre de jeunes ayant accepté d'être recontactés pour un stage ou une alternance |

**L'établissement** n'a pas d'écran dans le MVP : c'est un partenaire gratuit qui fait connaître la plateforme à ses élèves. Un écran établissement est cité comme vision.

## Architecture technique

Une seule application Next.js déployée sur Vercel, une base Supabase (PostgreSQL) et l'API OpenAI. Le navigateur ne parle jamais directement à OpenAI, et chaque requête vers la base porte l'utilisateur de la session.

&#91;embedded content: architecture du MVP · 4 composants\]

Le serveur reçoit les actions de l'étudiant, lit et écrit ses données sous RLS, et appelle OpenAI pour le questionnaire, le profil, la roadmap, la préparation et le compte rendu des rendez-vous. Un script de seed, lancé avec le rôle service, charge le catalogue, l'entreprise partenaire fictive, les alumni et les statistiques de démo.

| Couche | Choix pour le week-end |
| --- | --- |
| Front-end | Next.js (App Router), React, Tailwind CSS |
| Back-end | Routes API Next.js sur Vercel |
| Base | Supabase PostgreSQL avec RLS ; Supabase Storage pour les photos des alumni |
| Authentification | Supabase Auth (lien magique par e-mail) |
| IA | API OpenAI : Responses API avec sorties structurées |
| PDF | Hors périmètre |

## Modèle de données PostgreSQL et isolation

Chaque donnée personnelle appartient à un utilisateur et est isolée par Row-Level Security. Une seule exception, voulue : quand un étudiant demande un rendez-vous, l'alumni concerné voit la fiche de préparation de ce rendez-vous, et rien d'autre. L'entreprise ne lit que des statistiques agrégées.

**Hébergement :** Supabase (PostgreSQL, authentification, RLS) pour ne pas coder l'authentification seul.

| Table | Famille | Colonnes principales |
| --- | --- | --- |
| `organizations` | Référence | `id`, `name`, `type` (entreprise, établissement), `is_demo` |
| `users` | Compte | `id`, `email`, `role` (student, alumni, partner\_admin), `organization_id` |
| `questionnaire_answers` | Personnelle (étudiant) | `id`, `user_id`, `question_key`, `answer` (jsonb) |
| `profiles` | Personnelle (étudiant) | `user_id`, `profile` (jsonb), `updated_at` |
| `roadmaps` | Personnelle (étudiant) | `id`, `user_id`, `domain`, `content` (jsonb), `steps_done` (jsonb) |
| `catalog_jobs`, `catalog_trainings`, `catalog_paths` | Référence | Métiers, formations, chemins (vérifiés Onisep) |
| `company_jobs` | Référence (partenaire) | `organization_id`, `job_id`, `parcours`, `temoignage`, `is_sponsored` |
| `alumni_profiles` | Référence publique | `user_id`, `organization_id`, `job_id`, `bio`, `parcours`, `photo_url` |
| `meetings` | Partagée (étudiant + alumni) | `id`, `student_id`, `alumni_id`, `slot`, `status` |
| `meeting_preps` | Partagée | `meeting_id`, `student_view` (jsonb), `alumni_view` (jsonb) |
| `meeting_reports` | Partagée | `meeting_id`, `notes`, `summary` (jsonb), `next_step` |
| `partner_stats` | Agrégée | Vue matérialisée par entreprise : comptes, parts, top métiers |

### Les règles d'accès

| Qui | Peut lire | Ne peut pas lire |
| --- | --- | --- |
| Étudiant | Ses réponses, son profil, sa roadmap, ses rendez-vous | Les données des autres étudiants |
| Alumni | Ses rendez-vous, la `alumni_view` de leur préparation, les comptes rendus | Le profil complet, les réponses, la roadmap de l'étudiant |
| Admin partenaire | `partner_stats` de son entreprise, seuil minimum de 5 jeunes par chiffre | Toute ligne individuelle |

```sql
-- Étudiant : ses propres lignes
create policy "own rows" on profiles for all
  using (user_id = auth.uid()) with check (user_id = auth.uid());

-- Rendez-vous : visible par l'étudiant ou l'alumni concernés
create policy "meeting parties" on meetings for select
  using (auth.uid() in (student_id, alumni_id));

-- Partenaire : statistiques de son entreprise uniquement
create policy "own company stats" on partner_stats for select
  using (organization_id = (select organization_id from users where id = auth.uid()));
```

Les colonnes `student_view` et `alumni_view` sont lisibles par les deux participants du rendez-vous ; aucune ne contient le profil complet de l'étudiant. Les statistiques partenaire passent par la fonction `get_partner_stats()` plutôt que par une vue. **La migration SQL du guide d'implémentation fait foi** en cas d'écart avec ce tableau.

## Routes d'API et prompts

Six routes suffisent. Toutes sont côté serveur ; les réponses de l'IA qui remplissent l'interface sont des sorties structurées JSON (Responses API), validées avant enregistrement.

| Route | Rôle | IA |
| --- | --- | --- |
| `POST /api/questionnaire/next` | Question suivante ou relance | Oui, modèle rapide |
| `POST /api/profile` | Profil structuré à partir des réponses | Oui, sortie JSON |
| `POST /api/roadmap` | Roadmap et fiches métier à partir du profil et du catalogue | Oui, sortie JSON |
| `POST /api/meetings` | Demande de rendez-vous + fiche de préparation | Oui, sortie JSON |
| `POST /api/meetings/:id/report` | Compte rendu et prochaine étape | Oui, sortie JSON |
| `GET /api/partner/stats` | Statistiques agrégées de l'entreprise | Non |

| Fonction | Règles du prompt |
| --- | --- |
| Questionnaire | Mentor bienveillant, pas conseiller qui décide. Une question courte, tutoiement, « je ne sais pas encore » toujours possible, aucune donnée sensible. |
| Profil | Résumer sans étiqueter, proposer des pistes, signaler ce qui reste flou. |
| Roadmap | Uniquement les métiers et formations du catalogue fourni ; plusieurs chemins ; « pourquoi pour toi » en une phrase. |
| Préparation | Pour l'étudiant : 5 questions concrètes. Pour l'alumni : 3 lignes sur l'étudiant, ses doutes, sans données personnelles inutiles. |
| Compte rendu | 3 enseignements, une prochaine étape réaliste, rattachée à la roadmap. |

## Données de démo à préparer

Tout est chargé par un script de seed. Aucune vraie marque d'entreprise dans l'app : l'entreprise partenaire est fictive.

- [ ] **Entreprise partenaire fictive :** un nom inventé et vérifié comme non utilisé, 3 métiers, 1 parcours de collaborateur.
- [ ] **Étudiant :** le compte de Paul (« Paul à 17 ans »), avec des réponses prêtes pour rejouer la démo.
- [ ] **Catalogue informatique :** 3 métiers détaillés (administrateur systèmes et réseaux, développeur web, analyste en cybersécurité) et 8 à 10 formations, vérifiés sur leurs fiches Onisep.
- [ ] **Alumni :** toi (vraies infos, avec ton accord) et 2 alumni fictifs avec photos libres de droits.
- [ ] **Rendez-vous :** une préparation et un compte rendu pré-générés en secours.
- [ ] **Statistiques partenaire :** chiffres fictifs cohérents, affichés comme « exemple » dans la vidéo.
- [ ] **Vidéo :** Paul face caméra, et votre visio de 3 minutes, avec son accord écrit.

## Guide d'implémentation pour Codex

**Ce document est la source de vérité du produit.** Les sections précédentes décrivent quoi construire ; les sections suivantes décrivent comment. Codex doit partir du code existant (`alumnia-questionnaire.zip`) et suivre la liste de tâches dans l'ordre, une tâche par commit, en faisant passer `npm run build` et `npm test` à chaque étape.

**Pour l'interface, la section « Les écrans, un par un (v4, fait foi) » fait foi :** une tâche d'écran est finie quand l'écran ressemble à sa capture et au prototype `docs/prototype/alumnia-prototype.html`.

Règles générales pour Codex :

- Ne rien inventer qui ne soit pas dans ce document ; en cas de doute, choisir l'option la plus simple et laisser un `TODO` explicite.
- Toute donnée d'un utilisateur passe par une route serveur authentifiée ; la clé OpenAI ne quitte jamais le serveur.
- Chaque appel à l'IA a un repli sans IA (données de démo ou texte de secours) : la démo ne doit jamais casser.
- Textes d'interface en français, au tutoiement. Nom de l'application uniquement via `APP_NAME`.
- La direction artistique s'applique à la fin (tâche 9) : d'abord des écrans qui marchent, sans style.

## Stack, conventions et arborescence

| Élément | Choix | Version utilisée dans le code existant |
| --- | --- | --- |
| Framework | Next.js, App Router, TypeScript strict | Next 15.5, React 19, TypeScript 5 |
| Validation | zod | 3.25 |
| IA | SDK officiel `openai`, Responses API, sorties structurées JSON strictes | 7.x |
| Base et authentification | Supabase : PostgreSQL, Auth (lien magique par e-mail), RLS ; `@supabase/supabase-js` et `@supabase/ssr` | À ajouter |
| Style | Tailwind CSS, appliqué en dernier | À ajouter |
| Tests | Scripts `tsx` avec `node:assert` | En place (`npm test`) |
| Déploiement | Vercel | À configurer |

### Conventions

- Alias d'import `@/*` vers la racine (déjà configuré, avec `baseUrl`).
- Composants serveur par défaut ; `"use client"` seulement pour les écrans interactifs.
- Routes d'API dans `app/api/**/route.ts` ; chaque route valide son corps avec zod et renvoie `{ error }` avec un code 400, 401 ou 404 en cas de problème.
- Les objets JSON produits par l'IA sont validés par zod après réception.
- Noms de tables et de colonnes en anglais `snake_case` ; textes d'interface en français.

### Arborescence cible

```text
app/
  layout.tsx                      # html lang=fr, métadonnées
  page.tsx                        # accueil -> /questionnaire si non fini, sinon /hub
  login/page.tsx                  # connexion par lien magique
  auth/callback/route.ts          # retour du lien magique Supabase
  questionnaire/page.tsx          # FAIT (brique 1)
  hub/page.tsx                    # accueil personnel : profil + prochaine étape
  roadmap/page.tsx                # brique 2 : chemins vers 3 métiers
  metiers/[slug]/page.tsx         # brique 2 : fiche métier
  alumni/page.tsx                 # brique 3 : liste des alumni
  rendez-vous/[id]/page.tsx       # brique 3 : préparation, notes, compte rendu
  partenaire/page.tsx             # écran partenaire (rôle partner_admin)
  api/
    questionnaire/followup/route.ts   # FAIT
    profile/route.ts                  # FAIT (à brancher sur la base)
    roadmap/route.ts
    meetings/route.ts
    meetings/[id]/report/route.ts
    partner/stats/route.ts
lib/
  config.ts                       # FAIT : APP_NAME, OPENAI_MODEL
  openai.ts                       # FAIT : structuredResponse()
  questionnaire/                  # FAIT
  supabase/server.ts              # client Supabase côté serveur (cookies)
  supabase/client.ts              # client Supabase côté navigateur (auth uniquement)
  roadmap/                        # prompts, schémas, repli
  meetings/                       # prompts, schémas, repli
supabase/
  migrations/0001_init.sql        # schéma complet ci-dessous
  seed.sql                        # données de démo
scripts/
  test-scoring.ts                 # FAIT
  test-roadmap.ts
```

## Variables d'environnement

À mettre dans `.env.local` (jamais commité) et dans les réglages Vercel. Un fichier `.env.example` liste les clés sans valeurs.

| Variable | Côté | Rôle |
| --- | --- | --- |
| `OPENAI_API_KEY` | Serveur | Clé de l'API OpenAI (crédits du hackathon) |
| `OPENAI_MODEL` | Serveur | Nom du modèle ; vérifier le nom exact dans la documentation OpenAI |
| `NEXT_PUBLIC_SUPABASE_URL` | Navigateur + serveur | URL du projet Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Navigateur + serveur | Clé publique, protégée par la RLS |
| `SUPABASE_SERVICE_ROLE_KEY` | Serveur, scripts uniquement | Contourne la RLS : réservée au seed et à la vue partenaire, jamais dans une route appelée par un étudiant |
| `DEMO_MODE` | Serveur | `true` : réponses de l'IA pré-générées si l'appel échoue, pour tourner la vidéo |

## Migration SQL complète

Fichier `supabase/migrations/0001_init.sql`, à appliquer tel quel. Il remplace le tableau de la section « Modèle de données » sur trois points : les réponses du questionnaire sont stockées en un seul JSON par envoi, les statistiques partenaire passent par une fonction (la RLS ne s'applique pas aux vues matérialisées), et les deux vues de la préparation d'un rendez-vous sont lisibles par l'étudiant et l'alumni concernés (aucune ne contient le profil complet).

```sql
-- Types
create type user_role as enum ('student', 'alumni', 'partner_admin');
create type org_type as enum ('entreprise', 'etablissement');
create type meeting_status as enum ('requested', 'confirmed', 'done', 'cancelled');

-- Organisations : entreprises clientes et établissements partenaires
create table organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type org_type not null,
  is_priority_zone boolean not null default false, -- lycée REP / rural (établissements)
  is_demo boolean not null default false,
  created_at timestamptz not null default now()
);

-- Utilisateurs applicatifs (1 ligne par compte Supabase Auth)
create table users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  display_name text,
  role user_role not null default 'student',
  organization_id uuid references organizations(id), -- entreprise (alumni, partner_admin)
  school_id uuid references organizations(id),       -- établissement de l'étudiant (facultatif)
  is_minor boolean not null default false,
  parental_consent_at timestamptz,
  created_at timestamptz not null default now()
);

-- Création automatique de la ligne users à l'inscription
create function handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into users (id, email) values (new.id, new.email);
  return new;
end $$;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function handle_new_user();

-- Brique 1
create table questionnaire_answers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references users(id) on delete cascade,
  answers jsonb not null,            -- QuestionnaireAnswers
  created_at timestamptz not null default now()
);
create table profiles (
  user_id uuid primary key default auth.uid() references users(id) on delete cascade,
  profile jsonb not null,            -- Profile
  riasec_code text not null,
  updated_at timestamptz not null default now()
);

-- Catalogue (référence, vérifié sur l'Onisep)
create table catalog_jobs (
  id text primary key,               -- slug, ex. 'administrateur-systemes-reseaux'
  title text not null,
  domain text not null,              -- ex. 'informatique'
  riasec_code text not null,         -- ex. 'RIC'
  summary text not null,
  day_in_life jsonb not null default '[]',
  skills jsonb not null default '[]',
  onisep_url text
);
create table catalog_trainings (
  id text primary key,
  title text not null,
  kind text not null,                -- 'BUT', 'BTS', 'licence', 'ecole_ingenieurs', 'master'...
  duration_years int not null,
  apprenticeship boolean not null default false,
  selectivity text not null check (selectivity in ('faible', 'moyen', 'fort')),
  onisep_url text
);
create table catalog_paths (
  id text primary key,
  job_id text not null references catalog_jobs(id),
  title text not null,               -- ex. 'Court et en alternance'
  training_ids text[] not null,      -- étapes dans l'ordre
  position int not null default 0
);

-- Brique 2
create table roadmaps (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references users(id) on delete cascade,
  domain text not null,
  job_ids text[] not null,           -- les 3 métiers proposés
  content jsonb not null,            -- Roadmap (voir contrats d'API)
  steps_done jsonb not null default '[]',
  created_at timestamptz not null default now()
);

-- Contenu des entreprises partenaires
create table company_jobs (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references organizations(id),
  job_id text not null references catalog_jobs(id),
  parcours text not null,
  temoignage text,
  is_sponsored boolean not null default true
);

-- Brique 3
create table alumni_profiles (
  user_id uuid primary key references users(id) on delete cascade,
  organization_id uuid references organizations(id),
  job_id text references catalog_jobs(id),
  headline text not null,            -- ex. 'Administrateur réseau chez Nexora'
  bio text not null,
  parcours text not null,
  photo_url text,
  is_active boolean not null default true
);
create table meetings (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null default auth.uid() references users(id) on delete cascade,
  alumni_id uuid not null references users(id),
  slot timestamptz,
  status meeting_status not null default 'requested',
  video_url text,
  created_at timestamptz not null default now()
);
create table meeting_preps (
  meeting_id uuid primary key references meetings(id) on delete cascade,
  student_view jsonb not null,
  alumni_view jsonb not null,
  created_at timestamptz not null default now()
);
create table meeting_reports (
  meeting_id uuid primary key references meetings(id) on delete cascade,
  notes text not null,
  summary jsonb not null,
  next_step text not null,
  created_at timestamptz not null default now()
);

-- Index
create index on questionnaire_answers (user_id);
create index on roadmaps (user_id, created_at desc);
create index on meetings (student_id);
create index on meetings (alumni_id);

-- RLS : activée partout
alter table organizations enable row level security;
alter table users enable row level security;
alter table questionnaire_answers enable row level security;
alter table profiles enable row level security;
alter table catalog_jobs enable row level security;
alter table catalog_trainings enable row level security;
alter table catalog_paths enable row level security;
alter table roadmaps enable row level security;
alter table company_jobs enable row level security;
alter table alumni_profiles enable row level security;
alter table meetings enable row level security;
alter table meeting_preps enable row level security;
alter table meeting_reports enable row level security;

-- Données de référence : lecture pour tout utilisateur connecté
create policy read_ref on organizations for select to authenticated using (true);
create policy read_ref on catalog_jobs for select to authenticated using (true);
create policy read_ref on catalog_trainings for select to authenticated using (true);
create policy read_ref on catalog_paths for select to authenticated using (true);
create policy read_ref on company_jobs for select to authenticated using (true);
create policy read_active on alumni_profiles for select to authenticated using (is_active);
create policy own_update on alumni_profiles for update to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());

-- Données personnelles : uniquement les siennes
create policy own_row on users for select to authenticated using (id = auth.uid());
-- Pas de mise à jour de users depuis le navigateur : le rôle et l'organisation
-- sont modifiés uniquement côté serveur (clé service) pour éviter l'auto-promotion.
create policy own on questionnaire_answers for all to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy own on profiles for all to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy own on roadmaps for all to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());

-- Rendez-vous : l'étudiant et l'alumni concernés
create policy parties_read on meetings for select to authenticated
  using (auth.uid() in (student_id, alumni_id));
create policy student_create on meetings for insert to authenticated
  with check (student_id = auth.uid());
create policy parties_update on meetings for update to authenticated
  using (auth.uid() in (student_id, alumni_id));

create function is_meeting_party(m uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from meetings where id = m and auth.uid() in (student_id, alumni_id));
$$;
create policy parties on meeting_preps for all to authenticated
  using (is_meeting_party(meeting_id)) with check (is_meeting_party(meeting_id));
create policy parties on meeting_reports for all to authenticated
  using (is_meeting_party(meeting_id)) with check (is_meeting_party(meeting_id));

-- Statistiques partenaire : agrégées, seuil de 5 personnes par chiffre
create function get_partner_stats() returns jsonb
language plpgsql stable security definer set search_path = public as $$
declare
  org uuid;
  explorers int; meetings_done int; mentors int; consenting int; priority_share numeric;
begin
  select organization_id into org from users where id = auth.uid() and role = 'partner_admin';
  if org is null then raise exception 'not a partner admin'; end if;

  select count(distinct r.user_id) into explorers
    from roadmaps r
   where r.job_ids && array(select job_id from company_jobs where organization_id = org);
  select count(*) into meetings_done
    from meetings m join alumni_profiles a on a.user_id = m.alumni_id
   where a.organization_id = org and m.status = 'done';
  select count(*) into mentors from alumni_profiles where organization_id = org and is_active;
  select round(100.0 * avg(case when s.is_priority_zone then 1 else 0 end), 0) into priority_share
    from meetings m
    join alumni_profiles a on a.user_id = m.alumni_id and a.organization_id = org
    join users u on u.id = m.student_id
    left join organizations s on s.id = u.school_id;

  return jsonb_build_object(
    'organization_id', org,
    'students_exploring', case when explorers >= 5 then explorers end,
    'meetings_done', case when meetings_done >= 5 then meetings_done end,
    'active_mentors', mentors,
    'priority_zone_share_pct', case when meetings_done >= 5 then priority_share end,
    'top_jobs', (
      select coalesce(jsonb_agg(t), '[]') from (
        select cj.job_id, count(*) as n
          from roadmaps r cross join unnest(r.job_ids) as j(job_id)
          join company_jobs cj on cj.job_id = j.job_id and cj.organization_id = org
         group by cj.job_id having count(*) >= 5
         order by n desc limit 5) t)
  );
end $$;
revoke all on function get_partner_stats() from public;
grant execute on function get_partner_stats() to authenticated;
```

Un chiffre sous le seuil de 5 vaut `null` : l'écran affiche « pas encore assez de données ». En mode démo, l'écran partenaire lit des chiffres d'exemple (voir les contrats d'API).

**Testé le 24 octobre :** la migration s'applique sans erreur dans PostgreSQL (PGlite) avec un schéma `auth` imitant Supabase. Le script `scripts/test-migration.mjs` vérifie qu'un étudiant ne lit ni n'écrit les données d'un autre, ne peut pas changer son rôle, qu'un rendez-vous n'est visible que par ses deux participants, et que la fonction partenaire refuse un étudiant et masque les chiffres sous le seuil.

## Contrats d'API

Toutes les routes exigent une session Supabase valide (sinon 401), sauf en mode démo sans connexion. Les corps sont validés par zod ; les erreurs renvoient `{ "error": string }`.

| Route | Corps de la requête | Réponse 200 | Écrit en base |
| --- | --- | --- | --- |
| `POST /api/questionnaire/followup` | `QuestionnaireAnswers` (partielles) | `{ question: string \| null }` | Rien |
| `POST /api/profile` | `QuestionnaireAnswers` | `{ profile: Profile }` | `questionnaire_answers`, `profiles` (upsert) |
| `POST /api/roadmap` | `{}` (lit le profil en base) | `{ roadmap: Roadmap }` | `roadmaps` |
| `GET /api/roadmap` | — | `{ roadmap: Roadmap \| null }` | Rien |
| `POST /api/meetings` | `{ alumni_id: uuid, slot?: ISO date }` | `{ meeting_id, prep: MeetingPrep }` | `meetings`, `meeting_preps` |
| `POST /api/meetings/:id/report` | `{ notes: string (≤ 3000) }` | `{ report: MeetingReport }` | `meeting_reports`, `roadmaps.steps_done`, `meetings.status = 'done'` |
| `GET /api/partner/stats` | — | `PartnerStats` | Rien (appelle `get_partner_stats()`) |

### Types (TypeScript)

```ts
// Déjà implémentés : QuestionnaireAnswers, Profile (lib/questionnaire/types.ts)

type RoadmapStep = { training_id: string; title: string; kind: string;
  duration_years: number; apprenticeship: boolean; selectivity: "faible" | "moyen" | "fort" };
type RoadmapPath = { path_id: string; title: string; why_for_you: string; steps: RoadmapStep[] };
type RoadmapJob = { job_id: string; title: string; why_for_you: string; paths: RoadmapPath[];
  partner?: { organization_name: string; parcours: string; temoignage?: string; is_sponsored: true } };
type Roadmap = { domain: string; jobs: RoadmapJob[]; next_step: { label: string; href: string };
  generated_by: "ia" | "secours" };

type MeetingPrep = {
  student_view: { questions: string[] };                       // 5 questions à poser
  alumni_view: { about: string; doubts: string[]; to_clarify: string[] }; // 3 lignes, pas de données personnelles
};
type MeetingReport = { learnings: string[]; next_step: string; roadmap_step_added: string };

type PartnerStats = { organization_id: string; students_exploring: number | null;
  meetings_done: number | null; active_mentors: number; priority_zone_share_pct: number | null;
  top_jobs: { job_id: string; n: number }[]; is_demo_data: boolean };
```

### Règles de génération par l'IA

- **Roadmap :** le serveur choisit les métiers candidats dans `catalog_jobs` (domaine proposé par le profil, puis proximité du code RIASEC), charge leurs `catalog_paths` et formations, et n'envoie à l'IA que ces données. L'IA renvoie uniquement l'ordre des métiers et chemins et les phrases `why_for_you`. Tout identifiant inconnu renvoyé par l'IA est rejeté. Repli : les 3 métiers les plus proches du code RIASEC, chemins dans l'ordre `position`.
- **Préparation :** entrée = profil de l'étudiant + `alumni_profiles` de l'alumni. Repli : questions du profil (`questions_pour_alumni`) et 3 lignes génériques.
- **Compte rendu :** entrée = notes + roadmap. Repli : la première phrase des notes comme enseignement, et « Reparler avec ton mentor dans un mois » comme prochaine étape.
- **Statistiques partenaire :** si `DEMO_MODE=true` ou si tous les chiffres sont `null`, la route renvoie les chiffres d'exemple de `seed.sql` avec `is_demo_data: true`, affiché à l'écran.

## Pages, composants et états

Chaque page gère quatre états : chargement, vide, erreur (message en français et bouton « Réessayer »), contenu. Une barre de navigation commune affiche : Mon profil, Ma roadmap, Alumni, et Partenaire pour le rôle `partner_admin`.

| Page | Rôle | Contenu | Redirections |
| --- | --- | --- | --- |
| `/login` | Public | Champ e-mail, envoi du lien magique, message « regarde ta boîte mail » | Connecté → `/` |
| `/` | Connecté | Aucun contenu | Pas de profil → `/questionnaire` ; sinon → `/hub` |
| `/questionnaire` | Étudiant | Fait (brique 1) ; à brancher sur la base | Profil enregistré → bouton vers `/roadmap` |
| `/hub` | Étudiant | Synthèse du profil, code RIASEC, prochaine étape, raccourcis roadmap et alumni | Pas de profil → `/questionnaire` |
| `/roadmap` | Étudiant | 3 métiers, chemins dessinés comme des lignes, étapes avec durée, alternance, sélectivité ; bloc partenaire signalé « Partenaire » ; prochaine étape | Pas de roadmap → bouton « Générer ma roadmap » (`POST /api/roadmap`) |
| `/metiers/[slug]` | Étudiant | Fiche métier : en une phrase, journée type, compétences, chemins, parcours chez un partenaire, alumni de ce métier | Slug inconnu → 404 |
| `/alumni` | Étudiant | Cartes : photo, nom, métier, entreprise, « pourquoi lui parler » ; filtre par métier ; bouton « Demander un échange » | — |
| `/rendez-vous/[id]` | Étudiant ou alumni du rendez-vous | Préparation (vue selon le rôle), lien visio, champ de notes, bouton « Générer le compte rendu », compte rendu | Non participant → 404 |
| `/partenaire` | `partner_admin` | Chiffres clés, part des lycées prioritaires, top métiers, mentors actifs ; mention « données d'exemple » si `is_demo_data` | Autre rôle → `/` |

### Composants réutilisables

| Composant | Usage |
| --- | --- |
| `Badge` | Variantes `humain` (alumni, mentor) et `ia` (préparé par l'IA), `partenaire` (contenu sponsorisé) |
| `JobCard` | Métier : titre, phrase « pourquoi pour toi », lien vers la fiche |
| `PathLine` | Un chemin de formation : étapes reliées par une ligne, durée et alternance sur chaque étape |
| `AlumniCard` | Alumni : photo, nom, métier, entreprise, raison, bouton |
| `StatTile` | Chiffre clé de l'écran partenaire, avec état « pas encore assez de données » |
| `AsyncState` | Affichage commun des états chargement, vide, erreur |

### Accessibilité minimale

- Tous les champs ont un libellé ; les groupes de réponses sont des `fieldset` avec `legend` (déjà le cas dans le questionnaire).
- Navigation au clavier possible sur tout le parcours ; focus visible.
- Contrastes AA (vérifiés dans la direction artistique).

## Tâches pour Codex, dans l'ordre

Une tâche = un commit. Après chaque tâche : `npm run build`, `npm test` et `node scripts/test-migration.mjs` passent. Les tâches 1 et 2 sont déjà faites dans `alumnia-questionnaire.zip`.

| # | Tâche | Fait quand… |
| --- | --- | --- |
| 1 | Projet Next.js, TypeScript strict, alias `@/*`, `APP_NAME` | FAIT |
| 2 | Questionnaire, scores RIASEC, routes `profile` et `followup`, tests | FAIT |
| 3 | Supabase : appliquer `0001_init.sql` ; clients `lib/supabase/server.ts` et `client.ts` ; pages `/login` et `/auth/callback` ; middleware qui protège toutes les pages sauf `/login` | Un utilisateur se connecte par lien magique ; une page protégée redirige vers `/login` |
| 4 | Brancher `/api/profile` sur la base (insert `questionnaire_answers`, upsert `profiles`) ; page `/hub` ; redirection de `/` | Après le questionnaire, `/hub` affiche le profil enregistré, même après rechargement |
| 5 | `supabase/seed.sql` : entreprise fictive, catalogue informatique (3 métiers, 8 à 10 formations, 2 chemins par métier, liens Onisep), 3 alumni, chiffres partenaire d'exemple | `select count(*)` cohérents ; aucune vraie marque d'entreprise |
| 6 | Brique 2 : `lib/roadmap/` (prompt, schéma JSON, repli), routes `GET/POST /api/roadmap`, pages `/roadmap` et `/metiers/[slug]`, composants `JobCard` et `PathLine`, `scripts/test-roadmap.ts` | La roadmap n'affiche que des formations du catalogue ; le repli fonctionne sans clé OpenAI |
| 7 | Brique 3 : `lib/meetings/`, routes `POST /api/meetings` et `/api/meetings/:id/report`, pages `/alumni` et `/rendez-vous/[id]`, `AlumniCard` | Demande → préparation générée → notes → compte rendu → nouvelle étape visible dans la roadmap |
| 8 | Écran partenaire : route `GET /api/partner/stats`, page `/partenaire`, `StatTile` | Un étudiant reçoit une redirection ; l'admin voit les chiffres ou « données d'exemple » |
| 9 | Direction artistique : Tailwind, tokens de couleurs et polices de la section « Direction artistique », badges humain / IA / partenaire | Tous les écrans suivent la charte ; contrastes AA |
| 10 | Démo : `DEMO_MODE`, compte de démo « Paul », réponses pré-générées, déploiement Vercel | Le parcours complet se rejoue en moins de 2 minutes sans erreur, même si l'API OpenAI est lente |

### Prompt de départ à donner à Codex

```text
Tu travailles sur Alumnia (Next.js 15, TypeScript, Supabase, API OpenAI).
La spécification jointe est la source de vérité. Le code de départ contient déjà
les tâches 1 et 2. Réalise la tâche N de la liste « Tâches pour Codex »,
sans toucher au reste. Respecte les contrats d'API, la migration SQL et les règles
de repli sans IA. À la fin : npm run build, npm test et node scripts/test-migration.mjs
doivent passer. Explique en 5 lignes ce que tu as fait et ce qui reste à vérifier.
```

## Direction artistique : « Carnet de route »

**Remplacée par `DESIGN.md` (version 3) pour les couleurs, les polices, les formes et le mouvement.** Les skills taste-skill et impeccable rangent le fond crème avec du terracotta parmi les palettes typiques des sites générés par IA ; la v3 passe au papier blanc, au vert et au jaune. Ce qui suit reste pour l'historique et les références.

### Logo (version 4, fait foi)

&#91;image: Planche du logo Alumnia\]

**Un cartouche vert arrondi et une paillette jaune.** « Alumnia » en blanc, écriture ronde (Bricolage Grotesque 800, vectorisée), dans un cartouche vert `#1C8247` aux coins arrondis ; une paillette à quatre branches jaune `#FFC93C` sur le coin en haut à droite, le même signe que celui qui jaillit à chaque réussite dans l'app. Icône d'app : un « a » blanc dans un carré vert très arrondi, avec la paillette. Fichiers dans `public/brand/`, règles dans `DESIGN.md` (section 2).

Côté éducatif et sobre, dans l'esprit des Sherpas, d'ADPList et de My Job Glasses : un fond clair et chaleureux, une seule couleur d'action, des titres un peu éditoriaux et aucun effet tape-à-l'œil. L'image de fond est celle d'un carnet de route qu'on remplit avec un mentor. **Accroche :** « Ton avenir ne se devine pas. Il se discute. »

### Ce qu'on retient des références

| Référence | Ce qu'on observe | Ce qu'on garde |
| --- | --- | --- |
| [Les Sherpas](https://sherpas.com) | Fond clair, CTA noir #18181B, polices Outfit et Inter, vouvoiement | La sobriété, les photos de vraies personnes |
| [ADPList](https://adplist.org) | Vert très sombre #0E3030, cartes de mentors | La carte mentor : photo, poste, parcours |
| [My Job Glasses](https://www.myjobglasses.com) | Bleu nuit #0C1D37, titres à empattements | Le titre serif qui donne du sérieux |
| [JobTeaser](https://www.jobteaser.com/fr) | Tutoiement, ton direct | Le tutoiement |
| [Onisep](https://www.onisep.fr) | Fiches métiers structurées | La structure de la fiche métier |
| [Khan Academy](https://www.khanacademy.org), [Brilliant](https://brilliant.org) | Parcours par étapes, progression visible | La roadmap comme un chemin d'étapes |

### Les trois thèmes possibles

| Thème | Ambiance | Couleur d'action | Titres | Pour qui |
| --- | --- | --- | --- | --- |
| **A. Carnet de route (recommandé)** | Papier crème, vert forêt, notes dans la marge | #1F5C4A | Fraunces 600 | Chaleureux et sérieux, le plus distinctif |
| B. Boussole | Bleu nuit, institutionnel | #16325C | Source Serif 4 | Proche de My Job Glasses, rassure les entreprises |
| C. Sentier | Menthe, arrondi, léger | menthe | Outfit | Le plus proche des Sherpas, moins de caractère |

Corrections de contraste pour B et C si on les choisit : pastille Partenaire #9C7C14 (B et C), pastille Humain #C75A26 (C).

### Palette du thème A

| Rôle | Couleur | Usage |
| --- | --- | --- |
| Fond | #FAF7F2 | Fond de page (papier crème) |
| Surface | #FFFFFF | Cartes, champs |
| Bordure décorative | #E3DCCF | Séparateurs, contours de cartes |
| Bordure de champ | #8C8579 | Champs de formulaire, boutons radio (contraste 3:1) |
| Texte | #1F2A2E | Texte principal |
| Texte secondaire | #5B6468 | Aides, légendes |
| Action | #1F5C4A | Boutons, liens, chemin de la roadmap |
| Humain : texte / fond / point | #9A3F25 / #FBEAE3 / #C0563A | Tout ce qui vient d'un alumni (terracotta) |
| IA : texte / fond / point | #3A5683 / #E8EEF7 / #5577AA | Tout ce que l'IA rédige (bleu ardoise) |
| Partenaire : texte / fond / point | #7A5A12 / #F6EDD4 / #B98A1E | Contenu d'entreprise sponsorisé (ocre) |
| Succès | #2F7D4F | Étape validée |
| Alerte | #B4530F | Erreur, attention |

Règle clé : **humain en terracotta, IA en ardoise, partenaire en ocre**. L'étudiant voit toujours qui parle. Tout contenu d'IA porte un badge « Rédigé par l'IA » ; tout contenu d'entreprise porte « Partenaire ».

**Contrastes vérifiés (WCAG 2.1 AA) :** texte sur fond 13,75:1 ; blanc sur action 7,81:1 ; badge Humain 5,78:1 ; badge IA 6,34:1 ; badge Partenaire 5,45:1. Tout le thème A passe AA.

### Ajustements après la première maquette : plus chaleureux et plus ludique

La première maquette était jugée trop froide. On garde la palette, mais on applique ces règles :

- **Des gens qui sourient en fond.** Le bandeau d'en-tête et le haut des fiches métiers montrent de vraies photos de jeunes et de professionnels souriants, façon affiche d'école ou manuel scolaire. Elles sont floutées (`filter: blur(4–6px)`) et recouvertes d'un dégradé crème depuis la gauche, pour qu'on les devine sans les voir vraiment. Les photos viennent d'Unsplash (licence libre) ou de vraies photos de l'équipe, jamais d'images générées présentées comme de vraies personnes.
- **Tout arrondi, façon Quizlet.** Cartes à 28–32 px de rayon, boutons et onglets en pilule (999 px), encadrés de l'IA à 20 px. Pas de carré ni de bordure fine. Les boutons ont un relief : une ombre pleine de 4 px en dessous (`box-shadow: 0 4px 0 #143F33` pour le bouton vert), qui s'écrase de 2 px au clic.
- **Les étapes de la roadmap sont des pastilles rondes de 52 px** avec une icône : coche blanche sur vert quand l'étape est faite, icône verte sur blanc quand elle est à faire, étoile blanche sur jaune soleil pour l'objectif. Le chemin fait est un trait vert plein et épais, le chemin à faire une suite de gros points ronds vert clair.
- **Les paillettes quand on accomplit quelque chose.** Quand l'étudiant valide une étape, termine le questionnaire, réserve un rendez-vous ou reçoit son compte rendu : 16 petites étoiles à 4 branches et points (jaune soleil #F5B83D, terracotta, vert, ardoise) jaillissent de la pastille en 0,9 s. En même temps, un anneau jaune s'élargit et un toast arrondi s'affiche : « Bien joué ! Ta formation est choisie · +1 étape ». La barre « Ton avancée » et le compteur « 2 étapes validées » du menu se mettent à jour. CSS seul (`@keyframes` sur `transform` et `opacity`), sans bibliothèque. Avec `prefers-reduced-motion`, on garde seulement le toast.
- **Une couleur d'accent en plus :** jaune soleil #F5B83D (fond #FFF1CF) pour les récompenses et l'objectif final, et menthe #DDF1E7 pour l'onglet actif et les badges « Validé ». Fond de page légèrement plus chaud : #FBF6EE.
- **Ludique sans être un jeu :** une progression, des étapes validées et des félicitations, mais pas de points à gagner, de classement ni de série de jours. L'objectif reste d'avancer dans son orientation.

### Typographie, formes, icônes

- Titres : **Fraunces** 600 (axes SOFT et opsz), avec parcimonie : titres d'écran et noms de métiers.
- Texte et interface : **Inter** 400, 500 et 600. Corps 16 px minimum, interligne 1,5.
- Rayons : 8 px (champs, boutons), 14 px (cartes), 999 px (pastilles). Ombre légère : `0 1px 2px rgba(31,42,46,.06), 0 4px 12px rgba(31,42,46,.05)`.
- Icônes : Lucide, trait 1,75. Illustrations : Open Peeps (CC0), en monochrome texte + une couleur d'accent.
- Mouvement : discret, 150–250 ms, désactivé si `prefers-reduced-motion`.

### Les 4 écrans

1. **Questionnaire** : une question par écran sur fond crème, barre de progression vert forêt, options en cartes blanches cliquables. Les relances de l'IA arrivent avec le badge ardoise. On garde l'échelle à 5 points déjà codée, avec « Je ne sais pas » (l'agent DA suggérait 4 points sans neutre ; non retenu, car « je ne sais pas encore » est une réponse valable pour ce public).
2. **Roadmap + fiche métier** : une page de carnet. Le chemin est un trait pointillé vert forêt, avec des points d'étape blancs cerclés. Les remarques de l'IA sont en marge, en ardoise. Une pastille terracotta indique « 2 alumni ont pris ce chemin ». Le tracé s'anime une fois à l'arrivée (`stroke-dashoffset`). La fiche métier suit la structure Onisep : en bref, une journée type, compétences, formations.
3. **Rendez-vous alumni** : une carte mentor façon ADPList (photo, poste, parcours) en terracotta. La préparation par l'IA et le compte rendu sont dans des encadrés ardoise.
4. **Vue partenaire** : thème sombre `partner-dark` pour marquer qu'on change d'espace. Chiffres agrégés en grandes valeurs, ocre pour les métiers de l'entreprise, mention « chiffres masqués sous 5 personnes ».

### Jetons pour Codex

```css
:root {
  --bg: #FAF7F2; --surface: #FFFFFF;
  --border: #E3DCCF; --border-field: #8C8579;
  --text: #1F2A2E; --text-muted: #5B6468;
  --action: #1F5C4A; --on-action: #FFFFFF;
  --human: #9A3F25; --human-bg: #FBEAE3; --human-dot: #C0563A;
  --ai: #3A5683; --ai-bg: #E8EEF7; --ai-dot: #5577AA;
  --partner: #7A5A12; --partner-bg: #F6EDD4; --partner-dot: #B98A1E;
  --success: #2F7D4F; --warning: #B4530F;
  --radius-sm: 8px; --radius-md: 14px; --radius-pill: 999px;
}
[data-theme="partner-dark"] {
  --bg: #0E1513; --surface: #16201D;
  --text: #EEF2EF; --action: #7FC4A6; --on-action: #0E1513;
}
```

```ts
// tailwind.config.ts (v3) — theme.extend
colors: {
  bg: "var(--bg)", surface: "var(--surface)", border: "var(--border)",
  text: "var(--text)", muted: "var(--text-muted)", action: "var(--action)",
  human: { DEFAULT: "var(--human)", bg: "var(--human-bg)", dot: "var(--human-dot)" },
  ai: { DEFAULT: "var(--ai)", bg: "var(--ai-bg)", dot: "var(--ai-dot)" },
  partner: { DEFAULT: "var(--partner)", bg: "var(--partner-bg)", dot: "var(--partner-dot)" },
},
fontFamily: { display: ["var(--font-fraunces)", "serif"], sans: ["var(--font-inter)", "sans-serif"] },
borderRadius: { sm: "8px", md: "14px", pill: "999px" },
```

```ts
// app/layout.tsx
import { Fraunces, Inter } from "next/font/google";
const fraunces = Fraunces({ subsets: ["latin"], axes: ["SOFT", "opsz"], variable: "--font-fraunces" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
// <html lang="fr" className={`${fraunces.variable} ${inter.variable}`}>
```

### À faire / à éviter

- À faire : une seule couleur d'action, beaucoup de blanc, de vraies photos (Paul, toi en mentor), le tutoiement, des badges qui disent qui parle.
- À éviter : dégradés, néons, violet « IA », emojis en série, illustrations 3D, robots, plus de deux polices, texte gris clair sur crème.

### Sources

[Les Sherpas](https://sherpas.com) · [ADPList](https://adplist.org) · [My Job Glasses](https://www.myjobglasses.com) · [Khan Academy](https://www.khanacademy.org) · [Brilliant](https://brilliant.org) · [Welcome to the Jungle](https://www.welcometothejungle.com/fr) · [Onisep](https://www.onisep.fr) · [MentorCruise](https://mentorcruise.com) · [Hello Charly](https://www.hello-charly.com) · [JobTeaser](https://www.jobteaser.com/fr) · [Article 1](https://article-1.eu) · [Duolingo](https://www.duolingo.com) · [WCAG 2.1](https://www.w3.org/TR/WCAG21/)

## Le nom

**Alumnia est le nom de travail.** Dans le code, le nom de l'application est centralisé dans une seule constante (`APP_NAME` dans `lib/config.ts`) pour pouvoir le changer en une ligne. Risque connu : alumnia.fr est un produit d'IA pour enseignants actif ; nom de repli si le projet se concrétise : Cap Mentor (capmentor.fr libre au 24 octobre 2026).

## Planning en solo jusqu'à dimanche 22h

Seul, la règle est simple : **un écran qui marche avant de passer au suivant**, et un enregistrement de chaque écran dès qu'il marche.

1. **Samedi 19h–20h :** choisir le nom provisoire et la piste de direction artistique ; créer le projet Next.js, Supabase, le schéma et la RLS.
2. **Samedi 20h–22h :** questionnaire et profil (brique 1).
3. **Samedi 22h–1h :** roadmap et fiche métier (brique 2), avec le catalogue informatique.
4. **Dimanche 9h30–11h30 :** rendez-vous alumni : liste, préparation, compte rendu (brique 3).
5. **Dimanche 11h30–12h30 :** écran partenaire simulé, puis déploiement sur Vercel.
6. **Dimanche 12h30–14h :** tournage : Paul face caméra, visio entre Paul et toi.
7. **Dimanche 14h–16h :** enregistrement des écrans, corrections.
8. **Dimanche 16h–21h :** script, voix off, montage, sous-titres.
9. **Dimanche avant 22h :** envoi du formulaire et deux posts « build in public » (@borvibe, @openaidevs, #parisdevdayhack).

**Si tu prends du retard :** l'écran partenaire peut être une simple image montée dans la vidéo, et le compte rendu du rendez-vous peut être pré-généré.

## v6 : le Hub, le copilote IA et l'humain qui décide (fait foi, 25 octobre 2026)

Cette section complète tout ce qui précède. En cas de conflit, elle gagne. Référence visuelle : le prototype v6 (`docs/prototype/alumnia-prototype.html`) et les captures `docs/ecrans/*/25-*.jpg` à `32-*.jpg`.

### Le principe

- **On voit que c'est un produit IA.** Un copilote est présent partout côté élève : bandeau en haut de l'accueil, bouton flottant « Copilote IA » sur chaque écran élève, carte « Ton copilote IA » en tête du Hub, pastille du moteur utilisé.
- **L'humain a le dernier mot.** Toute sortie de l'IA qui change quelque chose pour l'élève ou que le pro va lire passe par trois boutons : **Valider · Modifier · Refuser** (libellés adaptés à chaque cas). Rien n'est envoyé au pro, ni ajouté au chemin, sans clic de l'élève. Chaque décision est enregistrée et affichée dans un journal.
- **Les intérêts restent calculés sans IA** (score RIASEC vérifiable). Ils éclairent les pistes, mais la direction exprimée par le jeune et ses propres mots priment. L'IA aide à approfondir cette direction, prépare et résume.

### Raffinement produit — 25 octobre 2026

- **Langue de l'application : anglais sur tous les écrans.** Les noms des voies et dispositifs français restent en français (Parcoursup, BTS, BUT, licence, master, alternance) et sont brièvement expliqués en anglais quand cela aide.
- **Le questionnaire commence par l'idée du jeune.** Il demande d'abord le métier, le domaine ou la voie déjà en tête, avant les activités notées. Le jeune peut passer ou préciser cette idée à la fin.
- **La conversation est une suite adaptative de quatre réponses.** Elle part de cette idée, puis clarifie la motivation, les tâches souhaitées, les expériences déjà tentées et la voie d'études ou les contraintes pratiques. Chaque relance cite un détail fourni par le jeune. Si aucune idée n'est exprimée, les activités aimées servent à ouvrir des possibilités sans verdict.
- **Le profil et ses pistes commencent par ce que le jeune a nommé.** Les mots libres et la conversation orientent les métiers proposés et expliquent pourquoi ils correspondent. Les scores d'intérêts restent des indices secondaires; ils ne remplacent pas une piste explicite.
- **Le Hub accompagne jusqu'à la préparation de candidature.** Il rassemble les offres publiées et les pistes d'événements, de stages, de mentors, d'entreprises et de ressources CV/LinkedIn. Alumnia aide à comparer les voies et à préparer les documents; la personne dépose et suit sa candidature sur le site de l'employeur ou de l'établissement. Le Hub ne présente pas les candidatures comme une fonction prise en charge.

### Navigation

- Barre du haut élève : **Mon hub · Mon profil · Mon chemin · Mes échanges** (sur téléphone : Hub · Profil · Chemin · Échanges).
- Le Hub est l'écran d'arrivée après le profil (bouton principal « Ouvrir mon hub ») et après connexion.
- Le compteur en haut à droite s'appelle « actions faites » (profil, étapes, échanges, comptes rendus). Il ne doit pas porter le même nom que les étapes du chemin.
- Bouton flottant bleu « Copilote IA » (en bas à droite, icône seule sur téléphone) sur tous les écrans élève sauf le copilote lui-même et le moteur IA.

### Écran Hub (`/hub`)

Le Hub va droit au but (version 6.2, demandée par Lorys) : peu d'informations, les plus utiles en haut.

1. **Bandeau fin** : à gauche « Bonjour {prénom} » avec avatar 56 px et une ligne (niveau · objectif · alternance) ; à droite « Ton copilote IA » (petite orbe, pastille du moteur, bouton « Parler au copilote »). Pas de phrase, pas de chiffres.
2. **Rangée du haut (5/12, 4/12, 3/12)** : Prochaine action proposée par l'IA (boutons \[action\] · Autre chose · Pas maintenant) · **Pour toi en ce moment** (3 opportunités : étiquette, titre, date) · **Mon agenda** (événements datés seulement : prochain échange, forums, portes ouvertes, Parcoursup, étape ajoutée ; trait de couleur à gauche).
3. **Rangée du milieu (7/12, 5/12)** : Mon chemin en version compacte (barre + étapes, lien « Voir en grand ») · Mes 3 pistes (noms seuls, cliquables).
4. **En bas, pleine largeur** : L'IA propose, tu décides (4 dernières décisions, lien « Tout voir » vers l'écran Moteur IA).

Retirés du Hub : la rangée de chiffres, la carte « Demande au copilote » (le bouton flottant et le bandeau suffisent), « Mes échanges » (dans la navigation et l'agenda), « Ce que l'IA voit » (sur l'écran Moteur IA). Sur téléphone, tout passe en une colonne dans le même ordre.

**Prochaine action, dans cet ordre** (on prend la première non refusée par l'élève) :

1. une étape proposée après un échange attend sa décision ;
2. échange terminé sans compte rendu → « Raconter ton échange » ;
3. échange en attente ou confirmé, brief pas encore envoyé → « Préparer ton échange avec {pro} » ;
4. échange confirmé → « Rejoindre {pro} en visio » ;
5. pas d'échange en cours → « Parler 30 minutes avec {pro} » (pro du métier visé, sinon d'une des 3 pistes dans l'ordre, sinon de la même famille) ;
6. première étape du chemin non faite ;
7. « Comparer avec une autre piste ».

« Pas maintenant » masque la suggestion (enregistré). « Je fais autre chose » ouvre un champ : le texte de l'élève devient une étape de son chemin marquée « Ajouté par toi ». Les deux sont journalisés.

**Opportunités selon le niveau** (`stage`) : lycée (Seconde, Première, Terminale) → Parcoursup, portes ouvertes, découverte en entreprise ; étudiant (Bac +1/+2, réorientation) → alternance, forum, Mon Master ou vœux de réorientation ; diplômé (Bac +3 ou plus) → poste junior, rencontre des pros, master en alternance. En production : table `opportunities` remplie par l'équipe et les entreprises partenaires, filtrée par niveau et métiers ; l'IA ne fait que trier.

**Chemin selon le niveau** : pour un étudiant (hors réorientation), l'étape formation devient « Choisir ma poursuite d'études » ; pour un diplômé, « Me spécialiser, si besoin » puis « Décrocher un premier poste ou une alternance ».

### Écran Copilote avant l'échange (`/echanges/preparer`)

Deux colonnes : la discussion à gauche, **Ton brief pour {pro}** à droite (fond orange clair, couleur des humains).

- Premier message du copilote : il présente le pro et annonce les questions déjà préparées à partir du profil.
- Suggestions rapides : « Quelles questions poser ? », « Je stresse un peu », « C'est quoi l'alternance ? », « Je préfère parler à un humain ».
- Chaque réponse du copilote peut proposer **une** question ; elle arrive dans le brief en pointillés, étiquetée « Proposée par l'IA ». Pas de doublon (même thème : maths, alternance, salaire, journée…).
- Chaque question du brief : **Garder · Modifier · Retirer**. Modifier → « Proposée par l'IA, modifiée par toi ». L'élève peut ajouter sa question (étiquette « Ta question », « ? » ajouté s'il manque). Les questions retirées peuvent être remises.
- Bouton « Envoyer mes N questions à {pro} » : désactivé tant qu'aucune n'est gardée ; sans échange réservé, il devient « Réserver un échange avec {pro} » et le brief est gardé.
- Le pro ne voit que les questions gardées et envoyées (vue pro : « Choisies par {prénom} avec le copilote »).
- « Je préfère parler à un humain » : le copilote n'insiste pas, propose d'écrire à l'équipe Alumnia (réponse sous 24 h) ou de voir les pros. Crée une demande de support.
- Sur téléphone : bouton « Mon brief (N gardées) » dans l'en-tête de la discussion qui fait défiler jusqu'au brief.
- « Voir ce que l'IA a reçu » sous la discussion (données envoyées, sans prénom ni e-mail).

### Les boutons Valider · Modifier · Refuser

Composant `<HumanDecision kind refId labels />` sous chaque sortie concernée :

| Sortie de l'IA | Libellés | Effet |
| --- | --- | --- |
| Synthèse du profil | C'est moi · Corriger · Pas du tout | Refuser la remplace par une phrase neutre ; les métiers ne changent pas |
| Compte rendu (3 points) | C'est fidèle · Corriger · Pas fidèle | Corriger = éditer les points, un par ligne |
| Étape proposée après l'échange | Ajouter à mon chemin · Modifier · Ne pas ajouter | L'étape n'entre dans le chemin qu'après Ajouter ou Modifier |
| Fiche du jeune (vue pro) | Fiche juste · Corriger · Pas utile | Le pro corrige la fiche ; « Pas utile » remonte à l'équipe |
| Prochaine action (Hub) | \[action\] · Je fais autre chose · Pas maintenant | Voir plus haut |

Après décision : pastille « Tu as validé / modifié / refusé » + lien « Changer d'avis », qui rétablit la proposition d'origine de l'IA. **Le journal garde toujours le texte d'origine de l'IA** (champ `ai_output`) et, à part, la version de l'élève (`final_value`).

### Écran Moteur IA (`/ia`)

Transparence : moteur utilisé, ordre de repli, les 5 moments où l'IA travaille, la liste des appels (tâche, moteur, durée, jamais le contenu des notes), « Voir ce que l'IA a reçu » pour le dernier appel, et le journal complet des décisions.

En production, **pas de champ de clé** : la clé OpenAI reste côté serveur. Le champ de clé du prototype sert seulement à la démo locale (clé dans `sessionStorage`, effacée à la fermeture de l'onglet).

### L'appel IA n° 5 : le copilote (`prechat`)

- Route : `POST /api/copilot/message` `{ bookingId?, proId, text }` → `{ reply, question, needsHuman }`.
- Modèle : `OPENAI_MODEL` (par défaut `gpt-4.1-mini`), `response_format` en JSON Schema strict, délai 15 s, `temperature` 0,6.
- Consigne (en plus des règles communes) : tutoyer, 2 phrases maximum, rassurer et rester concret ; ne jamais répondre à la place du pro sur son métier ou son parcours ; proposer au plus une question courte, différente de celles du brief ; si le jeune demande un humain, `needsHuman: true` et pas de question.
- Données envoyées : métier, poste et parcours du pro, questions déjà dans le brief, 6 derniers messages. Jamais de prénom, d'e-mail ni de lycée.
- Secours (pas de clé, délai, erreur) : règles par mots-clés (stress, alternance, salaire, maths, « quelles questions », hésitation, humain ; sinon la phrase de l'élève reformulée en question). Le site ne s'arrête jamais.
- Modération : passer le message de l'élève par l'endpoint de modération d'OpenAI ; en cas de signal (détresse, harcèlement), pas de réponse générée, message fixe avec le 3114 et proposition de parler à l'équipe, alerte à l'équipe.

### Ajouts au modèle de données (migration `0003_v6.sql`)

```sql
create table ai_decisions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  kind text not null check (kind in ('synth','report','step','alv','next_action','brief','support')),
  ref_id uuid,
  ai_output jsonb not null,
  decision text not null check (decision in ('validé','modifié','refusé','envoyé','choisi','répondu')),
  final_value jsonb,
  created_at timestamptz not null default now()
);
create table brief_questions (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references bookings on delete cascade,
  text text not null check (char_length(text) <= 200),
  source text not null check (source in ('ia','eleve')),
  status text not null default 'proposed' check (status in ('proposed','kept','removed')),
  edited boolean not null default false,
  position int not null default 0
);
alter table bookings add column brief_sent_at timestamptz;
create table copilot_messages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  booking_id uuid references bookings on delete set null,
  role text not null check (role in ('eleve','copilote')),
  content text not null,
  proposed_question text,
  needs_human boolean not null default false,
  created_at timestamptz not null default now()
);
create table ai_calls (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete set null,
  task text not null,
  engine text not null check (engine in ('openai','secours')),
  model text,
  latency_ms int,
  created_at timestamptz not null default now()
);
create table support_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  source text not null default 'copilote',
  status text not null default 'open',
  created_at timestamptz not null default now()
);
create table opportunities (
  id uuid primary key default gen_random_uuid(),
  kind text not null, title text not null, date_label text, why text,
  stages text[] not null, job_titles text[] not null default '{}',
  company_id uuid references companies, published boolean not null default false
);
```

RLS : chaque élève ne lit et n'écrit que ses lignes (`ai_decisions`, `copilot_messages`, `ai_calls`, `support_requests`). `brief_questions` : l'élève du rendez-vous écrit ; le pro du rendez-vous lit seulement `status = 'kept'` et seulement si `brief_sent_at` n'est pas nul. `opportunities` : lecture des lignes publiées par tous les connectés, écriture réservée à l'équipe. `ai_calls` ne contient jamais de texte de l'élève.

### Nouvelles routes

| Route | Rôle |
| --- | --- |
| `GET /api/hub` | Tout le Hub en un appel (profil, chemin, échanges, chiffres, prochaine action, opportunités, agenda, 6 décisions) |
| `POST /api/next-action/decision` | `{ actionId, decision, text? }` (accepter, autre chose, pas maintenant) |
| `POST /api/copilot/message` | Copilote (voir plus haut) |
| `GET /api/bookings/:id/brief` | Questions du brief |
| `POST /api/bookings/:id/brief` | Ajouter une question (source `eleve`) |
| `PATCH /api/brief-questions/:id` | Garder, modifier, retirer, remettre |
| `POST /api/bookings/:id/brief/send` | Envoie au pro les questions gardées (≥ 1), journalise |
| `POST /api/decisions` | `{ kind, refId, decision, finalValue? }` pour synthèse, compte rendu, étape, fiche |
| `GET /api/ai/calls` | Appels IA de l'utilisateur (sans contenu) |
| `POST /api/support` | Demande à parler à un humain |

Changement de comportement : `POST /api/report` ne crée plus l'étape du chemin. Il renvoie la proposition ; l'étape n'est créée qu'à la décision « Ajouter » ou « Modifier ».

### Données de démo (seed)

Quatre profils : Yanis (terminale, neuf), Paul (réorientation, neuf), Camille (2ᵉ année de licence, déjà un échange avec Sarah, étape modifiée par elle, journal de 5 décisions, pistes Data analyst · Contrôleur de gestion · Analyste cyber), Sami (jeune diplômé, échange passé avec Léa, échange confirmé avec Mehdi, journal de 4 décisions). Les échanges passés ont des dates passées.

### Accueil

Photo de groupe : **2 rangées** qui remplissent le panneau de gauche à droite. Devant, 5 personnes du bord gauche au bord droit ; derrière, 6 personnes plus serrées, visages entiers au-dessus du rang de devant, coupe à la taille cachée. Tous de la même taille, aucun doublon, tenues claires et foncées en alternance. Le groupe est mis à l'échelle de la largeur du panneau (il déborde de 20 px de chaque côté pour ne laisser aucun vide). Ensemble : `[[0,8,2,27,14],[12,5,22,3,17,7]]`.

### Critères d'acceptation v6

- Aucune sortie de l'IA n'atteint le pro ou le chemin sans clic de l'élève (test e2e : générer un compte rendu, vérifier que le chemin n'a pas changé avant « Ajouter »).
- Le journal affiche le texte d'origine de l'IA même après « Modifier » puis « Changer d'avis ».
- Le pro ne voit aucune question au statut `proposed` ou `removed`.
- Le copilote répond en moins de 3 s en moyenne avec OpenAI, et en moins de 1 s en secours ; jamais d'écran bloqué.
- « Je préfère parler à un humain » crée une ligne `support_requests` et n'appelle pas le modèle.
- Hub lisible à 390 px sans défilement horizontal ; le bouton Copilote ne cache aucun bouton.
- Focus clavier conservé après Garder, Retirer, Valider ; Échap ferme les panneaux et rend le focus.

### Ordre de travail pour Codex (v6)

1. Migration `0003_v6.sql` + tests RLS (`npm run test:db`).
2. Composant `HumanDecision` + route `/api/decisions` + journal ; brancher la synthèse.
3. Compte rendu : proposition puis décision (changer `/api/report`).
4. Brief : routes, écran, envoi, vue pro.
5. Copilote : route `/api/copilot/message` (OpenAI + secours + modération), écran.
6. Hub : `/api/hub`, prochaine action, écran.
7. Écran `/ia` (appels et décisions).
8. Seed des 4 profils, captures, e2e.

Prompt à donner à Codex : « Lis CODEX.md, puis la section “v6 : le Hub, le copilote IA et l'humain qui décide” de la spec. Fais les tâches 1 à 8 dans l'ordre, une PR par tâche. Le prototype docs/prototype/alumnia-prototype.html fait foi pour ce qui se voit. Aucune sortie de l'IA ne doit être enregistrée comme décision de l'élève sans son clic. »
