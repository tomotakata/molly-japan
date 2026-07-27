"use client";

import { useState } from "react";
import FadeInSection from "@/components/FadeInSection";

const categories = [
  { value: "sanbo", label: "参謀サポート" },
  { value: "ikusei", label: "社内参謀育成サポート" },
  { value: "kadai", label: "経営課題解決サポート" },
  { value: "saiyo", label: "人材採用サポート" },
  { value: "hyoka", label: "人事評価制度設計サポート" },
  { value: "kyoiku", label: "人材教育サポート" },
  { value: "other", label: "その他" },
];

export default function ContactForm() {
  const [selected, setSelected] = useState("");

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-36 bg-bg-dark text-white overflow-hidden">
        <div className="absolute top-0 left-1/2 w-px h-32 bg-gradient-to-b from-transparent to-white/20" />
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <FadeInSection>
            <p className="text-white/40 text-xs tracking-[0.4em] mb-6">CONTACT</p>
            <h1 className="font-serif text-4xl lg:text-5xl tracking-wider mb-6">
              お問い合わせ
            </h1>
            <div className="w-16 h-px bg-white/30 mx-auto" />
            <p className="text-white/50 text-sm leading-loose mt-6 max-w-2xl mx-auto">
              経営課題は、言葉になると動き出します。
              <br />
              まだ整理されていなくても構いません。お気軽にご相談ください。
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* Form */}
      <section className="py-24 lg:py-36 bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <FadeInSection>
            <form className="space-y-10">
              <div>
                <label className="block text-xs text-text-light tracking-[0.2em] mb-2">
                  お名前 <span className="text-black">*</span>
                </label>
                <input
                  type="text"
                  required
                  className="w-full border-b border-border bg-transparent py-3 text-sm text-text outline-none focus:border-black transition-colors"
                  placeholder="山田 太郎"
                />
              </div>

              <div>
                <label className="block text-xs text-text-light tracking-[0.2em] mb-2">
                  会社名
                </label>
                <input
                  type="text"
                  className="w-full border-b border-border bg-transparent py-3 text-sm text-text outline-none focus:border-black transition-colors"
                  placeholder="株式会社○○"
                />
              </div>

              <div>
                <label className="block text-xs text-text-light tracking-[0.2em] mb-2">
                  メールアドレス <span className="text-black">*</span>
                </label>
                <input
                  type="email"
                  required
                  className="w-full border-b border-border bg-transparent py-3 text-sm text-text outline-none focus:border-black transition-colors"
                  placeholder="example@email.com"
                />
              </div>

              <div>
                <label className="block text-xs text-text-light tracking-[0.2em] mb-2">
                  電話番号
                </label>
                <input
                  type="tel"
                  className="w-full border-b border-border bg-transparent py-3 text-sm text-text outline-none focus:border-black transition-colors"
                  placeholder="090-0000-0000"
                />
              </div>

              {/* Category - tap-friendly buttons */}
              <div>
                <label className="block text-xs text-text-light tracking-[0.2em] mb-4">
                  お問い合わせ種別
                </label>
                <input type="hidden" name="category" value={selected} />
                <div className="flex flex-wrap gap-3">
                  {categories.map((cat) => (
                    <button
                      key={cat.value}
                      type="button"
                      onClick={() =>
                        setSelected(selected === cat.value ? "" : cat.value)
                      }
                      className={`px-5 py-3 text-sm tracking-[0.05em] border transition-all duration-200 cursor-pointer ${
                        selected === cat.value
                          ? "bg-black text-white border-black"
                          : "bg-white text-text border-border hover:border-black/40"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs text-text-light tracking-[0.2em] mb-2">
                  お問い合わせ内容 <span className="text-black">*</span>
                </label>
                <textarea
                  required
                  rows={6}
                  className="w-full border border-border bg-transparent p-4 text-sm text-text outline-none focus:border-black transition-colors resize-none"
                  placeholder="ご相談内容をお書きください"
                />
              </div>

              <div className="text-center pt-4">
                <button
                  type="submit"
                  className="px-16 py-4 bg-black text-white text-sm tracking-[0.2em] hover:bg-black/80 transition-colors duration-300 cursor-pointer"
                >
                  送信する
                </button>
              </div>
            </form>
          </FadeInSection>

          <FadeInSection delay={200}>
            <div className="mt-20 pt-16 border-t border-border text-center">
              <p className="text-xs text-text-light tracking-[0.3em] mb-4">MAIL</p>
              <a
                href="mailto:info@molly-japan.co.jp"
                className="text-sm text-text hover:text-black transition-colors"
              >
                info@molly-japan.co.jp
              </a>
              <p className="text-text-light text-xs mt-6">
                営業時間: 10:00〜17:00
              </p>
            </div>
          </FadeInSection>
        </div>
      </section>
    </>
  );
}
