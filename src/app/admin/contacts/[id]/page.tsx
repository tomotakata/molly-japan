import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import AdminHeader from "../../AdminHeader";
import MarkAsRead from "../MarkAsRead";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ContactDetailPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data: contact } = await supabase
    .from("contacts")
    .select("*")
    .eq("id", id)
    .single();

  if (!contact) notFound();

  // 自動既読
  if (!contact.read) {
    await supabase.from("contacts").update({ read: true }).eq("id", id);
  }

  return (
    <>
      <AdminHeader user={user} />
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/admin/contacts"
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            ← お問い合わせ一覧に戻る
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-bold">お問い合わせ詳細</h1>
            <MarkAsRead contactId={contact.id} isRead={true} />
          </div>

          <dl className="space-y-4">
            <div className="grid grid-cols-[120px_1fr] gap-2">
              <dt className="text-sm text-gray-500">お名前</dt>
              <dd className="text-sm">{contact.name}</dd>
            </div>
            <div className="grid grid-cols-[120px_1fr] gap-2">
              <dt className="text-sm text-gray-500">会社名</dt>
              <dd className="text-sm">{contact.company || "-"}</dd>
            </div>
            <div className="grid grid-cols-[120px_1fr] gap-2">
              <dt className="text-sm text-gray-500">メール</dt>
              <dd className="text-sm">
                <a
                  href={`mailto:${contact.email}`}
                  className="text-blue-600 hover:underline"
                >
                  {contact.email}
                </a>
              </dd>
            </div>
            <div className="grid grid-cols-[120px_1fr] gap-2">
              <dt className="text-sm text-gray-500">電話番号</dt>
              <dd className="text-sm">{contact.phone || "-"}</dd>
            </div>
            <div className="grid grid-cols-[120px_1fr] gap-2">
              <dt className="text-sm text-gray-500">お問い合わせ種別</dt>
              <dd className="text-sm">{contact.category || "-"}</dd>
            </div>
            <div className="border-t pt-4">
              <dt className="text-sm text-gray-500 mb-2">お問い合わせ内容</dt>
              <dd className="text-sm whitespace-pre-wrap leading-relaxed">
                {contact.message}
              </dd>
            </div>
            <div className="grid grid-cols-[120px_1fr] gap-2 border-t pt-4">
              <dt className="text-sm text-gray-500">受信日時</dt>
              <dd className="text-sm">
                {new Date(contact.created_at).toLocaleString("ja-JP")}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  );
}
