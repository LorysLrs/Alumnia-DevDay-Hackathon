# Alumnia

Application d'orientation pour les jeunes de 16 à 25 ans : questionnaire, pistes de métiers, chemin d'études, échanges avec des professionnels et espace partenaire. Les écrans du prototype v6 sont servis par l'application et restent utilisables en mode démo.

## Démarrer

```bash
npm install
cp .env.example .env.local
npm run dev
```

Ouvre `http://localhost:3000`. Sans configuration Supabase, les parcours de démonstration restent disponibles. Les données de démonstration sont conservées dans le navigateur; elles ne sont pas des comptes réels.

## Configuration SaaS

1. Crée un projet Supabase et renseigne `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY` dans `.env.local`. La clé `service_role` reste côté serveur; renseigne `SUPABASE_SERVICE_ROLE_KEY` uniquement pour activer la suppression complète des comptes.
2. Applique `supabase/migrations/0001_init.sql`, `supabase/migrations/0003_v6.sql`, `supabase/migrations/0004_student_workspace.sql`, puis `supabase/migrations/0005_career_documents.sql` dans cet ordre.
3. Ajoute l'adresse de ton site et `/auth/callback` à la liste des URL de redirection autorisées pour l'authentification par e-mail.
4. Configure `OPENAI_API_KEY` et, si besoin, `OPENAI_MODEL`. La clé OpenAI n'est lue que côté serveur. Sans clé, le profil et le copilote utilisent leur version de secours.
5. Pour une mise en production, définis `NEXT_PUBLIC_DEMO_MODE=0` et utilise HTTPS.

Le lien de connexion accepte le modèle d'e-mail Supabase par défaut (jetons dans le fragment) ainsi qu'un modèle personnalisé envoyant `token_hash` et `type` à `/auth/callback`. Les sessions sont vérifiées par Supabase puis stockées dans des cookies HTTPOnly; les lectures et écritures utilisent le jeton de la personne et les politiques RLS.

## Routes livrées

- Écrans : accueil, questionnaire, profil, hub, chemin, métiers, pros, rendez-vous, copilote, visio, vues pro et partenaire, rapport, classe, transparence IA.
- Authentification par lien e-mail, session HTTPOnly et renouvellement de jeton.
- Espace personnel synchronisé entre appareils, protégé par RLS; conversations du copilote exclues de la sauvegarde de l'espace.
- Profil de carrière enrichi par les réponses au chat IA; réponses conversationnelles éphémères pendant la génération du profil et exclues du stockage des réponses du questionnaire.
- CV privés en PDF/DOC/DOCX (jusqu'à 10 Mo) dans Supabase Storage, accessibles uniquement à leur propriétaire; relecture IA sur texte collé après accord explicite et retrait des e-mails, téléphones et URL.
- APIs serveur : profil, compte rendu, fiche pro, copilote (avec modération), journal des décisions, briefs, support humain, Hub et historique des appels IA.

Le calendrier de professionnels, la prise de rendez-vous réelle, la visio, les vues pro et partenaire ainsi que le catalogue d'opportunités doivent encore être reliés à des données et services de production. Les comptes et profils sont persistés quand Supabase est configuré; le mode de démonstration reste disponible sans configuration.
