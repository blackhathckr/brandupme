-- Test fixtures for the permission layer.
--
-- Two businesses in the same category and emirate, differing only by plan:
--
--   Al Noor Cleaning     Free Listing        contact_visible = false
--   Falcon Facilities    Growth Partner      contact_visible = true
--
-- Both store identical, complete contact details. If the masking works, the
-- rendered page for Al Noor must not contain its phone number anywhere - not
-- hidden, not in a data attribute, not in the payload.

INSERT INTO users (email, name, phone, kind, status, password_hash, created_at, updated_at)
VALUES ('owner@alnoor.test', 'Aisha Rahman', '+971501112233', 'business', 'active', NULL, now(), now()),
       ('owner@falcon.test', 'Omar Haddad', '+971504445566', 'business', 'active', NULL, now(), now()) ON CONFLICT DO NOTHING;

INSERT INTO businesses
  (country_id, owner_id, name, slug, tagline, description, status, verified, created_at, updated_at)
VALUES
  ((SELECT id FROM countries WHERE code='ae'),
   (SELECT id FROM users WHERE email='owner@alnoor.test'),
   'Al Noor Cleaning LLC', 'al-noor-cleaning-llc',
   'Deep cleaning and facility management across Dubai.',
   'Al Noor Cleaning LLC provides residential and commercial cleaning across Dubai, with trained staff and flexible contracts.',
   'published', false, now(), now()),
  ((SELECT id FROM countries WHERE code='ae'),
   (SELECT id FROM users WHERE email='owner@falcon.test'),
   'Falcon Facilities Services', 'falcon-facilities-services',
   'Full-service facility management for offices and retail.',
   'Falcon Facilities Services delivers cleaning, maintenance and manpower solutions to businesses across the UAE.',
   'published', true, now(), now()) ON CONFLICT DO NOTHING;

-- Identical contact details on both, stored complete.
INSERT INTO business_contacts
  (business_id, phone, whatsapp, email, website, address, area, created_at, updated_at)
VALUES
  ((SELECT id FROM businesses WHERE slug='al-noor-cleaning-llc'),
   '+971501112233', '+971501112233', 'info@alnoor.test', 'https://alnoor.test',
   'Warehouse 12, Al Quoz Industrial 3, Dubai', 'Al Quoz', now(), now()),
  ((SELECT id FROM businesses WHERE slug='falcon-facilities-services'),
   '+971504445566', '+971504445566', 'info@falcon.test', 'https://falcon.test',
   'Office 804, Business Bay, Dubai', 'Business Bay', now(), now()) ON CONFLICT DO NOTHING;

INSERT INTO business_categories (business_id, category_id, is_primary)
VALUES
  ((SELECT id FROM businesses WHERE slug='al-noor-cleaning-llc'),
   (SELECT id FROM categories WHERE slug='cleaning-companies'), true),
  ((SELECT id FROM businesses WHERE slug='falcon-facilities-services'),
   (SELECT id FROM categories WHERE slug='cleaning-companies'), true) ON CONFLICT DO NOTHING;

INSERT INTO business_locations (business_id, location_id, is_primary)
VALUES
  ((SELECT id FROM businesses WHERE slug='al-noor-cleaning-llc'),
   (SELECT id FROM locations WHERE slug='dubai'), true),
  ((SELECT id FROM businesses WHERE slug='falcon-facilities-services'),
   (SELECT id FROM locations WHERE slug='dubai'), true) ON CONFLICT DO NOTHING;

INSERT INTO business_passports
  (business_id, passport_number, slug, issued_at, status, created_at, updated_at)
VALUES
  ((SELECT id FROM businesses WHERE slug='al-noor-cleaning-llc'),
   'BUM-AE-000001', 'al-noor-cleaning-llc-t1', now(), 'active', now(), now()),
  ((SELECT id FROM businesses WHERE slug='falcon-facilities-services'),
   'BUM-AE-000002', 'falcon-facilities-services-t2', now(), 'active', now(), now()) ON CONFLICT DO NOTHING;

-- The only difference between them.
INSERT INTO business_subscriptions
  (business_id, plan_id, starts_at, expires_at, status, auto_renew, created_at, updated_at)
VALUES
  ((SELECT id FROM businesses WHERE slug='al-noor-cleaning-llc'),
   (SELECT id FROM plans WHERE slug='free'),
   now(), NULL, 'active', false, now(), now()),
  ((SELECT id FROM businesses WHERE slug='falcon-facilities-services'),
   (SELECT id FROM plans WHERE slug='growth-partner'),
   now(), now() + interval '30 days', 'active', false, now(), now()) ON CONFLICT DO NOTHING;

-- A lead against the free-plan business, so the locked inbox can be checked.
INSERT INTO leads
  (reference, business_id, category_id, location_id, customer_name, customer_phone,
   customer_email, message, status, source, created_at, updated_at)
VALUES
  ('LEAD-AE-TEST01',
   (SELECT id FROM businesses WHERE slug='al-noor-cleaning-llc'),
   (SELECT id FROM categories WHERE slug='cleaning-companies'),
   (SELECT id FROM locations WHERE slug='dubai'),
   'Fatima Al Suwaidi', '+971509998877', 'fatima@customer.test',
   'Need weekly office cleaning for a 2000 sqft office in Business Bay.',
   'new', 'profile', now(), now()) ON CONFLICT DO NOTHING;

INSERT INTO lead_recipients (lead_id, business_id, routing, created_at, updated_at)
VALUES ((SELECT id FROM leads WHERE reference='LEAD-AE-TEST01'),
        (SELECT id FROM businesses WHERE slug='al-noor-cleaning-llc'),
        'primary', now(), now()) ON CONFLICT DO NOTHING;

UPDATE categories
SET listing_count = 2
WHERE slug = 'cleaning-companies';
