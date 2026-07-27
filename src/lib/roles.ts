import { createClient } from "@/lib/supabase/server";

export type UserRole = "owner" | "admin" | "editor" | "viewer";

export type UserWithRole = {
  id: string;
  email: string;
  role: UserRole;
  display_name: string | null;
};

/**
 * 現在ログイン中のユーザーのロールを取得
 */
export async function getUserRole(): Promise<UserWithRole | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data } = await supabase
    .from("user_roles")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (!data) return null;

  return {
    id: user.id,
    email: user.email!,
    role: data.role as UserRole,
    display_name: data.display_name,
  };
}

/**
 * 指定ロール以上の権限があるかチェック
 * owner > admin > editor > viewer
 */
export function hasPermission(
  userRole: UserRole,
  requiredRole: UserRole
): boolean {
  const hierarchy: Record<UserRole, number> = {
    owner: 4,
    admin: 3,
    editor: 2,
    viewer: 1,
  };
  return hierarchy[userRole] >= hierarchy[requiredRole];
}

/**
 * ロールの日本語表示名
 */
export function roleLabel(role: UserRole): string {
  const labels: Record<UserRole, string> = {
    owner: "オーナー",
    admin: "管理者",
    editor: "編集者",
    viewer: "閲覧者",
  };
  return labels[role];
}

/**
 * ロールのバッジカラー
 */
export function roleBadgeClass(role: UserRole): string {
  const classes: Record<UserRole, string> = {
    owner: "bg-amber-100 text-amber-800",
    admin: "bg-blue-100 text-blue-800",
    editor: "bg-green-100 text-green-700",
    viewer: "bg-gray-100 text-gray-500",
  };
  return classes[role];
}
