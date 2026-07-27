import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import AdminShell from "../AdminShell";

export const dynamic = "force-dynamic";

export default async function AdminNewsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data: articles } = await supabase
    .from("news")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <AdminShell user={user}>
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">NEWS管理</h1>
          <Link
            href="/admin/news/new"
            className="bg-gray-900 text-white text-sm px-4 py-2 rounded hover:bg-gray-800"
          >
            + 新規作成
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600">
                  タイトル
                </th>
                <th className="text-left px-4 py-3 font-medium text-gray-600 w-24">
                  状態
                </th>
                <th className="text-left px-4 py-3 font-medium text-gray-600 w-36">
                  作成日
                </th>
                <th className="w-20"></th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {articles?.map((article) => (
                <tr key={article.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{article.title}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-xs ${
                        article.published
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {article.published ? "公開" : "下書き"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {new Date(article.created_at).toLocaleDateString("ja-JP")}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/news/${article.id}/edit`}
                      className="text-blue-600 hover:underline text-xs"
                    >
                      編集
                    </Link>
                  </td>
                </tr>
              ))}
              {(!articles || articles.length === 0) && (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-8 text-center text-gray-400"
                  >
                    記事がありません
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
