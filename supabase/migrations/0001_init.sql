-- Write-only request log. RLS is on with NO policies: only the server (service key) can insert,
-- and nothing is readable from the browser. View rows in the Supabase table editor.
create table if not exists appointment_requests (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  email text,
  concern text not null check (concern in ('cervical','thoracic','lumbar','sacral','joints','not_sure')),
  preferred_start timestamptz not null,
  first_visit boolean,
  note text check (char_length(note) <= 500),
  status text not null default 'new' check (status in ('new','confirmed','cancelled','completed','no_show')),
  consent_at timestamptz not null,
  created_at timestamptz default now()
);

create table if not exists enquiries (
  id uuid primary key default gen_random_uuid(),
  name text,
  phone text,
  message text,
  consent_at timestamptz,
  created_at timestamptz default now()
);

alter table appointment_requests enable row level security;
alter table enquiries enable row level security;

-- Retention: delete requests older than 12 months (run on a schedule, see privacy policy).
-- delete from appointment_requests where created_at < now() - interval '12 months';
-- delete from enquiries where created_at < now() - interval '12 months';
