-- Private career documents uploaded by a student.
create table career_documents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  storage_path text not null unique,
  original_name text not null,
  content_type text not null check (content_type in ('application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')),
  size_bytes bigint not null check (size_bytes > 0 and size_bytes <= 10485760),
  created_at timestamptz not null default now()
);

alter table career_documents enable row level security;
create policy career_documents_own on career_documents for all to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());
grant select, insert, delete on career_documents to authenticated;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('career-documents', 'career-documents', false, 10485760,
  array['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'])
on conflict (id) do update set public = false, file_size_limit = 10485760,
  allowed_mime_types = excluded.allowed_mime_types;

create policy career_documents_storage_read on storage.objects for select to authenticated
  using (bucket_id = 'career-documents' and (storage.foldername(name))[1] = auth.uid()::text);
create policy career_documents_storage_insert on storage.objects for insert to authenticated
  with check (bucket_id = 'career-documents' and (storage.foldername(name))[1] = auth.uid()::text);
create policy career_documents_storage_delete on storage.objects for delete to authenticated
  using (bucket_id = 'career-documents' and (storage.foldername(name))[1] = auth.uid()::text);
