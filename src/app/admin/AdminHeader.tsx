"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

export default function AdminHeader({ user }: { user: User }) {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/admin" className="font-bold text-lg tracking-wider">
            Molly Admin
          </Link>
          <nav className="hidden md:flex items-center gap-4 text-sm">
            <Link
              href="/admin/news"
              className="text-gray-600 hover:text-gray-900"
            >
              NEWS
            </Link>
            <Link
              href="/admin/contacts"
              className="text-gray-600 hover:text-gray-900"
            >
              お問い合わせ
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-gray-500 hidden md:inline">
            {user.email}
          </span>
          <button
            onClick={handleLogout}
            className="text-xs text-gray-500 hover:text-gray-900 border border-gray-300 rounded px-3 py-1"
          >
            ログアウト
          </button>
        </div>
      </div>
    </header>
  );
}
