import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import AdminShell from "../../AdminShell";
import NewsForm from "../NewsForm";

export const dynamic = "force-dynamic";

export default async function NewNewsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  return (
    <AdminShell user={user}>
      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="mb-6">
          <Link
            href="/admin/news"
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            ← NEWS一覧に戻る
          </Link>
        </div>
        <h1 className="text-2xl font-bold mb-6">新規NEWS作成</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <NewsForm />
        </div>
      </div>
    </AdminShell>
  );
}
