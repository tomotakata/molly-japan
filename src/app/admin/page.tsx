import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import AdminHeader from "./AdminHeader";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  // 統計情報
  const { count: newsCount } = await supabase
    .from("news")
    .select("*", { count: "exact", head: true });

  const { count: contactsCount } = await supabase
    .from("contacts")
    .select("*", { count: "exact", head: true });

  const { count: unreadCount } = await supabase
    .from("contacts")
    .select("*", { count: "exact", head: true })
    .eq("read", false);

  return (
    <>
      <AdminHeader user={user} />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">ダッシュボード</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link
            href="/admin/news"
            className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
          >
            <div className="text-sm text-gray-500 mb-1">NEWS記事</div>
            <div className="text-3xl font-bold">{newsCount ?? 0}</div>
          </Link>

          <Link
            href="/admin/contacts"
            className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
          >
            <div className="text-sm text-gray-500 mb-1">お問い合わせ</div>
            <div className="text-3xl font-bold">{contactsCount ?? 0}</div>
          </Link>

          <Link
            href="/admin/contacts"
            className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
          >
            <div className="text-sm text-gray-500 mb-1">未読</div>
            <div className="text-3xl font-bold text-red-600">
              {unreadCount ?? 0}
            </div>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/admin/news/new"
            className="bg-gray-900 text-white rounded-lg p-6 text-center hover:bg-gray-800 transition-colors"
          >
            <div className="text-lg font-medium">+ 新規NEWS作成</div>
          </Link>
          <Link
            href="/admin/contacts"
            className="bg-white border-2 border-gray-900 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors"
          >
            <div className="text-lg font-medium">お問い合わせ一覧</div>
          </Link>
        </div>
      </div>
    </>
  );
}
