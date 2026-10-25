// Teste la migration SQL dans un PostgreSQL embarqué (PGlite), avec un faux schéma auth
// qui imite Supabase. Vérifie l'isolation RLS entre deux étudiants et la fonction partenaire.
// Lancer : node scripts/test-migration.mjs
import { PGlite } from "@electric-sql/pglite";
import { readFileSync } from "node:fs";
import assert from "node:assert/strict";

const db = new PGlite();
await db.exec(`
  create role authenticated nologin;
  create schema auth;
  create table auth.users (id uuid primary key, email text);
  create function auth.uid() returns uuid language sql stable as
    $$ select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid $$;
  grant usage on schema auth to authenticated;
  grant execute on function auth.uid() to authenticated;
`);
await db.exec(readFileSync(new URL("../supabase/migrations/0001_init.sql", import.meta.url), "utf8"));
await db.exec(`
  grant usage on schema public to authenticated;
  grant select, insert, update, delete on all tables in schema public to authenticated;
`);

const A = "00000000-0000-0000-0000-00000000000a";
const B = "00000000-0000-0000-0000-00000000000b";
const ALUM = "00000000-0000-0000-0000-0000000000a1";
const ADMIN = "00000000-0000-0000-0000-0000000000ad";
await db.exec(`
  insert into auth.users values ('${A}', 'a@x.fr'), ('${B}', 'b@x.fr'), ('${ALUM}', 'al@x.fr'), ('${ADMIN}', 'ad@x.fr');
  insert into organizations (id, name, type) values ('10000000-0000-0000-0000-000000000001', 'Nexora (démo)', 'entreprise');
  update users set role = 'alumni', organization_id = '10000000-0000-0000-0000-000000000001' where id = '${ALUM}';
  update users set role = 'partner_admin', organization_id = '10000000-0000-0000-0000-000000000001' where id = '${ADMIN}';
  insert into catalog_jobs (id, title, domain, riasec_code, summary) values ('admin-reseau', 'Administrateur réseau', 'informatique', 'RIC', 'x');
  insert into company_jobs (organization_id, job_id, parcours) values ('10000000-0000-0000-0000-000000000001', 'admin-reseau', 'x');
  insert into alumni_profiles (user_id, organization_id, job_id, headline, bio, parcours) values ('${ALUM}', '10000000-0000-0000-0000-000000000001', 'admin-reseau', 'h', 'b', 'p');
`);

async function as(uid, sql, params) {
  await db.exec(`set role authenticated; select set_config('request.jwt.claim.sub', '${uid}', false);`);
  try {
    return await db.query(sql, params);
  } finally {
    await db.exec(`reset role;`);
  }
}

// Le trigger a créé les lignes users
assert.equal((await db.query("select count(*)::int as n from users")).rows[0].n, 4);

// Isolation : A écrit son profil, B ne le voit pas
await as(A, "insert into profiles (profile, riasec_code) values ('{}', 'RIS')");
assert.equal((await as(A, "select count(*)::int as n from profiles")).rows[0].n, 1);
assert.equal((await as(B, "select count(*)::int as n from profiles")).rows[0].n, 0);

// Un étudiant ne peut pas écrire pour un autre
await assert.rejects(as(B, `insert into profiles (user_id, profile, riasec_code) values ('${A}', '{}', 'X')`));

// Un étudiant ne voit que sa propre ligne users et ne peut pas se promouvoir
assert.equal((await as(A, "select count(*)::int as n from users")).rows[0].n, 1);
const upd = await as(A, `update users set role = 'partner_admin' where id = '${A}'`);
assert.equal(upd.affectedRows ?? 0, 0);

// Rendez-vous : A crée, l'alumni voit, B ne voit pas
const m = await as(A, `insert into meetings (alumni_id) values ('${ALUM}') returning id`);
const mid = m.rows[0].id;
await as(A, `insert into meeting_preps (meeting_id, student_view, alumni_view) values ('${mid}', '{}', '{}')`);
assert.equal((await as(ALUM, "select count(*)::int as n from meeting_preps")).rows[0].n, 1);
assert.equal((await as(B, "select count(*)::int as n from meetings")).rows[0].n, 0);
assert.equal((await as(B, "select count(*)::int as n from meeting_preps")).rows[0].n, 0);

// Référence lisible par tous
assert.equal((await as(B, "select count(*)::int as n from alumni_profiles")).rows[0].n, 1);

// Fonction partenaire : refusée à un étudiant, chiffres masqués sous le seuil
await assert.rejects(as(A, "select get_partner_stats()"));
const stats = (await as(ADMIN, "select get_partner_stats() as s")).rows[0].s;
assert.equal(stats.active_mentors, 1);
assert.equal(stats.meetings_done, null);

console.log("OK — migration appliquée, RLS et statistiques partenaire vérifiées.", stats);
