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
