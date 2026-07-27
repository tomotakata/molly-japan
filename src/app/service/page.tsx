import type { Metadata } from "next";
import Link from "next/link";
import FadeInSection from "@/components/FadeInSection";

export const metadata: Metadata = {
  title: "サービス",
  description: "経営に言葉と実行力を。森行秀和の\u201c実践型伴走支援\u201d ─ 参謀サポート、社内参謀育成、経営課題解決、人材採用・教育・評価制度設計",
};

const services = [
  {
    id: "sanbo",
    num: "01",
    title: "参謀サポート",
    subtitle: "経営者の思考を整える、右腕機能の実装",
    lead: "経営の孤独を、構造で支える。",
    paragraphs: [
      "経営は、決断の連続です。任せる。撤退する。投資する。守る。その重さを最後に引き受けるのは、常に経営者です。",
      "だからこそ必要なのは、助言者ではありません。経営を構造で支える右腕機能です。",
      "参謀の役割は、答えを出すことではありません。経営者が「決められる状態」を整えること。思考を構造化し、判断の質とスピードを上げ、組織の流れを整えます。",
    ],
    details: "月2回 90分セッション / チャット相談 / 戦略文書作成支援",
  },
  {
    id: "ikusei",
    num: "02",
    title: "社内参謀育成サポート",
    subtitle: "社長の構想を、組織の実行力に変える6ヶ月伴走プログラム",
    lead: "必要なのは、社長がさらに頑張ることではありません。",
    paragraphs: [
      "会社が成長するほど、社長の仕事は増えていきます。本来は社長にしかできない仕事へ集中したいのに、進捗確認や細かな判断に時間を奪われていませんか。",
      "社長の頭の中にある構想を受け取り、整理し、現場が動ける形へ変える。そんな「社内参謀」を育てることです。",
      "実際の経営課題や案件を題材にしながら、社内の参謀候補を6ヶ月間で育成する実践型プログラムです。",
    ],
    details: "6ヶ月間プログラム / 実践課題ベース / 月次フィードバック",
  },
  {
    id: "kadai",
    num: "03",
    title: "経営課題解決サポート",
    subtitle: "思考を整え、組織を動かす5つのアプローチ",
    lead: "経営者の「モヤモヤ」を、行動に変える。",
    paragraphs: [
      "「自社の課題が何なのか、うまく言葉にできない」「社員に理念や方針が伝わらず、行動変化が起きない」",
      "「現場との温度差、人間関係の摩擦が大きくなってきている」「外部コンサルを入れたが、社内に何も残らなかった」",
      "このような経営者の悩みに、真正面から向き合い、\u201c言葉\u201dの力で経営を整え、組織を動かすのが本サービスの本質です。",
    ],
    details: "言語化ワーク / 理念浸透支援 / 組織診断",
  },
  {
    id: "saiyo",
    num: "04",
    title: "人材採用サポート",
    subtitle: "成長を加速させる「最適な人材」と出会うために",
    lead: "単なる「採用代行」ではありません。",
    paragraphs: [
      "会社の未来をともにつくる\u201c仲間\u201dを見極め、惹きつけるための戦略的な採用支援です。",
      "求人を出しても応募が集まらない、面接で何を見ればよいかわからない、採用してもすぐに辞めてしまう。こうした課題の背景には「戦略不在の採用活動」が潜んでいます。",
      "経営戦略と連動した採用設計で、最適な人材との出会いを実現します。",
    ],
    details: "採用戦略策定 / 求人設計 / 面接設計 / 定着支援",
  },
  {
    id: "hyoka",
    num: "05",
    title: "人事評価制度設計サポート",
    subtitle: "人が育ち、組織が動く。経営に直結する評価制度を。",
    lead: "「評価制度はある。でも、納得されていない。機能していない。」",
    paragraphs: [
      "人事評価制度は、単なる\u201c人事の仕組み\u201dではありません。組織の方向性を言語化し、社員一人ひとりの成長を促進し、会社の未来を創る\u201c経営の仕組み\u201dです。",
      "制度の「作り方」ではなく、「活かし方」まで見据えた実践型の支援。",
      "理念と行動のつながり、評価と報酬の納得感、フィードバックの文化までを一気通貫で設計します。",
    ],
    details: "評価制度設計 / 報酬制度連動 / 運用マニュアル / 管理職研修",
  },
  {
    id: "kyoiku",
    num: "06",
    title: "人材教育サポート",
    subtitle: "実践につながる\u201c生きた研修\u201dを。",
    lead: "「研修をやったけれど、現場が変わらない」",
    paragraphs: [
      "知識のインプットにとどまらず、\u201c行動と成果\u201dに結びつける実践型のプログラムです。",
      "単なる「座学」ではなく、「職場に変化が起きる」ことをゴールに設計しています。",
      "対象は、管理職やリーダー候補、チームを牽引するキーパーソンたち。一人ひとりの「意識」と「行動」を変え、組織全体の生産性と主体性を引き上げます。",
    ],
    details: "リーダー研修 / チームビルディング / コミュニケーション研修",
  },
];

export default function ServicePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-36 bg-bg-dark text-white overflow-hidden">
        <div className="absolute top-0 left-1/2 w-px h-32 bg-gradient-to-b from-transparent to-white/20" />
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <FadeInSection>
            <p className="text-white/40 text-xs tracking-[0.4em] mb-6">SERVICE</p>
            <h1 className="font-serif text-4xl lg:text-5xl tracking-wider mb-6">
              経営に言葉と実行力を。
            </h1>
            <p className="text-white/50 text-sm">
              森行秀和の&ldquo;実践型伴走支援&rdquo;
            </p>
            <div className="w-16 h-px bg-white/30 mx-auto mt-6" />
            <p className="text-white/40 text-sm leading-loose mt-8 max-w-2xl mx-auto">
              「現場が動かない」「社員に伝わらない」「課題が言葉にならない」「ひとりで抱えて限界を感じている」
              <br />
              こうした経営者の声に寄り添い、&ldquo;言語化&rdquo;と&ldquo;実行力&rdquo;で経営を前に進める伴走支援です。
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 lg:py-36 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          <div className="space-y-24">
            {services.map((svc) => (
              <FadeInSection key={svc.id} delay={0}>
                <div id={svc.id} className="scroll-mt-32">
                  <div className="flex items-start gap-6 lg:gap-10">
                    <span className="font-serif text-5xl lg:text-6xl text-black/10 shrink-0">
                      {svc.num}
                    </span>
                    <div className="flex-1">
                      <h2 className="font-serif text-2xl lg:text-3xl text-primary tracking-wider">
                        {svc.title}
                      </h2>
                      <p className="text-text-light text-xs tracking-[0.1em] mt-2">
                        {svc.subtitle}
                      </p>
                      <div className="section-divider mt-6" />
                      <p className="font-serif text-lg text-primary mt-6">{svc.lead}</p>
                      <div className="space-y-4 mt-4">
                        {svc.paragraphs.map((p, j) => (
                          <p key={j} className="text-text-light text-sm leading-loose">{p}</p>
                        ))}
                      </div>
                      <div className="mt-6 p-4 bg-bg-section text-xs text-text-light tracking-wider">
                        {svc.details}
                      </div>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 bg-bg-section text-center">
        <div className="max-w-3xl mx-auto px-6">
          <FadeInSection>
            <h2 className="font-serif text-3xl text-primary tracking-wider mb-6">
              サービスに関するご相談
            </h2>
            <div className="section-divider mx-auto" />
            <p className="text-text-light text-sm leading-loose mt-6 mb-10">
              各サービスの詳細やお見積もりなど、お気軽にお問い合わせください。
            </p>
            <Link
              href="/contact"
              className="inline-block px-12 py-4 bg-black text-white text-sm tracking-[0.2em] hover:bg-black/80 transition-colors duration-300"
            >
              お問い合わせ
            </Link>
          </FadeInSection>
        </div>
      </section>
    </>
  );
}
