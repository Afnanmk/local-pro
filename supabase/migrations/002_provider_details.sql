-- ============================================================
-- Add provider detail fields for the /providers/[id] page
-- ============================================================

alter table public.service_providers
  add column if not exists website_url text,
  add column if not exists business_hours text,
  add column if not exists emergency_service text,
  add column if not exists service_area text;

-- Update demo providers with new fields
update public.service_providers set
  website_url     = 'www.flowmasters.com',
  business_hours  = 'Monday - Friday: 7:00 AM - 8:00 PM' || E'\n' || 'Saturday: 8:00 AM - 6:00 PM' || E'\n' || 'Sunday: 9:00 AM - 5:00 PM',
  emergency_service = '24/7 Emergency Service Available',
  service_area    = 'Serving all of Austin & surrounding areas'
where user_id = '550e8400-e29b-41d4-a716-446655440001';

update public.service_providers set
  website_url     = 'www.wiredupelectric.com',
  business_hours  = 'Monday - Friday: 6:00 AM - 7:00 PM' || E'\n' || 'Saturday: 7:00 AM - 5:00 PM',
  emergency_service = '24/7 Emergency Electrical Services',
  service_area    = 'Austin, Round Rock & Cedar Park'
where user_id = '550e8400-e29b-41d4-a716-446655440002';

update public.service_providers set
  website_url     = 'www.arcticbreeze.com',
  business_hours  = 'Monday - Friday: 7:00 AM - 6:00 PM' || E'\n' || 'Saturday: 8:00 AM - 4:00 PM' || E'\n' || 'Sunday: Closed',
  emergency_service = '24/7 HVAC Emergency Service',
  service_area    = 'Austin metropolitan area'
where user_id = '550e8400-e29b-41d4-a716-446655440003';

update public.service_providers set
  website_url     = 'www.freshcoat.com',
  business_hours  = 'Monday - Friday: 7:00 AM - 5:00 PM' || E'\n' || 'Saturday: 8:00 AM - 4:00 PM',
  service_area    = 'Dallas & Fort Worth area'
where user_id = '550e8400-e29b-41d4-a716-446655440004';

update public.service_providers set
  website_url     = 'www.sparkleclean.com',
  business_hours  = 'Monday - Friday: 8:00 AM - 6:00 PM' || E'\n' || 'Saturday: 9:00 AM - 5:00 PM' || E'\n' || 'Sunday: 10:00 AM - 4:00 PM',
  emergency_service = 'Same-day emergency cleaning available',
  service_area    = 'Dallas, Plano & Richardson'
where user_id = '550e8400-e29b-41d4-a716-446655440005';

update public.service_providers set
  website_url     = 'www.greenscape.com',
  business_hours  = 'Monday - Friday: 6:00 AM - 5:00 PM' || E'\n' || 'Saturday: 7:00 AM - 3:00 PM',
  service_area    = 'Houston & surrounding suburbs'
where user_id = '550e8400-e29b-41d4-a716-446655440006';

update public.service_providers set
  website_url     = 'www.bugbusters.com',
  business_hours  = 'Monday - Friday: 7:00 AM - 6:00 PM' || E'\n' || 'Saturday: 8:00 AM - 4:00 PM',
  emergency_service = 'Same-day pest emergencies',
  service_area    = 'Houston, Sugar Land & The Woodlands'
where user_id = '550e8400-e29b-41d4-a716-446655440007';

update public.service_providers set
  website_url     = 'www.smoothmove.com',
  business_hours  = 'Monday - Friday: 7:00 AM - 7:00 PM' || E'\n' || 'Saturday: 8:00 AM - 6:00 PM' || E'\n' || 'Sunday: 9:00 AM - 5:00 PM',
  service_area    = 'San Antonio & surrounding areas'
where user_id = '550e8400-e29b-41d4-a716-446655440008';

update public.service_providers set
  website_url     = 'www.comfortzone.com',
  business_hours  = 'Monday - Friday: 8:00 AM - 6:00 PM' || E'\n' || 'Saturday: 9:00 AM - 3:00 PM',
  emergency_service = '24/7 emergency HVAC repair',
  service_area    = 'San Antonio & New Braunfels'
where user_id = '550e8400-e29b-41d4-a716-446655440009';

update public.service_providers set
  website_url     = 'www.clearflow.com',
  business_hours  = 'Monday - Friday: 6:00 AM - 8:00 PM' || E'\n' || 'Saturday: 7:00 AM - 6:00 PM' || E'\n' || 'Sunday: 8:00 AM - 4:00 PM',
  emergency_service = '24/7 emergency drain services',
  service_area    = 'Austin & Travis County'
where user_id = '550e8400-e29b-41d4-a716-446655440010';
