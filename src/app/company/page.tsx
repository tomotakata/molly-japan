import type { Metadata } from "next";
import Link from "next/link";
import FadeInSection from "@/components/FadeInSection";

export const metadata: Metadata = {
  title: "会社概要",
  description: "株式会社Molly ─ 経営参謀、経営コンサルティング、研修・講座",
};

const companyInfo = [
  { label: "会社名", value: "株式会社Molly" },
  { label: "代表者", value: "代表取締役 森行秀和" },
  { label: "所在地", value: "〒633-0063 奈良県桜井市川合253-15-103" },
  { label: "設立", value: "2024年2月27日" },
  { label: "資本金", value: "5,000,000円" },
  { label: "事業内容", value: "経営参謀、経営コンサルティング、研修・講座など" },
  { label: "連絡先", value: "info@molly-japan.co.jp" },
  { label: "ホームページ", value: "https://molly-japan.co.jp/" },
  { label: "法人番号", value: "1150001026202" },
  { label: "取引銀行", value: "GMOあおぞらネット銀行" },
  { label: "営業時間", value: "10:00〜17:00" },
  { label: "適格請求書発行事業者番号", value: "595-499-5421" },
];

export default function CompanyPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-36 bg-bg-dark text-white overflow-hidden">
        <div className="absolute top-0 left-1/2 w-px h-32 bg-gradient-to-b from-transparent to-accent/40" />
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <FadeInSection>
            <p className="text-accent text-xs tracking-[0.4em] mb-6">COMPANY</p>
            <h1 className="font-serif text-4xl lg:text-5xl tracking-wider">会社概要</h1>
            <div className="section-divider mx-auto mt-6" />
          </FadeInSection>
        </div>
      </section>

      {/* Info Table */}
      <section className="py-24 lg:py-36 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <FadeInSection>
            <div className="space-y-0">
              {companyInfo.map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col md:flex-row border-b border-border py-6"
                >
                  <dt className="md:w-1/3 text-xs text-accent tracking-[0.2em] font-medium mb-2 md:mb-0 md:pt-0.5">
                    {item.label}
                  </dt>
                  <dd className="md:w-2/3 text-sm text-text leading-relaxed">
                    {item.value}
                  </dd>
                </div>
              ))}
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Access */}
      <section className="py-24 lg:py-36 bg-bg-section">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <FadeInSection>
            <p className="text-accent text-xs tracking-[0.4em] mb-4">ACCESS</p>
            <h2 className="font-serif text-3xl text-primary tracking-wider mb-8">アクセス</h2>
            <div className="section-divider" />
          </FadeInSection>

          <FadeInSection delay={200}>
            <div className="mt-8">
              <div className="aspect-[16/9] bg-border/50 rounded-sm overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3290.0!2d135.85!3d34.50!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z5aWI6Imv55yM5qGc5LqV5biC!5e0!3m2!1sja!2sjp!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "400px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="株式会社Molly アクセスマップ"
                />
              </div>
              <p className="text-text-light text-sm mt-4">
                〒633-0063 奈良県桜井市川合253-15-103
              </p>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 bg-gradient-to-br from-[#1a1a2e] to-[#0f3460] text-white text-center">
        <div className="max-w-3xl mx-auto px-6">
          <FadeInSection>
            <p className="text-accent text-xs tracking-[0.4em] mb-6">CONTACT</p>
            <h2 className="font-serif text-3xl tracking-wider mb-6">お問い合わせ</h2>
            <div className="section-divider mx-auto" />
            <p className="text-white/60 text-sm leading-loose mt-6 mb-10">
              経営に関するご相談は、お気軽にお問い合わせください。
            </p>
            <Link
              href="/contact"
              className="inline-block px-12 py-4 bg-accent text-white text-sm tracking-[0.2em] hover:bg-accent-light transition-colors duration-300"
            >
              お問い合わせ
            </Link>
          </FadeInSection>
        </div>
      </section>
    </>
  );
}
