import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { getUserRole, hasPermission, roleLabel } from "@/lib/roles";
import type { UserRole } from "@/lib/roles";

export async function POST(request: Request) {
  const currentUser = await getUserRole();
  if (!currentUser || !hasPermission(currentUser.role, "admin")) {
    return NextResponse.json({ error: "権限がありません" }, { status: 403 });
  }

  const { email, role, display_name } = await request.json();

  if (!email || !role) {
    return NextResponse.json(
      { error: "メールアドレスと役職は必須です" },
      { status: 400 }
    );
  }

  // adminはownerを招待できない
  if (currentUser.role !== "owner" && role === "owner") {
    return NextResponse.json(
      { error: "オーナーの招待はオーナーのみ可能です" },
      { status: 403 }
    );
  }

  const supabase = await createClient();

  // service_roleでユーザーを作成するためのAPI呼び出し
  // まず既存ユーザーをチェック
  const { data: existingRole } = await supabase
    .from("user_roles")
    .select("id")
    .eq("email", email)
    .single();

  if (existingRole) {
    return NextResponse.json(
      { error: "このメールアドレスは既に登録されています" },
      { status: 400 }
    );
  }

  // Supabase Admin APIでユーザーを作成
  const tempPassword = `Molly${Date.now()}!`;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/admin/users`,
    {
      method: "POST",
      headers: {
        apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password: tempPassword,
        email_confirm: true,
      }),
    }
  );

  if (!res.ok) {
    const err = await res.json();
    // ユーザーが既に存在する場合
    if (err.msg?.includes("already been registered") || err.code === "email_exists") {
      // 既存ユーザーのIDを取得してroleだけ追加
      const listRes = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/admin/users?page=1&per_page=1000`,
        {
          headers: {
            apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
            Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`,
          },
        }
      );
      const listData = await listRes.json();
      const existingUser = listData.users?.find(
        (u: { email: string }) => u.email === email
      );

      if (existingUser) {
        const { error: insertError } = await supabase
          .from("user_roles")
          .insert({
            user_id: existingUser.id,
            email,
            role,
            display_name: display_name || null,
          });

        if (insertError) {
          return NextResponse.json(
            { error: insertError.message },
            { status: 500 }
          );
        }

        return NextResponse.json({
          success: true,
          roleLabel: roleLabel(role as UserRole),
        });
      }
    }
    return NextResponse.json(
      { error: "ユーザーの作成に失敗しました" },
      { status: 500 }
    );
  }

  const newUser = await res.json();

  // user_rolesにINSERT
  const { error: insertError } = await supabase.from("user_roles").insert({
    user_id: newUser.id,
    email,
    role,
    display_name: display_name || null,
  });

  if (insertError) {
    return NextResponse.json(
      { error: insertError.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    roleLabel: roleLabel(role as UserRole),
    tempPassword,
  });
}
