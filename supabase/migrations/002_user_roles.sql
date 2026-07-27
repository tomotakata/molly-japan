-- =============================================
-- USER_ROLES テーブル
-- =============================================
CREATE TABLE IF NOT EXISTS user_roles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'viewer' CHECK (role IN ('owner', 'admin', 'editor', 'viewer')),
  display_name TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id)
);

-- RLS有効化
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- 認証ユーザーは自分のロールを読める
CREATE POLICY "user_roles_self_read" ON user_roles
  FOR SELECT USING (auth.uid() = user_id);

-- owner/adminは全ロールを読める
CREATE POLICY "user_roles_admin_read" ON user_roles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM user_roles ur
      WHERE ur.user_id = auth.uid()
      AND ur.role IN ('owner', 'admin')
    )
  );

-- ownerは全操作可能
CREATE POLICY "user_roles_owner_all" ON user_roles
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_roles ur
      WHERE ur.user_id = auth.uid()
      AND ur.role = 'owner'
    )
  );

-- adminはowner以外のINSERT/UPDATE/DELETE可能
CREATE POLICY "user_roles_admin_manage" ON user_roles
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM user_roles ur
      WHERE ur.user_id = auth.uid()
      AND ur.role = 'admin'
    )
    AND role != 'owner'
  );

-- updated_atトリガー
CREATE TRIGGER user_roles_updated_at
  BEFORE UPDATE ON user_roles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- 初期オーナー設定（otomo.palco.me@gmail.comをownerに）
INSERT INTO user_roles (user_id, email, role, display_name)
SELECT id, email, 'owner', 'オーナー'
FROM auth.users
WHERE email = 'otomo.palco.me@gmail.com'
ON CONFLICT (user_id) DO UPDATE SET role = 'owner';
