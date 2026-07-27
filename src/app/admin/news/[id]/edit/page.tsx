import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import AdminShell from "../../../AdminShell";
import NewsForm from "../../NewsForm";
import { getUserRole } from "@/lib/roles";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditNewsPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  const currentUser = await getUserRole();

  const { data: article } = await supabase
    .from("news")
    .select("*")
    .eq("id", id)
    .single();

  if (!article) notFound();

  return (
    <AdminShell user={user} userRole={currentUser?.role}>
      <div className="max-w-3xl mx-auto px-6 py-8">
        <div className="mb-6">
          <Link
            href="/admin/news"
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            ← NEWS一覧に戻る
          </Link>
        </div>
        <h1 className="text-2xl font-bold mb-6">NEWS編集</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <NewsForm
            initialData={{
              id: article.id,
              title: article.title,
              excerpt: article.excerpt ?? "",
              content: article.content ?? "",
              published: article.published,
            }}
          />
        </div>
      </div>
    </AdminShell>
  );
}
