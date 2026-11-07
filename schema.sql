-- SOLELAB production inventory foundation (no personal information)
CREATE TABLE IF NOT EXISTS products (
 id TEXT PRIMARY KEY,
 title TEXT NOT NULL,
 brand TEXT NOT NULL,
 category TEXT NOT NULL CHECK(category IN ('Football','Rugby','Running','Sneakers','Other')),
 uk_size TEXT NOT NULL,
 colour TEXT NOT NULL,
 condition_grade TEXT NOT NULL CHECK(condition_grade IN ('Good','Very good','Excellent')),
 condition_notes TEXT NOT NULL,
 price_cents INTEGER NOT NULL CHECK(price_cents > 0),
 image_url TEXT,
 status TEXT NOT NULL DEFAULT 'draft' CHECK(status IN ('draft','published','sold','withdrawn')),
 created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
 updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_products_public ON products(status, category, created_at);
