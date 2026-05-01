-- ============================================================
-- Local Service Finder — Complete Schema with Demo Users
-- ============================================================
-- This migration creates everything you need including demo users.
-- Just copy-paste this entire file into Supabase SQL Editor and click "Run"
-- ============================================================

-- Extensions
create extension if not exists "uuid-ossp";

-- ============================================================
-- DEMO USERS (created automatically)
-- ============================================================
-- After running this migration, you can log in with:
--
-- Email: plumber@demo.com         | Password: Demo@123456
-- Email: electrician@demo.com     | Password: Demo@123456
-- Email: hvac@demo.com            | Password: Demo@123456
-- Email: painter@demo.com         | Password: Demo@123456
-- Email: cleaner@demo.com         | Password: Demo@123456
-- Email: landscaper@demo.com      | Password: Demo@123456
-- Email: pest@demo.com            | Password: Demo@123456
-- Email: mover@demo.com           | Password: Demo@123456
-- Email: hvac2@demo.com           | Password: Demo@123456
-- Email: drain@demo.com           | Password: Demo@123456
--
-- ============================================================

-- Create demo users in auth schema
-- These IDs will be used in the provider seed data below
insert into auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at, raw_app_meta_data, raw_user_meta_data)
values
  ('550e8400-e29b-41d4-a716-446655440001', 'plumber@demo.com', crypt('Demo@123456', gen_salt('bf')), now(), now(), now(), '{"provider":"email","providers":["email"]}', '{"name":"Flow Masters"}'),
  ('550e8400-e29b-41d4-a716-446655440002', 'electrician@demo.com', crypt('Demo@123456', gen_salt('bf')), now(), now(), now(), '{"provider":"email","providers":["email"]}', '{"name":"Wired Up Electric"}'),
  ('550e8400-e29b-41d4-a716-446655440003', 'hvac@demo.com', crypt('Demo@123456', gen_salt('bf')), now(), now(), now(), '{"provider":"email","providers":["email"]}', '{"name":"Arctic Breeze HVAC"}'),
  ('550e8400-e29b-41d4-a716-446655440004', 'painter@demo.com', crypt('Demo@123456', gen_salt('bf')), now(), now(), now(), '{"provider":"email","providers":["email"]}', '{"name":"Fresh Coat Painters"}'),
  ('550e8400-e29b-41d4-a716-446655440005', 'cleaner@demo.com', crypt('Demo@123456', gen_salt('bf')), now(), now(), now(), '{"provider":"email","providers":["email"]}', '{"name":"Sparkle Clean Co"}'),
  ('550e8400-e29b-41d4-a716-446655440006', 'landscaper@demo.com', crypt('Demo@123456', gen_salt('bf')), now(), now(), now(), '{"provider":"email","providers":["email"]}', '{"name":"GreenScape Landscaping"}'),
  ('550e8400-e29b-41d4-a716-446655440007', 'pest@demo.com', crypt('Demo@123456', gen_salt('bf')), now(), now(), now(), '{"provider":"email","providers":["email"]}', '{"name":"Bug Busters Pest Control"}'),
  ('550e8400-e29b-41d4-a716-446655440008', 'mover@demo.com', crypt('Demo@123456', gen_salt('bf')), now(), now(), now(), '{"provider":"email","providers":["email"]}', '{"name":"Smooth Move Movers"}'),
  ('550e8400-e29b-41d4-a716-446655440009', 'hvac2@demo.com', crypt('Demo@123456', gen_salt('bf')), now(), now(), now(), '{"provider":"email","providers":["email"]}', '{"name":"Comfort Zone HVAC"}'),
  ('550e8400-e29b-41d4-a716-446655440010', 'drain@demo.com', crypt('Demo@123456', gen_salt('bf')), now(), now(), now(), '{"provider":"email","providers":["email"]}', '{"name":"ClearFlow Drains"}')
on conflict (id) do nothing;

-- ============================================================
-- 1. service_categories
-- ============================================================
create table public.service_categories (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  slug        text not null unique,
  description text,
  icon_name   text not null,
  created_at  timestamptz not null default now()
);

-- ============================================================
-- 2. services
-- ============================================================
create table public.services (
  id          uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.service_categories(id) on delete cascade,
  name        text not null,
  slug        text not null unique,
  description text,
  created_at  timestamptz not null default now()
);

create index idx_services_category_id on public.services(category_id);

-- ============================================================
-- 3. service_providers
-- ============================================================
create table public.service_providers (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users(id) on delete cascade,
  business_name text not null,
  description   text,
  phone         text,
  email         text,
  address       text,
  city          text not null,
  rating        numeric(3,2) not null default 0 check (rating >= 0 and rating <= 5),
  total_reviews integer not null default 0 check (total_reviews >= 0),
  avatar_url    text,
  created_at    timestamptz not null default now(),

  unique(user_id)
);

create index idx_service_providers_user_id  on public.service_providers(user_id);
create index idx_service_providers_city     on public.service_providers(city);
create index idx_service_providers_rating   on public.service_providers(rating desc);

-- ============================================================
-- 4. provider_services (junction table)
-- ============================================================
create table public.provider_services (
  provider_id uuid not null references public.service_providers(id) on delete cascade,
  service_id  uuid not null references public.services(id) on delete cascade,
  base_price  numeric(10,2),

  primary key (provider_id, service_id)
);

create index idx_provider_services_service_id on public.provider_services(service_id);

-- ============================================================
-- 5. Row Level Security (RLS)
-- ============================================================

-- service_categories
alter table public.service_categories enable row level security;
create policy "Public can view categories" on public.service_categories
  for select using (true);

-- services
alter table public.services enable row level security;
create policy "Public can view services" on public.services
  for select using (true);

-- service_providers
alter table public.service_providers enable row level security;
create policy "Public can view providers" on public.service_providers
  for select using (true);
create policy "Users can insert their own provider" on public.service_providers
  for insert with check (auth.uid() = user_id);
create policy "Users can update their own provider" on public.service_providers
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- provider_services
alter table public.provider_services enable row level security;
create policy "Public can view provider services" on public.provider_services
  for select using (true);
create policy "Providers can insert own services" on public.provider_services
  for insert with check (
    exists (
      select 1 from public.service_providers
      where id = provider_id and user_id = auth.uid()
    )
  );
create policy "Providers can delete own services" on public.provider_services
  for delete using (
    exists (
      select 1 from public.service_providers
      where id = provider_id and user_id = auth.uid()
    )
  );

-- ============================================================
-- 6. Seed Data
-- ============================================================

-- ── service_categories (8) ──────────────────────────────────
insert into public.service_categories (name, slug, description, icon_name) values
('Plumbing',        'plumbing',        'Pipe repairs, installations, and water systems',            'FiDroplet'),
('Electrical',      'electrical',      'Wiring, lighting, and electrical repairs',                  'FiZap'),
('HVAC',            'hvac',            'Heating, ventilation, and air conditioning services',        'FiThermometer'),
('Painting',        'painting',        'Interior and exterior painting services',                    'FiPenTool'),
('Cleaning',        'cleaning',        'Home and office cleaning services',                          'FiSun'),
('Landscaping',     'landscaping',     'Garden design, lawn care, and outdoor maintenance',          'FiCloud'),
('Pest Control',    'pest-control',    'Insect and rodent removal services',                         'FiAlertTriangle'),
('Moving',          'moving',          'Packing, loading, and transportation services',              'FiTruck')
on conflict (slug) do nothing;

-- ── services (15) ──────────────────────────────────────────
insert into public.services (category_id, name, slug, description) values
((select id from public.service_categories where slug = 'plumbing'),     'Pipe Repair',         'pipe-repair',         'Fixing leaks, burst pipes, and pipe replacements'),
((select id from public.service_categories where slug = 'plumbing'),     'Drain Cleaning',      'drain-cleaning',      'Unclogging sinks, tubs, and sewer lines'),
((select id from public.service_categories where slug = 'electrical'),   'Wiring',              'wiring',              'New wiring, rewiring, and panel upgrades'),
((select id from public.service_categories where slug = 'electrical'),   'Lighting Installation','lighting-installation','Indoor and outdoor light fixture installation'),
((select id from public.service_categories where slug = 'hvac'),         'AC Repair',           'ac-repair',           'Diagnosis and repair of air conditioning units'),
((select id from public.service_categories where slug = 'hvac'),         'Furnace Service',     'furnace-service',     'Furnace inspection, cleaning, and repair'),
((select id from public.service_categories where slug = 'painting'),     'Interior Painting',   'interior-painting',   'Wall, ceiling, and trim painting'),
((select id from public.service_categories where slug = 'painting'),     'Exterior Painting',   'exterior-painting',   'House exterior, fence, and deck painting'),
((select id from public.service_categories where slug = 'cleaning'),     'House Cleaning',      'house-cleaning',      'Regular and deep cleaning for homes'),
((select id from public.service_categories where slug = 'cleaning'),     'Office Cleaning',     'office-cleaning',     'Commercial and office space cleaning'),
((select id from public.service_categories where slug = 'landscaping'),  'Lawn Mowing',         'lawn-mowing',         'Regular lawn mowing and edging'),
((select id from public.service_categories where slug = 'landscaping'),  'Tree Trimming',       'tree-trimming',       'Pruning, trimming, and tree removal'),
((select id from public.service_categories where slug = 'pest-control'), 'Insect Control',      'insect-control',      'Ant, roach, and insect extermination'),
((select id from public.service_categories where slug = 'pest-control'), 'Rodent Removal',      'rodent-removal',      'Rat and mouse trapping and exclusion'),
((select id from public.service_categories where slug = 'moving'),       'Local Moving',        'local-moving',        'Packing, loading, and local transport')
on conflict (slug) do nothing;

-- ── service_providers (10) ──────────────────────────────────
insert into public.service_providers (user_id, business_name, description, phone, email, address, city, rating, total_reviews) values
('550e8400-e29b-41d4-a716-446655440001', 'Flow Masters Plumbing',     'Licensed plumbers — available 24/7 for emergencies.',        '555-0101', 'hello@flowmasters.com',    '123 Main St',    'Austin',   4.8, 142),
('550e8400-e29b-41d4-a716-446655440002', 'Wired Up Electric',        'Residential and commercial electrical services since 2005.',  '555-0102', 'info@wiredupelectric.com',  '456 Oak Ave',    'Austin',   4.6, 89),
('550e8400-e29b-41d4-a716-446655440003', 'Arctic Breeze HVAC',       'Keeping your home comfortable all year round.',               '555-0103', 'contact@arcticbreeze.com',  '789 Pine Rd',    'Austin',   4.9, 210),
('550e8400-e29b-41d4-a716-446655440004', 'Fresh Coat Painters',      'Transform your space with quality painting.',                  '555-0104', 'jobs@freshcoat.com',        '321 Elm St',     'Dallas',   4.5, 67),
('550e8400-e29b-41d4-a716-446655440005', 'Sparkle Clean Co',         'Eco-friendly cleaning for homes and offices.',                 '555-0105', 'hello@sparkleclean.com',    '654 Maple Dr',   'Dallas',   4.7, 98),
('550e8400-e29b-41d4-a716-446655440006', 'GreenScape Landscaping',   'Design, build, and maintain your dream garden.',               '555-0106', 'info@greenscape.com',       '987 Cedar Ln',   'Houston',  4.4, 55),
('550e8400-e29b-41d4-a716-446655440007', 'Bug Busters Pest Control', 'Safe and effective pest solutions for families.',              '555-0107', 'help@bugbusters.com',       '159 Birch Ct',   'Houston',  4.3, 41),
('550e8400-e29b-41d4-a716-446655440008', 'Smooth Move Movers',       'Stress-free local moving with a personal touch.',              '555-0108', 'book@smoothmove.com',       '753 Walnut Ave', 'San Antonio', 4.6, 123),
('550e8400-e29b-41d4-a716-446655440009', 'Comfort Zone HVAC',        'Fast, reliable heating and cooling repair.',                   '555-0109', 'service@comfortzone.com',   '246 Spruce St',  'San Antonio', 4.2, 33),
('550e8400-e29b-41d4-a716-446655440010', 'ClearFlow Drains',         'Drain and sewer specialists — no job too tough.',              '555-0110', 'team@clearflow.com',        '135 Aspen Way',  'Austin',     4.8, 76)
on conflict (user_id) do nothing;

-- ── provider_services (junction) ────────────────────────────
insert into public.provider_services (provider_id, service_id, base_price) values
((select id from public.service_providers where user_id = '550e8400-e29b-41d4-a716-446655440001'), (select id from public.services where slug = 'pipe-repair'),    125.00),
((select id from public.service_providers where user_id = '550e8400-e29b-41d4-a716-446655440001'), (select id from public.services where slug = 'drain-cleaning'),  95.00),
((select id from public.service_providers where user_id = '550e8400-e29b-41d4-a716-446655440002'), (select id from public.services where slug = 'wiring'),             150.00),
((select id from public.service_providers where user_id = '550e8400-e29b-41d4-a716-446655440002'), (select id from public.services where slug = 'lighting-installation'), 85.00),
((select id from public.service_providers where user_id = '550e8400-e29b-41d4-a716-446655440003'), (select id from public.services where slug = 'ac-repair'),          140.00),
((select id from public.service_providers where user_id = '550e8400-e29b-41d4-a716-446655440003'), (select id from public.services where slug = 'furnace-service'),    110.00),
((select id from public.service_providers where user_id = '550e8400-e29b-41d4-a716-446655440004'), (select id from public.services where slug = 'interior-painting'),  200.00),
((select id from public.service_providers where user_id = '550e8400-e29b-41d4-a716-446655440004'), (select id from public.services where slug = 'exterior-painting'),  350.00),
((select id from public.service_providers where user_id = '550e8400-e29b-41d4-a716-446655440005'), (select id from public.services where slug = 'house-cleaning'),     120.00),
((select id from public.service_providers where user_id = '550e8400-e29b-41d4-a716-446655440005'), (select id from public.services where slug = 'office-cleaning'),    150.00),
((select id from public.service_providers where user_id = '550e8400-e29b-41d4-a716-446655440006'), (select id from public.services where slug = 'lawn-mowing'),        45.00),
((select id from public.service_providers where user_id = '550e8400-e29b-41d4-a716-446655440006'), (select id from public.services where slug = 'tree-trimming'),      180.00),
((select id from public.service_providers where user_id = '550e8400-e29b-41d4-a716-446655440007'), (select id from public.services where slug = 'insect-control'),     99.00),
((select id from public.service_providers where user_id = '550e8400-e29b-41d4-a716-446655440007'), (select id from public.services where slug = 'rodent-removal'),     175.00),
((select id from public.service_providers where user_id = '550e8400-e29b-41d4-a716-446655440008'), (select id from public.services where slug = 'local-moving'),       300.00),
((select id from public.service_providers where user_id = '550e8400-e29b-41d4-a716-446655440009'), (select id from public.services where slug = 'ac-repair'),          130.00),
((select id from public.service_providers where user_id = '550e8400-e29b-41d4-a716-446655440009'), (select id from public.services where slug = 'furnace-service'),    105.00),
((select id from public.service_providers where user_id = '550e8400-e29b-41d4-a716-446655440010'), (select id from public.services where slug = 'drain-cleaning'),     100.00)
on conflict do nothing;