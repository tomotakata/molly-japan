"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

type NewsFormProps = {
  initialData?: {
    id?: string;
    title: string;
    excerpt: string;
    content: string;
    published: boolean;
  };
};

export default function NewsForm({ initialData }: NewsFormProps) {
  const isEditing = !!initialData?.id;
  const router = useRouter();
  const supabase = createClient();

  const [title, setTitle] = useState(initialData?.title ?? "");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt ?? "");
  const [content, setContent] = useState(initialData?.content ?? "");
  const [published, setPublished] = useState(initialData?.published ?? false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      title,
      excerpt,
      content,
      published,
      published_at: published ? new Date().toISOString() : null,
    };

    let result;
    if (isEditing) {
      result = await supabase
        .from("news")
        .update(payload)
        .eq("id", initialData!.id!);
    } else {
      result = await supabase.from("news").insert(payload);
    }

    if (result.error) {
      setError(result.error.message);
      setSaving(false);
      return;
    }

    router.push("/admin/news");
    router.refresh();
  };

  const handleDelete = async () => {
    if (!isEditing || !confirm("この記事を削除しますか？")) return;
    await supabase.from("news").delete().eq("id", initialData!.id!);
    router.push("/admin/news");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
          {error}
        </div>
      )}

      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">
          タイトル
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">
          概要
        </label>
        <input
          type="text"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
          placeholder="一覧に表示される概要文"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">
          本文
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={12}
          className="w-full px-4 py-3 border border-gray-300 rounded bg-white text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 resize-y"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="published"
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
          className="w-4 h-4"
        />
        <label htmlFor="published" className="text-sm text-gray-700">
          公開する
        </label>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={saving}
          className="bg-gray-900 text-white px-6 py-2.5 rounded text-sm font-medium hover:bg-gray-800 disabled:opacity-50"
        >
          {saving ? "保存中..." : isEditing ? "更新する" : "作成する"}
        </button>

        <button
          type="button"
          onClick={() => router.push("/admin/news")}
          className="text-gray-500 text-sm hover:text-gray-700"
        >
          キャンセル
        </button>

        {isEditing && (
          <button
            type="button"
            onClick={handleDelete}
            className="ml-auto text-red-500 text-sm hover:text-red-700"
          >
            削除
          </button>
        )}
      </div>
    </form>
  );
}
