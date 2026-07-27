import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { getUserRole, hasPermission } from "@/lib/roles";

export async function PATCH(request: Request) {
  const currentUser = await getUserRole();
  if (!currentUser || !hasPermission(currentUser.role, "admin")) {
    return NextResponse.json({ error: "権限がありません" }, { status: 403 });
  }

  const { userRoleId, newRole } = await request.json();

  // adminはownerに変更できない
  if (currentUser.role !== "owner" && newRole === "owner") {
    return NextResponse.json({ error: "権限がありません" }, { status: 403 });
  }

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

  // adminはownerのロールを変更できない
  if (currentUser.role !== "owner" && target.role === "owner") {
    return NextResponse.json({ error: "権限がありません" }, { status: 403 });
  }

  const { error } = await supabase
    .from("user_roles")
    .update({ role: newRole })
    .eq("id", userRoleId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
