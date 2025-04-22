-- TABLE: claims
create table if not exists public.claims (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  claim_numb text not null check (claim_numb like 'CLM%'),
  policy_numb text,
  vehicle_info text,
  status text default 'draft'
);

-- TABLE: vehicle_photos
create table if not exists public.vehicle_photos (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  claim_numb text references public.claims (claim_numb),
  url text not null
);

-- FUNCTION: notify_zapier
create or replace function notify_zapier()
returns trigger as $$
begin
  perform net.http_post(
    url := 'https://hooks.zapier.com/hooks/catch/20558322/2xztslv/',
    headers := jsonb_build_object('Content-Type', 'application/json'),
    body := jsonb_build_object(
      'url', NEW.url,
      'claim_numb', NEW.claim_numb
    )
  );
  return new;
end;
$$ language plpgsql;

-- TRIGGER: zapier_trigger
drop trigger if exists zapier_trigger on public.vehicle_photos;
create trigger zapier_trigger
after insert on public.vehicle_photos
for each row execute procedure notify_zapier();
