"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

const sideNavItems = [
  {
    href: "/admin",
    label: "ダッシュボード",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    href: "/admin/news",
    label: "NEWS管理",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
      </svg>
    ),
  },
  {
    href: "/admin/contacts",
    label: "お問い合わせ",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

export default function AdminShell({
  user,
  children,
}: {
  user: User;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/admin/login";
  };

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header - TOPと同じスタイル */}
      <header className="bg-gray-900 h-16 flex items-center justify-between px-4 lg:px-6 shrink-0 z-30">
        <div className="flex items-center gap-4">
          {/* モバイルハンバーガー */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5"
            aria-label="メニュー"
          >
            <span
              className={`w-5 h-px bg-white transition-all duration-300 ${
                sidebarOpen ? "rotate-45 translate-y-[3.5px]" : ""
              }`}
            />
            <span
              className={`w-5 h-px bg-white transition-all duration-300 ${
                sidebarOpen ? "-rotate-45 -translate-y-[3.5px]" : ""
              }`}
            />
          </button>

          {/* ロゴ */}
          <Link href="/admin" className="flex items-center gap-3">
            <Image
              src="/images/logo-white.png"
              alt="株式会社Molly"
              width={48}
              height={48}
              className="w-9 h-9 object-contain"
            />
            <span className="text-white/60 text-xs tracking-[0.15em] hidden sm:inline">
              管理画面
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-white/40 hidden md:inline">
            {user.email}
          </span>
          <button
            onClick={handleLogout}
            className="text-xs text-white/50 hover:text-white border border-white/20 rounded px-3 py-1.5 hover:border-white/40 transition-colors"
          >
            ログアウト
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* サイドバー - デスクトップ */}
        <aside className="hidden lg:flex flex-col w-56 bg-gray-900 border-r border-white/10 shrink-0">
          <nav className="flex-1 py-4">
            {sideNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-5 py-3 text-sm transition-colors ${
                  isActive(item.href)
                    ? "bg-white/10 text-white border-l-2 border-white"
                    : "text-white/50 hover:text-white hover:bg-white/5 border-l-2 border-transparent"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="border-t border-white/10 p-4">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-2 text-xs text-white/30 hover:text-white/60 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              サイトを表示
            </Link>
          </div>
        </aside>

        {/* サイドバー - モバイルオーバーレイ */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-20 bg-black/50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        <aside
          className={`fixed top-16 left-0 bottom-0 z-20 w-56 bg-gray-900 transition-transform duration-300 lg:hidden ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <nav className="py-4">
            {sideNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-5 py-3 text-sm transition-colors ${
                  isActive(item.href)
                    ? "bg-white/10 text-white border-l-2 border-white"
                    : "text-white/50 hover:text-white hover:bg-white/5 border-l-2 border-transparent"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="border-t border-white/10 p-4">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-2 text-xs text-white/30 hover:text-white/60 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              サイトを表示
            </Link>
          </div>
        </aside>

        {/* メインコンテンツ */}
        <main className="flex-1 bg-gray-50 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
