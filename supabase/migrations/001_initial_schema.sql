-- ============================
-- QN Arquitectura - Schema inicial
-- Ejecutar en Supabase SQL Editor
-- ============================

-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- ============================
-- PROJECTS TABLE
-- ============================
create table public.projects (
  id          uuid primary key default uuid_generate_v4(),
  title       text not null,
  description text not null default '',
  featured    boolean not null default false,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Solo un proyecto puede ser featured a la vez
create unique index projects_single_featured
  on public.projects (featured) where (featured = true);

-- ============================
-- PROJECT IMAGES TABLE
-- ============================
create table public.project_images (
  id            uuid primary key default uuid_generate_v4(),
  project_id    uuid not null references public.projects(id) on delete cascade,
  storage_path  text not null,
  url           text not null,
  display_order integer not null default 0,
  is_main       boolean not null default false,
  created_at    timestamptz not null default now()
);

-- Solo una imagen principal por proyecto
create unique index images_single_main_per_project
  on public.project_images (project_id, is_main) where (is_main = true);

-- Index para ordenamiento
create index images_project_order
  on public.project_images (project_id, display_order);

-- ============================
-- CLICK EVENTS TABLE (Analytics)
-- ============================
create table public.click_events (
  id           uuid primary key default uuid_generate_v4(),
  project_id   uuid not null references public.projects(id) on delete cascade,
  event_type   text not null default 'whatsapp_click',
  referrer     text,
  utm_source   text,
  utm_medium   text,
  utm_campaign text,
  user_agent   text,
  created_at   timestamptz not null default now()
);

-- Indices para queries de analytics
create index click_events_project_time
  on public.click_events (project_id, created_at desc);

create index click_events_time
  on public.click_events (created_at desc);

-- ============================
-- AUTO-UPDATE updated_at TRIGGER
-- ============================
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger projects_updated_at
  before update on public.projects
  for each row execute function public.handle_updated_at();

-- ============================
-- ROW LEVEL SECURITY (RLS)
-- ============================

-- Projects: lectura publica, escritura solo authenticated
alter table public.projects enable row level security;

create policy "Projects are viewable by everyone"
  on public.projects for select
  using (true);

create policy "Authenticated users can insert projects"
  on public.projects for insert
  to authenticated
  with check (true);

create policy "Authenticated users can update projects"
  on public.projects for update
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated users can delete projects"
  on public.projects for delete
  to authenticated
  using (true);

-- Project Images: lectura publica, escritura solo authenticated
alter table public.project_images enable row level security;

create policy "Images are viewable by everyone"
  on public.project_images for select
  using (true);

create policy "Authenticated users can insert images"
  on public.project_images for insert
  to authenticated
  with check (true);

create policy "Authenticated users can update images"
  on public.project_images for update
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated users can delete images"
  on public.project_images for delete
  to authenticated
  using (true);

-- Click Events: insert publico (tracking), lectura solo authenticated
alter table public.click_events enable row level security;

create policy "Anyone can insert click events"
  on public.click_events for insert
  to anon, authenticated
  with check (true);

create policy "Authenticated users can read click events"
  on public.click_events for select
  to authenticated
  using (true);
