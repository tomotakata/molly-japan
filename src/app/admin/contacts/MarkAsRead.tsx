"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function MarkAsRead({
  contactId,
  isRead,
}: {
  contactId: string;
  isRead: boolean;
}) {
  const router = useRouter();
  const supabase = createClient();

  const toggle = async () => {
    await supabase
      .from("contacts")
      .update({ read: !isRead })
      .eq("id", contactId);
    router.refresh();
  };

  return (
    <button
      onClick={toggle}
      className={`text-sm px-3 py-1.5 rounded border ${
        isRead
          ? "border-gray-300 text-gray-500 hover:bg-gray-50"
          : "border-blue-300 bg-blue-50 text-blue-700 hover:bg-blue-100"
      }`}
    >
      {isRead ? "未読に戻す" : "既読にする"}
    </button>
  );
}
