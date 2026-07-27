"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import type { UserRole } from "@/lib/roles";

export default function InviteForm({
  currentRole,
}: {
  currentRole: UserRole;
}) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<UserRole>("viewer");
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const availableRoles: { value: UserRole; label: string }[] = [
    { value: "viewer", label: "閲覧者" },
    { value: "editor", label: "編集者" },
    { value: "admin", label: "管理者" },
    ...(currentRole === "owner"
      ? [{ value: "owner" as UserRole, label: "オーナー" }]
      : []),
  ];

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setIsError(false);

    try {
      const res = await fetch("/api/admin/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role, display_name: displayName }),
      });

      const data = await res.json();

      if (!res.ok) {
        setIsError(true);
        setMessage(data.error || "招待に失敗しました");
      } else {
        setMessage(`${email} を${data.roleLabel}として招待しました`);
        setEmail("");
        setDisplayName("");
        setRole("viewer");
        setOpen(false);
        router.refresh();
      }
    } catch {
      setIsError(true);
      setMessage("招待に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-6">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="bg-gray-900 text-white text-sm px-4 py-2.5 rounded hover:bg-gray-800 transition-colors"
        >
          + ユーザーを招待
        </button>
      ) : (
        <div className="bg-white rounded-lg shadow p-5">
          <h2 className="text-sm font-medium mb-4">新規ユーザー招待</h2>
          <form onSubmit={handleInvite} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  メールアドレス *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2.5 border border-gray-300 rounded bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                  placeholder="user@example.com"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  表示名
                </label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
                  placeholder="山田 太郎"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">
                役職
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="px-3 py-2.5 border border-gray-300 rounded bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
              >
                {availableRoles.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>

            {message && (
              <div
                className={`text-sm px-3 py-2 rounded ${
                  isError
                    ? "bg-red-50 text-red-700"
                    : "bg-green-50 text-green-700"
                }`}
              >
                {message}
              </div>
            )}

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={loading}
                className="bg-gray-900 text-white text-sm px-4 py-2 rounded hover:bg-gray-800 disabled:opacity-50"
              >
                {loading ? "招待中..." : "招待する"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  setMessage("");
                }}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                キャンセル
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
