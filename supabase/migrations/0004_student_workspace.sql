-- Private, cross-device student workspace state. Conversation transcripts and
-- AI prompts are deliberately kept out of this snapshot.
create table student_workspaces (
  user_id uuid primary key references users(id) on delete cascade,
  state jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table student_workspaces enable row level security;
create policy student_workspace_own on student_workspaces for all to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());

grant select, insert, update on student_workspaces to authenticated;
