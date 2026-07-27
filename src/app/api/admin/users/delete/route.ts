import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { getUserRole, hasPermission } from "@/lib/roles";

export async function DELETE(request: Request) {
  const currentUser = await getUserRole();
  if (!currentUser || !hasPermission(currentUser.role, "admin")) {
    return NextResponse.json({ error: "権限がありません" }, { status: 403 });
  }

  const { userId, userRoleId } = await request.json();

  const supabase = await createClient();

  // 対象ユーザーのロールを確認
  const { data: target } = await supabase
    .from("user_roles")
    .select("role")
    .eq("id", userRoleId)
    .single();

  if (!target) {
    return NextResponse.json(
      { error: "ユーザーが見つかりません" },
      { status: 404 }
    );
  }

  // ownerは削除不可（adminからも）
  if (target.role === "owner" && currentUser.role !== "owner") {
    return NextResponse.json({ error: "権限がありません" }, { status: 403 });
  }

  // user_rolesから削除
  const { error } = await supabase
    .from("user_roles")
    .delete()
    .eq("id", userRoleId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Supabase Auth からも削除
  await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/admin/users/${userId}`,
    {
      method: "DELETE",
      headers: {
        apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`,
      },
    }
  );

  return NextResponse.json({ success: true });
}
