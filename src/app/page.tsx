import Link from "next/link";
import Image from "next/image";
import FadeInSection from "@/components/FadeInSection";

const services = [
  {
    num: "01",
    title: "参謀サポート",
    subtitle: "経営者の思考を整える、右腕機能の実装",
    desc: "経営の孤独を、構造で支える。月2回のセッションで、思考を構造化し、判断の質とスピードを上げ、組織の流れを整えます。",
    href: "/service#sanbo",
  },
  {
    num: "02",
    title: "社内参謀育成サポート",
    subtitle: "社長の構想を、組織の実行力に変える6ヶ月伴走プログラム",
    desc: "社長の頭の中にある構想を受け取り、整理し、現場が動ける形へ変える「社内参謀」を6ヶ月間で育成します。",
    href: "/service#ikusei",
  },
  {
    num: "03",
    title: "経営課題解決サポート",
    subtitle: "思考を整え、組織を動かす5つのアプローチ",
    desc: "経営者の「モヤモヤ」を行動に変える。言葉の力で経営を整え、組織を動かすサポートです。",
    href: "/service#kadai",
  },
  {
    num: "04",
    title: "人材採用サポート",
    subtitle: "成長を加速させる「最適な人材」と出会うために",
    desc: "単なる採用代行ではなく、経営戦略と連動した戦略的な採用支援を行います。",
    href: "/service#saiyo",
  },
  {
    num: "05",
    title: "人事評価制度設計サポート",
    subtitle: "人が育ち、組織が動く。経営に直結する評価制度を。",
    desc: "制度の「作り方」ではなく「活かし方」まで見据えた実践型の支援です。",
    href: "/service#hyoka",
  },
  {
    num: "06",
    title: "人材教育サポート",
    subtitle: "\u201c生きた研修\u201dで実践につなげる。",
    desc: "知識のインプットにとどまらず、行動と成果に結びつける実践型プログラムです。",
    href: "/service#kyoiku",
  },
];

const news = [
  {
    date: "2026.07.04",
    title: "ショートドラマ『なんにもしない。』出演のお知らせ",
  },
  {
    date: "2026.05.12",
    title: "クリエイティブ社長を支える『参謀術セミナー』",
  },
  {
    date: "2026.05.11",
    title: "社長の右腕になるための『参謀型リーダーシップセミナー』",
  },
  {
    date: "2025.11.19",
    title: "言語化されていない「意志」が、経営の未来を変える。─Re:CORE診断シート β版 公開─",
  },
];

const results = [
  { label: "初年度1200万円 → 5年で10億円企業に成長", category: "人材派遣業" },
  { label: "4年で県内ランキング16位 → 3位に", category: "不動産管理業" },
  { label: "1年で年商が2.5倍に", category: "小売業" },
  { label: "6ヶ月で経常利益が2倍に", category: "スポーツジム" },
  { label: "1年で残業時間が90%削減", category: "輸入業" },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden">
        {/* PC hero image */}
        <Image
          src="/images/hero-pc.jpg"
          alt="Molly Japan"
          fill
          priority
          className="object-cover hidden md:block"
          sizes="100vw"
        />
        {/* SP hero image */}
        <Image
          src="/images/hero-sp.jpg"
          alt="Molly Japan"
          fill
          priority
          className="object-cover md:hidden"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute top-0 left-1/2 w-px h-32 bg-gradient-to-b from-transparent to-white/20" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <div className="max-w-3xl">
            <p className="text-white/50 text-xs tracking-[0.4em] mb-6 animate-fade-in">
              COO型参謀 ─ 株式会社Molly
            </p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight tracking-wider mb-8 animate-fade-in-up">
              孤独な経営者の
              <br />
              <span className="text-white/90 underline underline-offset-8 decoration-1">味方</span>でありたい。
            </h1>
            <div className="w-16 h-px bg-white/40 mb-8 animate-fade-in animation-delay-200" />
            <p className="text-white/60 text-sm md:text-base leading-loose max-w-xl animate-fade-in-up animation-delay-400">
              経営者は、資金繰り、人材、組織、事業の成長など、
              <br className="hidden md:block" />
              正解のない問いに向き合い続けています。
              <br />
              私は、そんな経営者の今と未来を支えるCOO型参謀です。
            </p>
            <div className="mt-10 flex flex-wrap gap-4 animate-fade-in-up animation-delay-600">
              <Link
                href="/service"
                className="px-8 py-3.5 bg-white text-black text-sm tracking-[0.15em] hover:bg-white/90 transition-colors duration-300"
              >
                サポートを見る
              </Link>
              <Link
                href="/contact"
                className="px-8 py-3.5 border border-white/40 text-white text-sm tracking-[0.15em] hover:border-white hover:bg-white/10 transition-all duration-300"
              >
                お問い合わせ
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in animation-delay-800">
          <span className="text-white/30 text-[10px] tracking-[0.3em]">SCROLL</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent" />
        </div>
      </section>

      {/* Concept */}
      <section className="py-24 lg:py-36 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <FadeInSection>
              <p className="text-text-light text-xs tracking-[0.4em] mb-4">CONCEPT</p>
              <h2 className="font-serif text-3xl lg:text-4xl text-primary leading-relaxed tracking-wider mb-6">
                経営課題は、
                <br />
                言葉になると動き出す。
              </h2>
              <div className="section-divider" />
              <p className="text-text-light text-sm leading-loose mt-6">
                頭の中にある想いや違和感を整理し、経営課題と優先順位を明確にする。
                そして、戦略を言葉に変え、意思決定から実行まで伴走します。
              </p>
              <p className="text-text-light text-sm leading-loose mt-4">
                外から正解を押しつけるのではなく、必要なときには率直な意見を伝えながら、
                社長自身が納得して次の一歩を決められる状態をつくります。
              </p>
              <p className="text-text-light text-sm leading-loose mt-4">
                一人で抱えていることがあるなら、まだ整理されていなくても構いません。
                孤独な経営者の味方として、あなたの今と未来に伴走します。
              </p>
            </FadeInSection>

            <FadeInSection delay={200}>
              <div className="relative">
                <div className="aspect-[4/5] rounded-sm overflow-hidden relative">
                  <Image
                    src="/images/concept.jpg"
                    alt="森行秀和 ─ 株式会社Molly 代表取締役"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 w-24 h-24 border border-black/10" />
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-24 lg:py-36 bg-bg-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeInSection>
            <div className="text-center mb-16">
              <p className="text-text-light text-xs tracking-[0.4em] mb-4">STORY</p>
              <h2 className="font-serif text-3xl lg:text-4xl text-primary tracking-wider">経営者の今と未来を支える実績</h2>
              <div className="section-divider mx-auto mt-6" />
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {results.map((item, i) => (
              <FadeInSection key={i} delay={i * 100}>
                <div className="bg-white p-8 lg:p-10 h-full">
                  <span className="text-text-light text-xs tracking-[0.3em]">{item.category}</span>
                  <p className="font-serif text-lg text-primary mt-3 leading-relaxed">{item.label}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Service */}
      <section className="py-24 lg:py-36 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeInSection>
            <div className="text-center mb-16">
              <p className="text-text-light text-xs tracking-[0.4em] mb-4">SUPPORT</p>
              <h2 className="font-serif text-3xl lg:text-4xl text-primary tracking-wider">経営に言葉と実行力を。</h2>
              <p className="text-text-light text-sm mt-4">森行秀和の&ldquo;実践型伴走支援&rdquo;</p>
              <div className="section-divider mx-auto mt-6" />
            </div>
          </FadeInSection>

          <div className="space-y-0">
            {services.map((svc, i) => (
              <FadeInSection key={i} delay={i * 80}>
                <Link href={svc.href} className="group block">
                  <div className="flex items-start gap-6 lg:gap-10 py-8 border-b border-border group-hover:border-black/30 transition-colors">
                    <span className="font-serif text-3xl lg:text-4xl text-black/10 group-hover:text-black/30 transition-colors shrink-0">
                      {svc.num}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif text-xl lg:text-2xl text-primary group-hover:text-black transition-colors tracking-wider">
                        {svc.title}
                      </h3>
                      <p className="text-text-light text-xs tracking-[0.1em] mt-1">{svc.subtitle}</p>
                      <p className="text-text-light text-sm mt-3 leading-relaxed">{svc.desc}</p>
                    </div>
                    <span className="text-black/20 group-hover:text-black group-hover:translate-x-1 transition-all shrink-0 pt-2">
                      &rarr;
                    </span>
                  </div>
                </Link>
              </FadeInSection>
            ))}
          </div>

          <FadeInSection>
            <div className="text-center mt-12">
              <Link
                href="/service"
                className="inline-block px-10 py-3.5 border border-black text-black text-sm tracking-[0.15em] hover:bg-black hover:text-white transition-all duration-300"
              >
                サポート一覧
              </Link>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Profile Teaser */}
      <section className="py-24 lg:py-36 bg-bg-dark text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeInSection>
              <div className="aspect-square max-w-sm bg-gradient-to-br from-white/5 to-white/[0.02] rounded-sm flex items-center justify-center">
                <div className="text-center">
                  <p className="font-serif text-7xl text-white/10">H</p>
                  <p className="text-xs text-white/20 tracking-[0.3em] mt-2">HIDEKAZU MORIYUKI</p>
                </div>
              </div>
            </FadeInSection>

            <FadeInSection delay={200}>
              <p className="text-white/40 text-xs tracking-[0.4em] mb-4">PROFILE</p>
              <h2 className="font-serif text-3xl lg:text-4xl leading-relaxed tracking-wider mb-6">森行秀和</h2>
              <p className="text-xs text-white/40 tracking-[0.2em] mb-6">もりゆき・ひでかず</p>
              <div className="w-16 h-px bg-white/30 mb-6" />
              <p className="text-white/60 text-sm leading-loose">
                株式会社Molly 代表取締役／株式会社ULAS COO
              </p>
              <p className="text-white/60 text-sm leading-loose mt-4">
                経営者の「内なる意志」と「外の経営構造」を同期させ、
                再現性ある成長へ導く参謀。社長の中にある、まだ言語化されていない構想や違和感を言葉にし、
                構造に落とし、組織と事業へ実装する。
              </p>
              <div className="mt-8">
                <Link
                  href="/profile"
                  className="inline-block px-8 py-3 border border-white/40 text-white text-sm tracking-[0.15em] hover:bg-white hover:text-black transition-all duration-300"
                >
                  プロフィール詳細
                </Link>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* News */}
      <section className="py-24 lg:py-36 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <FadeInSection>
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-text-light text-xs tracking-[0.4em] mb-4">NEWS</p>
                <h2 className="font-serif text-3xl lg:text-4xl text-primary tracking-wider">お知らせ</h2>
              </div>
              <Link href="/news" className="text-sm text-primary tracking-[0.1em] hover-line hidden md:inline-block">
                View All &rarr;
              </Link>
            </div>
          </FadeInSection>

          <div className="space-y-0">
            {news.map((item, i) => (
              <FadeInSection key={i} delay={i * 80}>
                <div className="group flex items-baseline gap-6 py-6 border-b border-border hover:border-black/30 transition-colors cursor-pointer">
                  <time className="text-xs text-text-light tracking-[0.15em] shrink-0">{item.date}</time>
                  <p className="text-sm text-primary group-hover:text-black transition-colors">{item.title}</p>
                </div>
              </FadeInSection>
            ))}
          </div>

          <FadeInSection>
            <div className="text-center mt-10 md:hidden">
              <Link href="/news" className="text-sm text-primary tracking-[0.1em]">View All &rarr;</Link>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 bg-gradient-to-br from-[#111111] to-[#222222] text-white text-center">
        <div className="max-w-3xl mx-auto px-6">
          <FadeInSection>
            <p className="text-white/40 text-xs tracking-[0.4em] mb-6">CONTACT</p>
            <h2 className="font-serif text-3xl lg:text-4xl tracking-wider leading-relaxed mb-6">
              まずは、お気軽に
              <br />
              ご相談ください。
            </h2>
            <div className="section-divider mx-auto" />
            <p className="text-white/50 text-sm leading-loose mt-6 mb-10">
              経営課題は、言葉になると動き出します。
              <br />
              一人で抱えていることがあるなら、まだ整理されていなくても構いません。
            </p>
            <Link
              href="/contact"
              className="inline-block px-12 py-4 bg-white text-black text-sm tracking-[0.2em] hover:bg-white/90 transition-colors duration-300"
            >
              お問い合わせ
            </Link>
          </FadeInSection>
        </div>
      </section>
    </>
  );
}
