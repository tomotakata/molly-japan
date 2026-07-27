import type { Metadata } from "next";
import FadeInSection from "@/components/FadeInSection";

export const metadata: Metadata = {
  title: "代表プロフィール",
  description: "森行秀和（もりゆき・ひでかず）─ 孤独な経営者の味方。株式会社Molly 代表取締役",
};

const career = [
  {
    period: "大学卒業後",
    title: "ワタミフードサービス株式会社",
    role: "店長（大阪・九州エリア）",
    achievements: [
      "歴代最高日商記録を更新",
      "グループ月商2位を達成",
    ],
    insight: "人の感情を整えなければ、数字は動かない",
  },
  {
    period: "教育期",
    title: "株式会社原田教育研究所",
    role: "ゼネラルマネージャー（原田隆史氏の右腕）",
    achievements: [
      "企業・学校・行政に向け、延べ1,000回以上の登壇",
      "講師育成で500名超を輩出",
    ],
    insight: "人を育てるとは、気合ではなく\u201c構造設計\u201dである",
  },
  {
    period: "事業構築期",
    title: "株式会社MOMOプロダクツ 創業",
    role: "代表取締役",
    achievements: [
      "大阪の老舗おでん屋で9ヶ月で月商3倍を実現",
      "飲食事業のフランチャイズ展開を成功、事業譲渡",
    ],
    insight: "理論ではなく\u201c再現できる仕組み\u201dとして事業を構築",
  },
];

const currentRoles = [
  {
    company: "株式会社Molly",
    role: "代表取締役",
    desc: "経営戦略と人材戦略をつなぐ「構造設計」を専門とする。採用・育成・評価・定着・カルチャー浸透までを一貫設計し、理念を現場に実装する。",
  },
  {
    company: "株式会社ULAS",
    role: "COO",
    desc: "オゾン水生成器メーカーの経営・事業開発を統括。採用・販売・マーケティングまで一気通貫で設計。経営と現場をつなぐCOO型参謀として、事業の成長と組織の進化を同時に進めている。",
  },
];

export default function ProfilePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-36 bg-bg-dark text-white overflow-hidden">
        <div className="absolute top-0 left-1/2 w-px h-32 bg-gradient-to-b from-transparent to-accent/40" />
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeInSection>
              <div className="aspect-[3/4] max-w-md bg-gradient-to-br from-white/5 to-white/[0.02] rounded-sm flex items-center justify-center mx-auto lg:mx-0">
                <div className="text-center">
                  <p className="font-serif text-8xl text-accent/20">H</p>
                  <p className="text-xs text-white/30 tracking-[0.3em] mt-4">HIDEKAZU MORIYUKI</p>
                </div>
              </div>
            </FadeInSection>

            <FadeInSection delay={200}>
              <p className="text-accent text-xs tracking-[0.4em] mb-4">PROFILE</p>
              <h1 className="font-serif text-4xl lg:text-5xl tracking-wider mb-4">森行秀和</h1>
              <p className="text-xs text-white/50 tracking-[0.2em] mb-8">もりゆき・ひでかず</p>
              <div className="w-16 h-px bg-accent mb-8" />
              <p className="font-serif text-2xl text-accent tracking-wider mb-6">孤独な経営者の味方</p>
              <p className="text-white/60 text-sm leading-loose mb-4">
                株式会社Molly 代表取締役／株式会社ULAS COO
              </p>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Definition */}
      <section className="py-24 lg:py-36 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <FadeInSection>
            <p className="text-accent text-xs tracking-[0.4em] mb-4">DEFINITION</p>
            <h2 className="font-serif text-3xl text-primary tracking-wider mb-8">定義</h2>
            <div className="section-divider" />
          </FadeInSection>

          <FadeInSection delay={200}>
            <div className="mt-8 space-y-6 text-text-light text-sm leading-loose">
              <p>
                経営者の「内なる意志」と「外の経営構造」を同期させ、再現性ある成長へ導く参謀。
              </p>
              <p>
                社長の中にある、まだ言語化されていない構想や違和感。
                それを言葉にし、構造に落とし、組織と事業へ実装する。
              </p>
              <p>
                単なるアドバイザーではない。答えを与える人でもない。
                社長が&ldquo;決められる状態&rdquo;を整え、経営そのものを前に進める右腕である。
              </p>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Essence */}
      <section className="py-24 lg:py-36 bg-bg-section">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <FadeInSection>
            <p className="text-accent text-xs tracking-[0.4em] mb-4">ESSENCE</p>
            <h2 className="font-serif text-3xl text-primary tracking-wider mb-8">本質</h2>
            <div className="section-divider" />
          </FadeInSection>

          <FadeInSection delay={200}>
            <div className="mt-8 space-y-6 text-text-light text-sm leading-loose">
              <p>経営は、社長の構造そのものである。</p>
              <p>
                社長の思考・信念・判断軸（内的OS）が曖昧なままでは、
                どれだけ戦略を磨いても再現性は生まれない。
              </p>
              <p className="font-serif text-xl text-primary tracking-wider">
                Re:CORE ── 「核を再起動する」
              </p>
              <ul className="space-y-2 pl-4">
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">─</span>
                  <span>社長の内的構造を整え</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">─</span>
                  <span>組織・戦略・事業の外的構造と同期させ</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-accent mt-1">─</span>
                  <span>成果が積み上がる仕組みをつくる</span>
                </li>
              </ul>
              <p className="font-serif text-lg text-primary">
                経営者が再生すれば、経営は必ず再生する。
              </p>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Career */}
      <section className="py-24 lg:py-36 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <FadeInSection>
            <p className="text-accent text-xs tracking-[0.4em] mb-4">CAREER</p>
            <h2 className="font-serif text-3xl text-primary tracking-wider mb-8">
              実務の積み重ねがつくった参謀力
            </h2>
            <div className="section-divider" />
          </FadeInSection>

          <div className="mt-12 space-y-16">
            {career.map((item, i) => (
              <FadeInSection key={i} delay={i * 150}>
                <div className="border-l-2 border-accent/30 pl-8">
                  <span className="text-accent text-xs tracking-[0.3em]">{item.period}</span>
                  <h3 className="font-serif text-xl text-primary mt-2 tracking-wider">{item.title}</h3>
                  <p className="text-text-light text-sm mt-1">{item.role}</p>
                  <ul className="mt-4 space-y-2">
                    {item.achievements.map((a, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm text-text-light">
                        <span className="text-accent mt-1 shrink-0">&#9670;</span>
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-sm text-primary italic">
                    &ldquo;{item.insight}&rdquo;
                  </p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Current */}
      <section className="py-24 lg:py-36 bg-bg-section">
        <div className="max-w-4xl mx-auto px-6 lg:px-12">
          <FadeInSection>
            <p className="text-accent text-xs tracking-[0.4em] mb-4">CURRENT</p>
            <h2 className="font-serif text-3xl text-primary tracking-wider mb-8">現在の活動</h2>
            <div className="section-divider" />
          </FadeInSection>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            {currentRoles.map((item, i) => (
              <FadeInSection key={i} delay={i * 150}>
                <div className="bg-white p-8 lg:p-10 h-full">
                  <span className="text-accent text-xs tracking-[0.3em]">{item.role}</span>
                  <h3 className="font-serif text-xl text-primary mt-2 tracking-wider">{item.company}</h3>
                  <div className="w-10 h-px bg-accent/50 my-4" />
                  <p className="text-text-light text-sm leading-loose">{item.desc}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Belief */}
      <section className="py-24 lg:py-36 bg-bg-dark text-white text-center">
        <div className="max-w-3xl mx-auto px-6">
          <FadeInSection>
            <p className="text-accent text-xs tracking-[0.4em] mb-6">BELIEF</p>
            <h2 className="font-serif text-3xl lg:text-4xl tracking-wider leading-relaxed mb-8">信念</h2>
            <div className="section-divider mx-auto" />
            <div className="mt-8 space-y-6 text-white/60 text-sm leading-loose">
              <p>企業の成長を決めるのは、戦略ではない。動く&ldquo;人&rdquo;である。</p>
              <p>そして人が動くためには、&ldquo;構造化された意志&rdquo;が必要だ。</p>
              <p>
                私は社長の中に眠る、まだ言語化されていない核を掘り起こし、
                それを構造に翻訳し、組織と事業へと実装する。
              </p>
              <p className="font-serif text-xl text-accent tracking-wider pt-4">
                社長の今を整え、未来を設計する。
                <br />
                それが、「社長の今と未来を支える参謀」という仕事である。
              </p>
            </div>
          </FadeInSection>
        </div>
      </section>
    </>
  );
}
