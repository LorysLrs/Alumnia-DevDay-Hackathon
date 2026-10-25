-- Alumnia v6: human decisions, meeting briefs, copilot, and published opportunities.
-- This migration follows the existing 0001 schema, where meetings are called `meetings`.

create table ai_decisions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  kind text not null check (kind in ('synth', 'report', 'step', 'alv', 'next_action', 'brief', 'support')),
  ref_id uuid,
  ai_output jsonb not null,
  decision text not null check (decision in ('validé', 'modifié', 'refusé', 'envoyé', 'choisi', 'répondu')),
  final_value jsonb,
  created_at timestamptz not null default now()
);

create table brief_questions (
  id uuid primary key default gen_random_uuid(),
  meeting_id uuid not null references meetings(id) on delete cascade,
  text text not null check (char_length(text) <= 200),
  source text not null check (source in ('ia', 'eleve')),
  status text not null default 'proposed' check (status in ('proposed', 'kept', 'removed')),
  edited boolean not null default false,
  position int not null default 0,
  created_at timestamptz not null default now()
);

alter table meetings add column brief_sent_at timestamptz;

create table copilot_messages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  meeting_id uuid references meetings(id) on delete set null,
  role text not null check (role in ('eleve', 'copilote')),
  content text not null,
  proposed_question text,
  needs_human boolean not null default false,
  created_at timestamptz not null default now()
);

-- Append-only technical telemetry: never store the student's message or notes here.
create table ai_calls (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete set null,
  task text not null,
  engine text not null check (engine in ('openai', 'secours')),
  model text,
  latency_ms int,
  created_at timestamptz not null default now()
);

create table support_requests (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  source text not null default 'copilote',
  status text not null default 'open',
  created_at timestamptz not null default now()
);

create table opportunities (
  id uuid primary key default gen_random_uuid(),
  kind text not null,
  title text not null,
  date_label text,
  why text,
  stages text[] not null,
  job_titles text[] not null default '{}',
  company_id uuid references organizations(id) on delete set null,
  published boolean not null default false,
  created_at timestamptz not null default now()
);

alter table ai_decisions enable row level security;
alter table brief_questions enable row level security;
alter table copilot_messages enable row level security;
alter table ai_calls enable row level security;
alter table support_requests enable row level security;
alter table opportunities enable row level security;

create policy ai_decisions_read_own on ai_decisions for select to authenticated
  using (user_id = auth.uid());
create policy ai_decisions_insert_own on ai_decisions for insert to authenticated
  with check (user_id = auth.uid());

create policy brief_questions_student_read on brief_questions for select to authenticated
  using (exists (select 1 from meetings m where m.id = meeting_id and m.student_id = auth.uid()));
create policy brief_questions_student_insert on brief_questions for insert to authenticated
  with check (exists (select 1 from meetings m where m.id = meeting_id and m.student_id = auth.uid()));
create policy brief_questions_student_update on brief_questions for update to authenticated
  using (exists (select 1 from meetings m where m.id = meeting_id and m.student_id = auth.uid()))
  with check (exists (select 1 from meetings m where m.id = meeting_id and m.student_id = auth.uid()));
create policy brief_questions_pro on brief_questions for select to authenticated
  using (status = 'kept' and exists (
    select 1 from meetings m where m.id = meeting_id
      and m.alumni_id = auth.uid() and m.brief_sent_at is not null
  ));

create policy copilot_messages_read_own on copilot_messages for select to authenticated
  using (user_id = auth.uid());
create policy copilot_messages_insert_own on copilot_messages for insert to authenticated
  with check (user_id = auth.uid());

create policy ai_calls_read_own on ai_calls for select to authenticated
  using (user_id = auth.uid());
create policy ai_calls_insert_own on ai_calls for insert to authenticated
  with check (user_id = auth.uid());

create policy support_requests_read_own on support_requests for select to authenticated
  using (user_id = auth.uid());
create policy support_requests_insert_own on support_requests for insert to authenticated
  with check (user_id = auth.uid());

create policy opportunities_published on opportunities for select to authenticated
  using (published);
-- Account deletion must also remove meetings where the account is the professional.
alter table meetings drop constraint meetings_alumni_id_fkey;
alter table meetings add constraint meetings_alumni_id_fkey
  foreign key (alumni_id) references users(id) on delete cascade;
