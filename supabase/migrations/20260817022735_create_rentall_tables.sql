/*
# Create RentAll core tables

## Overview
Creates the five core tables for the RentAll rental marketplace: users, items,
bookings, messages, and reviews. Enables Row Level Security on every table with
policies that allow public browsing of items and owner profiles, while restricting
all writes to authenticated users who own the data.

## New Tables

### users
- `id` (uuid, PK, default gen_random_uuid()) — user profile identifier
- `name` (text) — full name
- `email` (text, unique) — email address
- `phone` (text) — phone number
- `avatar_url` (text) — profile picture URL
- `is_verified` (boolean, default false) — verification badge
- `created_at` (timestamptz, default now())

### items
- `id` (uuid, PK, default gen_random_uuid())
- `owner_id` (uuid, FK → users) — who owns the item
- `name` (text, not null) — item name
- `category` (text) — e.g. Tools, Kamera, Elektronik
- `price_per_day` (integer, not null) — price in Rupiah
- `description` (text)
- `condition` (text) — e.g. Baik, Sangat Baik
- `images` (text[]) — array of image URLs
- `is_active` (boolean, default true) — listing active or not
- `location_lat` (float) — latitude
- `location_lng` (float) — longitude
- `created_at` (timestamptz, default now())

### bookings
- `id` (uuid, PK, default gen_random_uuid())
- `item_id` (uuid, FK → items) — rented item
- `renter_id` (uuid, FK → users) — who is renting
- `owner_id` (uuid, FK → users) — who owns the item
- `start_date` (date)
- `end_date` (date)
- `total_price` (integer) — total in Rupiah
- `service_fee` (integer) — 10% service fee
- `status` (text, default 'requested') — requested|confirmed|ongoing|returned|cancelled
- `created_at` (timestamptz, default now())

### messages
- `id` (uuid, PK, default gen_random_uuid())
- `sender_id` (uuid, FK → users)
- `receiver_id` (uuid, FK → users)
- `item_id` (uuid, FK → items, nullable) — optional item context
- `content` (text)
- `created_at` (timestamptz, default now())

### reviews
- `id` (uuid, PK, default gen_random_uuid())
- `booking_id` (uuid, FK → bookings)
- `reviewer_id` (uuid, FK → users) — who wrote the review
- `reviewed_id` (uuid, FK → users) — who is being reviewed
- `rating` (integer) — 1 to 5
- `comment` (text)
- `created_at` (timestamptz, default now())

## Security (RLS)

### Public reads (anon + authenticated)
- `users` SELECT — anyone can view owner profiles (needed for item detail page)
- `items` SELECT — anyone can browse items on the discover page (guest mode supported)

### Authenticated writes with ownership
- `users` UPDATE — users can update their own profile only
- `items` INSERT/UPDATE/DELETE — owner_id must match auth.uid()
- `bookings` SELECT — renter_id or owner_id must match auth.uid()
- `bookings` INSERT — renter_id must match auth.uid()
- `bookings` UPDATE — owner_id must match auth.uid() (owner confirms/rejects)
- `messages` SELECT — sender_id or receiver_id must match auth.uid()
- `messages` INSERT — sender_id must match auth.uid()
- `reviews` SELECT — anyone authenticated can read reviews
- `reviews` INSERT — reviewer_id must match auth.uid()

## Notes
1. Items are publicly browsable (anon + authenticated) to support the "Explore as
   guest" flow on the login page.
2. Owner profiles are publicly readable so the item detail page can show owner info.
3. All write operations require authentication and ownership verification via auth.uid().
4. Foreign keys use ON DELETE CASCADE for data integrity — deleting a user removes their
   items, bookings, messages, and reviews.
*/

-- ============================================================
-- USERS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text,
  email text UNIQUE,
  phone text,
  avatar_url text,
  is_verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_users" ON users;
CREATE POLICY "public_read_users"
  ON users FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "update_own_profile" ON users;
CREATE POLICY "update_own_profile"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- ============================================================
-- ITEMS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid REFERENCES users(id) ON DELETE CASCADE,
  name text NOT NULL,
  category text,
  price_per_day integer NOT NULL,
  description text,
  condition text,
  images text[],
  is_active boolean DEFAULT true,
  location_lat float,
  location_lng float,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_items" ON items;
CREATE POLICY "public_read_items"
  ON items FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "insert_own_items" ON items;
CREATE POLICY "insert_own_items"
  ON items FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = owner_id);

DROP POLICY IF EXISTS "update_own_items" ON items;
CREATE POLICY "update_own_items"
  ON items FOR UPDATE
  TO authenticated
  USING (auth.uid() = owner_id)
  WITH CHECK (auth.uid() = owner_id);

DROP POLICY IF EXISTS "delete_own_items" ON items;
CREATE POLICY "delete_own_items"
  ON items FOR DELETE
  TO authenticated
  USING (auth.uid() = owner_id);

-- ============================================================
-- BOOKINGS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  item_id uuid REFERENCES items(id) ON DELETE CASCADE,
  renter_id uuid REFERENCES users(id) ON DELETE CASCADE,
  owner_id uuid REFERENCES users(id) ON DELETE CASCADE,
  start_date date,
  end_date date,
  total_price integer,
  service_fee integer,
  status text DEFAULT 'requested',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_bookings" ON bookings;
CREATE POLICY "select_own_bookings"
  ON bookings FOR SELECT
  TO authenticated
  USING (auth.uid() = renter_id OR auth.uid() = owner_id);

DROP POLICY IF EXISTS "insert_own_bookings" ON bookings;
CREATE POLICY "insert_own_bookings"
  ON bookings FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = renter_id);

DROP POLICY IF EXISTS "update_own_bookings" ON bookings;
CREATE POLICY "update_own_bookings"
  ON bookings FOR UPDATE
  TO authenticated
  USING (auth.uid() = owner_id OR auth.uid() = renter_id)
  WITH CHECK (auth.uid() = owner_id OR auth.uid() = renter_id);

-- ============================================================
-- MESSAGES TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id uuid REFERENCES users(id) ON DELETE CASCADE,
  receiver_id uuid REFERENCES users(id) ON DELETE CASCADE,
  item_id uuid REFERENCES items(id) ON DELETE CASCADE,
  content text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_messages" ON messages;
CREATE POLICY "select_own_messages"
  ON messages FOR SELECT
  TO authenticated
  USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

DROP POLICY IF EXISTS "insert_own_messages" ON messages;
CREATE POLICY "insert_own_messages"
  ON messages FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = sender_id);

-- ============================================================
-- REVIEWS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid REFERENCES bookings(id) ON DELETE CASCADE,
  reviewer_id uuid REFERENCES users(id) ON DELETE CASCADE,
  reviewed_id uuid REFERENCES users(id) ON DELETE CASCADE,
  rating integer,
  comment text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "read_reviews" ON reviews;
CREATE POLICY "read_reviews"
  ON reviews FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "insert_own_reviews" ON reviews;
CREATE POLICY "insert_own_reviews"
  ON reviews FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = reviewer_id);

-- ============================================================
-- INDEXES
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_items_owner_id ON items(owner_id);
CREATE INDEX IF NOT EXISTS idx_items_category ON items(category);
CREATE INDEX IF NOT EXISTS idx_items_is_active ON items(is_active);
CREATE INDEX IF NOT EXISTS idx_bookings_renter_id ON bookings(renter_id);
CREATE INDEX IF NOT EXISTS idx_bookings_owner_id ON bookings(owner_id);
CREATE INDEX IF NOT EXISTS idx_bookings_item_id ON bookings(item_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender_id ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_receiver_id ON messages(receiver_id);
CREATE INDEX IF NOT EXISTS idx_reviews_booking_id ON reviews(booking_id);
CREATE INDEX IF NOT EXISTS idx_reviews_reviewed_id ON reviews(reviewed_id);
