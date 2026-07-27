import type { Metadata } from "next";
import FadeInSection from "@/components/FadeInSection";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "News",
  description: "株式会社Mollyからのお知らせ",
};

// ハードコードのフォールバック（Supabase未接続時）
const fallbackNews = [
  {
    id: "1",
    published_at: "2026-07-04",
    title: "ショートドラマ『なんにもしない。』出演のお知らせ",
    excerpt:
      "代表の森行秀和がショートドラマ『なんにもしない。』に出演いたしました。",
  },
  {
    id: "2",
    published_at: "2026-05-12",
    title: "クリエイティブ社長を支える『参謀術セミナー』",
    excerpt:
      "クリエイティブ業界の経営者を対象とした参謀術セミナーを開催いたします。",
  },
  {
    id: "3",
    published_at: "2026-05-11",
    title: "社長の右腕になるための『参謀型リーダーシップセミナー』",
    excerpt:
      "社長の右腕として活躍するための参謀型リーダーシップセミナーを開催いたします。",
  },
  {
    id: "4",
    published_at: "2025-11-19",
    title:
      "言語化されていない「意志」が、経営の未来を変える。─Re:CORE診断シート β版 公開─",
    excerpt:
      "経営者の内なる意志を言語化するためのRe:CORE診断シートβ版を公開いたしました。",
  },
];

export default async function NewsPage() {
  let newsItems = fallbackNews;

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("news")
      .select("id, title, excerpt, published_at")
      .eq("published", true)
      .order("published_at", { ascending: false });

    if (data && data.length > 0) {
      newsItems = data;
    }
  } catch {
    // Supabase未接続時はフォールバック使用
  }

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-36 bg-bg-dark text-white overflow-hidden">
        <div className="absolute top-0 left-1/2 w-px h-32 bg-gradient-to-b from-transparent to-white/20" />
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <FadeInSection>
            <p className="text-white/40 text-xs tracking-[0.4em] mb-6">NEWS</p>
            <h1 className="font-serif text-4xl lg:text-5xl tracking-wider">
              お知らせ
            </h1>
            <div className="w-16 h-px bg-white/30 mx-auto mt-6" />
          </FadeInSection>
        </div>
      </section>

      {/* News List */}
      <section className="py-24 lg:py-36 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <div className="space-y-0">
            {newsItems.map((item, i) => (
              <FadeInSection key={item.id} delay={i * 100}>
                <article className="group py-10 border-b border-border hover:border-black/30 transition-colors cursor-pointer">
                  <time className="text-xs text-text-light tracking-[0.2em]">
                    {item.published_at
                      ? new Date(item.published_at).toLocaleDateString(
                          "ja-JP",
                          {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                          }
                        )
                      : ""}
                  </time>
                  <h2 className="font-serif text-xl text-primary mt-3 tracking-wider group-hover:text-black transition-colors">
                    {item.title}
                  </h2>
                  <p className="text-text-light text-sm mt-3 leading-relaxed">
                    {item.excerpt}
                  </p>
                </article>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
