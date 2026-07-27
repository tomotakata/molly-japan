import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import AdminShell from "../AdminShell";
import MarkAsRead from "./MarkAsRead";
import { getUserRole } from "@/lib/roles";

export const dynamic = "force-dynamic";

export default async function AdminContactsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  const currentUser = await getUserRole();

  const { data: contacts } = await supabase
    .from("contacts")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <AdminShell user={user} userRole={currentUser?.role}>
      <div className="max-w-5xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold mb-6">お問い合わせ管理</h1>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600 w-8"></th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">
                  お名前
                </th>
                <th className="text-left px-4 py-3 font-medium text-gray-600 hidden md:table-cell">
                  会社名
                </th>
                <th className="text-left px-4 py-3 font-medium text-gray-600 hidden md:table-cell">
                  種別
                </th>
                <th className="text-left px-4 py-3 font-medium text-gray-600 w-36">
                  受信日
                </th>
                <th className="w-20"></th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {contacts?.map((contact) => (
                <tr
                  key={contact.id}
                  className={`hover:bg-gray-50 ${!contact.read ? "bg-blue-50/50" : ""}`}
                >
                  <td className="px-4 py-3">
                    {!contact.read && (
                      <span className="inline-block w-2 h-2 rounded-full bg-blue-500"></span>
                    )}
                  </td>
                  <td className="px-4 py-3 font-medium">{contact.name}</td>
                  <td className="px-4 py-3 text-gray-500 hidden md:table-cell">
                    {contact.company || "-"}
                  </td>
                  <td className="px-4 py-3 text-gray-500 hidden md:table-cell">
                    {contact.category || "-"}
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {new Date(contact.created_at).toLocaleDateString("ja-JP")}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/contacts/${contact.id}`}
                      className="text-blue-600 hover:underline text-xs"
                    >
                      詳細
                    </Link>
                  </td>
                </tr>
              ))}
              {(!contacts || contacts.length === 0) && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-8 text-center text-gray-400"
                  >
                    お問い合わせはありません
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
