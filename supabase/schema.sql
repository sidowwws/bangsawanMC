-- Schema database untuk site aspirasi bangsawanMC
-- Jalankan di: Supabase Dashboard -> SQL Editor -> New query -> paste -> Run

create table if not exists public.aspirations (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 50),
  message text not null check (char_length(message) between 1 and 1000),
  created_at timestamptz not null default now()
);

create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  aspiration_id uuid not null references public.aspirations(id) on delete cascade,
  author text not null,
  content text not null check (char_length(content) between 1 and 500),
  created_at timestamptz not null default now()
);

create index if not exists comments_aspiration_id_idx
  on public.comments (aspiration_id);

alter table public.aspirations enable row level security;
alter table public.comments enable row level security;

-- Siapa pun boleh membaca semua aspirasi & komentar (halaman publik)
create policy "aspirations_public_read"
  on public.aspirations for select
  using (true);

create policy "comments_public_read"
  on public.comments for select
  using (true);

-- Siapa pun boleh mengirim aspirasi (tanpa login)
create policy "aspirations_public_insert"
  on public.aspirations for insert
  with check (true);

-- Komentar balasan hanya dibuat lewat halaman admin (anon key tetap bisa
-- insert agar admin UI tanpa login Supabase bisa bekerja; form komentar
-- memang hanya tampil setelah login admin di /masuk)
create policy "comments_insert"
  on public.comments for insert
  with check (true);
