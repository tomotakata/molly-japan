-- =============================================
-- NEWS テーブル
-- =============================================
CREATE TABLE IF NOT EXISTS news (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- RLS有効化
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

-- 公開記事は誰でも読める
CREATE POLICY "news_public_read" ON news
  FOR SELECT USING (published = true);

-- 認証ユーザーは全操作可能
CREATE POLICY "news_auth_all" ON news
  FOR ALL USING (auth.role() = 'authenticated');

-- =============================================
-- CONTACTS テーブル
-- =============================================
CREATE TABLE IF NOT EXISTS contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  company TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  category TEXT,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS有効化
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- 誰でもINSERT可能（お問い合わせフォーム用）
CREATE POLICY "contacts_public_insert" ON contacts
  FOR INSERT WITH CHECK (true);

-- 認証ユーザーは全操作可能
CREATE POLICY "contacts_auth_all" ON contacts
  FOR ALL USING (auth.role() = 'authenticated');

-- updated_at自動更新トリガー
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER news_updated_at
  BEFORE UPDATE ON news
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
