CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL CHECK (price > 0),
  stock INTEGER NOT NULL CHECK (stock >= 0),
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT products_name_unique UNIQUE (name),
  CONSTRAINT products_name_check CHECK (
    char_length(name) > 0 AND name = TRIM(name)
  )
);