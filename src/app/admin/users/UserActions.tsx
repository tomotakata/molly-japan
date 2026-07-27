"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { UserRole } from "@/lib/roles";

export default function UserActions({
  userId,
  userRoleId,
  currentRole,
  currentUserRole,
  email,
}: {
  userId: string;
  userRoleId: string;
  currentRole: UserRole;
  currentUserRole: UserRole;
  email: string;
}) {
  const [loading, setLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();

  const allRoles: { value: UserRole; label: string }[] = [
    { value: "viewer", label: "閲覧者" },
    { value: "editor", label: "編集者" },
    { value: "admin", label: "管理者" },
    ...(currentUserRole === "owner"
      ? [{ value: "owner" as UserRole, label: "オーナー" }]
      : []),
  ];
  const availableRoles = allRoles.filter((r) => r.value !== currentRole);

  const handleChangeRole = async (newRole: UserRole) => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/users/role", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userRoleId, newRole }),
      });
      if (res.ok) {
        router.refresh();
      }
    } finally {
      setLoading(false);
      setShowMenu(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`${email} を管理画面から削除しますか？`)) return;
    setLoading(true);
    try {
      const res = await fetch("/api/admin/users/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, userRoleId }),
      });
      if (res.ok) {
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        disabled={loading}
        className="text-gray-400 hover:text-gray-600 px-2 py-1 text-lg"
      >
        ...
      </button>

      {showMenu && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowMenu(false)}
          />
          <div className="absolute right-0 top-8 z-20 bg-white border border-gray-200 rounded-lg shadow-lg py-1 min-w-[140px]">
            <div className="px-3 py-1.5 text-xs text-gray-400 border-b">
              役職変更
            </div>
            {availableRoles.map((r) => (
              <button
                key={r.value}
                onClick={() => handleChangeRole(r.value)}
                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 text-gray-700"
              >
                {r.label}
              </button>
            ))}
            <div className="border-t my-1" />
            <button
              onClick={handleDelete}
              className="w-full text-left px-3 py-2 text-sm hover:bg-red-50 text-red-600"
            >
              削除
            </button>
          </div>
        </>
      )}
    </div>
  );
}
