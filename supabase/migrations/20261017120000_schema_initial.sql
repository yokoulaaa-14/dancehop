-- Schéma initial, transcrit de docs/data-model.md (D30, D31, D10, D25, D27, D37, D38).
-- Une migration par changement de schéma ; ce fichier n'est plus modifié une fois appliqué.

-- Types énumérés ------------------------------------------------------------

create type level as enum ('beginner', 'intermediate', 'advanced');
create type course_type as enum ('freestyle', 'choreography', 'technique');
create type grid_reliability as enum ('season_grid', 'frequent_updates');
create type booking_mode as enum ('app_required', 'online_or_onsite', 'none');

-- updated_at automatique ----------------------------------------------------

create function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- style : taxonomie figée à 13 (D41) ----------------------------------------

create table style (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  label text not null,
  sort_order smallint not null
);

-- studio : qui organise et encaisse ----------------------------------------

create table studio (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  website_url text,
  instagram text,
  booking_mode booking_mode not null,
  booking_url text,
  booking_note text,
  unit_price_cents integer check (unit_price_cents > 0),
  grid_reliability grid_reliability not null,
  grid_source_url text,
  season_end_date date,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger studio_updated_at
  before update on studio
  for each row execute function set_updated_at();

-- location : où l'on va, indépendant des studios ---------------------------

create table location (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  address_line text not null,
  postal_code text not null,
  city text not null,
  district_label text,
  metro text not null,
  access_note text,
  lat double precision,
  lng double precision
);

-- teacher -------------------------------------------------------------------

create table teacher (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  instagrams text[] not null default '{}',
  video_url text,
  is_guest boolean not null default false,
  notes text
);

-- course : un créneau hebdomadaire récurrent (D25) -------------------------

create table course (
  id uuid primary key default gen_random_uuid(),
  studio_id uuid not null references studio (id),
  location_id uuid not null references location (id),
  teacher_id uuid not null references teacher (id),
  style_id uuid not null references style (id),
  weekday smallint not null check (weekday between 1 and 7),
  start_time time not null,
  duration_min integer not null check (duration_min > 0),
  levels level[] not null default '{}',
  course_type course_type,
  style_raw text not null,
  level_raw text,
  type_raw text,
  title text,
  booking_url text,
  price_cents integer check (price_cents > 0),
  season text not null,
  valid_from date,
  valid_until date,
  is_active boolean not null default true,
  source_url text,
  last_verified_at date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (studio_id, weekday, start_time, teacher_id, style_id)
);

create trigger course_updated_at
  before update on course
  for each row execute function set_updated_at();

-- profile : réponses d'onboarding, une par compte --------------------------

create table profile (
  user_id uuid primary key references auth.users (id) on delete cascade,
  style_ids uuid[] not null default '{}',
  levels level[] not null default '{}',
  availability jsonb not null default '{}',
  onboarding_completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger profile_updated_at
  before update on profile
  for each row execute function set_updated_at();

-- plan_item : « mon planning » (D05) ----------------------------------------

create table plan_item (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  course_id uuid not null references course (id),
  added_at timestamptz not null default now(),
  unique (user_id, course_id)
);

-- RLS sur toutes les tables (D19) -------------------------------------------
-- Référentiel : lecture publique, aucune écriture depuis l'app (saisie dans l'interface Supabase).
-- profile et plan_item : propriétaire seul.

alter table style enable row level security;
alter table studio enable row level security;
alter table location enable row level security;
alter table teacher enable row level security;
alter table course enable row level security;
alter table profile enable row level security;
alter table plan_item enable row level security;

create policy "lecture publique" on style for select using (true);
create policy "lecture publique" on studio for select using (true);
create policy "lecture publique" on location for select using (true);
create policy "lecture publique" on teacher for select using (true);
create policy "lecture publique" on course for select using (true);

create policy "profil : lecture par son propriétaire"
  on profile for select using (auth.uid() = user_id);
create policy "profil : création par son propriétaire"
  on profile for insert with check (auth.uid() = user_id);
create policy "profil : modification par son propriétaire"
  on profile for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "planning : lecture par son propriétaire"
  on plan_item for select using (auth.uid() = user_id);
create policy "planning : ajout par son propriétaire"
  on plan_item for insert with check (auth.uid() = user_id);
create policy "planning : retrait par son propriétaire"
  on plan_item for delete using (auth.uid() = user_id);
