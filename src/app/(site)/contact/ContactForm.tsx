"use client";

import { useState, useRef, useEffect } from "react";
import FadeInSection from "@/components/FadeInSection";
import { createClient } from "@/lib/supabase/client";

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
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel = categories.find((c) => c.value === selected)?.label;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");

    const supabase = createClient();
    const { error } = await supabase.from("contacts").insert({
      name,
      company,
      email,
      phone,
      category: selectedLabel || "",
      message,
    });

    if (error) {
      setSubmitError("送信に失敗しました。時間をおいて再度お試しください。");
      setSubmitting(false);
      return;
    }

    setSubmitted(true);
    setSubmitting(false);
  };

  if (submitted) {
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
            </FadeInSection>
          </div>
        </section>
        <section className="py-24 lg:py-36 bg-white">
          <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
            <FadeInSection>
              <h2 className="font-serif text-2xl tracking-wider mb-6">
                お問い合わせありがとうございます
              </h2>
              <p className="text-text-light text-sm leading-loose">
                内容を確認の上、担当者よりご連絡いたします。
                <br />
                しばらくお待ちくださいませ。
              </p>
            </FadeInSection>
          </div>
        </section>
      </>
    );
  }

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
            <form onSubmit={handleSubmit} className="space-y-10">
              {submitError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
                  {submitError}
                </div>
              )}

              <div>
                <label className="block text-xs text-text-light tracking-[0.2em] mb-2">
                  お名前 <span className="text-black">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border-b border-border bg-transparent py-3 text-sm text-text outline-none focus:border-black transition-colors"
                  placeholder="090-0000-0000"
                />
              </div>

              {/* Category - custom dropdown */}
              <div>
                <label className="block text-xs text-text-light tracking-[0.2em] mb-2">
                  お問い合わせ種別
                </label>
                <input type="hidden" name="category" value={selected} />
                <div ref={dropdownRef} className="relative">
                  <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full flex items-center justify-between border-b border-border py-3 text-sm text-left outline-none hover:border-black/40 transition-colors cursor-pointer"
                  >
                    <span className={selectedLabel ? "text-text" : "text-text-light"}>
                      {selectedLabel || "選択してください"}
                    </span>
                    <svg
                      className={`w-4 h-4 text-text-light transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {isOpen && (
                    <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-white border border-border shadow-lg max-h-80 overflow-y-auto">
                      {categories.map((cat) => (
                        <button
                          key={cat.value}
                          type="button"
                          onClick={() => {
                            setSelected(cat.value);
                            setIsOpen(false);
                          }}
                          className={`w-full text-left px-5 py-4 text-sm transition-colors cursor-pointer border-b border-border/50 last:border-b-0 ${
                            selected === cat.value
                              ? "bg-black text-white"
                              : "text-text hover:bg-bg-section"
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs text-text-light tracking-[0.2em] mb-2">
                  お問い合わせ内容 <span className="text-black">*</span>
                </label>
                <textarea
                  required
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full border border-border bg-transparent p-4 text-sm text-text outline-none focus:border-black transition-colors resize-none"
                  placeholder="ご相談内容をお書きください"
                />
              </div>

              <div className="text-center pt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-16 py-4 bg-black text-white text-sm tracking-[0.2em] hover:bg-black/80 transition-colors duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? "送信中..." : "送信する"}
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
