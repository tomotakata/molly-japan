import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import AdminShell from "../AdminShell";
import { getUserRole, hasPermission, roleLabel, roleBadgeClass } from "@/lib/roles";
import type { UserRole } from "@/lib/roles";
import UserActions from "./UserActions";
import InviteForm from "./InviteForm";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const currentUser = await getUserRole();
  if (!currentUser || !hasPermission(currentUser.role, "admin")) {
    redirect("/admin");
  }

  const { data: users } = await supabase
    .from("user_roles")
    .select("*")
    .order("created_at", { ascending: true });

  return (
    <AdminShell user={user}>
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">ユーザー管理</h1>
            <p className="text-sm text-gray-500 mt-1">
              管理画面にアクセスできるユーザーを管理します
            </p>
          </div>
        </div>

        {/* 招待フォーム */}
        <InviteForm currentRole={currentUser.role} />

        {/* ロール説明 */}
        <div className="bg-white rounded-lg shadow p-5 mb-6">
          <h2 className="text-sm font-medium text-gray-700 mb-3">役職の権限</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div className="bg-amber-50 rounded p-3">
              <div className="font-medium text-amber-800 mb-1">オーナー</div>
              <div className="text-amber-700/70">全機能 + ユーザー管理</div>
            </div>
            <div className="bg-blue-50 rounded p-3">
              <div className="font-medium text-blue-800 mb-1">管理者</div>
              <div className="text-blue-700/70">全機能 + ユーザー管理（オーナー以外）</div>
            </div>
            <div className="bg-green-50 rounded p-3">
              <div className="font-medium text-green-700 mb-1">編集者</div>
              <div className="text-green-600/70">NEWS作成・編集のみ</div>
            </div>
            <div className="bg-gray-50 rounded p-3">
              <div className="font-medium text-gray-600 mb-1">閲覧者</div>
              <div className="text-gray-500">閲覧のみ</div>
            </div>
          </div>
        </div>

        {/* ユーザー一覧 */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600">
                  ユーザー
                </th>
                <th className="text-left px-4 py-3 font-medium text-gray-600 w-28">
                  役職
                </th>
                <th className="text-left px-4 py-3 font-medium text-gray-600 w-36 hidden md:table-cell">
                  追加日
                </th>
                <th className="w-32"></th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {users?.map((u) => {
                const role = u.role as UserRole;
                const isCurrentUser = u.user_id === user.id;
                const canManage =
                  currentUser.role === "owner" ||
                  (currentUser.role === "admin" && role !== "owner");

                return (
                  <tr key={u.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div>
                        <div className="font-medium">
                          {u.display_name || u.email}
                          {isCurrentUser && (
                            <span className="ml-2 text-xs text-gray-400">
                              (自分)
                            </span>
                          )}
                        </div>
                        {u.display_name && (
                          <div className="text-xs text-gray-400">{u.email}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${roleBadgeClass(role)}`}
                      >
                        {roleLabel(role)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500 hidden md:table-cell">
                      {new Date(u.created_at).toLocaleDateString("ja-JP")}
                    </td>
                    <td className="px-4 py-3">
                      {canManage && !isCurrentUser && (
                        <UserActions
                          userId={u.user_id}
                          userRoleId={u.id}
                          currentRole={role}
                          currentUserRole={currentUser.role}
                          email={u.email}
                        />
                      )}
                    </td>
                  </tr>
                );
              })}
              {(!users || users.length === 0) && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-8 text-center text-gray-400"
                  >
                    ユーザーがいません
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}
